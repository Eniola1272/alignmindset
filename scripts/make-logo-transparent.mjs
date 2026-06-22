import { readFileSync, writeFileSync } from "node:fs";
import { deflateSync, inflateSync } from "node:zlib";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  throw new Error("Usage: node scripts/make-logo-transparent.mjs input.png output.png");
}

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const source = readFileSync(inputPath);

if (!source.subarray(0, 8).equals(signature)) {
  throw new Error("Input is not a PNG file");
}

const chunks = [];
let offset = 8;

while (offset < source.length) {
  const length = source.readUInt32BE(offset);
  const type = source.subarray(offset + 4, offset + 8).toString("ascii");
  const data = source.subarray(offset + 8, offset + 8 + length);
  chunks.push({ type, data });
  offset += 12 + length;
}

const ihdr = chunks.find((chunk) => chunk.type === "IHDR")?.data;

if (!ihdr) {
  throw new Error("PNG is missing IHDR");
}

const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
const bitDepth = ihdr.readUInt8(8);
const colorType = ihdr.readUInt8(9);

if (bitDepth !== 8 || ![2, 6].includes(colorType)) {
  throw new Error("Only 8-bit RGB/RGBA PNG files are supported");
}

const channels = colorType === 6 ? 4 : 3;
const idat = Buffer.concat(
  chunks.filter((chunk) => chunk.type === "IDAT").map((chunk) => chunk.data)
);
const inflated = inflateSync(idat);
const stride = width * channels;
const pixels = Buffer.alloc(width * height * 4);
let readOffset = 0;
let previous = Buffer.alloc(stride);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

for (let y = 0; y < height; y += 1) {
  const filter = inflated.readUInt8(readOffset);
  readOffset += 1;
  const row = Buffer.from(inflated.subarray(readOffset, readOffset + stride));
  readOffset += stride;

  for (let x = 0; x < stride; x += 1) {
    const left = x >= channels ? row[x - channels] : 0;
    const up = previous[x] ?? 0;
    const upLeft = x >= channels ? previous[x - channels] : 0;

    if (filter === 1) row[x] = (row[x] + left) & 255;
    if (filter === 2) row[x] = (row[x] + up) & 255;
    if (filter === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 255;
    if (filter === 4) row[x] = (row[x] + paeth(left, up, upLeft)) & 255;
  }

  for (let x = 0; x < width; x += 1) {
    const sourceIndex = x * channels;
    const targetIndex = (y * width + x) * 4;
    const r = row[sourceIndex];
    const g = row[sourceIndex + 1];
    const b = row[sourceIndex + 2];
    const a = channels === 4 ? row[sourceIndex + 3] : 255;
    const magentaDominance = (r + b) / 2 - g;
    const isMagenta =
      r > 105 && b > 105 && g < 135 && magentaDominance > 55;
    const edgeStrength = Math.max(0, Math.min(1, (magentaDominance - 38) / 55));
    const alpha = isMagenta ? 0 : Math.round(a * (1 - edgeStrength * 0.65));

    pixels[targetIndex] = r;
    pixels[targetIndex + 1] = g;
    pixels[targetIndex + 2] = b;
    pixels[targetIndex + 3] = alpha < 28 ? 0 : alpha;
  }

  previous = row;
}

let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (pixels[(y * width + x) * 4 + 3] > 10) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

const padding = 28;
minX = Math.max(0, minX - padding);
minY = Math.max(0, minY - padding);
maxX = Math.min(width - 1, maxX + padding);
maxY = Math.min(height - 1, maxY + padding);

const outWidth = maxX - minX + 1;
const outHeight = maxY - minY + 1;
const raw = Buffer.alloc((outWidth * 4 + 1) * outHeight);

for (let y = 0; y < outHeight; y += 1) {
  const rowStart = y * (outWidth * 4 + 1);
  raw[rowStart] = 0;

  for (let x = 0; x < outWidth; x += 1) {
    const sourceIndex = ((minY + y) * width + minX + x) * 4;
    const targetIndex = rowStart + 1 + x * 4;
    pixels.copy(raw, targetIndex, sourceIndex, sourceIndex + 4);
  }
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) {
    c = crcTable[(c ^ byte) & 255] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data = Buffer.alloc(0)) {
  const typeBuffer = Buffer.from(type, "ascii");
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  typeBuffer.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return out;
}

const outIhdr = Buffer.alloc(13);
outIhdr.writeUInt32BE(outWidth, 0);
outIhdr.writeUInt32BE(outHeight, 4);
outIhdr.writeUInt8(8, 8);
outIhdr.writeUInt8(6, 9);
outIhdr.writeUInt8(0, 10);
outIhdr.writeUInt8(0, 11);
outIhdr.writeUInt8(0, 12);

writeFileSync(
  outputPath,
  Buffer.concat([
    signature,
    chunk("IHDR", outIhdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND")
  ])
);

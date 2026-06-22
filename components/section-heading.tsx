type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={`sectionHeading ${align === "center" ? "center" : ""}`}>
      {eyebrow ? <span>{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

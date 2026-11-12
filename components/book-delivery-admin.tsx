"use client";

import { useRef, useState } from "react";
import { FileUp, LoaderCircle } from "lucide-react";
import { publishAskForHelpDigitalFile } from "@/lib/actions";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { useToast } from "@/components/toast-provider";

export function BookDeliveryAdmin({ fileReady }: { fileReady: boolean }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  async function uploadBook() {
    const file = inputRef.current?.files?.[0];

    if (!file || file.type !== "application/pdf") {
      showToast({
        title: "Choose the book PDF",
        message: "Ask for Help must be uploaded as a PDF file.",
        tone: "error"
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      showToast({
        title: "PDF is too large",
        message: "Keep the digital edition below 50 MB.",
        tone: "error"
      });
      return;
    }

    setUploading(true);

    try {
      const response = await fetch("/api/admin/books/ask-for-help/upload-url", {
        method: "POST"
      });
      const prepared = (await response.json()) as {
        path?: string;
        token?: string;
        error?: string;
      };

      if (!response.ok || !prepared.token) {
        throw new Error(prepared.error || "Could not prepare the private upload.");
      }

      const supabase = createSupabaseBrowserClient();

      if (!supabase) {
        throw new Error("Supabase browser storage is not configured.");
      }

      const { error } = await supabase.storage
        .from("digital-products")
        .uploadToSignedUrl(
          prepared.path || "ask-for-help/ask-for-help.pdf",
          prepared.token,
          file,
          {
          contentType: "application/pdf",
          cacheControl: "3600"
          }
        );

      if (error) {
        throw error;
      }

      const published = await publishAskForHelpDigitalFile();

      if (!published.ok) {
        throw new Error(published.message);
      }

      showToast({
        title: fileReady ? "Book replaced" : "Book published",
        message: published.message,
        tone: "success"
      });
      window.location.reload();
    } catch (error) {
      showToast({
        title: "Upload failed",
        message: error instanceof Error ? error.message : "Please try again.",
        tone: "error"
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bookDeliveryUploader">
      <div>
        <strong>{fileReady ? "Digital edition is live" : "Digital edition is not uploaded"}</strong>
        <p>
          Uploading a new PDF replaces the current edition. Existing paid order
          links will automatically serve the latest file.
        </p>
      </div>
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" />
      <button className="primaryButton" type="button" onClick={uploadBook} disabled={uploading}>
        {uploading ? <LoaderCircle className="spinIcon" size={17} /> : <FileUp size={17} />}
        {uploading ? "Publishing PDF" : fileReady ? "Replace PDF" : "Publish PDF"}
      </button>
    </div>
  );
}

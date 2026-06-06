"use client";

import { useRef, useState } from "react";

const inputClass =
  "flex-1 border border-border bg-card px-3.5 py-2.5 text-sm font-medium outline-none transition placeholder:text-muted focus:border-brand";

interface ImageUploadFieldProps {
  id: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  previewClassName?: string;
}

export function ImageUploadField({
  id,
  name,
  defaultValue,
  placeholder,
  previewClassName = "h-24 w-40",
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? `Upload failed (HTTP ${res.status}).`);
        return;
      }
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {url && (
        <div className="flex items-start gap-3 border border-border bg-card p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            className={`${previewClassName} object-cover`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
            }}
          />
          <p className="break-all pt-1 font-mono text-[10px] text-muted">
            {url}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <input
          id={id}
          name={name}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={inputClass}
          placeholder={placeholder ?? "https://… or click Upload"}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn btn-secondary btn-sm shrink-0"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
        {url && !uploading && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="shrink-0 px-3 py-2 text-xs font-bold uppercase tracking-wide text-red-300 transition hover:bg-red-500/10"
          >
            Clear
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void uploadFile(f);
            // Reset so re-selecting the same filename still fires onChange.
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <p className="border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
          {error}
        </p>
      )}
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
        PNG, JPEG, WEBP, GIF, or AVIF · Max 5 MB · Or paste any image URL
      </p>
    </div>
  );
}

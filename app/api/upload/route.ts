import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export async function POST(request: Request) {
  // Same session check the rest of /backstage uses. Reject anonymous uploads
  // before we ever touch Vercel Blob (which would cost storage/bandwidth).
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Image upload is not configured. Set BLOB_READ_WRITE_TOKEN in your environment.",
      },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image is too large. Max 5 MB." },
      { status: 413 },
    );
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported image type. Use PNG, JPEG, WEBP, GIF, or AVIF." },
      { status: 400 },
    );
  }

  const ext = file.type.split("/")[1] ?? "bin";
  const pathname = `events/${randomUUID()}.${ext}`;

  try {
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("[upload] Vercel Blob put failed:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Upload failed.",
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ALLOWED_IMAGES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
]);
const ALLOWED_VIDEOS = new Set([
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
]);
const ALLOWED = new Set([
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "application/pdf",
  "video/mp4", "video/webm", "video/ogg", "video/quicktime",
]);

const MAX_SIZE_IMAGE = 8 * 1024 * 1024;   //  8 MB
const MAX_SIZE_VIDEO = 200 * 1024 * 1024; // 200 MB

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const medias = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(medias);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  const alt = (form.get("alt") as string) || null;

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: `Type non autorisé : ${file.type}` }, { status: 400 });
  }
  const maxSize = ALLOWED_VIDEOS.has(file.type) ? MAX_SIZE_VIDEO : MAX_SIZE_IMAGE;
  if (file.size > maxSize) {
    const limit = ALLOWED_VIDEOS.has(file.type) ? "200 Mo" : "8 Mo";
    return NextResponse.json({ error: `Fichier trop lourd (max ${limit})` }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeBase = file.name.replaceAll(/[^a-z0-9._-]/gi, "_").toLowerCase();
  const filename = `${Date.now()}-${safeBase}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), buffer);

  const url = `/uploads/${filename}`;
  const media = await prisma.media.create({
    data: {
      filename,
      url,
      alt,
      size: file.size,
      mimeType: file.type,
    },
  });

  return NextResponse.json(media, { status: 201 });
}

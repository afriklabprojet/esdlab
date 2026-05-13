import { NextResponse } from "next/server";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const media = await prisma.media.findUnique({ where: { id: params.id } });
  if (!media) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  // Best-effort delete on disk (only if stored under /uploads/)
  if (media.url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", media.url));
    } catch {
      // file already gone — ignore
    }
  }

  await prisma.media.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

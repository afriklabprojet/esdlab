/**
 * Migration SQLite → Neon PostgreSQL
 * Usage: DATABASE_URL="postgresql://..." node scripts/migrate-to-neon.mjs
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

const services = JSON.parse(readFileSync("/tmp/services.json", "utf8"));
const products = JSON.parse(readFileSync("/tmp/products.json", "utf8"));
const settings = JSON.parse(readFileSync("/tmp/settings.json", "utf8"));

async function run() {
  console.log("⏳ Migration services…");
  for (const s of services) {
    const { id, createdAt, updatedAt, ...data } = s;
    data.published = Boolean(data.published);
    data.order = Number(data.order);
    data.category = data.category ?? "service";
    await prisma.service.upsert({ where: { slug: data.slug }, update: data, create: data });
    console.log("  ✓", data.slug);
  }

  console.log("⏳ Migration products…");
  for (const p of products) {
    const { id, createdAt, updatedAt, ...data } = p;
    data.published = Boolean(data.published);
    data.order = Number(data.order);
    await prisma.product.upsert({ where: { slug: data.slug }, update: data, create: data });
    console.log("  ✓", data.slug);
  }

  console.log("⏳ Migration settings…");
  for (const s of settings) {
    const { updatedAt, ...data } = s;
    await prisma.setting.upsert({ where: { key: data.key }, update: { value: data.value }, create: data });
  }
  console.log("  ✓", settings.length, "settings");

  await prisma.$disconnect();
  console.log("✅ Migration terminée !");
}

run().catch((e) => { console.error(e.message); process.exit(1); });

import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export interface BrandTokens {
  // Colors — hex values
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  // Typography
  fontHeading: string;
  fontBody: string;
  // Shape
  radius: string; // e.g. "0.75"  (rem)
  // Misc
  animationsEnabled: string; // "true" | "false"
}

export const BRAND_DEFAULTS: BrandTokens = {
  primaryColor: "#3478BE",
  secondaryColor: "#E8721D",
  accentColor: "#D4A843",
  bgColor: "#fff7ed",
  fontHeading: "Cormorant Garamond",
  fontBody: "Plus Jakarta Sans",
  radius: "0.75",
  animationsEnabled: "true",
};

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return "52 120 190";
  return `${r} ${g} ${b}`;
}

// Generate a full palette (50–950) from a base hex color
function generatePalette(base: string): Record<string, string> {
  const r = parseInt(base.slice(1, 3), 16);
  const g = parseInt(base.slice(3, 5), 16);
  const b = parseInt(base.slice(5, 7), 16);

  const stops: Record<number, number> = {
    50: 0.95,
    100: 0.88,
    200: 0.74,
    300: 0.57,
    400: 0.35,
    500: 0,
    600: -0.15,
    700: -0.3,
    800: -0.44,
    900: -0.56,
    950: -0.72,
  };

  const result: Record<string, string> = {};
  for (const [shade, factor] of Object.entries(stops)) {
    let nr: number, ng: number, nb: number;
    if (factor > 0) {
      nr = Math.round(r + (255 - r) * factor);
      ng = Math.round(g + (255 - g) * factor);
      nb = Math.round(b + (255 - b) * factor);
    } else {
      const abs = Math.abs(factor);
      nr = Math.round(r * (1 - abs));
      ng = Math.round(g * (1 - abs));
      nb = Math.round(b * (1 - abs));
    }
    result[shade] = `${nr} ${ng} ${nb}`;
  }
  return result;
}

export function buildCssVars(tokens: BrandTokens): string {
  const primary = generatePalette(tokens.primaryColor);
  const secondary = generatePalette(tokens.secondaryColor);
  const accent = generatePalette(tokens.accentColor);

  const lines: string[] = [":root {"];

  // Primary palette
  for (const [shade, rgb] of Object.entries(primary)) {
    lines.push(`  --color-primary-${shade}: ${rgb};`);
  }
  // Secondary palette
  for (const [shade, rgb] of Object.entries(secondary)) {
    lines.push(`  --color-secondary-${shade}: ${rgb};`);
  }
  // Accent palette
  for (const [shade, rgb] of Object.entries(accent)) {
    lines.push(`  --color-accent-${shade}: ${rgb};`);
  }

  // Background
  const bgRgb = hexToRgb(tokens.bgColor);
  lines.push(`  --color-bg: ${bgRgb};`);

  // Typography
  lines.push(`  --font-heading-brand: "${tokens.fontHeading}", Georgia, serif;`);
  lines.push(`  --font-body-brand: "${tokens.fontBody}", system-ui, sans-serif;`);

  // Radius
  lines.push(`  --radius-brand: ${tokens.radius}rem;`);

  lines.push("}");
  return lines.join("\n");
}

export function buildCssOverride(tokens: BrandTokens): string {
  const lines: string[] = [];

  // Map Tailwind CSS class variables to brand palette CSS vars
  // This bridges our custom vars into Tailwind's utility classes
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  lines.push(":root {");
  for (const shade of shades) {
    lines.push(
      `  --tw-primary-${shade}: var(--color-primary-${shade});`,
      `  --tw-secondary-${shade}: var(--color-secondary-${shade});`,
      `  --tw-accent-${shade}: var(--color-accent-${shade});`,
    );
  }
  lines.push("}");

  // Override Tailwind color utilities via CSS — covers bg, text, border, ring, fill
  const prefixes = ["bg", "text", "border", "ring", "fill", "stroke", "from", "to", "via"];
  const colorGroups = [
    { name: "primary", var: "--color-primary" },
    { name: "secondary", var: "--color-secondary" },
    { name: "accent", var: "--color-accent" },
  ];

  for (const shade of shades) {
    for (const cg of colorGroups) {
      for (const prefix of prefixes) {
        if (prefix === "bg") {
          lines.push(
            `.${prefix}-${cg.name}-${shade} { background-color: rgb(var(${cg.var}-${shade}) / var(--tw-bg-opacity, 1)); }`,
          );
        } else if (prefix === "text") {
          lines.push(
            `.${prefix}-${cg.name}-${shade} { color: rgb(var(${cg.var}-${shade}) / var(--tw-text-opacity, 1)); }`,
          );
        } else if (prefix === "border") {
          lines.push(
            `.${prefix}-${cg.name}-${shade} { border-color: rgb(var(${cg.var}-${shade}) / var(--tw-border-opacity, 1)); }`,
          );
        } else if (prefix === "ring") {
          lines.push(
            `.${prefix}-${cg.name}-${shade} { --tw-ring-color: rgb(var(${cg.var}-${shade}) / var(--tw-ring-opacity, 1)); }`,
          );
        } else if (prefix === "from") {
          lines.push(
            `.from-${cg.name}-${shade} { --tw-gradient-from: rgb(var(${cg.var}-${shade}) / 1); }`,
          );
        } else if (prefix === "to") {
          lines.push(
            `.to-${cg.name}-${shade} { --tw-gradient-to: rgb(var(${cg.var}-${shade}) / 1); }`,
          );
        } else if (prefix === "via") {
          lines.push(
            `.via-${cg.name}-${shade} { --tw-gradient-via: rgb(var(${cg.var}-${shade}) / 1); }`,
          );
        }
      }
    }
  }

  return lines.join("\n");
}

export const getBrandTokens = unstable_cache(
  async (): Promise<BrandTokens> => {
    const keys = Object.keys(BRAND_DEFAULTS).map((k) => `brand.${k}`);
    const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
    const map: Record<string, string> = {};
    for (const r of rows) {
      const shortKey = r.key.replace("brand.", "") as keyof BrandTokens;
      map[shortKey] = r.value;
    }
    return {
      primaryColor: map.primaryColor || BRAND_DEFAULTS.primaryColor,
      secondaryColor: map.secondaryColor || BRAND_DEFAULTS.secondaryColor,
      accentColor: map.accentColor || BRAND_DEFAULTS.accentColor,
      bgColor: map.bgColor || BRAND_DEFAULTS.bgColor,
      fontHeading: map.fontHeading || BRAND_DEFAULTS.fontHeading,
      fontBody: map.fontBody || BRAND_DEFAULTS.fontBody,
      radius: map.radius || BRAND_DEFAULTS.radius,
      animationsEnabled: map.animationsEnabled ?? BRAND_DEFAULTS.animationsEnabled,
    };
  },
  ["brand-tokens"],
  { tags: ["settings", "brand"], revalidate: 60 },
);

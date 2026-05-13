import { getBrandTokens, buildCssVars, buildCssOverride } from "@/lib/brand";

export default async function BrandInjector() {
  const tokens = await getBrandTokens();
  const vars = buildCssVars(tokens);
  const overrides = buildCssOverride(tokens);
  const css = `${vars}\n${overrides}`;

  return (
    <style
      id="brand-tokens"
      dangerouslySetInnerHTML={{ __html: css }}
      suppressHydrationWarning
    />
  );
}

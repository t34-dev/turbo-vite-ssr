// pages/query/+prefetchStaticAssets.ts
export const prefetchStaticAssets =
  typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches ? "viewport" : "hover";

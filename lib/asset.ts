// Prefixes public/ paths with the deploy base path (e.g. /ITServices on GitHub Pages).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

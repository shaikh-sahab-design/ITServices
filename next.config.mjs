// GitHub Pages builds set NEXT_PUBLIC_BASE_PATH (e.g. /ITServices) and need a static export.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = basePath
  ? { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } }
  : {};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Слеш у кінці адреси лишається: без нього /storybook/ перенаправляється на /storybook, і Storybook не знаходить свої файли.
  trailingSlash: true,
  // Next не віддає index.html для теки в public, тож адресу /storybook/ переписуємо на файл Storybook.
  async rewrites() {
    return [
      { source: "/storybook", destination: "/storybook/index.html" },
      { source: "/storybook/", destination: "/storybook/index.html" },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

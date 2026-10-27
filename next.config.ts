import type { NextConfig } from "next";

// GitHub Pages 網址是 https://<帳號>.github.io/<repo>/，所以部署時要加上 repo 子路徑。
// 本機開發不設定，維持 http://localhost:3000/。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    // 靜態網站沒有伺服器做圖片最佳化，改用自訂 loader 補上 basePath
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
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

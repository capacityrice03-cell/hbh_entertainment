import type { NextConfig } from "next";

// 網站使用自訂網域 hbh-tw.store，放在網域最上層，所以不設子路徑。
// 若改回 https://<帳號>.github.io/<repo>/ 這種網址，部署時要設定 NEXT_PUBLIC_BASE_PATH=/<repo>。
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

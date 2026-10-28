// 短影音區塊內容，整理自《好不好娛樂_公司簡介2024V1》簡報第 7、8 頁（炸綺來品牌自媒體）

export const SHORT_VIDEO_PLAYLIST =
  "https://youtube.com/playlist?list=PLWaU_EMlsoBpjwS9AXaFxXhoZCZSU9Ye8";

/** 代表性短影音與成效；每則可有多個平台的播放數，各自連到原影片 */
export const SHORT_VIDEO_HIGHLIGHTS: {
  src: string;
  alt: string;
  /** 數字下方的說明，可省略 */
  label?: string;
  stats: { value: string; platform?: string; url: string }[];
}[] = [
  {
    src: "/images/post-dance.jpg",
    alt: "炸綺來小費箱跳舞短影音，FB 118 萬、IG 158 萬次播放",
    stats: [
      { value: "158萬", platform: "IG", url: "https://www.instagram.com/reel/DWgBe7RkVMV/" },
      { value: "118萬", platform: "FB", url: "https://www.facebook.com/share/r/155mk4okgDw/" },
    ],
  },
  {
    src: "/images/post-474.jpg",
    alt: "炸綺來短影音，474 萬次播放",
    label: "單支短影音播放",
    stats: [{ value: "474萬", url: "https://www.facebook.com/reel/1679009686178136" }],
  },
  {
    src: "/images/post-tainan.jpg",
    alt: "炸綺來台南永康店開幕貼文，194 萬次播放",
    label: "台南永康店開幕",
    stats: [{ value: "194萬", url: "https://www.facebook.com/watch/?v=403333626187452" }],
  },
  {
    src: "/images/post-taipei.jpg",
    alt: "炸綺來台北京站店開幕貼文，39.9 萬次播放",
    label: "台北京站店開幕",
    stats: [{ value: "39.9萬", url: "https://www.facebook.com/reel/2907596866066610" }],
  },
];

/** 簡報第 8 頁：IG Reels / FB 短影音，views 單位為「萬次播放」 */
// 短影音牆：共 46 張，兩排左右循環滑動，順序已刻意打亂；views 為截圖上的觀看數（萬）
export const SHORT_VIDEOS = [
  { src: "/images/short-36.jpg", views: 196 },
  { src: "/images/short-05.jpg", views: 29.9 },
  { src: "/images/short-23.jpg", views: 19 },
  { src: "/images/short-12.jpg", views: 202.1 },
  { src: "/images/short-30.jpg", views: 11 },
  { src: "/images/short-43.jpg", views: 80 },
  { src: "/images/short-02.jpg", views: 24.8 },
  { src: "/images/short-41.jpg", views: 5.6 },
  { src: "/images/short-25.jpg", views: 49 },
  { src: "/images/short-08.jpg", views: 49 },
  { src: "/images/short-33.jpg", views: 17 },
  { src: "/images/short-14.jpg", views: 30.4 },
  { src: "/images/short-26.jpg", views: 29 },
  { src: "/images/short-10.jpg", views: 14.5 },
  { src: "/images/short-47.jpg", views: 49.1 },
  { src: "/images/short-17.jpg", views: 42 },
  { src: "/images/short-03.jpg", views: 34.8 },
  { src: "/images/short-38.jpg", views: 37 },
  { src: "/images/short-29.jpg", views: 13 },
  { src: "/images/short-01.jpg", views: 163.4 },
  { src: "/images/short-22.jpg", views: 25 },
  { src: "/images/short-44.jpg", views: 23 },
  { src: "/images/short-34.jpg", views: 47 },
  { src: "/images/short-09.jpg", views: 11.3 },
  { src: "/images/short-27.jpg", views: 34 },
  { src: "/images/short-16.jpg", views: 14 },
  { src: "/images/short-31.jpg", views: 5.7 },
  { src: "/images/short-04.jpg", views: 124.8 },
  { src: "/images/short-39.jpg", views: 28 },
  { src: "/images/short-13.jpg", views: 8.7 },
  { src: "/images/short-21.jpg", views: 16 },
  { src: "/images/short-40.jpg", views: 19 },
  { src: "/images/short-07.jpg", views: 60.3 },
  { src: "/images/short-35.jpg", views: 23 },
  { src: "/images/short-48.jpg", views: 21.1 },
  { src: "/images/short-28.jpg", views: 8.3 },
  { src: "/images/short-11.jpg", views: 13 },
  { src: "/images/short-20.jpg", views: 52 },
  { src: "/images/short-42.jpg", views: 44 },
  { src: "/images/short-15.jpg", views: 19 },
  { src: "/images/short-06.jpg", views: 40.3 },
  { src: "/images/short-32.jpg", views: 4.2 },
  { src: "/images/short-37.jpg", views: 21 },
  { src: "/images/short-24.jpg", views: 45 },
  { src: "/images/short-18.jpg", views: 11 },
  { src: "/images/short-45.jpg", views: 37.6 },
] as const;

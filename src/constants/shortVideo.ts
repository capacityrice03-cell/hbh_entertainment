// 短影音區塊內容，整理自《好不好娛樂_公司簡介2024V1》簡報第 7、8 頁（炸綺來品牌自媒體）

export const SHORT_VIDEO_PLAYLIST =
  "https://youtube.com/playlist?list=PLWaU_EMlsoBpjwS9AXaFxXhoZCZSU9Ye8";

/** 代表性短影音與成效；每則可有多個平台的播放數，各自連到原影片 */
export const SHORT_VIDEO_HIGHLIGHTS: {
  src: string;
  alt: string;
  label: string;
  stats: { value: string; platform?: string; url: string }[];
}[] = [
  {
    src: "/images/post-dance.jpg",
    alt: "炸綺來小費箱跳舞短影音，FB 118 萬、IG 158.2 萬次播放",
    label: "跳舞短影音",
    stats: [
      { value: "158.2萬", platform: "IG", url: "https://www.instagram.com/reel/DWgBe7RkVMV/" },
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
export const SHORT_VIDEOS = [
  { src: "/images/short-01.jpg", views: 163.4 },
  { src: "/images/short-02.jpg", views: 24.8 },
  { src: "/images/short-03.jpg", views: 34.8 },
  { src: "/images/short-04.jpg", views: 124.8 },
  { src: "/images/short-05.jpg", views: 29.9 },
  { src: "/images/short-06.jpg", views: 40.3 },
  { src: "/images/short-07.jpg", views: 60.3 },
  { src: "/images/short-08.jpg", views: 49 },
  { src: "/images/short-09.jpg", views: 11.3 },
  { src: "/images/short-10.jpg", views: 14.5 },
  { src: "/images/short-11.jpg", views: 13 },
  { src: "/images/short-12.jpg", views: 202.1 },
  { src: "/images/short-13.jpg", views: 8.7 },
  { src: "/images/short-14.jpg", views: 30.4 },
] as const;

// 短影音區塊內容，整理自《好不好娛樂_公司簡介2024V1》簡報第 7、8 頁（炸綺來品牌自媒體）

export const SHORT_VIDEO_PLAYLIST =
  "https://youtube.com/playlist?list=PLWaU_EMlsoBpjwS9AXaFxXhoZCZSU9Ye8";

export const SHORT_VIDEO_POINTS = [
  "全年度節慶 & 活動檔期",
  "於各大社群媒體平台",
  "長期的持續性曝光",
  "創造出良好的互動循環",
] as const;

/** 簡報第 7 頁：代表性貼文與成效 */
export const SHORT_VIDEO_HIGHLIGHTS = [
  {
    src: "/images/post-368.jpg",
    alt: "炸綺來短影音貼文，368 萬次播放",
    value: "368萬",
    label: "單支短影音播放",
  },
  {
    src: "/images/post-tainan.jpg",
    alt: "炸綺來台南永康店開幕貼文，194 萬次播放",
    value: "194萬",
    label: "台南永康店開幕",
  },
  {
    src: "/images/post-taipei.jpg",
    alt: "炸綺來台北京站店開幕貼文，39.9 萬次播放",
    value: "39.9萬",
    label: "台北京站店開幕",
  },
] as const;

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

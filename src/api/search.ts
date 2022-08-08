import request from "../http/request";

// 搜索歌曲
export const _searchMusic = (params: any) => request.get("/search", { params });

// 获取banner
export const _getBanner = (params: { type: number }) =>
  request.get("/banner", { params });

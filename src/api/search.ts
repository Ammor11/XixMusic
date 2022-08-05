import request from "../http/request";

// 搜索歌曲
export const _searchMusic = (params: string) =>
  request.get("/search", { params });

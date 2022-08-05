import request from "../http/request";

// 搜索歌曲
export const _searchMusic = (params: any) => request.get("/search", { params });

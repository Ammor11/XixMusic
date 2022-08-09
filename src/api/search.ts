import request from "../http/request";

// 搜索歌曲
export const _searchMusic = (params: { keywords: string }) =>
  request.get("/search", { params });

// 获取banner
export const _getBanner = (params: { type: number }) =>
  request.get("/banner", { params });

// 手机登录
export const _cellphone = (params: any) =>
  request.get("/login/cellphone", { params });

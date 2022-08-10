import request from "../http/request";

/**
 * 搜索歌曲
 * 说明 : 调用此接口 , 传入关键词 keywords, 可获得歌曲列表
 * - keywords: 歌曲关键词
 * @param {Object} params
 * @param {string} params.keywords
 */
export const _searchMusic = (keywords: string) =>
  request({
    url: "/search",
    method: "get",
    params: {
      keywords,
    },
  });

/**
 * 获取首页banner
 * 说明 : 调用此接口， 可获得首页banner
 * - keywords: 歌曲关键词
 * @param {Object} params
 * @param {string} params.type
 * - type ： 设备类型
 * 0：pc
 * 1：android
 * 2：iphone
 * 3：ipad
 */
export const _getBanner = (type: number) =>
  request({
    url: "/banner",
    method: "get",
    params: {
      type,
    },
  });

import request from "../http/request";

/**
 * 搜索歌曲
 * 说明 : 调用此接口 , 传入关键词 keywords, 可获得歌曲列表
 * - keywords: 歌曲关键词
 * @param {Object} params
 * @param {string} params.keywords
 */
export const _searchMusic = (params: any) =>
  request({
    url: "/search",
    method: "get",
    params,
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

/**
 * 获取歌曲详情
 * 说明 : 调用此接口， 可获得歌曲详情
 * - ids: 歌曲id，可传入多个id，使用","隔开
 * @param {Object} params
 * @param {string} params.ids
 */
export const _getSongs = (ids: number) =>
  request({
    url: "/song/detail",
    method: "get",
    params: {
      ids,
    },
  });

/**
 * 获取歌曲
 * 说明 : 调用此接口， 可获得歌曲地址
 * - id: 歌曲id
 * @param {Object} params
 * @param {string} params.ids
 */
export const _getSongUrl = (id: number) =>
  request({
    url: "/song/url",
    method: "get",
    params: {
      id,
    },
  });

/**
 * 获取推荐歌单
 * 说明 : 调用此接口， 可获得推荐歌单
 * - ids: 歌曲id，可传入多个id，使用","隔开
 * @param {Object} params
 * @param {string} params.limit -可选参数，获取歌单数量，默认30
 */
export const _getPlayList = (params: any) =>
  request({
    url: "/personalized",
    method: "get",
    params,
  });

/**
 * 获取推荐MV
 * 说明 : 调用此接口， 可获得推荐MV
 */
export const _getMV = () =>
  request({
    url: "/personalized/mv",
    method: "get",
  });

/**
 * 获取每日推荐歌曲
 * 说明 : 调用此接口， 可获得每日推荐歌曲
 */
export const _getDailySongs = () =>
  request({
    url: "/recommend/songs",
    method: "get",
  });

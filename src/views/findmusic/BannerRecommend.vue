<template>
  <div class="banner_recommend">
    <div class="banner">
      <swiper
        :autoplay="{
          disableOnInteraction: false,
          delay: 3000,
          pauseOnMouseEnter: true,
        }"
        :modules="modules"
        :loop="true"
        :pagination="{ clickable: true }"
      >
        <swiper-slide v-for="item in dataList.bannerList" :key="item">
          <div
            class="imgbg"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <img class="img" :src="item.imageUrl"
        /></swiper-slide>
      </swiper>
    </div>
    <div class="recommend">
      <div class="daily_songs">
        <h3>For You</h3>
        <div class="dailySongs_wrap">
          <div class="dailySongs_left">
            <img :src="imgUrl" alt="" />
            <div class="daily">每日推荐</div>
            <div class="playbtn">
              <i class="iconfont icon-play"></i>
            </div>
          </div>
          <div class="dailySongs_right">
            <img src="../../assets/imgs/FMimg.jpg" alt="" />
            <div class="right">
              <div class="top">今日FM</div>
              <div class="center">Plggy</div>
              <div class="bottom">
                <i class="iconfont icon-likeactive"></i>
                <i class="iconfont icon-play"></i>
                <i class="iconfont icon-next"></i>
              </div>
            </div>
            <div class="tag"><i class="iconfont icon-radio"></i> 私人FM</div>
          </div>
        </div>
      </div>
      <div class="daily_song_list">
        <h3>推荐歌单</h3>
        <div class="dailySongList_wrap">
          <div
            class="item_wrap"
            v-for="item in dataList.playList"
            :key="item.id"
          >
            <div class="SongList_item">
              <img :src="item.picUrl" alt="" />
              <div class="playCount">
                <i class="iconfont icon-headset"></i>
                <span>{{ (item.playCount / 10000).toFixed(0) }}万</span>
              </div>
            </div>
            <div class="SongList_name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="daily_mv">
        <h3>推荐MV</h3>
        <div class="dailyMv_wrap">
          <div class="Mv_item" v-for="item in dataList.MVList" :key="item.id">
            <img :src="item.picUrl" alt="" />
            <p class="MVname">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { _getBanner, _getPlayList, _getMV } from "@/api/search";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const modules = [Autoplay, EffectCoverflow, Pagination];

let dataList = reactive({
  bannerList: [] as any[],
  playList: [] as any[],
  MVList: [] as any[],
});
const getData = async () => {
  const res1 = await _getBanner(0);
  const res2 = await _getPlayList({ limit: 18 });
  const res3 = await _getMV();
  // const res4 = await _getDailySongs();
  // 轮播图
  dataList.bannerList = res1.banners;
  // 推荐歌单
  dataList.playList = res2.result.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      playCount: item.playCount,
    };
  });
  // 推荐MV
  dataList.MVList = res3.result.map((item: any) => {
    return { id: item.id, name: item.name, picUrl: item.picUrl };
  });
  // 每日歌曲
};

onMounted(() => {
  getData();
});

let randomImg = Math.ceil(Math.random() * 4);
const imgUrl = require(`../../assets/imgs/${randomImg}.jpg`);
</script>
<style lang="scss" scoped>
.banner_recommend {
  height: 280px;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .banner {
    height: 280px;
    width: 1640px;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 15px;
    overflow: hidden;
    .swiper {
      height: 280px;
      width: 1640px;
      :deep(.swiper-pagination) {
        bottom: 10px;
        .swiper-pagination-bullet {
          width: 16px;
          height: 4px;
          background-color: #e4fbff;
          border-radius: 2px;
        }
        .swiper-pagination-bullet-active {
          width: 34px;
          background-color: #3bd3ff;
          box-shadow: 0 0 5px #3bd3ff, 0 0 6px #3bd3ff;
        }
      }
      .img {
        height: 280px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
      }
      .imgbg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 1700px;
        background-position: 0% 50%;
        filter: blur(8px);
      }
    }
  }
  .recommend {
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px 0;
    & > div {
      margin-bottom: 15px;
      & > h3 {
        text-align: left;
        padding-left: 15px;
        font-size: 26px;
        margin-bottom: 15px;
      }
    }
    .daily_songs {
      .dailySongs_wrap {
        display: flex;
        justify-content: space-around;
        & > div {
          height: 150px;
          text-align: center;
          border-radius: 10px;
          width: 45%;
          background: #ddd;
        }
        .dailySongs_left {
          position: relative;
          overflow: hidden;
          img {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            animation: move 35s infinite linear;
          }
          .daily {
            color: #fff;
            font-size: 60px;
            line-height: 72px;
            letter-spacing: 10px;
            width: 140px;
            font-weight: bold;
            position: absolute;
            left: 20px;
            top: 0;
          }
          .playbtn {
            width: 50px;
            line-height: 50px;
            background-color: rgba($color: #fff, $alpha: 0.6);
            border-radius: 50%;
            position: absolute;
            bottom: 10px;
            right: 10px;
            padding-left: 4px;
            cursor: pointer;
            .icon-play {
              color: #fff;
              text-align: center;
              font-size: 20px;
            }
          }
        }
        .dailySongs_right {
          background-image: linear-gradient(
            -225deg,
            #2cd8d5 0%,
            #c5c1ff 56%,
            #ffbac3 100%
          );
          padding: 10px 0;
          display: flex;
          position: relative;
          img {
            width: 130px;
            border-radius: 10px;
            margin: 0 30px;
          }
          .right {
            text-align: left;
            .top {
              font-size: 26px;
              color: #fff;
              font-weight: bold;
            }
            .center {
              color: #fff;
              font-size: 14px;
            }
            .bottom {
              margin-top: 50px;
              color: #fff;
              i {
                font-size: 20px;
                margin: 0 10px;
                cursor: pointer;
              }
            }
          }
          .tag {
            color: rgba($color: #fff, $alpha: 0.5);
            position: absolute;
            bottom: 10px;
            right: 30px;
          }
        }
      }
    }
    .daily_song_list {
      .dailySongList_wrap {
        width: 100%;
        padding: 20px 40px;
        display: flex;
        flex-wrap: wrap;
        .item_wrap {
          position: relative;
          .SongList_item {
            overflow: hidden;
            width: 170px;
            height: 170px;
            border-radius: 10px;
            margin: 20px 45px 50px 45px;
            cursor: pointer;
            position: relative;
            img {
              width: 100%;
            }
            .playCount {
              position: absolute;
              bottom: 0;
              right: 5px;
              color: #e9f8f6;
              .icon-headset {
                margin-right: 6px;
              }
            }
          }
          .SongList_name {
            color: #000;
            position: absolute;
            bottom: 0;
            width: 170px;
            margin: 0 45px;
            text-align: left;
            height: 42px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
    .daily_mv {
      .dailyMv_wrap {
        width: 100%;
        padding: 20px 40px;
        display: flex;
        flex-wrap: wrap;
        .Mv_item {
          width: 320px;
          height: 180px;
          border-radius: 10px;
          margin: 20px 35px;
          overflow: hidden;
          position: relative;
          img {
            width: 320px;
            cursor: pointer;
          }
          .MVname {
            width: 320px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: absolute;
            bottom: 10px;
            left: 6px;
            color: #e9f8f6;
            text-align: left;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>

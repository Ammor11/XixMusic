<template>
  <div class="banner_recommend">
    <div class="banner">
      <el-carousel :interval="3000" height="280px">
        <el-carousel-item v-for="item in imgList.banners" :key="item">
          <div
            class="imgbg"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <img :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="recommend">
      <div class="daily_songs">
        <h3>每日推荐</h3>
        <div class="dailySongs_wrap">
          <div class="dailySongs_left">每日30首</div>
          <div class="dailySongs_right">FM</div>
        </div>
      </div>
      <div class="daily_song_list">
        <h3>推荐歌单</h3>
        <div class="dailySongList_wrap">
          <div class="SongList_item" v-for="item in 18" :key="item">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="daily_mv">
        <h3>推荐MV</h3>
        <div class="dailyMv_wrap">
          <div class="Mv_item" v-for="item in 8" :key="item">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { _getBanner } from "@/api/search";
let imgList = reactive({
  banners: [],
});
const getBanner = async () => {
  const res = await _getBanner(0);
  imgList.banners = res.banners;
};
getBanner();
</script>
<style lang="scss" scoped>
.banner_recommend {
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .banner {
    height: 280px;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 15px;
    overflow: hidden;
    .el-carousel {
      width: 100%;
      height: 100%;
      .el-carousel__item {
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
        img {
          height: 280px;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
        }
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
          line-height: 150px;
          text-align: center;
          border-radius: 10px;
          width: 45%;
          background: #ddd;
        }
      }
    }
    .daily_song_list {
      .dailySongList_wrap {
        width: 100%;
        padding: 20px 40px;
        display: flex;
        flex-wrap: wrap;
        .SongList_item {
          width: 170px;
          height: 170px;
          background-color: #acc5f8;
          border-radius: 10px;
          margin: 20px 45px;
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
          width: 300px;
          height: 200px;
          border-radius: 10px;
          background-color: #e9f8f6;
          margin: 20px 45px;
        }
      }
    }
  }
}
</style>

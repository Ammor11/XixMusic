<template>
  <div class="banner_recommend">
    <div class="banner">
      <el-carousel :interval="3000" height="18rem">
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
          <div class="dailySongs_left"></div>
          <div class="dailySongs_right"></div>
        </div>
      </div>
      <div class="daily_song_list">
        <h3>推荐歌单</h3>
      </div>
      <div class="daily_mv">
        <h3>推荐MV</h3>
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
  const res = await _getBanner({ type: 0 });
  imgList.banners = res.banners;
  console.log(imgList);
};
getBanner();
</script>
<style lang="scss" scoped>
.banner_recommend {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .banner {
    height: 18rem;
    box-sizing: border-box;
    text-align: center;
    border-radius: 0.5rem;
    overflow: hidden;
    margin: 1rem 0;
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
          background-size: 100%;
          filter: blur(8px);
        }
        img {
          height: 18rem;
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
    flex: 1;
    box-sizing: border-box;
    & > div {
      margin-bottom: 1rem;
      & > h3 {
        text-align: left;
        padding-left: 1rem;
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
    }
    .daily_songs {
      .dailySongs_wrap {
        display: flex;
        justify-content: space-around;
        & > div {
          height: 10rem;
          border-radius: 0.5rem;
          width: 46rem;
          background: #ddd;
        }
      }
    }
  }
}
</style>

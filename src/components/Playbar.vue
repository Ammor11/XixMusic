<template>
  <div class="playbar" ref="playbar">
    <div class="blurbg"></div>
    <div class="bar">
      <div class="left">
        <img
          src="https://p2.music.126.net/9GAbSb_hlXPu66HWInJOww==/109951162846052486.jpg"
          alt=""
        />
        <div class="songinfo">
          <p class="song_name">歌曲名</p>
          <p class="singer">歌手名</p>
        </div>
      </div>
      <div class="center">
        <div class="top">
          <i class="iconfont icon-prev"></i>
          <div><i class="iconfont icon-play"></i></div>
          <i class="iconfont icon-next"></i>
        </div>
        <div class="bottom">
          <div class="progressbg"></div>
          <div class="progressbar"></div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <button class="btn" @click="retract">收起</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const playbar = ref(null) as any;
let flag = ref(false);
const retract = () => {
  flag.value = !flag.value;
  if (!flag.value) {
    playbar.value.style.bottom = "-80px";
  } else {
    playbar.value.style.bottom = "0";
  }
};
</script>
<style lang="scss" scoped>
.playbar {
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: -80px;
  z-index: 10;
  transition: all 0.3s;

  .btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background-color: #409eff;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: -15px;
    z-index: 100;
  }

  .blurbg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: rgba($color: #409eff, $alpha: 0.2);
    backdrop-filter: blur(8px);
  }

  .bar {
    width: 100%;
    height: 80px;
    position: absolute;
    top: 0;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      padding: 0 80px;
      width: 340px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 8px;
      }
      .songinfo {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 5px;
        .song_name {
          font-size: 16px;
        }
        .singer {
          font-size: 12px;
        }
      }
    }
    .center {
      display: flex;
      flex-direction: column;
      width: 800px;
      height: 100%;
      align-items: center;
      .top {
        margin: 10px 0;
        display: flex;
        align-items: center;
        i {
          cursor: pointer;
          color: #fff;
        }
        & > div {
          width: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 20px;
          background-color: #409eff;
          padding-left: 4px;
          cursor: pointer;
          margin: 0 30px;
        }
      }
      .bottom {
        margin-top: 4px;
        .progressbg {
          width: 800px;
          height: 2px;
          background-color: rgba($color: #000, $alpha: 0.7);
        }
      }
    }
    .right {
      width: 350px;
      height: 100%;
      background-color: #96c8f2;
    }
  }
}
</style>

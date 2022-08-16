<template>
  <div class="playbar" ref="playbar">
    <audio
      controls
      @timeupdate="AudioTimeUpdate"
      :src="store.audioUrl"
      ref="audio"
    ></audio>
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
        <div class="control">
          <i class="iconfont icon-prev"></i>
          <div @click="playAudio">
            <i
              ref="playbtn"
              class="iconfont"
              :class="{ 'icon-suspend': flag, 'icon-play': !flag }"
            ></i>
          </div>
          <i class="iconfont icon-next"></i>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="progressbar">
      <div class="bargb"></div>
      <div :style="{ width: barLenght }" class="activebar"></div>
      <i class="iconfont icon-point" :style="{ left: pointPosition }"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "../store";
let store = useStore();

const audio = ref(null) as any;
const playbtn = ref(null) as any;
let flag = ref(false);
let barLenght = ref("0");
let pointPosition = ref("-1.1%");

// 播放暂停
const playAudio = () => {
  console.log(audio.value);
  if (flag.value) {
    audio.value.pause();
    flag.value = !flag.value;
  } else {
    audio.value.play();
    flag.value = !flag.value;
  }
};

// 进度条
const AudioTimeUpdate = () => {
  // 获取音频总时长
  let durTime = audio.value.duration.toFixed(0);
  // 获取音频当前播放时间
  let curTime = audio.value.currentTime.toFixed(0);
  // 进度条长度
  barLenght.value = ((curTime / durTime) * 100).toFixed(2) + "%";
  pointPosition.value =
    Number(((curTime / durTime) * 100).toFixed(2)) - 1 + "%";
  if (durTime == curTime) {
    playbtn.value.classList.remove("icon-suspend");
    playbtn.value.classList.add("icon-play");
    flag.value = !flag.value;
  }
};
</script>
<style lang="scss" scoped>
.playbar {
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0px;
  z-index: 10;
  audio {
    position: absolute;
    top: 4px;
    z-index: 10001;
  }

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
      width: 800px;
      height: 100%;
      align-items: center;
      justify-content: center;
      .control {
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
          cursor: pointer;
          margin: 0 30px;
          .icon-play {
            padding-left: 2px;
          }
        }
      }
    }
    .right {
      width: 350px;
      height: 100%;
      background-color: #96c8f2;
    }
  }
  .progressbar {
    width: 100%;
    position: absolute;
    z-index: 1000;
    .bargb {
      width: 100%;
      height: 2px;
      background-color: #ddd;
    }
    .activebar {
      position: absolute;
      top: 0;
      left: 0;
      height: 2px;
      background-color: #409eff;
    }
    .icon-point {
      color: #409eff;
      position: absolute;
      top: -15px;
      font-size: 32px;
      cursor: pointer;
    }
  }
}
</style>

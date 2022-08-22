<template>
  <div class="playbar" ref="playbar">
    <audio
      controls
      @timeupdate="AudioTimeUpdate"
      :src="store.audioUrl"
      ref="audio"
      id="audio"
    ></audio>
    <div class="blurbg"></div>
    <div class="bar">
      <div class="left">
        <img :src="store.playBarData.picUrl" alt="" />
        <div class="songinfo">
          <p class="song_name">{{ store.playBarData.name }}</p>
          <p class="singer">{{ store.playBarData.arName }}</p>
        </div>
      </div>
      <div class="center">
        <div class="control">
          <i class="iconfont icon-prev"></i>
          <div @click="playAudio">
            <i
              ref="playbtn"
              class="iconfont"
              :class="{ 'icon-suspend': store.flag, 'icon-play': !store.flag }"
            ></i>
          </div>
          <i class="iconfont icon-next"></i>
        </div>
      </div>
      <div class="right">
        <div class="playlist">
          <i class="iconfont icon-playlist"></i>
        </div>
        <div class="loop">
          <i class="iconfont icon-listplay"></i>
        </div>
        <div class="volume">
          <i
            class="iconfont"
            :class="{ 'icon-volume': !ismuted, 'icon-mute': ismuted }"
            @click="mute"
          ></i>
          <div class="volume_wrap">
            <div class="volumebg"></div>
            <div class="volumebar"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="progressbar"
      ref="progressbar"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
    >
      <div class="bargb" ref="bargb"></div>
      <div :style="{ width: barLenght }" class="activebar"></div>
      <i class="iconfont icon-point" :style="{ left: pointPosition }"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "../store";
let store = useStore();

const audio = ref(null) as any;
const playbtn = ref(null) as any;
const bargb = ref(null) as any;
const progressbar = ref(null) as any;
let barLenght = ref("0");
let pointPosition = ref("-0.5%");
let ismuted = ref(false);

// 播放暂停
const playAudio = () => {
  if (store.flag) {
    audio.value.pause();
    store.changeFlage();
  } else {
    audio.value.play();
    store.changeFlage();
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
    Number(((curTime / durTime) * 100).toFixed(2)) - 0.5 + "%";
  if (durTime == curTime) {
    store.changeFlage();
  }
};
// 观察到audio.src属性变化后立即播放
onMounted(() => {
  const config = { attributes: true };
  const callback = () => {
    audio.value.play();
    if (!store.flag) {
      store.changeFlage();
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(audio.value, config);
});
// 静音
const mute = () => {
  if (!audio.value.muted) {
    ismuted.value = !ismuted.value;
    audio.value.muted = true;
  } else {
    ismuted.value = !ismuted.value;
    audio.value.muted = false;
  }
};

// 点击、拖拽进度条
const mouseDown = (e: any) => {
  // 点击更新进度
  e.stopPropagation();
  if (audio.value.currentTime == 0) {
    audio.value.currentTime =
      audio.value.duration * (e.offsetX / bargb.value.offsetWidth);
    audio.value.play();
    store.changeFlage();
  }
  audio.value.currentTime =
    audio.value.duration * (e.offsetX / bargb.value.offsetWidth);
  console.log(e);
  // 拖拽更新进度
  progressbar.value.addEventListener("mousemove", (event: any) => {
    audio.value.currentTime =
      audio.value.duration * (event.offsetX / bargb.value.offsetWidth);
  });
};
const mouseUp = () => {
  progressbar.value.removeEventListener("mousemove", (event: any) => {
    audio.value.currentTime =
      audio.value.duration * (event.offsetX / bargb.value.offsetWidth);
  });
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
    display: none;
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
      width: 380px;
      align-items: center;
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
        height: 60px;
        .song_name {
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .singer {
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      color: #fff;
      i {
        cursor: pointer;
      }
      .volume {
        display: flex;
        align-items: center;
        .volume_wrap {
          margin-left: 5px;
          position: relative;
          .volumebg {
            height: 4px;
            border-radius: 2px;
            width: 70px;
            background-color: #999;
          }
          .volumebar {
            position: absolute;
            top: 0;
            height: 4px;
            border-radius: 2px;
            width: 33px;
            background-color: #000;
          }
        }
      }
    }
  }
  .progressbar {
    width: 100%;
    position: absolute;
    z-index: 1000;
    cursor: pointer;
    height: 10px;
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
      top: -6px;
      font-size: 1px;
      cursor: pointer;
    }
  }
}
</style>

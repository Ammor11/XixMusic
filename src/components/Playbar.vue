<template>
  <div class="playbar" ref="playbar">
    <audio
      controls
      :src="store.audioUrl"
      ref="audioDom"
      @play="onPlay"
      @pause="onPause"
      @loadedmetadata="onLoadedmtadata"
      @timeupdate="onTimeupdate"
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
          <div @click="playAndPause">
            <i
              ref="playbtn"
              class="iconfont"
              :class="{
                'icon-suspend': audioOption.playing,
                'icon-play': !audioOption.playing,
              }"
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
            :class="{
              'icon-volume': !audioOption.muted,
              'icon-mute': audioOption.muted,
            }"
            @click="mute"
          ></i>
          <div class="volumeBar">
            <el-slider
              v-model="audioOption.volume"
              :show-tooltip="false"
              :max="100"
              @change="changeVolume"
              @mouseup="onMonseuoVolumeUpdate"
            ></el-slider>
          </div>
        </div>
      </div>
    </div>
    <div class="progressBar">
      <el-slider
        v-model="audioOption.currentTime"
        :show-tooltip="true"
        :max="audioOption.maxTime"
        @change="progressChange($event)"
        @mouseup="onMouseupTimeupdate"
        :format-tooltip="realFormatSecond"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useStore } from "../store";
let store = useStore();

interface IAudio {
  playing: boolean;
  muted: boolean;
  currentTime: number;
  volume: number;
  maxTime: number;
}

const audioOption: IAudio = reactive({
  playing: false,
  muted: false,
  currentTime: 0,
  volume: 100,
  maxTime: 0,
});

// ??????????????????
let cacheCurrent = 0;

const audioDom = ref(null as unknown as HTMLAudioElement);
const playbtn = ref(null as unknown as HTMLButtonElement);

// ??????
const play = (): void => {
  audioDom.value.play();
};

// ??????
const pause = (): void => {
  audioDom.value.pause();
};

// ?????????????????????
const playAndPause = () => {
  if (audioOption.playing) {
    pause();
  } else {
    play();
  }
};

// ???????????????
const onPlay = (): void => {
  audioOption.playing = true;
};

// ???????????????
const onPause = (): void => {
  audioOption.playing = false;
};

// ????????????????????????????????????
const onLoadedmtadata = (e: any): void => {
  audioOption.maxTime = parseInt(e.target.duration);
};

// ???????????????????????????
const onTimeupdate = (e: any): void => {
  audioOption.currentTime = e.target.currentTime;
};

// ??????????????????tooltip????????????
const realFormatSecond = (second: any): string => {
  cacheCurrent = second;
  const secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "00:00";
  }
};

// ????????????????????????
const progressChange = (value: any): void => {
  audioDom.value.currentTime = value >= 0 ? value : cacheCurrent;
  audioOption.currentTime = value >= 0 ? value : cacheCurrent;
};

// ?????????????????????????????????????????????????????????progressChange????????????????????????
const onMouseupTimeupdate = () => {
  progressChange(cacheCurrent);
};

// ?????????audio.src???????????????????????????
onMounted(() => {
  const config = { attributes: true };
  const callback = () => {
    audioDom.value.play();
  };
  const observer = new MutationObserver(callback);
  observer.observe(audioDom.value, config);
});

// ??????
const changeVolume = () => {
  audioOption.muted = false;
  audioDom.value.muted = false;
  audioDom.value.volume = audioOption.volume / 100;
};
const onMonseuoVolumeUpdate = () => {
  changeVolume();
};

// ??????
const mute = () => {
  if (!audioOption.muted) {
    audioOption.muted = !audioOption.muted;
    audioDom.value.muted = true;
    audioOption.volume = 0;
  } else {
    audioOption.muted = !audioOption.muted;
    audioDom.value.muted = false;
    audioOption.volume = audioDom.value.volume * 100;
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
        .volumeBar {
          margin-left: 15px;
          position: relative;
          :deep(.el-slider) {
            width: 80px;
            .el-slider__runway {
              height: 4px;
              .el-slider__bar {
                height: 4px;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
              }
              .el-slider__button-wrapper {
                &:hover {
                  cursor: pointer;
                }
                .el-slider__button {
                  display: none;
                  width: 10px;
                  height: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
  .progressBar {
    width: 100%;
    position: absolute;
    top: -14px;
    z-index: 2000;
    margin: 0 auto;
    display: flex;
    align-items: center;
    :deep(.el-slider) {
      .el-slider__runway {
        height: 4px;
        .el-slider__bar {
          height: 4px;
        }
        .el-slider__button-wrapper {
          top: -16px;
          .el-slider__button {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
}
</style>

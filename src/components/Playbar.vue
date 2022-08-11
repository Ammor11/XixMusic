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
          <p class="song_name"></p>
          <p class="singer"></p>
        </div>
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    <button class="btn" @click="retract">收起</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const playbar = ref(null);
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
    background-color: #d998c2;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: -15px;
  }

  .blurbg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: rgba($color: #fff, $alpha: 0.5);
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
    .left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 6px;
      }
    }
  }
}
</style>

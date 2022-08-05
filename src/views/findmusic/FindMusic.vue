<template>
  <div class="findmusic">
    <div class="search">
      <button class="open">&lt;</button>
    </div>
    <component :is="currentCom"></component>
  </div>
</template>

<script setup lang="ts">
import { markRaw, reactive } from "vue";
import BannerRecommend from "./BannerRecommend.vue";
import MusicList from "./MusicList.vue";

interface tabType {
  name: string;
  tabComp: any;
}
let index = 0;
const comData = reactive<tabType[]>([
  {
    name: "BannerRecommend组件",
    tabComp: markRaw(BannerRecommend),
  },
  {
    name: "MusicList组件",
    tabComp: markRaw(MusicList),
  },
]);
let currentCom = comData[index].tabComp;
</script>
<style lang="scss" scoped>
.findmusic {
  display: flex;
  flex-direction: column;
  flex: 1;
  .search {
    height: 4rem;
    box-sizing: border-box;
    background-color: rgba($color: #000000, $alpha: 0.5);
    position: relative;
    .open {
      background-color: #fff;
      width: 2rem;
      height: 2rem;
      border: none;
      border-radius: 50%;
      position: absolute;
      left: -1%;
      top: 25%;
      cursor: pointer;
    }
  }
}
</style>

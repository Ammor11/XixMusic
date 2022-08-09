<template>
  <div class="findmusic">
    <div class="search_wrap">
      <div class="search">
        <input v-model="keywords" type="text" placeholder="歌名/歌手/歌单" />
        <i class="iconfont icon-search" @click="search"></i>
      </div>
      <div class="theme">
        <i class="iconfont icon-theme"></i>
      </div>
    </div>
    <component :is="currentCom"></component>
  </div>
</template>

<script setup lang="ts">
import { markRaw, reactive, onMounted, ref } from "vue";
import BannerRecommend from "./BannerRecommend.vue";
import MusicList from "./MusicList.vue";
import { _searchMusic } from "@/api/search";

interface tabType {
  name: string;
  tabComp: any;
}

let keywords = ref("");
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
// 根据index动态修改component渲染的组件
let currentCom = comData[index].tabComp;

const search = async () => {
  if (keywords.value) {
    const res = await _searchMusic({ keywords: keywords.value });
    console.log(res);
  }
};

const enterSearch = (e: { keyCode: number }) => {
  if (e.keyCode == 13) {
    search();
  }
};

onMounted(() => {
  window.addEventListener("keydown", enterSearch);
});
</script>
<style lang="scss" scoped>
.findmusic {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  .search_wrap {
    height: 4rem;
    box-sizing: border-box;
    background-color: rgba($color: #000000, $alpha: 0.5);
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .search {
      background-color: #ccc;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 1.2rem;
      display: flex;
      align-items: center;
      transition: all 1s;
      overflow: hidden;
      position: relative;
      &:hover {
        width: 19rem;
      }
      &:hover .icon-search {
        left: 17rem;
      }
      &:hover input {
        width: 15rem;
      }
      .icon-search {
        font-size: 1.5rem;
        color: #895efa;
        cursor: pointer;
        position: absolute;
        left: 0.45rem;
        transition: all 1s;
      }
      input {
        left: 0;
        width: 0;
        background-color: #ccc;
        border: none;
        font-size: 1.2rem;
        margin-left: 0.5rem;
        outline: none;
        padding-left: 0.6rem;
        transition: all 1s;
        color: #080808;
      }
    }
    .theme {
      background-color: #ccc;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-theme {
        font-size: 1.5rem;
        color: #895efa;
        cursor: pointer;
      }
    }
  }
}
</style>

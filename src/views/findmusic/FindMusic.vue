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
let index = ref(1);
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
let currentCom = comData[index.value].tabComp;

const search = async () => {
  if (keywords.value) {
    const res = await _searchMusic(keywords.value);
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  .search_wrap {
    height: 60px;
    background-color: rgba($color: #dce3eb, $alpha: 0.5);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    margin-bottom: 15px;
    .search {
      background-color: #cfb2da;
      width: 38px;
      height: 38px;
      border-radius: 19px;
      display: flex;
      align-items: center;
      transition: all 1s;
      overflow: hidden;
      position: relative;
      &:hover {
        width: 300px;
      }
      &:hover .icon-search {
        left: 270px;
      }
      &:hover input {
        width: 240px;
      }
      .icon-search {
        font-size: 22px;
        color: #895efa;
        cursor: pointer;
        position: absolute;
        left: 8px;
        transition: all 1s;
      }
      input {
        left: 0;
        width: 0;
        background-color: #cfb2da;
        border: none;
        font-size: 22px;
        margin-left: 10px;
        outline: none;
        padding-left: 10px;
        transition: all 1s;
        color: #080808;
      }
    }
    .theme {
      background-color: #cfb2da;
      width: 38px;
      height: 38px;
      border-radius: 19px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-theme {
        font-size: 22px;
        color: #895efa;
        cursor: pointer;
      }
    }
  }
}
</style>

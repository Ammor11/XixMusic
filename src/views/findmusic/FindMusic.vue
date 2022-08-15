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
    <span class="back" @click="Back" ref="back">返回</span>
    <component :is="currentCom.tabComp" :songsData="songsData.data"></component>
  </div>
</template>

<script setup lang="ts">
import { markRaw, reactive, onMounted, ref } from "vue";
import BannerRecommend from "./BannerRecommend.vue";
import MusicList from "./MusicList.vue";
import { _searchMusic, _getSongs } from "@/api/search";

interface tabType {
  name: string;
  tabComp: any;
}

let keywords = ref("");
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

let currentCom = reactive({
  tabComp: comData[0].tabComp,
});

const back = ref(null) as any;
let songsData = reactive({
  data: [],
});

const search = async () => {
  if (keywords.value) {
    // 搜索歌曲
    const res = await _searchMusic({ keywords: keywords.value, limit: 20 });
    let songList = res.result.songs;
    const ids = songList.map((item: any) => item.id);
    // 使用歌曲id获取歌曲详情
    const response = await _getSongs(ids.toString());
    songsData.data = response.songs.map((item: any) => {
      return {
        name: item.name,
        id: item.id,
        dt: item.dt,
        fee: item.fee,
        arName: item.ar[0].name,
        alName: item.al.name,
      };
    });

    currentCom.tabComp = comData[1].tabComp;
    back.value.style.display = "block";
  }
};

const enterSearch = (e: { keyCode: number }) => {
  if (e.keyCode == 13) {
    search();
  }
};

const Back = () => {
  currentCom.tabComp = comData[0].tabComp;
  back.value.style.display = "none";
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
  position: relative;
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
      background-color: #9acdff;
      width: 300px;
      height: 38px;
      border-radius: 19px;
      display: flex;
      align-items: center;
      overflow: hidden;
      position: relative;
      .icon-search {
        font-size: 22px;
        color: #409eff;
        cursor: pointer;
        position: absolute;
        left: 270px;
        transition: all 1s;
      }
      input {
        left: 0;
        width: 240;
        background-color: #9acdff;
        border: none;
        font-size: 22px;
        margin-left: 10px;
        outline: none;
        padding-left: 10px;
        transition: all 1s;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #ddd;
        }
      }
    }
    .theme {
      background-color: #9acdff;
      width: 38px;
      height: 38px;
      border-radius: 19px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-theme {
        font-size: 22px;
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .back {
    position: absolute;
    top: 104px;
    left: 30px;
    cursor: pointer;
    display: none;
    z-index: 10;
    &:hover {
      border-bottom: 1px solid #000;
    }
  }
}
</style>

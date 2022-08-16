<template>
  <div class="search_list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="first">
        <ul class="song_list">
          <li class="songs" v-for="(item, index) in songsData" :key="index">
            <div class="left">
              <i class="iconfont icon-play" @click="playMusic(item.id)"></i>
              <div class="songname" :title="item.name">{{ item.name }}</div>
            </div>
            <div class="center">
              <div class="icon">
                <i class="iconfont icon-addlist isshow"></i>
                <i class="iconfont icon-Collection isshow"></i>
              </div>
              <div class="singer">{{ item.arName }}</div>
            </div>
            <div class="right">
              <div class="album" :title="item.alName">
                {{ item.alName }}
              </div>
              <div class="dt">{{ date(item.dt) }}</div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
      <el-tab-pane label="歌手" name="third">歌手</el-tab-pane>
      <el-tab-pane label="MV" name="fourth">MV</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType } from "vue";
import { useStore } from "../../store";
import { _getSongUrl } from "@/api/search";
const store = useStore();
const activeName = ref("first");
const handleClick = () => {
  1 - 1;
};
interface songsProps {
  alName: string;
  arName: string;
  dt: number;
  fee: number;
  id: number;
  name: string;
}

const date = (data: number) => {
  let m = Math.floor(Number((data / 1000).toFixed(0)) / 60) + "";
  let s = String(Number((data / 1000).toFixed(0)) % 60);
  if (m.length < 2) {
    m = "0" + m;
    if (s.length < 2) {
      s = "0" + s;
    }
  }
  return m + ":" + s;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  songsData: {
    type: Array as PropType<songsProps[]>,
    default: () => {
      return [];
    },
  },
});

const playMusic = async (id: number) => {
  const res = await _getSongUrl(id);
  store.changeMusicUrl(res.data[0].url);
};
</script>

<style lang="scss" scoped>
.search_list {
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  ::v-deep(.el-tabs) {
    .el-tabs__nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .el-tabs__item {
        padding: 0;
        font-size: 22px;
        font-weight: bold;
      }
    }
    .el-tabs__content {
      padding: 30px;
      .song_list {
        .songs {
          width: 100%;
          height: 56px;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          &:nth-child(2n) {
            background-color: #ddd;
            border: 2px solid #ddd;
          }
          &:nth-child(2n-1) {
            background-color: rgb(231, 231, 231);
            border: 2px solid rgb(231, 231, 231);
          }
          &:hover {
            background-color: #409eff;
            border: 2px solid #9acdff;
          }
          .left {
            display: flex;
            align-items: center;
            width: 130px;
            .songname {
              width: 140px;
              margin-left: 10px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .icon-play {
              color: #b7bab3;
              cursor: pointer;
            }
          }
          .center {
            display: flex;
            width: 180px;
            .icon {
              width: 72px;
              i {
                margin: 0 10px;
                cursor: pointer;
              }
            }

            .singer {
              width: 100px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .right {
            display: flex;
            .album {
              width: 150px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .dt {
              width: 100px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>

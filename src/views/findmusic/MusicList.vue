<template>
  <div class="musiclist">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="first">单曲</el-tab-pane>
      <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
      <el-tab-pane label="歌手" name="third">歌手</el-tab-pane>
      <el-tab-pane label="MV" name="fourth">MV</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeName = ref("second");
const handleClick = (tab: any, event: any) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped>
.musiclist {
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  ::v-deep .el-tabs__nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .el-tabs__item {
      padding: 0;
      font-size: 22px;
      font-weight: bold;
    }
  }
}
</style>

<template>
  <div class="musiclist">音乐列表</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.musiclist {
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  box-sizing: border-box;
  border: 1px solid #f60;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

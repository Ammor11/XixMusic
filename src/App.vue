<template>
  <div class="xixmusic">
    <AsideNav></AsideNav>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import AsideNav from "./components/AsideNav.vue";
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
.xixmusic {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>

<template>
  <div class="xixmusic">
    <AsideNav></AsideNav>
    <LoginModal></LoginModal>
    <PlayBar></PlayBar>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import AsideNav from "./components/AsideNav.vue";
import LoginModal from "./components/LoginModal.vue";
import PlayBar from "./components/Playbar.vue";
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
  position: relative;
  overflow: hidden;
}
</style>

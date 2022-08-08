<template>
  <div class="banner_recommend">
    <div class="banner">banner</div>
    <div class="recommend">推荐</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { _getBanner } from "@/api/search";
onMounted(async () => {
  const res = await _getBanner(0);
  console.log(res);
});
</script>
<style lang="scss" scoped>
.banner_recommend {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .banner {
    line-height: 18rem;
    box-sizing: border-box;
    border: 1px solid #f60;
    text-align: center;
  }
  .recommend {
    text-align: center;
    flex: 1;
    box-sizing: border-box;
    border: 1px solid #f60;
  }
}
</style>

<template>
  <div class="aside">
    <div class="logo">
      <router-link to="/findmusic">
        <img src="../assets/general-mills-logo.svg" />
      </router-link>
    </div>
    <div class="avatar">
      <div class="avatar_box">
        <img src="../assets/default_avatar.jpg" />
      </div>
      <span>{{ nickname }}</span>
    </div>
    <div class="nav">
      <ul class="nav_list">
        <li v-for="(item, index) in headTitle" :key="index">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
interface ITitle {
  title: string;
  path: string;
}

let nickname = ref("登录");

const headTitle: ITitle[] = [
  { title: "发现音乐", path: "/findmusic" },
  { title: "我的音乐", path: "/mymusic" },
  { title: "排行榜", path: "/rank" },
  { title: "歌单", path: "/playlist" },
  { title: "MV", path: "/mv" },
];
</script>

<style lang="scss">
.aside {
  background-image: linear-gradient(to top, #df89b5 0%, #bfd9fe 100%);
  height: 100%;
  width: 240px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .logo {
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #c20c0c;
      img {
        width: 3rem;
      }
    }
  }
  .avatar {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .avatar_box {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      margin-bottom: 0.5rem;
      img {
        width: 3rem;
      }
    }
    span {
      color: #fff;
      font-size: 0.8rem;
    }
  }
  .nav {
    flex: 1;
    display: flex;
    justify-content: center;
    padding-top: 3rem;
    ul {
      text-align: left;
      width: 100%;
      li {
        margin-bottom: 1.5rem;
        font-weight: bold;
        padding-left: 5rem;
        line-height: 1.5rem;
      }
    }
  }
}
.redbar {
  height: 5px;
  background-color: #c20c0c;
}
</style>

<template>
  <div class="aside">
    <button class="open"><i class="iconfont icon-left"></i></button>
    <div class="logo">
      <router-link to="/findmusic">
        <img src="../assets/imgs/general-mills-logo.svg" />
      </router-link>
    </div>
    <div class="avatar">
      <div class="avatar_box">
        <img src="../assets/imgs/default_avatar.jpg" />
      </div>
      <span>{{ nickname }}</span>
    </div>
    <div class="nav">
      <ul class="nav_list">
        <li v-for="(item, index) in headTitle" :key="index">
          <div>
            <router-link :to="item.path"
              ><i class="iconfont" :class="item.icon"></i
              >{{ item.title }}</router-link
            >
          </div>
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
  icon: string;
}

let nickname = ref("登录");

const headTitle: ITitle[] = [
  { title: "发现音乐", path: "/findmusic", icon: "icon-findmusic" },
  { title: "我的音乐", path: "/mymusic", icon: "icon-mymusic" },
  { title: "排行榜", path: "/rank", icon: "icon-rank" },
  { title: "歌单", path: "/playlist", icon: "icon-playlist" },
  { title: "MV", path: "/mv", icon: "icon-MV" },
];
</script>

<style lang="scss">
.aside {
  height: 100%;
  width: 240px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  .open {
    background-color: #dffffe;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    position: absolute;
    right: -15px;
    top: 2%;
    cursor: pointer;
  }
  .logo {
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
    }
  }
  .avatar {
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .avatar_box {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      margin-bottom: 10px;
      img {
        width: 50px;
      }
    }
    span {
      color: #000;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .nav {
    flex: 1;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    ul {
      text-align: left;
      width: 100%;
      li {
        margin-bottom: 25px;
        font-weight: bold;
        line-height: 25px;
        white-space: nowrap;
        text-align: center;
        display: flex;
        justify-content: center;
        & > div {
          width: 96px;
          text-align: left;
        }
        i {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>

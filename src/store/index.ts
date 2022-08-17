import { defineStore } from "pinia";
import { songsProps } from "../views/findmusic/type";

export const useStore = defineStore("main", {
  state: () => {
    return {
      test: "反悔",
      audioUrl:
        "http://m7.music.126.net/20220816155323/5a6b8436af37a5eae3300b994c04ff5b/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3282529193/24ef/f762/1577/cfb04baef2e114a6c07cfad1d4b12cfc.mp3",
      flag: false,
      playBarData: {},
    };
  },
  getters: {},
  actions: {
    changeMusicUrl(data: string) {
      this.audioUrl = data;
    },
    changeFlage() {
      this.flag = !this.flag;
    },
    getPlayBarData(data: songsProps) {
      this.playBarData = data;
    },
  },
});

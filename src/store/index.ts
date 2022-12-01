import { defineStore } from "pinia";
import { songsProps } from "../views/findmusic/type";

export const useStore = defineStore("main", {
  state: () => {
    return {
      audioUrl:
        "http://m7.music.126.net/20221201173039/e3fa5e52e07418a137f5bb6c2c662d76/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/14055246477/d6dc/88a0/0afc/9bc118434db8d09e4c178260fb823ef2.mp3",
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

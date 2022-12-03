import { defineStore } from "pinia";
import { songsProps } from "../views/findmusic/type";
import { IStore } from "./type";

export const useStore = defineStore("main", {
  state: (): IStore => {
    return {
      audioUrl:
        "http://m8.music.126.net/20221203142929/639970d61113d4a2c2273a0bca1423c6/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/14055246477/d6dc/88a0/0afc/9bc118434db8d09e4c178260fb823ef2.mp3",
      playBarData: {},
    };
  },
  getters: {},
  actions: {
    changeMusicUrl(data: string) {
      this.audioUrl = data;
    },
    getPlayBarData(data: songsProps) {
      this.playBarData = data;
    },
  },
});

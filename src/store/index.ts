import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      test: "反悔",
      songs: [1, 2, 3],
    };
  },
  getters: {},
  actions: {
    getDailySongs(data) {
      this.songs = data;
    },
  },
});

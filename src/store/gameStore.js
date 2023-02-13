import { defineStore } from 'pinia'
import axios from 'axios'

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      showModal: false
    };
  },
  actions: {
    changeModal() {
        this.showModal = !this.showModal;
    }
  }
});

import { defineStore } from 'pinia'
import axios from 'axios'

export const dexStore = defineStore("pokedex", {
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

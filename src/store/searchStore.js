import { defineStore } from 'pinia'
import axios from 'axios'

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      showModal: false,
      value: ""
    };
  },
  actions: {
    changeModal() {
        this.showModal = !this.showModal;
    }
  }
});

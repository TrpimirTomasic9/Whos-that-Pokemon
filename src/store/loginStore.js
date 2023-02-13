import { defineStore } from 'pinia'
import axios from 'axios'

export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      showModal: false,
      loggedIn: ""
    };
  },
  actions: {
    changeModal() {
        this.showModal = !this.showModal;
    }
  }
});
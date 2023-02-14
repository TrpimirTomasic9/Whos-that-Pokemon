import { defineStore } from 'pinia'
import axios from 'axios'
import VueCookies from 'vue-cookies'

export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      showModal: false,
      loggedIn: false
    };
  },
  actions: {
    changeModal() {
        this.showModal = !this.showModal;
    },
    logOut() {
      VueCookies.remove('user')
      window.location.href = '/';
      this.loggedIn = false
    },
    checkCookie(){
      let cookie = VueCookies.get('user')
      if (cookie)
      {
        this.loggedIn = true
      }
    }
  }
});
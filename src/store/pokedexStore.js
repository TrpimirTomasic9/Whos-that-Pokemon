import { defineStore } from 'pinia'
import axios from 'axios'
import VueCookies from 'vue-cookies'

var baseURL = 'http://localhost:3000/'

export const usePokedexStore = defineStore("pokedex", {
  state: () => {
    return {
      showModal: false,
      userPokedex: [],
      favourites: []
    };
  },
  actions: {
    changeModal() {
        this.showModal = !this.showModal;
    },
    async getUserPokedex() {
      let cookie = VueCookies.get('user');
      if (cookie) {
        this.userPokedex = await axios.get(baseURL + 'users/'+ cookie.id).then(response => response.data.user_pokedex)
      }
    },
    async setUserPokedex() {
      let cookie = VueCookies.get('user');
      if (cookie) {
        await axios.patch(baseURL + 'users/'+ cookie.id, {user_pokedex: this.userPokedex})
      }
    },
    pushPokemon(id) {
      this.userPokedex.push(id)
    },
    async getUserFavourites() {
      let cookie = VueCookies.get('user');
      if (cookie) {
        this.favourites = await axios.get(baseURL + 'users/'+ cookie.id).then(response => response.data.favourites)
      }
    },
    async setUserFavourites() {
      let cookie = VueCookies.get('user');
      if (cookie) {
        await axios.patch(baseURL + 'users/'+ cookie.id, {favourites: this.favourites})
      }
    },
    async favouritePokemon(id) {
      if(this.favourites.includes(id))
      {
        this.favourites = this.favourites.filter(favId => favId!=id)
      }
      else {
        this.favourites.push(id)
      }
      await this.setUserFavourites()
    }
  }
});

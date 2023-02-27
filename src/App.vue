<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Pokedex from './components/Pokedex.vue';
import Login from './components/LogIn.vue'
import Home from './views/Home.vue'
import {usePokedexStore} from './store/pokedexStore.js'
import {useLoginStore} from './store/loginStore.js'
import Game from './components/Game.vue';
import {useGameStore} from './store/gameStore.js'
import axios from 'axios';
import Search from './components/Search.vue';
import VueCookies from 'vue-cookies'
import { useSearchStore } from './store/searchStore';

import { pokeStore } from './store/pokemonStore'
import { ElNotification } from 'element-plus';

const gameStore = useGameStore();
const pokedexStore = usePokedexStore();
const loginStore = useLoginStore();
const searchStore = useSearchStore();
const pokemonStore = pokeStore()

loginStore.checkCookie()
pokedexStore.getUserPokedex()
pokedexStore.getUserFavourites()
pokemonStore.getAllpokemon()

if (loginStore.loggedIn) {
  ElNotification({
    title: 'Successfully logged in',
    message: `Hello ${VueCookies.get('user').username}`,
    type: 'success',
    showClose: false,
    duration: 2500
  })
}
</script>

<template>
  <div>
    <Header />
    <RouterView />
    <Game v-if="gameStore.showModal && !pokedexStore.showModal" />
    <Pokedex v-if="pokedexStore.showModal" />
    <Login v-if="loginStore.showModal" />
    <Search v-show="searchStore.showModal"/>
  </div> 
</template>


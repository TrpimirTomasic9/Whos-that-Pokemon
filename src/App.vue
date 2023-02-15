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

import { pokeStore } from './store/pokemonStore'

const gameStore = useGameStore();
const pokedexStore = usePokedexStore();
const loginStore = useLoginStore();

loginStore.checkCookie()
pokedexStore.getUserPokedex()

const pokemonStore = pokeStore()

pokemonStore.getAllpokemon()
</script>

<template>
  <div>
    <Header />
    <RouterView />
    <Game v-if="gameStore.showModal && !pokedexStore.showModal" />
    <Pokedex v-if="pokedexStore.showModal" />
    <Login v-if="loginStore.showModal" />
  </div> 
</template>


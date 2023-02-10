<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Pokedex from './components/Pokedex.vue';
import Login from './components/LogIn.vue'
import Home from './views/Home.vue'
import {usePokedexStore} from './store/pokedexStore.js'
import {useLoginStore} from './store/loginStore.js'

const pokedexStore = usePokedexStore();
const loginStore = useLoginStore();
</script>

<template>
  <div>
    <Header  />
    <RouterView />
    <Pokedex v-if="pokedexStore.showModal" />
    <Login v-show="loginStore.showModal" />
  </div> 
</template>


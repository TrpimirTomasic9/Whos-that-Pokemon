<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { useLoginStore } from '../store/loginStore';
import { useGameStore } from '../store/gameStore';

const loginStore = useLoginStore();
const gameStore = useGameStore();

const openModal = () => {
  if (loginStore.loggedIn) {
    gameStore.changeModal()
  }
  else {
    loginStore.changeModal()
  }
}
</script>

<template>
  <div class="common-layout">
      <img class="hero" src="src/assets/images/hero-image.jpg"/>
      <div class="hovertext" style="margin:0 auto;"  v-on:click="openModal()">
        <img class="pokemonText" style="height: 150px; width: 350px; margin:0 auto;" src="src/assets/images/pokemon-text.png"/>
        <img class="pokeball" style="height: 250px; width: 250px; margin:0 auto;" src="/src/assets/images/logo.png"/>
      </div>
  </div>
</template>

<style scoped>
.common-layout {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto; 
}
.hero{
  z-index: 0;
  background-size: cover;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  filter: brightness(70%)
}
.pokemonText{
  overflow: hidden; 
  position: absolute;
  left: 0px;
  top: 190px;
  right: 20px;
  display:block;
  height:min-content;
}

.pokeball{
  position: absolute;
  left: 0px;
  top: 340px;
  right: 0;
  display:block;
  height:min-content;
}

.image-box{
  max-height: 90vh;
}

.hovertext {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height:min-content;
}

</style>


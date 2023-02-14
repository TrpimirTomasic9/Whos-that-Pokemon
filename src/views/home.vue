<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { pokeStore } from '../store/pokemonStore'
import { useLoginStore } from '../store/loginStore';

const loginStore = useLoginStore();
const PokemonStore = pokeStore();

</script>

<template>
  <div class="common-layout">
      <img class="hero" src="src/assets/images/hero-image.jpg"/>
      <div v-if="!loginStore.loggedIn" class="hovertext" style="margin:0 auto;">
        <img class="pokemonText" style="height: 150px; width: 350px; margin:0 auto;" src="src/assets/images/pokemon-text.png"/>
        <img class="pokeball" style="height: 250px; width: 250px; margin:0 auto;" src="/src/assets/images/logo.png"/>
      </div>
        <template>
          <div>
        <el-dialog title="game" width="50%" height="50%" center>
          <el-form label-position='top' status-icon ref="ruleFormRef" :label-width="80">
          </el-form>
        </el-dialog>
      </div>
      </template>
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


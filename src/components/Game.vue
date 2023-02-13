<script setup lang="ts">
import { ArrowRight,} from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import axios from 'axios';
import { pokeStore } from '../store/pokemonStore'
import { usePokedexStore } from '../store/pokedexStore';

import { useLoginStore } from '../store/loginStore';
import { useGameStore } from '../store/gameStore';
const PokemonStore = pokeStore();
const pokedexStore = usePokedexStore();

let gameStore = useGameStore()

let correct = ref<boolean>(false)
let inccorect = ref<boolean>(false)
let pokemonName = ref<string>('')
let isLoading = ref<boolean>(true)

let randomPokemon = ref<any>()

async function getRandomPokemon() {
   isLoading.value = true
   correct.value = false
   inccorect.value = false
 try {
   let response = await PokemonStore.getOnePokemon();
   randomPokemon.value = response;
   
   console.log(randomPokemon.value)
   isLoading.value = false
 } catch (error) {
   throw error;
 }
}

getRandomPokemon()

function submitAnswer(){
   pokemonName.value = pokemonName.value.toLowerCase()
   if(pokemonName.value == randomPokemon.value.name){
       inccorect.value = false
       correct.value = true
       pokemonName.value = ''
       setTimeout(function() {
           getRandomPokemon()
       }, 1500);
   } else{
       console.log("Incorrect answer")
       correct.value = false
       inccorect.value = true
       pokemonName.value = ''
   }
}
</script>

<template>
    <el-dialog v-if="!isLoading"  v-model="gameStore.showModal" width="35%" height="50%" center @keyup.enter="submitAnswer" >
        <template #header>
            <img class="whosThatPokeImg" src="/src/assets/images/Whos-that-Pokemon.png" />
        </template>
        <template #default>
            <div class="modalHeader">
                <img :src="randomPokemon.image" width="250" height="250" />
            </div>
            <div class="footer">
                <div class="inputDiv">
                    <input v-model="pokemonName" class="pokeNameInput" onfocus="this.value=''" type="text" placeholder="This pokemon is ..." maxlength="20" minlength="4" />
                </div>
                <div v-if="inccorect" class="incorrect">
                    <el-row justify="center">
                        <span class="incorrectBold">Incorrect answer!</span>
                    </el-row>
                </div>
                <div v-if="correct" class="correct">
                    <el-row justify="center">
                        <span class="correctBold">Correct answer!</span>
                    </el-row>
                </div>
                <span>
                    <el-button id="submitBtn" @click="submitAnswer()" :disabled="!pokemonName.length">Submit</el-button>
                    <el-button id="skipBtn" @click="getRandomPokemon() ">Skip
                        <el-icon class="el-icon--right"><ArrowRight /></el-icon></el-button>
                    <el-button id="pokedexGameBtn" @click="pokedexStore.changeModal()">Pokedex</el-button>
                </span>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.footer{
    text-align: center;
    padding-top: 10px;
}

.pokeNameInput{
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
    width: 57%;
    background-color: transparent;
    text-align: center;
}
.inputDiv{
    padding-bottom: 15px;
}
#skipBtn{
    background-color: #FFD700;
    border: 1.5px solid black;
}
#submitBtn{
    background-color:black;
    border: 1.5px solid black;
    color: yellowgreen;
}
#pokedexGameBtn{
    background-color:whitesmoke;
    border: 1.5px solid black;
}
.modalHeader{
    text-align: center;
}

.el-dialog{
    opacity: 0.8;
}
.whosThatPokeImg{
    width: 100%;
    max-width: 85%;
    text-align: center;
}
.incorrect{
    padding-bottom: 15px;
    color: red;
}
.correct{
    padding-bottom: 15px;
    color: green;
}
.correctBold, .incorrectBold{
    font-weight: bold;
}
</style>
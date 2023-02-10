<script setup lang="ts">
import {Sunny, Moon, ArrowRight,} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from '../router/index'
import axios from 'axios';
import Pokedex from './Pokedex.vue'
import Login from './LogIn.vue'
import { pokeStore } from '../store/store'
const PokemonStore = pokeStore();

const pokedexVisible = ref(false)
const LogInModalVisible = ref(false)
const game = ref(false)

let correct = ref<boolean>(false)
let inccorect = ref<boolean>(false)
let pokemonName = ref<string>('')


const LoggedIn = ref(false)

 let randomPokemon = ref<any>()

 async function getRandomPokemon() {
    correct.value = false
    inccorect.value = false
  try {
    let response = await PokemonStore.getOnePokemon();
    randomPokemon.value = response;
    
    console.log(randomPokemon.value)
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
        }, 3000);
    } else{
        console.log("Incorrect answer")
        correct.value = false
        inccorect.value = true
        pokemonName.value = ''
    }
}



</script>

<template>
    <el-header class="navbar">
        <div class="navbar-content">
            <div>
                <router-link to="/" custom v-slot="{ navigate }">
                <img @click="navigate" role="link" class="logo" src="/src/assets/images/logo.png" />
            </router-link>
            </div>
            <el-space size="large">
                <div>
                    <input class="search" type="text" placeholder="Search pokemon" />
                </div>
                <div>
                    <el-button link><el-icon :size="20">
                            <Moon />
                        </el-icon></el-button>
                    <el-button link><el-icon :size="20">
                            <Sunny />
                        </el-icon></el-button>
                </div>
                <div>
                    <el-button  @click="router.push('pokedex')" link><img class="pokedex" src="/src/assets/images/pokedex.png" /></el-button>
                </div>
                <div>
                    <el-button @click="game = true" link><img class="game" src="/src/assets/images/joystick.png" /></el-button>
                </div>
                <div>
                    <el-button @click="router.push('login')">LogIn</el-button>
                </div>
            </el-space>
        </div>
    </el-header>
    <div>
        <el-dialog v-model="game" width="35%" height="50%" center @keyup.enter="submitAnswer" >
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
                        <el-button id="skipBtn" @click="LogInModalVisible = false; getRandomPokemon() ">Skip
                            <el-icon class="el-icon--right"><ArrowRight /></el-icon></el-button>
                        <el-button id="pokedexGameBtn" @click="LogInModalVisible = false">Pokedex</el-button>
                    </span>
                </div>
            </template>
        </el-dialog>
      </div>
</template>

<!-- <el-icon><Check /></el-icon> 
<el-icon><Close /></el-icon>-->

<style scoped>
.navbar {
  z-index: 1;
  background-color: whitesmoke;
  padding: 5px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.9;
}
.navbar-content{
    align-items: center;
    justify-content: space-between;
    display: flex;
}

.logo{
    width: 100%;
    max-width: 50px;
    display: block;
}
.game{
    width: 100%;
    max-width: 35px;
    display: block;
}
.search{
    display: block;
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    background-color: transparent;
    float: right;
}

.search::placeholder {
  opacity: 0.5;
}

.navbar-right{
    align-items: center;
    justify-content: space-between;
}





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
.pokedex{
    width: 100%;
    max-width: 35px;
    display: block;
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
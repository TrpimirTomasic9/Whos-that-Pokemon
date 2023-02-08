<script setup>
import {Sunny, Moon} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Home from '../views/Home.vue'
import { pokeStore } from '../store/store'
import VueCookies from 'vue-cookies'
import axios from 'axios';
import Pokedex from './Pokedex.vue'
import Login from './LogIn.vue'

const pokedexVisible = ref(false)
const PokemonStore = pokeStore();
const LogInModalVisible = ref(false)

let allpokemons = []

async function GetAllPokemons() {
  try {
    let response = await PokemonStore.getPokemonData();
    allpokemons.value = response.data.results;
    let randomPokemon = allpokemons.value[Math.floor(Math.random() * 151) + 1]
    console.log(randomPokemon)
  } catch (error) {
    throw error;
  }
}

GetAllPokemons()

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
                            <Sunny />
                        </el-icon></el-button>
                    <el-button link><el-icon :size="20">
                            <Moon />
                        </el-icon></el-button>
                </div>
                <div>
                    <el-button @click="pokedexVisible = true" class="pokedexBtn">Pokedex</el-button>
                    <!-- <router-link  @click="pokedexVisible = true" to="/pokedex" class="nav-link">Pokedex</router-link> -->
                </div>
                <div>
                    <el-button @click="LogInModalVisible = true" text>LogIn<Login /></el-button>
                </div>
            </el-space>
        </div>
    </el-header>
</template>

<style scoped>
.navbar {
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

.pokedexBtn{
    background-color: black;
    color: whitesmoke;
}
 
</style>
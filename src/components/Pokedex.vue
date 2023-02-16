<script setup lang="ts">
import { ref } from 'vue'
import { usePokedexStore } from '../store/pokedexStore.js';
import { pokeStore } from '../store/pokemonStore';
import axios from 'axios'
import VueCookies from 'vue-cookies'

const pokedexStore = usePokedexStore()
const pokemonStore = pokeStore()
let pokemons = ref<any>()
let pokedex = ref<any>()
let loading = ref<boolean>(true)
let dialogWidth = ref<number>(250)

var baseURL = 'http://localhost:3000/'

const dialogWidthCompute = () => {
    dialogWidth.value = (window.innerWidth >= 1100) ? 900 : (window.innerWidth >= 800) ? 700 : 400;
}

dialogWidthCompute()

onresize = (event) => {
    dialogWidthCompute()
}

async function showUserPokedex()
{
    loading.value = true
    pokedex.value = pokedexStore.userPokedex
    pokemons.value = pokemonStore.pokemons
    loading.value = false
}

showUserPokedex()

</script>

<template>
    <el-dialog class="modal" v-if="!loading" v-model="pokedexStore.showModal" title="Pokedex" center>
        <template #header>
            <img class="pokedex-texImg" src="/src/assets/images/pokedex-text.png" />
        </template>
        <template #default>
            <div class="scrollbar-div">
                <el-row gutter="5">
                    <el-col  :sm="24" :md="12" :lg="8" :xl="6" v-for="pokemon in pokemons[0]" class="imageCard">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="singlePokemon">
                                    <img v-if="pokedex.includes(pokemon.id)" :src="pokemon.img">
                                    <el-skeleton class="skeleton-img" v-else align="center">
                                        <template #template>
                                            <el-skeleton-item variant="image" style="width: 100%; height: 100px" />
                                        </template>
                                    </el-skeleton>
                                <div class="pokeNameDiv">
                                    <span>{{ pokemon.name }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </template>
    </el-dialog>
</template>

<style>
.pokedex-texImg{
    width: 100%;
    max-width: 30%;
    text-align: center;
}
.singlePokemon{
    width: 100%;
    text-align: center;
}
.pokeNameDiv{
    background-color: black;
    color: whitesmoke;
    opacity: 0.7;
}
.modal{
    width: 40%;
    max-height: 75vh;
}
.scrollbar-div{
    overflow-y: scroll;
    max-height: 55vh;
    overflow-x: hidden;
}
</style>
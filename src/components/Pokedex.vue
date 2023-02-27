<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { usePokedexStore } from '../store/pokedexStore.js';
import { pokeStore } from '../store/pokemonStore';
import  SinglePokemon from './SinglePokemon.vue'
import { ArrowDown } from '@element-plus/icons-vue'

const pokedexStore = usePokedexStore()
const pokemonStore = pokeStore()
const customColor = ref('#008000')
let pokemons = ref<any>()
let pokedex = ref<any>()
let loading = ref<boolean>(true)
let showSinglePokemon = ref<boolean>(false)
let dialogWidth = ref<number>(250)
let myPokemonProgress = ref<number>(0)
let selectedPokemon =ref<any>()
let displayId = ref<number>(1)

watch(() => {selectedPokemon.value; showSinglePokemon.value}, () => {
    console.log(showSinglePokemon.value)
})

const dialogWidthCompute = () => {
    dialogWidth.value = (window.innerWidth >= 1100) ? 900 : (window.innerWidth >= 800) ? 700 : 400;
}

dialogWidthCompute()

onresize = (event) => {
    dialogWidthCompute()
}

myPokemonProgress.value = parseFloat(((pokedexStore.userPokedex.length / 151) * 100).toFixed(1))

async function showUserPokedex()
{
    loading.value = true
    pokedex.value = pokedexStore.userPokedex
    pokemons.value = pokemonStore.pokemons
    loading.value = false 
}

showUserPokedex()

const color_picker = (type_name, default_color) => {
    switch (type_name) {
        case "normal":
            return "#A8A878"
        case "fighting":
            return "#C03028"
        case "flying":
            return "#A890F0"
        case "poison":
            return "#A040A0"
        case "ground":
            return "#E0C068"
        case "rock":
            return "#B8A038"
        case "bug":
            return "#A8B820"
        case "ghost":
            return "#705898"
        case "steel":
            return "#B8B8D0"
        case "fire":
            return "#F08030"
        case "water":
            return "#6890F0"
        case "grass":
            return "#78C850"
        case "electric":
            return "#F8D030"
        case "psychic":            
            return "#F85888"
        case "ice":
            return "#98D8D8"
        case "dragon":
            return "#7038F8"
        case "dark":
            return "#705848"
        case "fairy":
            return "#EE99AC"
        default:
            return default_color
    }
}

const background_image_calculator = (pokemon) => {
    let type1 = color_picker(pokemon.type1, "");
    let type2 = color_picker(pokemon.type2, type1)
    return `linear-gradient(to right, ${type1}, ${type2}) 1`

} 

function getSinglePokemon(pokemon)
{
    if(pokedex.value.includes(pokemon.id))
    {
        selectedPokemon.value = pokemon
        showSinglePokemon.value = true
    }
    
}

const favourites = computed<any>(() => {
    return pokedexStore.favourites
})

const favouriteList = computed(()=>{
    return (pokemons.value)[0].filter(pokemon => favourites.value.includes(pokemon.id))
})


const guessedList = computed(()=>{
    return (pokemons.value)[0].filter(pokemon => pokedex.value.includes(pokemon.id))
})


const displayList = computed(()=>{
    if(displayId.value == 1)
    {
        return (pokemons.value)[0]
    }
    else if(displayId.value == 2)
    {
        return favouriteList.value
    }
    else if(displayId.value == 3)
    {
        return guessedList.value
    }
})

</script>

<template>
    <el-dialog class="modal" v-if="!loading && !showSinglePokemon" v-model="pokedexStore.showModal" title="Pokedex" center>
        <template #header>
            <img class="pokedex-texImg" src="/src/assets/images/pokedex-text.png" />
        </template>
        <template #default>
            <el-row justify="center">
                <el-dropdown>
                <span class="el-dropdown-link">
                    Sort
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="displayId=1">All</el-dropdown-item>
                        <el-dropdown-item @click="displayId=3">Guessed</el-dropdown-item>
                        <el-dropdown-item @click="displayId=2">Favourites</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            </el-row>
            <div class="scrollbar-div">
                <el-row :gutter=5>
                    <el-col  :sm="24" :md="12" :lg="8" :xl="6" v-for="pokemon in displayList" :key='pokemon.id' class="imageCard">
                        <el-card :body-style="{ padding: '0px' }" :style="{'border-image':pokedex.includes(pokemon.id)? background_image_calculator(pokemon): ''}">
                            <div class="singlePokemon" @click="getSinglePokemon(pokemon)">
                                <img v-if="favourites.includes(pokemon.id) && pokedex.includes(pokemon.id)" class="favourite" src="/src/assets/images/heart.png" />
                                    <img v-if="pokedex.includes(pokemon.id)" :src="pokemon.image">
                                    <el-skeleton class="skeleton-img" v-else align="center">
                                        <template #template>
                                            <img class="pokedex-texImg" style="width: 100px; height: 97px" src="/src/assets/images/questionmark.png" />
                                        </template>
                                    </el-skeleton>
                                <div class="pokeNameDiv" v-if="pokedex.includes(pokemon.id)" :src="pokemon.img">
                                    <span>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</span>
                                </div>
                                <div class="pokeNameDiv" v-else>
                                    <span>unknown</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <el-row justify="space-evenly">
                <el-col :span="20">
                    <el-progress
                        :text-inside="true"
                        :stroke-width="20"
                        :percentage="myPokemonProgress"
                        :color="customColor"
                    />
                </el-col>
                <span class="statisticNum" >{{ pokedexStore.userPokedex.length }}/151</span>
            </el-row>
        </template>
    </el-dialog>
    <SinglePokemon v-if="showSinglePokemon" :selectedPokemon = "selectedPokemon" @closeSinglePokemon="showSinglePokemon=false" />
</template>

<style>
.pokedex-texImg{
    width: 100%;
    max-width: 30%;
    text-align: center;
}

.el-dialog__header{
    margin-bottom: -20px;
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
    max-height: 75vh;
}
.scrollbar-div{
    overflow-y: scroll;
    max-height: 55vh;
    overflow-x: hidden;
}
.el-row.is-justify-space-evenly{
    padding-top: 9px;
}
.statisticNum{
    padding-top: 2px;
    padding-right: 10px;
}

.imageCard{
    padding-top: 4px;
}
.favourite{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 5px;
}

</style>
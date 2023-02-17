<script setup lang="ts">
import { ref } from 'vue'
import { usePokedexStore } from '../store/pokedexStore.js';
import { pokeStore } from '../store/pokemonStore';

const pokedexStore = usePokedexStore()
const pokemonStore = pokeStore()
const customColor = ref('#008000')
let pokemons = ref<any>()
let pokedex = ref<any>()
let loading = ref<boolean>(true)
let dialogWidth = ref<number>(250)
let myPokemonProgress = ref<number>(0)


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

</script>

<template>
    <el-dialog class="modal" v-if="!loading" v-model="pokedexStore.showModal" title="Pokedex" center>
        <template #header>
            <img class="pokedex-texImg" src="/src/assets/images/pokedex-text.png" />
        </template>
        <template #default>
            <div class="scrollbar-div">
                <el-row :gutter=5>
                    <el-col  :sm="24" :md="12" :lg="8" :xl="6" v-for="pokemon in pokemons[0]" class="imageCard">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="singlePokemon">
                                    <img v-if="pokedex.includes(pokemon.id)" :src="pokemon.img">
                                    <el-skeleton class="skeleton-img" v-else align="center">
                                        <template #template>
                                            <img class="pokedex-texImg" style="width: 100px; height: 97px" src="/src/assets/images/questionmark.png" />
                                        </template>
                                    </el-skeleton>
                                <div class="pokeNameDiv" v-if="pokedex.includes(pokemon.id)" :src="pokemon.img">
                                    <span>{{ pokemon.name }}</span>
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
</style>
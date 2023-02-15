<script setup>
import { ref } from 'vue'
import { usePokedexStore } from '../store/pokedexStore.js';

const pokedexStore = usePokedexStore()

</script>

<template>
    <el-dialog v-model="pokedexStore.showModal" title="Pokedex" width="50%" height="50%" center>
        <template #header>
            <img class="pokedex-texImg" src="/src/assets/images/pokedex-text.png" />
        </template>
        <template #default>
            <div v-for="id in pokedexStore.userPokedex">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="singlePokemon">
                            <span>image</span>
                        <div class="pokeNameDiv">
                            <span>name</span>
                        </div>
                    </div>
                </el-card>
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
</style>
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
            
        </template>
</el-dialog>
</template>

<style>
.pokedex-texImg{
    width: 100%;
    max-width: 30%;
    text-align: center;
}
</style>
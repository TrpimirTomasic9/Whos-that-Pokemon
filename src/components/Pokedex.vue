<script setup>
import { ref } from 'vue'

const pokedexVisible = ref(true)


</script>

<template>
<el-dialog v-model="pokedexVisible" title="Pokedex" width="50%" height="50%" center>
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
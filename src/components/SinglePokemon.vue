<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePokedexStore } from '../store/pokedexStore';
const props = defineProps(['selectedPokemon'])
let show = ref<boolean>(true)
let pokemonAttributes = ref<string[]>([])
let emits = defineEmits(['closeSinglePokemon'])
let pokedexStore = usePokedexStore()

watch (() => show.value, () => {
    emits('closeSinglePokemon')
})
watch (() => props.selectedPokemon.value, () => {
    setPokemonAtributes()
})

onresize = (event) => {
    setPokemonAtributes()
}
const setPokemonAtributes = () => {
    (window.innerWidth >= 1200) ? setPokemonLg() : setPokemonSm();
}

setPokemonAtributes()

function setPokemonLg() {
    setTimeout(function() {
        pokemonAttributes.value[0] = `Type: ${props.selectedPokemon.type1.charAt(0).toUpperCase() + props.selectedPokemon.type1.slice(1)}`
        pokemonAttributes.value[4] = `Type: ${(props.selectedPokemon.type2)?props.selectedPokemon.type2.charAt(0).toUpperCase() + props.selectedPokemon.type2.slice(1):'-'}`
        pokemonAttributes.value[1] = `Attack: ${props.selectedPokemon.attack}`
        pokemonAttributes.value[5] = `Defence: ${props.selectedPokemon.defence}`
        pokemonAttributes.value[2] = `SP. Attack: ${props.selectedPokemon.special_attack}`
        pokemonAttributes.value[6] = `SP. Defence: ${props.selectedPokemon.special_defence}`
        pokemonAttributes.value[3] = `HP: ${props.selectedPokemon.hp}`
        pokemonAttributes.value[7] = `Speed: ${props.selectedPokemon.speed}`
    }, 100);
}
function setPokemonSm(){
    setTimeout(function() {
        pokemonAttributes.value[0] = `Type: ${props.selectedPokemon.type1.charAt(0).toUpperCase() + props.selectedPokemon.type1.slice(1)}`
        pokemonAttributes.value[1] = `Type: ${(props.selectedPokemon.type2)?props.selectedPokemon.type2.charAt(0).toUpperCase() + props.selectedPokemon.type2.slice(1):'-'}`
        pokemonAttributes.value[2] = `Attack: ${props.selectedPokemon.attack}`
        pokemonAttributes.value[3] = `Defence: ${props.selectedPokemon.defence}`
        pokemonAttributes.value[4] = `SP. Attack: ${props.selectedPokemon.special_attack}`
        pokemonAttributes.value[5] = `SP. Defence: ${props.selectedPokemon.special_defence}`
        pokemonAttributes.value[6] = `HP: ${props.selectedPokemon.hp}`
        pokemonAttributes.value[7] = `Speed: ${props.selectedPokemon.speed}`
    }, 100);
}
setPokemonLg()

</script>

<template>
    <el-dialog class="modal" v-model="show" title="ime pok" center>
        <template #header class="dialogHeader">
            <img class="pokedex-texImg" :src="props.selectedPokemon.image" />
        </template>
        <template #default class="dialogDefault">
            <el-row justify="center">
                <span class="pokeName">{{ props.selectedPokemon.name.charAt(0).toUpperCase() + props.selectedPokemon.name.slice(1) }}</span>
            </el-row>
            <el-row>
                <el-col class="attributes" v-for="attribute in pokemonAttributes" :xs="24" :sm="12" :md="12" :lg="6" :xl="6" align="center">
                    <span>{{ attribute }}</span>
                </el-col>
            </el-row>
            <el-row class="heartRow" justify="center">
                <el-button @click="pokedexStore.favouritePokemon(props.selectedPokemon.id)" link>
                    <img v-if="!pokedexStore.favourites.includes(props.selectedPokemon.id)" class="hearts" src="/src/assets/images/empty_heart.png" />
                    <img v-else class="hearts" src="/src/assets/images/heart.png" />
                </el-button>
            </el-row>
        </template>
    </el-dialog>
</template>

<style scoped>
.pokeName{
    padding-bottom: 25px;
    font-size: large;
}
.attributes{
    padding-top: 5px;
}
.dialogHeader{
    margin: 0;
}
.hearts{
    height: 50px;
    widows: 50px;
}
.heartRow{
    padding-top: 20px;
}
</style>
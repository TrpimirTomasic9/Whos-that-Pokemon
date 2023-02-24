<script setup>
import { useSearchStore } from '../store/searchStore';
import { Close, CloseBold} from '@element-plus/icons-vue'
import { pokeStore } from '../store/pokemonStore';
import { ref, computed } from 'vue'
import { useDark } from '@vueuse/core';

let isDark = useDark();

const pokemonStore = pokeStore()

let searchStore = useSearchStore()

const pokemonResults = computed(() => {
    return pokemonStore.pokemons[0]?.filter(pokemon=> pokemon.name.includes(searchStore.value))
})

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

</script>

<template>
    <div class="searchDivBg" @click.self="searchStore.changeModal()">
        <div class="searchDiv" :class="{dark:isDark}">
            <el-button class="closeButton" link @click="searchStore.changeModal()"><el-icon :size="20"><Close /></el-icon></el-button> 
            <div class="searchHeader" style="width: 100%;">
                <img class="pokemonText" style="margin:0 auto;" src="src/assets/images/pokemon-text.png"/>
            </div>
            <div class="searchBody">
                <el-row :gutter=5>
                    <el-col  :sm="24" :md="12" :lg="8" :xl="6" v-for="pokemon in pokemonResults" class="imageCard">
                        <el-card class="searchCard" :body-style="{ padding: '0px' }" :style="{'border-image': background_image_calculator(pokemon)}">
                            <div class="singlePokemon">
                                    <img :src="pokemon.image">
                                   
                                <div class="pokeNameDiv">
                                    <span>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<style scoped>
.searchDivBg{
    position:absolute;
    top: 0vh;
    left: 0vw;
    height: 100vh;
    width: 100vw;
    z-index: 1;
}
.searchDiv{
    position:absolute;
    top: 15%;
    left: 25%;
    width: 50.1%;
    height: 73.5%;
    background-color: whitesmoke;
    padding: 2%

}
.pokemonText{
    width: 50%;
    max-width: 200px;
    justify-self: center;
}
.searchHeader{
    text-align: center;
    height: 20%;
}
.closeButton{
    position: absolute;
    right: 2%;
    top: 2%;
    z-index: 1;
}
.searchBody {
    height:80%;
    overflow-y: auto;
    overflow-x: hidden;
}

.searchDiv.dark {
    background-color: #141414;
}
.imageCard{
    padding-top: 5px;
}

</style>
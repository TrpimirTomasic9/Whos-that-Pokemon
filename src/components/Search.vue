<script setup>
import { useSearchStore } from '../store/searchStore';
import { Close, CloseBold} from '@element-plus/icons-vue'
import { pokeStore } from '../store/pokemonStore';
import { ref, computed } from 'vue'

const pokemonStore = pokeStore()
let pokemons = ref()

let searchStore = useSearchStore()
pokemons.value = pokemonStore.pokemons[0]

const pokemonResults = computed(() => {
    return pokemons.value?.filter(pokemon=> pokemon.name.includes(searchStore.value))
})
</script>

<template>
    <div class="searchDivBg" @click.self="searchStore.changeModal()">
        <div class="searchDiv">
            <el-button class="closeButton" link @click="searchStore.changeModal()"><el-icon :size="20"><Close /></el-icon></el-button> 
            <div class="searchHeader" style="width: 100%;">
                <img class="pokemonText" style="margin:0 auto;" src="src/assets/images/pokemon-text.png"/>
            </div>
            <div class="searchBody">
                <el-row gutter="5">
                    <el-col  :sm="24" :md="12" :lg="8" :xl="6" v-for="pokemon in pokemonResults" class="imageCard">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="singlePokemon">
                                    <img :src="pokemon.img">
                                   
                                <div class="pokeNameDiv">
                                    <span>{{ pokemon.name }}</span>
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
</style>
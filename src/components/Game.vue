<script setup lang="ts">
import { ArrowRight, InfoFilled} from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import { pokeStore } from '../store/pokemonStore'
import { usePokedexStore } from '../store/pokedexStore';
import { useGameStore } from '../store/gameStore';

const PokemonStore = pokeStore();
const pokedexStore = usePokedexStore();

let gameStore = useGameStore()
let correct = ref<boolean>(false)
let inccorect = ref<boolean>(false)
let pokemonName = ref<string>('')
let isLoading = ref<boolean>(true)
let letter = ref<number>(0)
let randomPokemon = ref<any>()


async function getRandomPokemon() {
   isLoading.value = true
   correct.value = false
   inccorect.value = false
 try {
   let response = await PokemonStore.getOnePokemon();
   randomPokemon.value = response;
   console.log(randomPokemon.value)
   isLoading.value = false
 } catch (error) {
   throw error;
 }
 letter.value = 0
}

getRandomPokemon()

function submitAnswer(){
   pokemonName.value = pokemonName.value.toLowerCase()
   if(pokemonName.value == randomPokemon.value.name){
       pokedexStore.pushPokemon(randomPokemon.value.id)
       pokedexStore.setUserPokedex()
       inccorect.value = false
       correct.value = true
       pokemonName.value = ''
       setTimeout(function() {
           getRandomPokemon()
       }, 2000);
   } else{
       correct.value = false
       inccorect.value = true
       pokemonName.value = ''
   }
}

const help = () => {
    letter.value +=1
    ElNotification({
    title: 'Help',
    message: `First characters of Pokemon name: ${randomPokemon.value.name.slice(0, letter.value).toUpperCase()}`,
    duration: 2500,
    showClose: false
  })
}

</script>

<template>
    <el-dialog v-if="!isLoading"  v-model="gameStore.showModal" width="35%" height="50%" center @keyup.enter="submitAnswer" >
        <template #header>
            <img class="whosThatPokeImg" src="/src/assets/images/Whos-that-Pokemon.png" />
        </template>
        <template #default>
            <div class="modalHeader">
                <el-button class="infoBtn" @click="help" link type="warning" >
                    <el-icon :size="20"><InfoFilled /></el-icon>
                </el-button>
                <img class="img" :src="randomPokemon.image" width="250" height="250" />
            </div>
            <div class="footer">
                <div class="inputDiv">
                    <input v-model="pokemonName" class="pokeNameInput" onfocus="this.value=''" type="text" placeholder="This pokemon is ..." maxlength="20" minlength="4" />
                </div>
                <div v-if="inccorect" class="incorrect">
                    <el-row justify="center">
                        <span class="incorrectBold">Incorrect answer!</span>
                    </el-row>
                </div>
                <div v-if="correct" class="correct">
                    <el-row justify="center">
                        <span class="correctBold">Correct answer!</span>
                    </el-row>
                </div>
                <el-row justify="center">
                    <el-col :xl="3" :lg="5" :md="6" :sm="10">
                        <el-button color="#008000" class="submitBtn" @click="submitAnswer()" :disabled="!pokemonName.length">Submit</el-button>
                    </el-col>
                    <el-col :xl="3" :lg="5" :md="6" :sm="10">
                        <el-button color="#FFA500" class="skipBtn" @click="getRandomPokemon() ">Skip
                            <el-icon class="el-icon--right"><ArrowRight /></el-icon></el-button>
                    </el-col>
                    <el-col :xl="3" :lg="5" :md="6" :sm="10">
                        <el-button type="primary" plain class="pokedexGameBtn" @click="pokedexStore.changeModal()">Pokedex</el-button>
                    </el-col>
                </el-row>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.footer{
    text-align: center;
    padding-top: 10px;
}

.pokeNameInput{
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
    width: 57%;
    background-color: transparent;
    text-align: center;
}
.inputDiv{
    padding-bottom: 15px;
}
.skipBtn{
    border: 1.5px solid black;
    margin: 0;
}
.submitBtn{
    border: 1.5px solid black;
    color: yellow;
}
.pokedexGameBtn{
    border: 1.5px solid black;
}
.modalHeader{
    text-align: center;
}

.el-dialog{
    opacity: 0.8;
}
.whosThatPokeImg{
    width: 100%;
    max-width: 75%;
    text-align: center;
}
.incorrect{
    padding-bottom: 15px;
    color: red;
}
.correct{
    padding-bottom: 15px;
    color: green;
}
.correctBold, .incorrectBold{
    font-weight: bold;
}
.infoBtn{
    position: absolute;
    right: 80px;
    top: 10px;
}
@media (max-width: 850px) {
    .img {
       width: 180px;
       height: 180px;
    }
}
@media (max-width: 670px) {
    .img {
        width: 120px;
       height: 120px;
    }
}
@media (max-width: 623px) {
    .footer {
        align-items: center;
    }
    .skipBtn{
        
    }
}

</style>
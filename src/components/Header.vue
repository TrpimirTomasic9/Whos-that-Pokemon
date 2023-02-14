<script setup lang="ts">
import {Sunny, Moon, SwitchButton} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios';
import { pokeStore } from '../store/pokemonStore'
import { usePokedexStore } from '../store/pokedexStore';
import { useLoginStore } from '../store/loginStore';
import { useGameStore } from '../store/gameStore';
const PokemonStore = pokeStore();

const loginStore = useLoginStore();
const pokedexStore = usePokedexStore();
const gameStore = useGameStore();

</script>

<template>
    <el-header class="navbar">
        <div class="navbar-content">
            <div>
                <router-link to="/">
                    <img role="link" class="logo" src="/src/assets/images/logo.png" />
                </router-link>
            </div>
            <el-space size="large">
                <div>
                    <input class="search" type="text" placeholder="Search pokemon" />
                </div>
                <div>
                    <el-button link><el-icon :size="20">
                            <Moon />
                        </el-icon></el-button>
                    <el-button link><el-icon :size="20">
                            <Sunny />
                        </el-icon></el-button>
                </div>
                <div v-if="loginStore.loggedIn">
                    <el-button  @click="pokedexStore.changeModal()" link><img class="pokedex" src="/src/assets/images/pokedex.png" /></el-button>
                </div>
                <div v-if="loginStore.loggedIn">
                    <el-button  @click="gameStore.changeModal()" link><img class="pokedex" src="/src/assets/images/joystick.png" /></el-button>
                </div>
                <div v-if="!loginStore.loggedIn">
                    <el-button @click="loginStore.changeModal()">LogIn</el-button>
                </div>
                <div v-else>
                    <el-button @click="loginStore.logOut()"><el-space size="small"><el-icon class="switchBtn" :size="15"><SwitchButton /></el-icon>LogOut</el-space></el-button>
                </div>
            </el-space>
        </div>
    </el-header>

</template>

<style scoped>
.navbar {
  z-index: 1;
  background-color: whitesmoke;
  padding: 5px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.9;
}
.navbar-content{
    align-items: center;
    justify-content: space-between;
    display: flex;
}

.logo{
    width: 100%;
    max-width: 50px;
    display: block;
}
.game{
    width: 100%;
    max-width: 35px;
    display: block;
}
.search{
    display: block;
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    background-color: transparent;
    float: right;
}

.search::placeholder {
  opacity: 0.5;
}

.navbar-right{
    align-items: center;
    justify-content: space-between;
}
.pokedex{
    width: 100%;
    max-width: 35px;
    display: block;
}
</style>
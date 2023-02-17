<script setup lang="ts">
import {Sunny, Moon, SwitchButton} from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'
import { usePokedexStore } from '../store/pokedexStore';
import { useLoginStore } from '../store/loginStore';
import { useGameStore } from '../store/gameStore';
import { useSearchStore } from '../store/searchStore';
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const loginStore = useLoginStore();
const pokedexStore = usePokedexStore();
const gameStore = useGameStore();
const searchStore = useSearchStore();

</script>

<template>
    <el-header class="navbar" :class="{dark:isDark}">
        <div class="navbar-content">
            <div>
                <router-link to="/">
                    <img role="link" class="logo" src="/src/assets/images/logo.png" />
                </router-link>
            </div>
            <el-space size="large">
                <div>
                    <input @click="searchStore.showModal=true" class="search" type="text" placeholder="Search pokemon" v-model="searchStore.value"/>
                </div>
                <div>
                    <el-button @click="toggleDark()" link type="primary" ><el-icon :size="20">
                            <Moon />
                        </el-icon></el-button>
                    <el-button @click="toggleDark()" link type="warning" ><el-icon :size="20">
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
                    <el-button class="loginBtn" @click="loginStore.changeModal()">LogIn</el-button>
                </div>
                <div v-else>
                    <el-button class="loginBtn" @click="loginStore.logOut()"><el-space size="small"><el-icon class="switchBtn" :size="15" color="red"><SwitchButton /></el-icon>LogOut</el-space></el-button>
                </div>
            </el-space>
        </div>
    </el-header>
</template>

<style scoped>
.navbar {
  z-index: 5;
  background-color: whitesmoke;
  padding: 5px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.9;
}

.navbar.dark {
    background-color: #141414;
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
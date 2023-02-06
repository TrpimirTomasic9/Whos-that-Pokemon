<script setup lang="ts">
import {Sunny, Moon} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Home from '../views/Home.vue'

const pokedexVisible = ref(false)
</script>

<template>
    <el-header class="navbar">
        <div class="navbar-content">
            <div>
                <img class="logo" src="/src/assets/images/logo.png" />
            </div>
            <el-space size="large">
                <div>
                    <input class="search" type="text" placeholder="Search pokemon" />

                </div>
                <div>
                    <el-button link><el-icon :size="20">
                            <Sunny />
                        </el-icon></el-button>
                    <el-button link><el-icon :size="20">
                            <Moon />
                        </el-icon></el-button>
                </div>
                <div>
                    <el-button v-model="pokedexVisible" class="pokedexBtn">Pokedex</el-button>
                </div>
                <div>
                    <el-button text>LogOut</el-button>
                </div>
            </el-space>

        </div>
    </el-header>
</template>

<style scoped>
.navbar {
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

.pokedexBtn{
    background-color: black;
    color: whitesmoke;
}
 
</style>
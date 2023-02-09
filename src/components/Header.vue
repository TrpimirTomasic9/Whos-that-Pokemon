<script setup>
import {Sunny, Moon, ArrowRight} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios';
import Pokedex from './Pokedex.vue'
import Login from './LogIn.vue'

const pokedexVisible = ref(false)
const LogInModalVisible = ref(false)
const game = ref(false)

</script>

<template>
    <el-header class="navbar">
        <div class="navbar-content">
            <div>
                <router-link to="/" custom v-slot="{ navigate }">
                <img @click="navigate" role="link" class="logo" src="/src/assets/images/logo.png" />
            </router-link>
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
                    <el-button @click="pokedexVisible = true" class="pokedexBtn">Pokedex</el-button>
                </div>
                <div>
                    <el-button @click="game = true" link><img class="game" src="/src/assets/images/joystick.png" /></el-button>
                    
                </div>
                <div>
                    <el-button @click="LogInModalVisible = true" text>LogIn<Login /></el-button>
                </div>
            </el-space>
            <div>
        <el-dialog v-model="game" title="Who's that pokemon?" width="35%" height="50%" center>
          <el-form label-position='top' status-icon :label-width="80">

          </el-form>
          <div class="footer">
                <div class="inputDiv">
                    <input class="pokeNameInput" type="text" placeholder="Search pokemon" />
                </div>
                <span>
                    <el-button id="submitBtn" @click="LogInModalVisible = false">Submit</el-button>
                    <el-button id="skipBtn" @click="LogInModalVisible = false;">Skip
                        <el-icon class="el-icon--right"><ArrowRight /></el-icon></el-button>
                    <el-button id="pokedexGameBtn" @click="LogInModalVisible = false">Pokedex</el-button>
                </span>
        </div>
        </el-dialog>
      </div>
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

.pokedexBtn{
    background-color: black;
    color: whitesmoke;
}



.footer{
    text-align: center;
    padding-top: 10px;
}

.pokeNameInput{
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
    width: 40%;
    background-color: transparent;
    text-align: center;
}
.inputDiv{
    padding-bottom: 15px;
}
#skipBtn{
    background-color: #FFD700;
    border: 1.5px solid black;
}
#submitBtn{
    background-color:black;
    border: 1.5px solid black;
    color: yellowgreen;
}
#pokedexGameBtn{
    background-color:whitesmoke;
    border: 1.5px solid black;
}
</style>
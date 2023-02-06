<script setup>
import {Sunny, Moon} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Home from '../views/Home.vue'
import { pokeStore } from '../store/store'
import VueCookies from 'vue-cookies'
import axios from 'axios';

const pokedexVisible = ref(false)
const PokemonStore = pokeStore();
const LogInModalVisible = ref(false)

let allpokemons = []

var baseURL = 'http://localhost:3000/'
var userURL = baseURL + "users";

let users = ref(null)
let email = ref(null)
let password = ref(null)
let emailError = ref(null)
let passwordError =ref(null)
let passwordValidation = ref(false)


async function GetAllPokemons() {
  try {
    let response = await PokemonStore.getPokemonData();
    allpokemons.value = response.data;
    console.log(allpokemons.value)
  } catch (error) {
    throw error;
  }
}

onMounted(async () => {
    try {
            const res = await axios.get(baseURL + 'users');
            this.users = res.data;
        } catch (e) {
            console.error(e)
        }
  })

async function loginSubmit()
{
    if(email.lenght == 0)
    {
        this.emailError = "Field is empty"
    }
    else
    {
        this.emailError = null
    }

    if(password.length == 0)
    {
        this.passwordError = "Field is empty!";
    }
    else if(password.length>0 && password.length<8)
    { 
        this.passwordError = "Password is too short!"
    }
    else
    {
        this.passwordError = null
    }

    const res = await axios.get(userURL);
    this.users = res.data;

    for (var i = 0; i < this.users.length; i++)
            {
                if (this.users[i].email == this.email.value)
                {
                    if (this.users[i].password == this.email.value)
                    {
                        this.passwordValidation = true;
                        VueCookies.set('username', this.users[i].username, "120min");
                        VueCookies.set('email', this.$.email.value, "120min");
                        VueCookies.set('password', this.password.value, "120min");
                        VueCookies.set('id', this.users[i].id, "120min");

                        window.location.href = '/';
                        alert("Login successful");
                        
                    }
                }
            }
             if(this.passwordValidation == false)
             { this.passwordError = "Inccorect password or username!"}
}

GetAllPokemons()
function aaa(){
    console.log(email.value)
}
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
                    <el-button @click="LogInModalVisible = true" text>LogIn</el-button>
                </div>
            </el-space>
            <el-dialog v-model="LogInModalVisible" title="LogIn" width="50%" height="50%" center>
                <el-form label-position='top' status-icon :label-width="80">

                    <el-form-item label="Email">
                        <el-input autofocus type="email" id='email' placeholder="Enter Email" v-model="email" @change="aaa" />
                        <div class="input-message" v-if="emailError"><h6>{{emailError}}</h6></div>
                    </el-form-item>

                    <el-form-item label="Password">
                        <el-input type="password" id='password' placeholder="Enter Password" v-model="password" />

                        <div class="input-message" v-if="passwordError"><h6>{{passwordError}}</h6></div>
                    </el-form-item>

                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="LogInModalVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="LogInModalVisible = false; loginSubmit()">
                            Confirm
                        </el-button>
                    </span>
                </template>
            </el-dialog>
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
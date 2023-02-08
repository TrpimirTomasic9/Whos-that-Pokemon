import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../views/Home.vue'
import Pokedex from '../components/Pokedex.vue'
import App from '/src/App.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
     {
      path: '/pokedex',
      name: 'Pokedex',
      component: Pokedex
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})

export default router

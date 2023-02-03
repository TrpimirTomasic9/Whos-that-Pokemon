import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*
    {
      path: '/',
      name: 'login',
      component: Register
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
 */
  ]
})

export default router

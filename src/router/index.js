import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Dashboard.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
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
    {
      /* path: '/about',
      name: 'about', */
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
     /*  component: () => import('../views/AboutView.vue') */
    }
  ]
})

export default router

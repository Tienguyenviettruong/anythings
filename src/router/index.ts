import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../views/login/Login.vue'
import Greet from '../components/Greet.vue'
import Office from '../views/office/Office.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/greet',
    name: 'Greet',
    component: Greet
  },
  {
    path: '/office',
    name: 'Office',
    component: Office
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

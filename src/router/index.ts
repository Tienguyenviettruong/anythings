import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../views/login/Login.vue'
import Greet from '../components/Greet.vue'
import officeRoutes from './office'

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
    path: '/design',
    name: 'Design',
    component: () => import("../views/design/Design.vue")
  },
  ...officeRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

const history = createWebHistory(`${import.meta.env.VITE_BASE_URL}`)

const routes = [

 
  
  {
    path: '/',
    name: 'login',
    component: Login,
  },

  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },

 
 
 

]
const router = createRouter({ history, routes })
export default router
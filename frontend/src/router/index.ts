import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue';
import Mysugar from '../views/mysugar.vue'


const history = createWebHistory(`${import.meta.env.VITE_BASE_URL}`)

const routes = [

 
  
  {
    path: '/',
    name: 'login',
    component: login,
  },

  {
    path: '/home',
    name: 'home',
    component: Mysugar,
  },

 
 
 

]
const router = createRouter({ history, routes })
export default router
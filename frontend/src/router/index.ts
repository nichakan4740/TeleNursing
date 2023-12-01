import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Chatbot from '../views/Chatbot.vue'
import SugarLevel from '../views/SugarLevel.vue'

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
  {
    path: '/chatbot',
    name: 'chatbot',
    component: Chatbot,
  },
  {
    path: '/sugar-level',
    name: 'sugar-level',
    component: SugarLevel,
  },

 
 
 

]
const router = createRouter({ history, routes })
export default router
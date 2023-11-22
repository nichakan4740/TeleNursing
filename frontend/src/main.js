import { createApp } from 'vue'
import Home from './Home.vue'
import router from './router'
import './assets/style.css'


const app = createApp(Home)

app.use(router)
app.mount('#app')

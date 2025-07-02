import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

//使用pinia
import { createPinia } from 'pinia'
const pinia = createPinia()



const app = createApp(App)

// 使用路由
app.use(router)
app.use(pinia)  
app.mount('#app')
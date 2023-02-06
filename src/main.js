import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './css/base.css'

import { createPinia } from "pinia";
import axios from 'axios'

/* Vue.prototype.$http = axios */


const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(createPinia())

app.mount('#app')
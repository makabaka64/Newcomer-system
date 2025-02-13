import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/tailwind.css'

import App from './App.vue'
import router from './router'
import pinia from './stores/index'

const app = createApp(App)

app.use(ElementPlus)
app.use(MotionPlugin)
app.use(router)
app.use(pinia)

app.mount('#app')

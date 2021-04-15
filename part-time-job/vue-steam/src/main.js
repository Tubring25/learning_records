import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/lib/theme-chalk/index.css';
import "tailwindcss/tailwind.css"
import ElementPlus from 'element-plus'
import "./permission"

createApp(App).use(router).use(ElementPlus).mount('#app')

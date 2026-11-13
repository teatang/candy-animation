import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { i18n } from './locales'
import './style.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(i18n)

app.mount('#app')

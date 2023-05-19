import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import directives from '@/directives/index'
import 'ant-design-vue/dist/antd.css'
import antComponent from '@/config/antdComponent'

const app = createApp(App)
app.use(router).use(store).use(directives).use(antComponent).mount('#app')

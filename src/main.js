import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { createApp } from 'vue'

createApp(App)
.mount('#app')
.use(VueAxios, axios)

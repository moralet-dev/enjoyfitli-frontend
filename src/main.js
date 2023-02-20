import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import {router} from "@/routers/router";
import store from "@/store/store";

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
window.store = store

import {createApp} from 'vue'
import App from './App.vue'
import {createVuetify} from 'vuetify'

import './assets/main.css'
import {router} from "@/routers/router";
import store from "@/store/store";

const vuetify = createVuetify({
        display: {
            mobileBreakpoint: 'sm',
            thresholds: {
                xs: 0,
                sm: 320,
                md: 767,
                lg: 991,
                xl: 1280,
            },
        },
    }
)
const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
window.store = store

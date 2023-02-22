import {createStore} from 'vuex'
import {authModule} from "@/store/modules/authModule";

const store = createStore({
    state: {
        isAuth: localStorage.getItem('isAuthenticated') || null,
    },
    mutations: {
    },
    actions:{},
    modules:{
        authModule: authModule,
    },
    getters: {

    },
})

export default store
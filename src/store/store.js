import {createStore} from 'vuex'
import {authModule} from "@/store/modules/authModule";

const store = createStore({
    state: {
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
import {createStore} from 'vuex'
import {authModule} from "@/store/modules/authModule";

const store = createStore({
    state: {
        triggerLoginPopup: false,
        triggerRegPopup: false,
        locale: 'uk',
    },
    getters: {
        getTriggerLoginPopup: (state)=>state.triggerLoginPopup,
        getTriggerRegPopup: (state)=>state.triggerRegPopup,
        getLocale: (state)=>state.locale,
    },
    mutations: {
        openLoginPopup(state){
            state.triggerLoginPopup = true
        },
        closeLoginPopup(state){
            state.triggerLoginPopup = false
        },
        openRegPopup(state){
            state.triggerRegPopup = true
        },
        closeRegPopup(state){
            state.triggerRegPopup = false
        }
    },
    actions:{
        onOpenLoginPopup({commit}){
            commit('openLoginPopup')
        },
        onCloseLoginPopup({commit}){
            commit('closeLoginPopup')
        },
        onOpenRegPopup({commit}){
            commit('openRegPopup')
        },
        onCloseRegPopup({commit}){
            commit('closeRegPopup')
        }
    },
    modules:{
        authModule: authModule,
    },

})

export default store
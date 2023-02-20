import {authAPI} from "@/api/authAPI";
import {defaultAPIInstance} from "@/api";

export const authModule = {
    namespaced: true,

    state() {
        return {
            credentials: {
                refresh: localStorage.getItem('refresh') || null,
                access: localStorage.getItem('access') || null,
            },
            isAuthenticated: false,
        }
    },

    getters: {
        isAuthenticated: (state) => state.isAuthenticated
    },

    mutations: {
        setAccess(state, access) {
            state.credentials.access = access
            localStorage.setItem('access', access)
        },

        setRefresh(state, refresh) {
            state.credentials.role = refresh
            localStorage.setItem('refresh', refresh)
        },
        setIsAuthenticated(state, isAuthenticated){
            state.isAuthenticated = isAuthenticated
            console.log(state.isAuthenticated)
        },
        deleteTokens(state) {
            [state.credentials.access, state.credentials.refresh] = [null, null]
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            delete defaultAPIInstance.defaults.headers['authorization']
        }
    },

    actions: {
        onLogin({commit}, {email, password}) {
            return authAPI.login(email, password).then(response => {
                commit('setAccess', response.data.access)
                commit('setRefresh', response.data.refresh)
                commit('setIsAuthenticated', true)
                defaultAPIInstance.defaults.headers['authorization'] = `JWT ${response.data.access}`
            })
        },
        onLogout({commit}) {
            commit('deleteTokens')
            commit('setIsAuthenticated', false)
        }
    }
}
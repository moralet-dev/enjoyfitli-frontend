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
            isAuthenticated: localStorage.getItem('isAuthenticated') || null,
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
            localStorage.setItem('isAuthenticated', isAuthenticated)
        },
        deleteTokens(state) {
            [state.credentials.access, state.credentials.refresh] = [null, null]
            state.isAuthenticated = 'false'
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('isAuthenticated')
            delete defaultAPIInstance.defaults.headers['authorization']
        }
    },

    actions: {
        onLogin({commit}, {email, password}) {
            return authAPI.login(email, password).then(response => {
                commit('setAccess', response.data.access)
                commit('setRefresh', response.data.refresh)
                commit('setIsAuthenticated', 'true')
                defaultAPIInstance.defaults.headers['authorization'] = `JWT ${response.data.access}`
            })
        },
        onLogout({commit}) {
            commit('deleteTokens')
            commit('setIsAuthenticated', 'false')
        },
        onRegister({commit}, {email, phone, password, re_password}){
            return authAPI.register(
                email, phone, password, re_password
            ).then(response => response)
        }
    }
}
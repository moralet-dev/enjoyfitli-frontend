import {authAPI} from "@/api/authAPI/authAPI";
import {defaultAPIInstance, deleteCookie, getCookie, setCookie} from "@/api";

export const authModule = {
    namespaced: true,

    state() {
        return {
            credentials: {
                refresh: getCookie('refresh') || null,
                access: getCookie('access') || null,
            },
            isAuthenticated: !!getCookie('access') && !!getCookie('refresh'),
            isSessionExpired: false,
            currentUser: {
                id: null,
                first_name: null,
                last_name: null,
                phone: null,
                photo: null,
            }
        }
    },

    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        isSessionExpired: (state) => state.isSessionExpired,
        getCurrentUser: (state) => state.currentUser,
    },

    mutations: {
        setAccess(state, access) {
            state.credentials.access = access
            setCookie('access', access)
        },
        setRefresh(state, refresh) {
            state.credentials.refresh = refresh
            setCookie('refresh', refresh)
        },
        setIsAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        },
        deleteTokens(state) {
            [state.credentials.access, state.credentials.refresh] = [null, null]
            state.isAuthenticated = false
            deleteCookie('access')
            deleteCookie('refresh')
            localStorage.removeItem('isAuthenticated')
            delete defaultAPIInstance.defaults.headers['authorization']
        },
        setSessionExpired(state, isExpired) {
            state.isSessionExpired = isExpired
        },
        setCurrentUser(state, data) {
            state.currentUser = {...state.currentUser, ...data}
        },
        unsetCurrentUser(state) {
            state.currentUser = {
                id: null,
                first_name: null,
                last_name: null,
                phone: null,
                photo: null,
            }
        },

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
            commit('unsetCurrentUser')
        },
        onRegister({commit}, {email, phone, first_name, last_name, password, re_password}) {
            return authAPI.register(
                {email, phone, first_name, last_name, password, re_password}
            ).then(response => response)
        },
        onSessionExpired({commit}, isExpired) {
            commit('setSessionExpired', isExpired)
        },
        onCurrentUserSet({commit}, data) {
            commit('setCurrentUser', data)
        },
    }
}
import axios from "axios";
import store from "@/store/store";
import {router} from "@/routers/router";

const loginConfig = {
    baseURL: "http://localhost:8000/api",
}
export const loginAPIInstance = axios.create(loginConfig);

const defaultConfig = {
    baseURL: "http://localhost:8000/api",
}

export const defaultAPIInstance = axios.create(defaultConfig);

defaultAPIInstance.interceptors.request.use(
    async (config) => {
        const access = !!localStorage.getItem('access')
        const refresh = !!localStorage.getItem('refresh')
        if (access && refresh) {
            const accessToken = localStorage.getItem('access')
            const accessStatus = await axios.post('/auth/jwt/verify/', {'token': accessToken}, defaultConfig)
                .then((response) => {
                    console.log('verified')
                    config.headers['authorization'] = `JWT ${accessToken}`
                    return response.status
                }).catch(reason => {
                    return reason.request.status
                })
            if (accessStatus === 401) {
                const refreshToken = localStorage.getItem('refresh')
                await axios.post('auth/jwt/refresh/',
                    {'refresh': refreshToken}, defaultConfig)
                    .then(response => {
                        console.log('refreshed')
                        config.headers['authorization'] = `JWT ${response.data.access}`
                        localStorage.setItem('access', response.data.access)
                    }).catch(() => {
                        store.dispatch('authModule/onLogout')
                        store.dispatch('authModule/onSessionExpired', true)
                        router.push('/login')
                    })
            }
        }
        return config
    }
)
// }

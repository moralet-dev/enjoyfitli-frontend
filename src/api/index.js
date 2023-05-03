import axios from "axios";
import store from "@/store/store";

const loginConfig = {
    baseURL: "http://localhost:1337/en/api",
}
export const loginAPIInstance = axios.create(loginConfig);

const defaultConfig = {
    baseURL: "http://localhost:1337/en/api",
}

export const defaultAPIInstance = axios.create(defaultConfig);

defaultAPIInstance.interceptors.request.use(
    async (config) => {
        const access = !!localStorage.getItem('access')
        const refresh = !!localStorage.getItem('refresh')
        if (access && refresh) {
            const accessToken = localStorage.getItem('access')
            console.log('verify')
            const accessStatus = await axios.post('/auth/jwt/verify/', {'token': accessToken}, defaultConfig)
                .then((response) => {
                    config.headers['authorization'] = `JWT ${accessToken}`
                    return response.status
                }).catch(reason => {
                    return reason.request.status
                })
            if (accessStatus === 401) {
                const refreshToken = localStorage.getItem('refresh')
                await axios.post('/auth/jwt/refresh/',
                    {'refresh': refreshToken}, defaultConfig)
                    .then(response => {
                        config.headers['authorization'] = `JWT ${response.data.access}`
                        localStorage.setItem('access', response.data.access)
                    }).catch(() => {
                        store.dispatch('authModule/onLogout')
                        store.dispatch('authModule/onSessionExpired', true)
                    })
            }
        }
        return config
    }
)
// }

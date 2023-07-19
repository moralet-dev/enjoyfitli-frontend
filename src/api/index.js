import axios from "axios";
import store from "@/store/store";

const locale = store.getters.getLocale;

const loginConfig = {
    baseURL: `http://localhost:8000/${locale}/api`,
};

export const loginAPIInstance = axios.create(loginConfig);

const defaultConfig = {
    baseURL: `http://localhost:8000/${locale}/api`,
}

export const defaultAPIInstance = axios.create(defaultConfig);

defaultAPIInstance.interceptors.request.use(
    async (config) => {
        config.baseURL = `http://localhost:8000/${store.getters.getLocale}/api`
        const access = !!getCookie("access");
        const refresh = !!getCookie("refresh");
        if (access && refresh) {
            const accessToken = getCookie("access");
            console.log('verify')
            const accessStatus = await axios.post('/auth/jwt/verify/', {'token': accessToken}, defaultConfig)
                .then((response) => {
                    config.headers['authorization'] = `JWT ${accessToken}`
                    return response.status
                }).catch(reason => {
                    return reason.request.status
                })
            if (accessStatus === 401) {
                const refreshToken = getCookie("refresh");
                await axios.post('/auth/jwt/refresh/',
                    {'refresh': refreshToken}, defaultConfig)
                    .then(response => {
                        config.headers['authorization'] = `JWT ${response.data.access}`
                        setCookie("access", response.data.access); // Зберегти токен доступу в куці
                    }).catch(() => {
                        store.dispatch('authModule/onLogout')
                        store.dispatch('authModule/onSessionExpired', true)
                    })
            }
        }
        return config
    }
)

// get cookie function
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// set cookie function
export function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}
export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function pingRequest(){
    const url = '/ping/'
    return defaultAPIInstance.get(url)
}
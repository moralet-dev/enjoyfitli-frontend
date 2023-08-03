import axios from "axios";
import store from "@/store/store";

const locale = store.getters.getLocale;

const loginConfig = {
    // baseURL: `http://127.0.0.1:8000/${locale}/api`,
    baseURL: `http://34.88.25.2/${locale}/api`,
};

export const loginAPIInstance = axios.create(loginConfig);

const defaultConfig = {
    // baseURL: `http://127.0.0.1:8000/${locale}/api`,
    baseURL: `http://34.88.25.2/${locale}/api`,
}

export const defaultAPIInstance = axios.create(defaultConfig);

defaultAPIInstance.interceptors.request.use(
    async (config) => {
        // config.baseURL = `http://127.0.0.1:8000/${store.getters.getLocale}/api`
        config.baseURL = `http://34.88.25.2/${store.getters.getLocale}/api`
        const access = !!getCookie("access");
        const refresh = !!getCookie("refresh");
        if (refresh && access){
            config.headers['authorization'] = `JWT ${getCookie('access')}`
            return config
        }
        if (!access) {
            if (refresh){
                const refreshToken = getCookie("refresh");
                await axios.post('/auth/jwt/refresh/',{'refresh': refreshToken}, defaultConfig)
                    .then(response => {
                        config.headers['authorization'] = `JWT ${response.data.access}`
                        setCookie("access", response.data.access, {days:0, minutes:15});
                    })
                    .catch(() => {
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
export function setCookie(name, value, { days = 0, minutes = 0 } = {}) {
    const date = new Date();

    if (days > 0) {
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    }

    if (minutes > 0) {
        date.setTime(date.getTime() + minutes * 60 * 1000);
    }

    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}
export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function pingRequest(){
    const url = '/ping/'
    return defaultAPIInstance.get(url)
}
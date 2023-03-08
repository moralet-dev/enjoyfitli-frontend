import axios from "axios";

const loginConfig = {
    baseURL: "http://localhost:8000/api",
}
export const loginAPIInstance = axios.create(loginConfig);

const defaultConfig = {
    baseURL: "http://localhost:8000/api",
}

export const defaultAPIInstance = axios.create(defaultConfig);

const access = !!localStorage.getItem('access')
const refresh = !!localStorage.getItem('refresh')

if (access && refresh) {
    defaultAPIInstance.interceptors.request.use(
        async (config) => {
            const access = localStorage.getItem('access')
            const accessStatus = await axios.post('/auth/jwt/verify/', {'token': access}, defaultConfig)
                .then((response) => {
                    config.headers['authorization'] = `JWT ${access}`
                    return response.status
                }).catch(reason => {
                    return reason.request.status
                })
            if (accessStatus === 401) {
                const refresh = localStorage.getItem('refresh')
                await axios.post('auth/jwt/refresh/',
                    {'refresh': refresh}, defaultConfig)
                    .then(response => {
                        config.headers['authorization'] = `JWT ${response.data.access}`
                        localStorage.setItem('access', response.data.access)
                    })
            }
            return config
        }
    )
}

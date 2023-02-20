import {defaultAPIInstance, loginAPIInstance} from "@/api";


export const authAPI = {
    login(email, password){
        const url = '/auth/jwt/create/'
        const data = {email, password}
        return loginAPIInstance.post(url, data)
    },

    getMe() {
        const url = 'auth/users/me/'
        return defaultAPIInstance.get(url)
    },

    logout(){

    }

}
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
    updateMe(first_name, last_name, phone){
        const url = 'auth/users/me/'
        const data = {first_name, last_name, phone}
        return defaultAPIInstance.patch(url, data)
    },
    logout(){
    },
    register(data){
        const url = '/auth/users/'
        return loginAPIInstance.post(url, data)
    },

}
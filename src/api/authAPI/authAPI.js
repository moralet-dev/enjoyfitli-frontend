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

    getCurrentUserData(id){
        const url = `users/${id}`
        return defaultAPIInstance.get(url)
    },
    logout(){

    },

    register(data){
        const url = '/auth/users/'
        console.log(data)
        return loginAPIInstance.post(url, data)
    },

}
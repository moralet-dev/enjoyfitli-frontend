import {defaultAPIInstance, loginAPIInstance} from "@/api";


export const authAPI = {
    login(email, password){
        const url = '/auth/jwt/create/'
        const data = {email, password}
        return loginAPIInstance.post(url, data)
    },
    activate(uid, token){
        const url = '/auth/users/activation/'
        const data = {uid, token}
        return loginAPIInstance.post(url, data)
    },
    getMe() {
        const url = '/users/me/'
        return defaultAPIInstance.get(url)
    },
    updateMe(data){
        const url = '/users/me/'
        return defaultAPIInstance.patch(url, data, {headers: {
            'Content-Type': 'multipart/form-data'
        }})
    },
    logout(){
    },
    register(data){
        const url = '/auth/users/'
        return loginAPIInstance.post(url, data)
    },

}
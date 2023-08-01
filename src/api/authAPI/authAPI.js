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
    passwordReset(email){
        const url = '/auth/users/reset_password/'
        const data = {email}
        return loginAPIInstance.post(url, data)
    },
    passwordResetConfirm(uid, token, new_password){
        const url = '/auth/users/reset_password_confirm/'
        const data = {uid, token, new_password}
        return loginAPIInstance.post(url, data)
    },
    getMe() {
        const url = '/users/me/'
        return defaultAPIInstance.get(url)
    },
    updateMe(data){
        const url = '/users/me/'
        return defaultAPIInstance.patch(
            url,
            data,
            {headers: {'Content-Type': 'multipart/form-data'}}
        )
    },
    register(data){
        const url = '/auth/users/'
        // ?
        return loginAPIInstance.post(url, data,{headers: {'X-CSRFToken': '{{ csrf_token }}'}})
        // ?
    },

}
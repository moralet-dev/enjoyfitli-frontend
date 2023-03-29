import {defaultAPIInstance} from "@/api";


export const profileAPI = {
    getMyMemberships(){
        const url = '/memberships/me/'
        return defaultAPIInstance.get(url)
    },
    getMemberships(){
        const url = '/memberships/'
        return defaultAPIInstance.get(url)
    },
    createUserMembership(pk){
        const url = `/memberships/${pk}/create/`
        return defaultAPIInstance.post(url)
    }
}
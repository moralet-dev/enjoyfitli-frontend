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
    },
    requestMembership(pk){
        const url = `/memberships/${pk}/request/`
        return defaultAPIInstance.post(url)
    },
    getRequestsHistory(page){
        if (page){
            const url = `/memberships-requests/?page=${page}`
            return defaultAPIInstance.get(url)
        }
        const url = `/memberships-requests/`
        return defaultAPIInstance.get(url)
    }
}
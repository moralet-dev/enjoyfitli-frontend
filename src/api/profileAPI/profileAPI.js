import {defaultAPIInstance} from "@/api";


export const profileAPI = {
    getMyMemberships(){
        const url = '/memberships/me/'
        return defaultAPIInstance.get(url)
    },
    getMemberships(pk=null){
        const url = `/memberships/${pk?pk:''}`
        return defaultAPIInstance.get(url)
    },
    createUserMembership(pk){
        const url = `/memberships/${pk}/create/`
        return defaultAPIInstance.post(url)
    },
    requestMembership(pk, orderId){
        const url = `/memberships/${pk}/request/`
        return defaultAPIInstance.post(url, {'order_id': orderId})
    },
    getRequestsHistory(id = null, page = null){
        if (page){
            const url = `/memberships-requests/?page=${page}`
            return defaultAPIInstance.get(url)
        }
        const url = `/memberships-requests/${id?id:''}`
        return defaultAPIInstance.get(url)
    }
}
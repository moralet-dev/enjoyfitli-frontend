import {defaultAPIInstance} from "@/api";


export const profileAPI = {
    getMyMemberships(){
        const url = '/my-memberships/?active=true'
        return defaultAPIInstance.get(url)
    }
}
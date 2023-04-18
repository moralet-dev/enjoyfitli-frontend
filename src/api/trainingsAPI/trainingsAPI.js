import {defaultAPIInstance} from "@/api";

export const trainingsAPI = {
    getGroupTrainings(params) {
        const url = '/group-trainings/'
        if (params){
            return defaultAPIInstance.get(url, {
                params: params
            })
        }
        return defaultAPIInstance.get(url)
    },
    getMyGroupTrainings(){
        const url = '/group-trainings/me'
        return defaultAPIInstance.get(url)
    },
    singGroupTraining(id){
        const url = `/group-trainings/${id}/sign/`
        return defaultAPIInstance.post(url)
    },
    unsignGroupTraining(id){
        const url = `/group-trainings/${id}/unsign`
        return defaultAPIInstance.delete(url)
    },
    getTrTypes(){
        const  url = `/tr-types/`
        return defaultAPIInstance.get(url)
    }
}
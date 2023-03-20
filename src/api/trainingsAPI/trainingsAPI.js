import {defaultAPIInstance} from "@/api";

export const trainingsAPI = {
    getGroupTrainings() {
        const url = '/group-trainings/'
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
}
import {defaultAPIInstance} from "@/api";

export const trainingsAPI = {
    getGroupTrainings() {
        const url = '/group-trainings/'
        return defaultAPIInstance(url)
    },
    getMyGroupTrainings(){
        const url = '/group-trainings/me'
        return defaultAPIInstance(url)
    }
}
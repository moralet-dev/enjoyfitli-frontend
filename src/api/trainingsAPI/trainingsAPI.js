import {defaultAPIInstance} from "@/api";

export const trainingsAPI = {
    getGroupTrainings() {
        const url = '/group-trainings/'
        return defaultAPIInstance(url)
    }
}
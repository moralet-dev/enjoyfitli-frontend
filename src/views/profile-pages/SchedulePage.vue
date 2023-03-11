<template>
  <div v-for="t in trainingsList">
    <div v-for="i in t">
      {{ i }}
    </div>
  </div>
</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";

export default {
  name: "SchedulePage",
  data(){
    return{
      trainingsList: null,
    }
  },
  beforeMount() {
    this.getGroupTrainingsList()
  },
  methods:{
    async getGroupTrainingsList(){
      this.trainingsList = await trainingsAPI.getGroupTrainings().then(response => {
        console.log(response.data.results)
        return response.data.results
      })
    }
  }
}
</script>

<style scoped>

</style>
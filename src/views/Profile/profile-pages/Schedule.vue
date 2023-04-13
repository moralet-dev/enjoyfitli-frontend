<template>
  <div class="">
    <div class="title-wrapper">
      <h3>My Trainings:</h3>
    </div>
    <div v-if="trainingsList" class="trainings-block" v-for="t in trainingsList">
      <h4>Training:</h4>
      <div class="training" >
        <div class="item"><span>Name:</span> {{ t.name }}</div>
        <div class="item"><span>Type:</span> {{ t.type.name }}</div>
        <div class="item"><span>Specification:</span> {{ t.specification.name }}</div>
        <div class="item"><span>When:</span> {{ new Date(t.when).toLocaleString() }}</div>
        <div class="item"><span>Where:</span> {{ t.where }}</div>
        <div class="item unsign"><button type="button" v-on:click="onUnsign(t.id)">X Unsign</button></div>

      </div>
    </div>
  </div>

</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";

export default {
  name: "SchedulePage",
  data() {
    return {
      trainingsList: null,
    }
  },

  beforeMount() {
    this.getGroupTrainingsList()
  },
  methods: {
    async getGroupTrainingsList() {
      this.trainingsList = await trainingsAPI.getMyGroupTrainings().then(response => {
        return response.data.results
      })
    },
    async onUnsign(id){
      await trainingsAPI.unsignGroupTraining(id).then(() => {
        this.getGroupTrainingsList()
      })
    }
  }
}
</script>

<style scoped>
.title-wrapper {
  padding: 0.5em 0 1rem 0;
}

h3 {
  font-size: 30px;
}
.trainings-block{
  padding: 1rem 0;
}
.training {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  border-bottom: solid 1px rgb(217, 217, 217);
}
.item{
  padding: 1rem 0;
  text-align: center;
}
.item span{
  display: block;
  font-weight: 600;
  padding: 0 0 0.5rem 0;
  color: var(--color-headings);
}
.unsign{
  display: flex;
  justify-content: center;
  align-items: center;
}
.unsign button{
  padding: .5rem;
  background-color: transparent;
  transition: 0.3s, transform 2s;
  transition-timing-function: ease-in-out;
  border-radius: 10px;
  color: var(--color-link);
  border: 2px solid darkred;
}
.unsign button:hover{
  border: none;
  background-color: darkred;
  color: var(--color-link-hover);
}
</style>
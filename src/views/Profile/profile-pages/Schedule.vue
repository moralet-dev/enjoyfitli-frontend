<template>
  <div class="">
    <div class="title-wrapper">
      <h2>{{ this.$t('ProfilePage.myTrainings') }}:</h2>
    </div>
    <div v-if="trainingsList?.length > 0" class="trainings-list__wrapper">
      <WeekTrainings :isProfile="true" :daily-tr="trainingsList" @rescind="onRescind" :key="trainingsList"/>
    </div>
    <div v-else-if="trainingsList?.length <= 0" class="trainings-block animate__animated animate__fadeIn">
      <p>{{ this.$t('ProfilePage.noGroupTrainings') }}</p>
    </div>
    <div v-else>
      <PreloaderSmall/>
    </div>
  </div>

</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import WeekTrainings from "@/views/Schedule/WeekTrainings.vue";

export default {
  name: "SchedulePage",
  components: {WeekTrainings, PreloaderSmall},
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
    async onRescind(id) {
      console.log('onRescind father')
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
.trainings-list__wrapper {
  padding: 0 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 70vh;
}
h2 {
  font-size: 40px;
}

.trainings-block {
  padding: 1rem 0;
}
.trainings-block p{
  font-size: 22px;
  text-transform: capitalize;
}




@media(max-width: 991px){
}
@media (max-width: 767px) {
  h2 {
    font-size: 30px;
  }


}
</style>
<template>
  <div class="">
    <div class="title-wrapper">
      <h3>{{ $t('personalTrainings') }}:</h3>
    </div>
    <div v-if="trainingsList?.length > 0" class="trainings-block animate__animated animate__fadeIn">
      <PersonalWeekTrainings :trainings="trainingsList" @toggle="toggle"/>
    </div>
    <div v-else-if="trainingsList?.length <= 0" class="trainings-block animate__animated animate__fadeIn">
      <p>{{ $t('noPersonalTrainings') }}</p>
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
import PersonalWeekTrainings from "@/views/Profile/profile-pages/PersonalWeekTrainings.vue";

export default {
  name: "PersonalTrainings",
  data(){
    return{
      trainingsList: null,
    }
  },
  beforeMount() {
    this.getPersonalTr()
  },
  components: {PersonalWeekTrainings, WeekTrainings, PreloaderSmall},
  methods:{
    async getPersonalTr(){
      this.trainingsList = await trainingsAPI.getPersonalTrainings().then(response=>response.data.results)
    },
    async toggle(id){
      await trainingsAPI.userConfirmPersonal(id).then(()=>{
        this.getPersonalTr()
      })
    },
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

.trainings-block {
  padding: 1rem 0;
}
.trainings-block p{
  text-transform: capitalize;
}

.item span {
  display: block;
  font-weight: 600;
  padding: 0 0 0.5rem 0;
  word-wrap: break-word;
  color: var(--color-text);
  text-transform: capitalize;
}
@media (max-width: 767px) {
  h3 {
    font-size: 25px;
  }
}
</style>
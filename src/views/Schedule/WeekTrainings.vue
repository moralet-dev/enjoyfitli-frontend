<template>
  <div class="wrapper">
    <div v-if="dailyTr?.length>0" class="trainings-list">
      <div v-for="tr in dailyTr" :key="tr.id">
        <div class="animate__animated animate__fadeIn" >
          {{ tr }}
        </div>
      </div>
    </div>
    <div v-else-if="dailyTr?.length === 0" class="no-trainings animate__animated animate__fadeIn" :key="`${randomFloat}`">
      <p>No trainings</p>
    </div>
    <div v-else class="preloader">
      <PreloaderSmall/>
    </div>
  </div>
</template>

<script>
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";

export default {
  name: "WeekTrainings",
  components: {PreloaderSmall},
  props: {
    dailyTr: {
      type: Array,
      default: null,
    }
  },
  updated() {
    this.randomFloat = Math.random()
  },
  mounted() {
  },
  data: () => ({
    randomFloat: Math.random()
  }),
  methods: {}
}
</script>

<style scoped>
.wrapper{
  max-height: 80vh;
  overflow: hidden;
  overflow-y: scroll;
}
.trainings-list{
  padding: 0 2rem;
}
</style>
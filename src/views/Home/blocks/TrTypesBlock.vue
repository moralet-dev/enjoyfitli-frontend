<template>
  <div class="wrapper">
    <div class="title">
      <h2>Training Types</h2>
      <span>Join and learn more about trainings</span>
    </div>
    <HomeTrTypesSwiper v-if="types" :types="this.types"/>
    <div v-else>
      <PreloaderSmall/>
    </div>
  </div>
</template>

<script>
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import HomeTrTypesSwiper from "@/components/HomeTrTypesSwiper.vue";


export default {
  name: "TrTypesBlock",
  components: {
    HomeTrTypesSwiper,
    PreloaderSmall,
  },
  data() {
    return {
      types: null,
      showModal: false,
      current: null,
      nextMessage: null,
      showNextModal: false,
    }
  },
  mounted() {
    this.getTrTypes()
  },
  methods: {
    async getTrTypes() {
      this.types = await trainingsAPI.getTrTypes().then(response => response.data.results)
    },
    next() {
      this.$refs.carousel.next()
    },
    prev() {
      this.$refs.carousel.prev()
    },
  }
}
</script>

<style scoped>
.wrapper{}
</style>
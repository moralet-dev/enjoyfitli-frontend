<template>
  <div class="wrapper">
    <div class="title">
      <h2>{{ $t('trainingTypes') }}</h2>
      <span>{{$t('homePage.trTypesSubtitle')}}</span>
    </div>
    <TrTypesSwiper v-if="types" :types="this.types"/>
    <div v-else class="loader">
      <PreloaderSmall icon-color="var(--color-headings)"/>
    </div>
  </div>
</template>

<script>
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import TrTypesSwiper from "@/views/Home/blocks/TrTypesSwiper.vue";
import SchedulePage from "@/views/Profile/profile-pages/Schedule.vue";


export default {
  name: "TrTypesBlock",
  components: {
    SchedulePage,
    TrTypesSwiper,
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
.wrapper{
  background: var(--color-elements);
  padding: 3rem 0;
}
.title{
  padding: 2rem 9rem 5rem 9rem;
}
h2{
  color: var(--color-headings);
  font-size: 50px;
  margin-bottom: 1rem;
}
.title span{
  color: var(--color-headings);
}
@media (min-width: 768px) and (max-width: 991px) {
  .title{
    padding: 2rem 5rem 2rem 5rem;
  }
}
@media (max-width: 767px) {
  h2{
    font-size: 30px;
  }
  .title{
    padding: 2rem 1rem 2rem 1rem;
  }
}
</style>
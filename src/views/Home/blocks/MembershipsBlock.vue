<template>
  <div class="wrapper">
    <div class="title">
      <h2>{{ this.$t('memberships') }}</h2>
      <span>Оберіть абонемент, який вам найбільш імпонує</span>
    </div>
    <MembershipTypedList v-if="types && memberships" :types="this.types" :memberships="this.memberships"/>
    <div v-else>
      <PreloaderSmall/>
    </div>
  </div>
</template>

<script>
import MembershipTypedList from "@/views/Home/blocks/MembershipTypedList.vue";
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import {profileAPI} from "@/api/profileAPI/profileAPI";

export default {
  name: "MembershipsBlock",
  components: {PreloaderSmall, MembershipTypedList},
  data: () => ({
    memberships: null,
    types: null,
  }),
  mounted() {
    this.getTypes()
    this.getMemberships()
  },
  methods: {
    async getTypes(){
      this.types = await trainingsAPI.getTrTypes().then(response => response.data.results)
    },
    async getMemberships() {
      this.memberships = await profileAPI.getMemberships().then(response => response.data.results)
    }
  }
}
</script>

<style scoped>
.wrapper{
  padding: 3rem 0;
}
.title{
  padding: 2rem 9rem;
}
h2{
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
  .title{
    padding: 2rem 1rem 2rem 1rem;
  }
}
</style>
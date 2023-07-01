<template>
  <div class="" v-if="trType">
    <div class="title">
      <h1>{{ trType[`name_${this.$store.getters.getLocale}`] || trType?.name }} {{ this.$t('training') }}</h1>
    </div>
    <div class="detail-content">
      <div class="detail-content__image">
        <img :src="trType?.image" alt="training type image">
      </div>
    </div>
  </div>
</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";

export default {
  name: "TypeDetail",
  data: () => ({
    trType: null
  }),
  mounted() {
    this.getTypeDetail(this.$route.query.typeID)
  },
  methods: {
    async getTypeDetail(id) {
      this.trType = await trainingsAPI.getTrTypeDetail(id).then(response => response.data).catch(reason => {
        console.log(reason.response)
      })
    }
  }
}
</script>

<style scoped>
h1 {
  text-transform: uppercase;
}
.detail-content__image{
  width: 110px;
  height: fit-content;
}
.detail-content__image img{
  width: 100%;
  height: 100%;
  object-fit: cover;

}
</style>
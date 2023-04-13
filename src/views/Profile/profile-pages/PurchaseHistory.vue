<template>
  <div class="">
    <div v-for="i in purchaseList" class="" :key="i.id">
      <div class="">{{i.id}}</div>
      <div class="">{{i.status}}</div>
      <div class="">{{i.membership}}</div>
      <div class="">{{new Date(i.date).toLocaleString()}}</div>
    </div>
  </div>
</template>

<script>
import {profileAPI} from "@/api/profileAPI/profileAPI";

export default {
  name: "PurchaseHistoryPage",
  data() {
    return {
      purchaseList: null,
    }
  },
  beforeMount() {
    this.getHistory()
  },
  methods: {
    async getHistory() {
      this.purchaseList = await profileAPI.getRequestsHistory().then(response => response.data.results)
    }
  }
}
</script>

<style scoped>

</style>
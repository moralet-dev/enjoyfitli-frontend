<template>
  <div class="animate__animated animate__slideInLeft">
    <div class="title-wrapper">
      <h3>My Purchases:</h3>
    </div>
    <div class="purchase">
      <div class="block"><span>Purchase id</span></div>
      <div class="block"><span>Status</span></div>
      <div class="block"><span>Membership</span></div>
      <div class="block"><span>Date</span></div>
    </div>
    <div v-for="i in purchaseList" class="purchase animate__animated animate__fadeIn" :key="i.id">
      <div class="block"> {{ i.id }}</div>
      <div class="block"> {{ i.status }}</div>
      <div class="block"> {{ i.membership }}</div>
      <div class="block"> {{ new Date(i.date).toLocaleString() }}</div>
    </div>
    <div class="">
      <Pagination :pageCount="pageCount" @page="toPage"/>
    </div>
  </div>
</template>

<script>
import {profileAPI} from "@/api/profileAPI/profileAPI";
import Pagination from "@/components/Pagination.vue";
import 'animate.css'

export default {
  name: "PurchaseHistoryPage",
  components: {Pagination},
  data() {
    return {
      purchaseList: null,
      pageCount: null,
    }
  },
  beforeMount() {
    this.getHistory()
  },
  methods: {
    async getHistory() {
      await profileAPI.getRequestsHistory().then(response => {
        this.purchaseList = response.data.results
        this.pageCount = Math.ceil(response.data.count/2)
      })
    },
    async toPage(page){
      await profileAPI.getRequestsHistory(page).then(response=>{
        this.purchaseList = response.data.results
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

.purchase {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid crimson;
}

.purchase .block {
  display: flex;
  flex: 0 0 25%;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0;
  text-align: center;
  align-items: center;
  text-transform: uppercase;
}

.purchase .block span {
  display: block;
  padding: 1rem 0;
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>
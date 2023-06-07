<template>
  <div>
    <div class="title-wrapper">
      <h3>{{ this.$t('ProfilePage.myPurchases') }}:</h3>
    </div>
    <div class="purchase">
      <div class="block"><span>{{ this.$t('ProfilePage.purchaseID') }}</span></div>
      <div class="block"><span>{{ this.$t('status') }}</span></div>
      <div class="block"><span>{{ this.$t('membership') }}</span></div>
      <div class="block"><span>{{ this.$t('date') }}</span></div>
    </div>
    <div v-if="purchaseList" v-for="i in purchaseList" class="purchase animate__animated animate__fadeIn" :key="i.id">
      <div class="block"> {{ i.id }}</div>
      <div class="block"> {{ this.$t(`ProfilePage.${i.status}`) }}</div>
      <div class="block"> {{ i.membership }}</div>
      <div class="block"> {{ new Date(i.date).toLocaleString() }}</div>
    </div>
    <div class="loader animate__animated animate__fadeIn" v-else>
      <PreloaderSmall/>
    </div>
    <div class="" v-if="purchaseList?.length > 10">
      <Pagination :pageCount="pageCount" @page="toPage"/>
    </div>
  </div>
</template>

<script>
import {profileAPI} from "@/api/profileAPI/profileAPI";
import Pagination from "@/components/Pagination.vue";
import 'animate.css'
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "PurchaseHistoryPage",
  components: {PreloaderSmall, Pagination},
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
  border-bottom: 2px solid #f2f2f2;
}

.purchase .block {
  display: flex;
  flex: 0 0 20%;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
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
.loader{
  display: flex;
  margin-top: 1rem;
}
@media (max-width: 767px) {
  .purchase{
    flex-wrap: wrap;
  }
}
</style>
<template>
  <div >
    <div class="title-wrapper">
      <h3>{{ this.$t('myPurchases') }}:</h3>
    </div>
    <div class="">
      <Pagination v-if="pageCount" :pageCount="pageCount" @page="toPage"/>
    </div>
    <div v-if="purchaseList" class="purchase-wrapper">
      <div v-for="i in purchaseList"
           :class="{'purchase animate__animated animate__fadeIn':true, 'ok': i?.status === 'confirmed',
         'declined': i?.status === 'declined' }"
           :key="i.id">
        <div class="block">
          <span>{{ $t('purchaseID') }}: </span>
          <span>{{ i.id }}</span>
        </div>
        <div class="block">
          <span>{{ $t('status') }}: </span>
          <span>{{ $t(`${i.status}`) }}</span>
        </div>
        <div class="block">
          <span>{{ $t('membership') }}: </span>
          <span>{{ i.membership }}</span>
        </div>
        <div class="block">
          <span>{{ $t('date') }}: </span>
          <span>{{ new Date(i.date).toLocaleString() }}</span>
        </div>
      </div>

    </div>
    <div class="loader animate__animated animate__fadeIn" v-else>
      <PreloaderSmall/>
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
        this.pageCount = Math.ceil(response.data.count/5)
      })
    },
    async toPage(page){
      await profileAPI.getRequestsHistory(null, page).then(response=>{
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
.purchase-wrapper{
  max-height: 50vh;
  overflow: hidden;
  overflow-y: scroll;
}
.purchase {
  display: flex;
  background: var(--color-background-header) ;
  color: var(--color-header-text);
  grid-template-columns: 25vw 25vw 25vw 25vw;
  flex-direction: column;
  padding: 1rem;
  margin: .5rem 1rem .5rem ;
  border-radius: 25px;

}
.ok{
  background: radial-gradient(circle at left, var(--color-background-header) 60%, lightseagreen 100%);
}
.declined{
  background: radial-gradient(circle at left, var(--color-background-header) 60%, lightcoral 100%);
}
.purchase .block {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  text-transform: capitalize;
}

.purchase .block span {
  flex: 0 1 auto;
  padding: .5rem;
  text-align: center;
  word-wrap: break-word;
}
.purchase .block span:first-child{

}
.loader{
  display: flex;
  margin-top: 1rem;
}
@media (max-width: 767px) {
  h3 {
    font-size: 25px;
  }
  .title-wrapper{
    padding: 1rem 0 0 0;
  }
  .purchase{
    flex-wrap: wrap;
  }
}
</style>
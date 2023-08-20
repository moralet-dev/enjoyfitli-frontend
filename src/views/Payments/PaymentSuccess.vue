<template>
<div class="wrapper">
  <div class="content" v-if="req?.id && req?.status === 'confirmed' && me.id === req?.user">
    <h2>{{$t('paidSuccessfully')}}</h2>
    <div class="">
      <p>{{$t('paymentData')}}</p>
      <div class="">
        <p>{{$t('requestID')}}: {{req.id}}</p>
        <p>{{$t('membership')}}: {{req.membership}}</p>
        <p>{{$t('orderID')}}: {{req.order_id}}</p>
        <p>{{$t('status')}}: {{req.status}}</p>
        <p>{{$t('date')}}: {{ new Date(req.date).toLocaleString() }}</p>
      </div>
    </div>
  </div>
  <div class="" v-else-if="req?.id && req?.status === 'confirmed' && me.id !== req?.user">
    <p>Permission denied</p>
  </div>
  <div class="preloader" v-else>
    <preloader-small/>
  </div>
</div>
</template>

<script>
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import {profileAPI} from "@/api/profileAPI/profileAPI";

export default {
  name: "PaymentSuccess",
  components: {PreloaderSmall},
  data:()=>({
    req: null,
    me: null,
  }),
  mounted() {
    this.me = this.$store.getters['authModule/getCurrentUser']
    if (this.me?.id){
      this.getRequest(this.$route?.params?.id)
    }
  },
  methods:{
    async getRequest(id){
      await profileAPI.getRequestsHistory(id, null).then(response=>{
        this.req = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
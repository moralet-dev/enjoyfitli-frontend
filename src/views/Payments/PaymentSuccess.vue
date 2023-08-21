<template>
<div class="wrapper">
  <div class="content" v-if="req?.id && req?.status === 'confirmed' && me.id === req?.user">
    <p class="title">{{$t('paidSuccessfully')}}!</p>
    <div class="content">
      <p>{{$t('paymentData')}}:</p>
      <div class="detail">
        <p><em>{{$t('requestID')}}</em>: {{req.id}}</p>
        <p><em>{{$t('membership')}}</em>: {{req.membership}}</p>
        <p><em>{{$t('orderID')}}</em>: {{req.order_id}}</p>
        <p><em>{{$t('status')}}</em>: {{$t(`${req.status}`)}}</p>
        <p><em>{{$t('date')}}</em>: {{ new Date(req.date).toLocaleString() }}</p>
      </div>
    </div>
    <p class="note">*{{$t('paymentSuccessNote')}}<br><a href="tel:+380737304509" class="text-link">+380 (73) 730 45 09</a></p>
    <div class="links">
      <router-link class="btn" :to="{name:'my-memberships'}">{{ $t('myMemberships') }}</router-link>
      <router-link class="btn" :to="{name:'schedule'}">{{$t('schedule')}}</router-link>
      <router-link class="btn" :to="{name:'contacts'}">{{$t('contacts')}}</router-link>
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
.wrapper{
  padding: 3rem 9rem;
}
.title{
  font-family: 'Playfair Display', serif;
  font-size: 40px;
}
.content, .detail{
  margin: 1rem 0;
}
.detail p{
  margin: .5rem;
}
.detail p:first-letter{
  text-transform: uppercase;
}
.detail p em{
  text-decoration: underline;
}
.note{
  font-size: 14px;
}
.links{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 3rem;
}
.links .btn{
  display: inline-block;
}
@media (max-width: 991px) {
  .wrapper{
    padding: 3rem 5rem;
  }
  .title{
    font-size: 30px;
  }
}
@media (max-width: 767px) {
  .wrapper{
    padding: 3rem 1rem;
  }
  .links{
    flex-direction: column;
  }
  .links .btn{
    margin-bottom: 1rem;
  }
}
</style>
<template>
  <div class="">
    <h3>My Memberships</h3>
    <div v-if="isMembList">
      {{ membList }}
    </div>
    <div v-else-if="!isMembList">
      <p>You are haven't any memberships</p>
    </div>
    <button v-on:click="getMemberships">cloa</button>
  </div>
</template>

<script>
import {profileAPI} from "@/api/profileAPI";

export default {
  name: "MembershipPage",
  data() {
    return {
      membList: null,
    }
  },
  beforeMount() {
    console.log('before mount')
    this.getMemberships()
  },
  computed: {
    isMembList(){
      console.log('computed')
      if (this.membList){
        return this.membList.length > 0;
      } else {
        return false
      }
    }
  },
  methods:{
    async getMemberships(){
      this.membList = await profileAPI.getMyMemberships().then(response => {
        return response.data.results
      })
    }
  }
}
</script>

<style scoped>

</style>
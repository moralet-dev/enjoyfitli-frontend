<template>
  <a v-if="isAuth === 'true'" href="#" v-on:click="onLogoutClick" >Logout</a>
  <a v-if="isAuth === 'false'" href="#" v-on:click="onLogoutClick" >Login</a>

</template>


<script>
export default {
  name: "Logout",
  data(){
    return {
      isAuth: this.$store.getters['authModule/isAuthenticated']
    }
  },
  methods: {
    onLogoutClick(){
      this.$store.dispatch('authModule/onLogout')
      this.isAuth = this.$store.getters['authModule/isAuthenticated']
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
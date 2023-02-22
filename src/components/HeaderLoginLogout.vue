<template>
  <div class="login-container" >
    <a v-if="getIsAuth" href="#" v-on:click="onLogoutClick" >Logout</a>
    <router-link v-else-if="!getIsAuth" to="/login">Login</router-link>
  </div>
</template>


<script>
export default {
  name: "HeaderLoginLogout",
  data(){
    return {
      isAuth: this.$store.getters['authModule/isAuthenticated'],
    }
  },

  computed: {
    getIsAuth() {
      this.isAuth = this.$store.getters['authModule/isAuthenticated']
      return this.isAuth !== 'false'
    }
  },

  methods: {
    onLogoutClick(){
      this.$store.dispatch('authModule/onLogout')
      this.isAuth = 'false'
      this.$router.push('/login')
    },
  }
}
</script>

<style scoped>
.login-container{
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;

}
.login-container a{
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  font-weight: bold;
}
.login-container a:hover{
  background-color: transparent;
  box-shadow: 0 0 10px #000000;
  text-decoration: underline;
}
</style>
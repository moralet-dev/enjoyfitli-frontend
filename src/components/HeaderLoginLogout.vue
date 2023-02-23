<template>
  <div class="login-container" >
    <router-link v-if="getIsAuth" to="profile">Profile</router-link>
    <span v-if="getIsAuth" v-on:click="onLogoutClick"><LogoutIcon width="15" height="15"/></span>
    <router-link v-else-if="!getIsAuth" to="login">Login</router-link>
  </div>
</template>


<script>
import LogoutIcon from "@/components/LogoutIcon.vue";

export default {
  name: "HeaderLoginLogout",
  components: {LogoutIcon},
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
  justify-content: end;

}
.login-container a, .login-container span{
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  font-weight: bold;
}
.login-container span{
  cursor: pointer;
  transition: 0.4s;
}
.login-container a:hover, .login-container span:hover{
  background-color: transparent;
  box-shadow: 0 0 10px #000000;
  text-decoration: underline;
}
</style>
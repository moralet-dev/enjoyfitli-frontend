<template>
  this is profile for user
  <button v-on:click="getMe">Click</button>
  {{ me }}
  <Logout/>
</template>

<script>
import {authAPI} from "@/api/authAPI";
import Logout from "@/components/Logout.vue";

export default {
  name: "ProfilePage",
  components: {Logout},
  data() {
    return {
      me: null
    }
  },
  beforeCreate() {
    if (this.$store.getters['authModule/isAuthenticated'] === 'false'
        || !this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push('/login')
    }
  },
  beforeMount() {
    this.getMe()
  },
  methods: {
    getMe() {
      authAPI.getMe().then(response => this.me = response.data).catch(() => this.me = null)
    }
  }
}
</script>

<style scoped>

</style>
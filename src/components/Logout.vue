<template>
<div class="">
  <button v-on:click="onLogoutClick">Logout</button>
</div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    onLogoutClick(){
      this.$store.dispatch('authModule/onLogout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
<template>
<div class="wrapper">
  <h1>Error 404 <br> {{ this.$t('pageNotFound') }} :( </h1>
  <router-link to="/">{{ this.$t('home')}}</router-link>

</div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.wrapper{
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapper h1{
  font-size: 35px;
  text-align: center;
  margin-bottom: 3rem;
}
.wrapper a{
  text-transform: capitalize;
  padding: 1rem;
  border-radius: 10px;
}
@media (max-width: 991px) {
  .wrapper{
    padding: 9rem 1rem 0 1rem;
  }
}
</style>
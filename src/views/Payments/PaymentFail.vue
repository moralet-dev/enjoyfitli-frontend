<template>
  <div class="wrapper">
    <div class="content"></div>
    <div class="preloader">
      <preloader-small/>
    </div>
  </div>
</template>

<script>
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "PaymentFail",
  components: {PreloaderSmall}
}
</script>

<style scoped>

</style>
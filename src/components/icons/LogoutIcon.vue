<template>
  <svg :width="width" :height="height" viewBox="0 0 28 28" :fill="iconColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.9 15.5V12.8H6.75V8.75L0 14.15L6.75 19.55V15.5H18.9Z" fill="black"/>
    <path d="M24.2992 2H12.1492C10.6602 2 9.44922 3.21095 9.44922 4.7V10.1H12.1492V4.7H24.2992V23.6H12.1492V18.2H9.44922V23.6C9.44922 25.089 10.6602 26.3 12.1492 26.3H24.2992C25.7883 26.3 26.9992 25.089 26.9992 23.6V4.7C26.9992 3.21095 25.7883 2 24.2992 2Z" fill="black"/>
  </svg>
</template>

<script>

export default {
  name: "LogoutIcon",
  props:{
    width:{
      type: [Number, String],
      default: 28,
    },
    height:{
      type: [Number, String],
      default: 28,
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
  },
}
</script>

<style scoped>

</style>
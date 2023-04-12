<template>
  <svg :width="width" :height="height" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.9999 13C25.9999 19.618 20.5783 25 13.8691 25C7.15998 25 1.73828 19.618 1.73828 13C1.73828 6.382 7.15998 1 13.8691 1C20.5783 1 25.9999 6.382 25.9999 13Z" stroke="#616161" stroke-width="2"/>
    <rect x="20" y="12" width="2" height="12" transform="rotate(90 20 12)" fill="#616161"/>
    <rect v-if="!isMinus" x="15" y="19" width="2" height="12" transform="rotate(180 15 19)" fill="#616161"/>
  </svg>
</template>

<script>
export default {
  name: "PlusIcon",
  props:{
    isMinus:{
      type: Boolean,
      default: false
    },
    width:{
      type: [Number, String],
      default: 26,
    },
    height:{
      type: [Number, String],
      default: 26,
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
  }
}
</script>

<style scoped>

</style>
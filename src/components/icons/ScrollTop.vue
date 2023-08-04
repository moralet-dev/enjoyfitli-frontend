<template>
  <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"
       transform="matrix(1, 0, 0, 1, 0, 0)">
    <g id="SVGRepo_bgCarrier" stroke-width="0">
      <path transform="translate(-2.4, -2.4), scale(1.7999999999999998)" :fill="iconBg"
            d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
            strokewidth="0"></path>
    </g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M12 4L12 20" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M18 10L12.0625 4.0625V4.0625C12.028 4.02798 11.972 4.02798 11.9375 4.0625V4.0625L6 10" :stroke="iconColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: "ScrollTop",
  props: {
    iconColor: {
      type: String,
      default: '#000000'
    },
    iconBg: {
      type: String,
      default: '#ffffff'
    }
  }
}
</script>

<style scoped>
svg {
  cursor: pointer;
}
</style>
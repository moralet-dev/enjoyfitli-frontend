<template>
  <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"
       stroke="#000000" stroke-width="0.00024000000000000003">
    <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)">
      <path transform="translate(-2.4, -2.4), scale(1.7999999999999998)" :fill="iconBg"
            d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
            strokewidth="0"></path>
    </g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
       stroke-width="0.048"></g>
    <g id="SVGRepo_iconCarrier">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12.0006 10.9409L9.53062 8.46979L8.46973 9.53021L12.0006 13.0626L15.5315 9.53021L14.4706 8.46979L12.0006 10.9409Z"
            :fill="iconColor"></path>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12.0006 14.9409L9.53062 12.4698L8.46973 13.5302L12.0006 17.0626L15.5315 13.5302L14.4706 12.4698L12.0006 14.9409Z"
            :fill="iconColor"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: "ScrollTop",
  props:{
    iconColor:{
      type: String,
      default: '#000000'
    },
    iconBg:{
      type: String,
      default: '#ffffff'
    }
  }
}
</script>

<style scoped>
svg{
  cursor: pointer;
}
</style>
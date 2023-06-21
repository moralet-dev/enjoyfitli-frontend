<template>
  <div class="preloader-small">
    <div class="loader-small"></div>
  </div>
</template>

<script>
export default {
  name: "PreloaderSmall",
}
</script>

<style scoped>
.preloader-small {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.loader-small {
  border: 5px solid var(--color-headings);
  border-top: 5px solid var(--color-link-text);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
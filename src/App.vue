<script setup>
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
</script>

<template>
  <Header/>
  <main>
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </main>
    <Footer/>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

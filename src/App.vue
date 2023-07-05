<template>
  <Header v-if="serverAvailable"/>
  <main v-if="serverAvailable">
    <router-view v-slot="{Component, route}">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="`app_${route.fullPath}`"/>
      </transition>
    </router-view>
  </main>
  <div class="unavailable animate__animated animate__slideInDown" v-else-if="serverAvailable===false">
    <h6>Server is unavailable:(</h6>
    <p>We're working on it. Please, try again later on report about the problem, if it seems strange</p>
    <GearAnimatedIcon/>
  </div>
  <Footer v-if="serverAvailable"/>
</template>

<script>
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import GearAnimatedIcon from "@/components/icons/GearAnimatedIcon.vue";
import {pingRequest} from "@/api";
import {ro} from "vuetify/locale";

export default {
  computed: {
    ro() {
      return ro
    }
  },
  components: {
    GearAnimatedIcon,
    Header,
    Footer,
  },
  data() {
    return {
      serverAvailable: null,
    };
  },

  async beforeCreate() {
    try {
      await pingRequest();
      this.serverAvailable = true;
    } catch (error) {
      this.serverAvailable = false;
    }
  },
}
</script>
<style scoped>
main{
  min-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.unavailable{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.unavailable h6{
  font-size: 35px;
  text-transform: none;
  padding: 2rem;
}
</style>

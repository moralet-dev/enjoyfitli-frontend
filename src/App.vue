<template>
  <Header v-if="serverAvailable"/>
  <main v-if="serverAvailable">
    <router-view v-slot="{Component, route}">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="`app_`"/>
      </transition>
    </router-view>
    <div v-if="serverAvailable && $vuetify.display.mdAndDown"
         class="scroll-top animate__animated" @click="scrollTop" ref="scroller">
      <ScrollTop icon-color="var(--vt-c-blue-mute)" icon-bg="#FFFFFF80"/>
    </div>
  </main>
  <Footer v-if="serverAvailable"/>
  <AcceptCookie v-if="serverAvailable"/>
  <div class="unavailable animate__animated animate__slideInDown" v-else-if="serverAvailable===false">
    <h6>Server is unavailable:(</h6>
    <p>We're working on it. Please, try again later on report about the problem, if it seems strange</p>
    <GearAnimatedIcon/>
  </div>
</template>

<script>
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import GearAnimatedIcon from "@/components/icons/GearAnimatedIcon.vue";
import {pingRequest} from "@/api";
import {authAPI} from "@/api/authAPI/authAPI";
import AcceptCookie from "@/components/AcceptCookie.vue";
import ScrollTop from "@/components/icons/ScrollTop.vue";

export default {
  components: {
    ScrollTop,
    AcceptCookie,
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
      if (this.$store.getters['authModule/isAuthenticated']){
        await this.getMe()
      }
      this.serverAvailable = true;
    } catch (error) {
      this.serverAvailable = false;
    }
  },
  mounted() {
    let scrolled = false
    window.addEventListener('scroll', ()=>{
      if (window.scrollY > 1000){
        this.$refs.scroller.classList.remove('animate__fadeOutRight')
        this.$refs.scroller.classList.add('visible', 'animate__fadeInRight')
        scrolled = true
      }
      if (scrolled && window.scrollY < 1000){
        this.$refs.scroller.classList.remove('visible', 'animate__fadeInRight')
        this.$refs.scroller.classList.add('animate__fadeOutRight')
        scrolled = false
      }
    })
  },
  methods:{
    async getMe() {
      await authAPI.getMe().then(response => {
        this.$store.dispatch('authModule/onCurrentUserSet', response.data)
      }).catch((reason) => {
      })
    },
    scrollTop(){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }
}
</script>
<style scoped>
main{
  min-height: 100vh;
  margin: 79px 0 0 0;

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
.scroll-top{
  opacity: 0;
  position: fixed;
  z-index: 9999;
  bottom: 5lvh;
  right: 5vw;
  width: 60px;
  height: 60px;
  transition: .3s;
}
.visible{
  transition: .3s;
  opacity: 1;
}
</style>

<template>
  <div class="login-container" v-if="getIsAuth" :class="{'slide-in-left': getIsAuth,'slide-out-right': !getIsAuth}">
    <router-link :to="{name: 'profile'}">Profile</router-link>
    <a class="logout-button" v-on:click="onLogoutClick">
      <LogoutIcon width="15" height="15"/>
    </a>
  </div>
  <div v-else class="login-container" :class="{'slide-in-left': !getIsAuth, 'slide-out-right': getIsAuth}">
    <a ref="login-popup" v-on:click="openPopup('login')">Login</a>
    <a v-on:click="openPopup('reg')">Registration</a>
  </div>
  <ModalLogin :show="this.$store.getters['getTriggerLoginPopup']" @close="closePopup('login')"/>
  <ModalReg :show="this.$store.getters['getTriggerRegPopup']" @close="closePopup('reg')"/>
</template>


<script>
import LogoutIcon from "@/components/icons/LogoutIcon.vue";
import ModalLogin from "@/components/Modals/ModalLogin.vue";
import ModalReg from "@/components/Modals/ModalReg.vue";

export default {
  name: "HeaderLoginLogout",
  components: {ModalLogin, LogoutIcon, ModalReg},
  data() {
    return {
      currentUserId: this.$store.getters['authModule/getCurrentUser'].id,
      showLoginModal: false,
    }
  },

  computed: {
    getIsAuth() {
      this.currentUserId = this.$store.getters['authModule/getCurrentUser'].id
      return Boolean(this.currentUserId)
    },
  },

  methods: {
    onLogoutClick() {
      this.$store.dispatch('authModule/onLogout')
      this.currentUserId = null
      this.$router.push('/')
    },
    openPopup(t) {
      switch (t) {
        case 'login': {
          this.$store.dispatch('onOpenLoginPopup')
          break
        }
        case 'reg': {
          this.$store.dispatch('onOpenRegPopup')
          break
        }
      }
    },
    closePopup(t) {
      switch (t) {
        case 'login': {
          this.$store.dispatch('onCloseLoginPopup')
          break
        }
        case 'reg': {
          this.$store.dispatch('onCloseRegPopup')
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: end;
  font-size: 14px;
}

.login-container a {
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  font-weight: bold;
  cursor: pointer;
}

.login-container span {
  cursor: pointer;
  transition: 0.4s;
}

.login-container a:hover, .login-container span:hover {
  text-decoration: underline;
}

.logout-button {
  background-color: transparent;
}

.slide-in-left {
  animation: slide-in-left .9s ease-out both;
}

.slide-out-right {
  animation: slide-out-right .9s ease-out both;
}

@keyframes slide-in-left {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out-right {
  0% {
    transform: translateY(0);
    opacity: 0;

  }
  100% {
    transform: translateY(-100%);
    opacity: 1;

  }
}
</style>
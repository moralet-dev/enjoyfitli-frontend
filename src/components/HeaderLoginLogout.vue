<template>
  <div v-if="getIsAuth" :class="{'login-container animate__animated':true,'animate__slideInDown': getIsAuth,'animate__slideOutDown': !getIsAuth}">
    <div class="locale">
      <div class="lang" @click="setLocale('uk')">UK</div>
      <div class="lang " @click="setLocale('en')">EN</div>
    </div>
    <router-link :to="{name: 'profile'}" @click="this.$emit('closeMenu')">{{ this.$t('profile')}}</router-link>
    <a class="logout-button" @click="onLogoutClick">
      <LogoutIcon width="15" height="15"/>
    </a>
  </div>
  <div v-else :class="{'login-container animate__animated':true, 'animate__slideInDown': !getIsAuth, 'animate__slideOutDown': getIsAuth}">
    <a ref="login-popup" @click="openPopup('login')">{{ this.$t('login')}}</a>
    <a @click="openPopup('reg')">{{ this.$t('registration')}}</a>
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
      if (this.currentUserId) {
        this.currentUserId = this.$store.getters['authModule/getCurrentUser'].id
        return Boolean(this.currentUserId)
      } else {
        if (this.$store.getters['authModule/isAuthenticated'] === 'true') {
          return true
        }
      }
      return false
    },
  },

  methods: {
    onLogoutClick() {
      this.$store.dispatch('authModule/onLogout')
      this.currentUserId = null
      this.$emit('closeMenu')
      this.$router.push('/')
    },
    openPopup(t) {
      switch (t) {
        case 'login': {
          this.$store.dispatch('onOpenLoginPopup')
          this.$emit('closeMenu')
          break
        }
        case 'reg': {
          this.$store.dispatch('onOpenRegPopup')
          this.$emit('closeMenu')
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
    },
    setLocale(lang){
      this.$store.state.locale = lang
      console.log(this.$store.state.locale)
      this.$i18n.locale = lang
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
  color: #f2f2f2;
}
.login-container a:hover{
}
.login-container a.router-link-active,
.login-container a.router-link-active{
  color: var(--color-link-text-hover);
}
.login-container span {
  cursor: pointer;
  transition: 0.4s;
}

.login-container a:hover, .login-container span:hover {
  color: var(--color-link-text-hover);
}

.lang{
  cursor: pointer;
}
@media (min-width: 768px) and (max-width: 991px) {
  .login-container {
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .login-container {
    height: fit-content;
    min-height: fit-content;
  }

  .login-container a {
    width: 100%;
    padding: 2rem 1rem;
    color: var(--color-link-text-hover);
  }
}
</style>
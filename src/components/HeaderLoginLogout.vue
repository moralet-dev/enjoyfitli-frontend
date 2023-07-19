<template>
  <div class="login-container__wrapper">
    <div class="locale">
      <div class="lang" @click="setLocale('uk')"><img src="src/assets/icons/flags/ukraine.png" alt="uk"/></div>
      <div class="lang " @click="setLocale('en')"><img src="src/assets/icons/flags/united-kingdom.png" alt="eng"/></div>
    </div>
    <div v-if="getIsAuth"
         :class="{'login-container animate__animated':true,'animate__slideInDown': getIsAuth,'animate__slideOutDown': !getIsAuth}">
      <router-link :to="{name: 'profile'}" @click="this.$emit('closeMenu')">{{ this.$t('profile') }}</router-link>
      <a class="logout" @click="onLogoutClick">
        {{ this.$t('logout')}}
      </a>
    </div>
    <div v-else
         :class="{'login-container animate__animated':true, 'animate__slideInDown': !getIsAuth, 'animate__slideOutDown': getIsAuth}">
      <a ref="login-popup" @click="openPopup('login')">{{ this.$t('login') }}</a>
      <a @click="openPopup('reg')">{{ this.$t('registration') }}</a>
    </div>
    <ModalLogin :show="this.$store.getters['getTriggerLoginPopup']" @close="closePopup('login')"/>
    <ModalReg :show="this.$store.getters['getTriggerRegPopup']" @close="closePopup('reg')"/>
  </div>
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
      showLoginModal: false,
    }
  },

  computed: {
    getIsAuth() {
      return !!this.$store.getters['authModule/isAuthenticated'];
    },
  },

  methods: {
    onLogoutClick() {
      this.$store.dispatch('authModule/onLogout')
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
    setLocale(lang) {
      this.$store.state.locale = lang
      console.log(this.$store.state.locale)
      this.$i18n.locale = lang
    }
  }
}
</script>

<style scoped>
.login-container__wrapper {
  display: flex;
  justify-self: flex-end;
}

.locale {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.lang {
  width: 25px;
  height: 100%;
  margin: 0 .5rem;
  cursor: pointer;
}

.lang img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: .3s;
}
.lang img:hover{
  transform: scale(120%) scale3d(-1, 1, 1);
}
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
  padding: 0 1rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--color-header-text);
}

.login-container a.router-link-active,
.login-container a.router-link-exact-active,
.login-container a:hover{
  color: var(--color-header-text-hover);
  background: var(--color-header-text-hover-bg);
}

.logout-button svg{
}
.login-container span {
  cursor: pointer;
  transition: 0.4s;
}

.login-container a:hover, .login-container span:hover {
  color: var(--color-header-text-hover);
}
a.logout:hover{
  color: var(--color-header-text);
  background: #8C3419;
}
@media (min-width: 768px) and (max-width: 991px) {
  .login-container {
    justify-content: center;
  }
}

@media (max-width: 991px) {
  .login-container__wrapper{
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
  .login-container {
    width: 100%;

    height: fit-content;
    min-height: fit-content;
  }

  .login-container a, .locale {
    width: 100%;
    padding: 2rem 1rem;
  }

  .login-container a.router-link-active,
  .login-container a.router-link-exact-active {
    color: var(--color-link-text);
    background: var(--color-background);
  }
  .locale{
    justify-content: center;
  }
  .lang{
    height: 30px;
    margin: 0 2rem;
  }
}
</style>
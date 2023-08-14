<template>
  <div class="login-container__wrapper">
    <div class="locale">
      <div class="lang uk" @click="setLocale('uk')"></div>
      <div class="lang en" @click="setLocale('en')"></div>
    </div>
    <div v-if="getIsAuth"
         :class="{'login-container animate__animated':true,'animate__slideInDown': getIsAuth,'animate__slideOutDown': !getIsAuth}">
      <router-link :to="{name: 'profile'}" @click="this.$emit('closeMenu')">{{ this.$t('profile') }}</router-link>
      <button class="logout" @click="onLogoutClick">
        {{ this.$t('logout')}}
      </button>
    </div>
    <div v-else
         :class="{'login-container animate__animated':true, 'animate__slideInDown': !getIsAuth, 'animate__slideOutDown': getIsAuth}">
      <button ref="login-popup" @click="openPopup('login')">{{ this.$t('login') }}</button>
      <router-link @click="this.$emit('closeMenu')" :to="{name: 'reg'}">{{ this.$t('registration') }}</router-link>
    </div>
    <ModalLogin :show="this.$store.getters['getTriggerLoginPopup']" @close="closePopup('login')"/>
  </div>
</template>


<script>
import LogoutIcon from "@/components/icons/LogoutIcon.vue";
import ModalLogin from "@/components/Modals/ModalLogin.vue";
import ModalReg from "@/components/Modals/ModalReg.vue";
import Flag from "@/components/icons/Flag.vue";

export default {
  name: "HeaderLoginLogout",
  components: {Flag, ModalLogin, LogoutIcon, ModalReg},
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
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0 .5rem;
  cursor: pointer;
  background-position: 0 center;
  background-repeat: no-repeat;
  background-size: contain;
}
.uk{
  background-image: url("@/assets/icons/flags/uk_flag.png");
}
.en{
  background-image: url("@/assets/icons/flags/gb_flag.png");
}
.lang{
  transition: .3s;
}
.lang:hover{
  transform: scale(120%);
}
.login-container {
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: end;
}

.login-container a, .login-container button {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  min-height: 100%;
  border-radius: 0;
  border: 0;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  cursor: pointer;
  color: var(--color-header-text);
  background: var(--color-background-header);
}

.login-container a.router-link-active,
.login-container a.router-link-exact-active,
.login-container a:hover,
.login-container button:hover{
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
button.logout:hover{
  color: var(--vt-c-white-soft);
  background: var(--vt-c-red-dark);
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

  .login-container a, .login-container button, .locale {
    width: 100%;
    padding: 2rem 1rem;
    color: var(--color-header-text-hover);
    background: transparent;
  }
  button.logout{
    color: var(--vt-c-white-soft);
    background: var(--vt-c-red-dark);
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
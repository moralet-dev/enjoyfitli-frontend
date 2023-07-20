vw
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask" @click="nullFormData">
        <div class="modal-container" @click.stop>
          <div class="modal-content">
            <button class="mobile-close" @click="nullFormData">
              <CloseIcon/>
            </button>
            <div class="modal-header">
              <span>{{ $t('hello') }}!</span>
              <h3>{{ $t('enterCabinet') }}</h3>
            </div>
            <div class="modal-body">
              <form @submit.prevent="onSubmit">
                <div class="form-group error-msg" v-if="loginErrors">
                  <span>{{ loginErrors.detail }}</span>
                </div>
                <div class="form-group">
                  <label for="email">{{ $t('email') }}:</label>
                  <input id="email" type="email" :placeholder="$t('enterEmail')" v-model="formData.email" required/>
                </div>
                <div class="form-group">
                  <label for="password">{{ $t('password') }}:</label>
                  <input id="password" type="password" :placeholder="$t('enterPSWD')" v-model="formData.password"
                         required/>
                </div>
                <div class="login-block">
                  <button type="submit" value="Log-in">{{ $t('login') }}</button>
                  <a class="text-link"
                     @click="$emit('close'); this.$router.push({name:'reset-password'})">{{ $t('forgotPSWD') }}?</a>
                </div>
              </form>
            </div>
            <div class="post-info">
              <h4>{{ $t('socialNetworks') }}</h4>
              <div class="">
                <InstagramLogo/>
                <TikTokLogo/>
              </div>
            </div>
          </div>
          <div class="modal-bg">
            <button @click="nullFormData">
              <CloseIcon/>
            </button>
          </div>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script>
import InstagramLogo from "@/components/icons/InstagramLogo.vue";
import TikTokLogo from "@/components/icons/TikTokLogo.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import {authAPI} from "@/api/authAPI/authAPI";

export default {
  name: "ModalLogin",
  components: {CloseIcon, InstagramLogo, TikTokLogo},
  props: {
    show: Boolean,
  },
  data() {
    return {
      formData: {
        email: null,
        password: null,
        rememberMe: null,
      },
      loginErrors: null,
    }
  },
  mounted() {
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('authModule/onLogin', {
        email: this.formData.email,
        password: this.formData.password,
      }).then(() => {
        authAPI.getMe().then(response => {
          this.$store.dispatch('authModule/onCurrentUserSet', response.data)
        }).catch((reason) => {
          console.log('error while getting user data')
        })
        this.loginErrors = null
        this.$emit('close')
        this.$router.push('/profile')
      }).catch(reason => {
        console.log('error while logging')
        this.loginErrors = reason.response.data
      })
    },
    async nullFormData() {
      this.$emit('close')
      this.loginErrors = null
      this.formData.email = null
      this.formData.password = null
      this.rememberMe = null
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  margin: auto;
  padding: 0;
  min-width: 80vw;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  background-color: var(--color-background);
  border-radius: 25px;
  transition: all 0.3s ease;
}

.modal-content {
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
  justify-content: center;
  width: 50%;
}

.modal-header {
  padding: 4rem 0 0 0;
}

.modal-header h3 {
  margin: 1rem 0 0 0;
  font-size: 30px;
}

.modal-body {
  padding: 2rem 0;
}


form {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.login-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-block a {
  cursor: pointer;
}

.login-block a:hover {
  color: rgba(0, 91, 227, 1);
  background: none;
}

.text-link {
  text-align: right;
}

.modal-bg {
  position: relative;
  background: url("../../assets/bg-images/login-popup.png") center no-repeat;
  background-size: cover;
  min-width: 50%;
  border-radius: 25px;
}

.modal-bg button {
  position: absolute;
  padding: 0;
  border: none;
  margin: 1rem;
  top: 0;
  right: 0;
  background: transparent;
  width: fit-content;
}

.mobile-close {
  display: none;
}

.error-msg {
  font-size: 14px;
  color: var(--vt-c-red-dark);
}

.post-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem 0;
  border-top: solid 1px var(--color-helper);
  margin: 2rem 0 0 0;
}
.post-info h4{
  margin-bottom: .5rem;
}
.post-info a {
  margin: 10px 10px;
}

@media (max-width: 767px) {
  .modal-content {
    width: 100%;
    padding: 0 1rem;
  }

  .modal-bg {
    display: none;
  }

  .mobile-close {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    background: transparent;
    border: none;
    z-index: 9999;

  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
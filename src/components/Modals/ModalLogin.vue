<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              <span>Hello!</span>
              <h3>Enter to personal cabinet</h3>
            </div>
            <div class="modal-body">
              <form @submit.prevent="onSubmit">
                <div class="form-group error-msg" v-if="loginErrors">
                  <span>{{ loginErrors.detail }}</span>
                </div>
                <div class="form-group">
                  <label for="email">E-mail:</label>
                  <input id="email" type="email" placeholder="Enter your e-mail" v-model="formData.email" required/>
                </div>
                <div class="form-group">
                  <label for="rememberMe">Password:</label>
                  <input id="password" type="password" placeholder="Enter your password" v-model="formData.password"
                         required/>
                </div>
                <!--                <div class="form-group remember">-->
                <!--                  <label for="rememberMe">Remember me:</label>-->
                <!--                  <input name="rememberMe" type="checkbox" v-model="formData.rememberMe"/>-->
                <!--                </div>-->
                <div class="login-block">
                  <button type="submit" value="Log-in">Log-in</button>
                  <router-link :to="{name:'reset-password'}">Forgot password?</router-link>
                </div>
              </form>
            </div>

            <div class="modal-footer">
            </div>
            <div class="post-info">
              <h4>Social networks</h4>
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
  methods: {
    async onSubmit() {
      await this.$store.dispatch('authModule/onLogin', {
        email: this.formData.email,
        password: this.formData.password,
      }).then(() => {
        this.$router.push('/profile')
        this.$emit('close')
      }).catch(reason => {
        this.loginErrors = reason.response.data
      })
    },
    async nullFormData() {
      this.$emit('close')
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
  min-width: 80%;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  background-color: var(--color-background-soft);
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
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

.modal-footer {
  display: flex;
}

.modal-footer button {
  border: none;
  margin: 0 10px;
  border-radius: 15px;
  padding: 5px 10px;
}

.post-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem 0;
  border-top: solid 1px grey;
  margin: 2rem 0 0 0;
}

.post-info svg {
  margin: 10px 10px;
}

form {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

form button {
  width: fit-content;
  padding: 1rem 2rem;
  background-color: var(--color-background-soft);
  color: var(--color-link);
  font-size: 16px;
  font-weight: 700;
  border-radius: 100px;
  border: 1px solid var(--color-link);
  transition: .3s;
}

form button:hover {
  color: var(--color-link-hover);
  background-color: var(--color-link);
  border: 1px solid var(--color-link);
}

.form-group {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.form-group label {
  font-weight: 700;
  color: var(--color-headings);
}

.remember {
  flex-direction: column;
  align-items: start;
}

.remember input {
  margin: 0.5rem 0;
}

.login-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-block a {
  color: var(--color-link);
  cursor: pointer;
}

.login-block a:hover {
  color: rgba(0, 91, 227, 1);
  background: none;
}

.modal-bg {
  position: relative;
  background: url("../../assets/bg-images/login-popup.png") center no-repeat;
  background-size: cover;
  min-width: 50%;
  border-radius: 15px;
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

.error-msg {
  font-size: 14px;
  color: rgb(255, 69, 0);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              <span>Welcome!</span>
              <h3>Create personal cabinet</h3>
            </div>
            <div class="modal-body">
              <form @submit.prevent="onSubmit">
                <div class="fields-container">
                  <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input id="email" type="email" placeholder="Enter your e-mail" v-model="formData.email" required/>
                    <div class="error-msg" v-if="errors && errors.email">
                      {{ errors.email[0] }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone</label>
                    <input id="phone" type="tel" v-model="formData.phone" placeholder="380..." required/>
                    <div class="error-msg" v-if="errors && errors.phone">
                      {{ errors.phone[0] }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="first_name">First Name</label>
                    <input id="first_name" maxlength="30" v-model="formData.first_name" required/>
                    <div class="error-msg" v-if="errors && errors.first_name">
                      {{ errors.first_name[0] }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="last_name">Last Name</label>
                    <input id="last_name" maxlength="30" v-model="formData.last_name" required/>
                    <div class="error-msg" v-if="errors && errors.last_name">
                      {{ errors.last_name[0] }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="rememberMe">Password</label>
                    <input id="password" type="password" v-model="formData.password" required/>
                    <div class="error-msg" v-if="errors && errors.password">
                      {{ errors.password[0] }}
                    </div>
                    <div class="error-msg" v-if="errors && errors.non_field_errors">
                      {{ errors.non_field_errors[0] }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="re_password">Repeat password</label>
                    <input name="re_password" type="password" v-model="formData.re_password" required/>
                  </div>
                </div>
                <div class="form-group privacy-policy">
                  <input name="agree" type="checkbox" required/>
                  <label for="agree">I agree with <a>privacy policy</a></label>
                </div>
                <div class="login-block">
                  <button type="submit" value="Log-in">Registration</button>
                </div>
              </form>
            </div>

            <div class="modal-footer">
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
    <Transition name="modal">
      <div v-if="showNext" class="modal-mask">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Successfully created Personal Cabinet</h3>
            </div>
            <div class="modal-body">
              <p>
                We have sent you an activation email.
                Please check your email inbox (and spam folder, if necessary) and activate your account by following the instructions.
              </p>
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
            <button @click="showNext = false">
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
  name: "ModalReg",
  components: {CloseIcon, InstagramLogo, TikTokLogo},
  props: {
    show: Boolean,
  },
  data() {
    return {
      formData: {
        email: null,
        phone: null,
        first_name: null,
        last_name: null,
        password: null,
        re_password: null,
      },
      errors: null,
      showNext: false,
    }
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('authModule/onRegister', {...this.formData}).then(() => {
        this.$router.push({name: 'home'})
        this.formData.email = null
        this.formData.phone = null
        this.formData.first_name = null
        this.formData.last_name = null
        this.formData.password = null
        this.formData.re_password = null
        this.errors = null
        this.$emit('close')
        this.showNext = true
      }).catch(reason => {
        this.errors = reason.response.data
      })
    },
    async nullFormData() {
      this.formData.email = null
      this.formData.phone = null
      this.formData.first_name = null
      this.formData.last_name = null
      this.formData.password = null
      this.formData.re_password = null
      this.errors = null
      this.$emit('close')
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
  border-radius: 15px;
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

.fields-container {
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-column-gap: 10px;

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

.privacy-policy {
  flex-direction: row;
  align-items: baseline;
}

.privacy-policy input {
  margin: 0 0.5rem 0 0;
}

.privacy-policy label a {
  cursor: pointer;
  color: #005BE3;
}

.privacy-policy label a:hover {
  background-color: transparent;
}

.login-block {
  display: flex;
  width: 100%;
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
  background: url("../../assets/bg-images/reg-popup.png") center no-repeat;
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
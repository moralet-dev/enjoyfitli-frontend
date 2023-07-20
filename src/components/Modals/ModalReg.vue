<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask" @click="nullFormData">
        <div class="modal-container" @click.stop>
          <div class="modal-content">
            <button class="close" @click="nullFormData">
              <CloseIcon/>
            </button>
            <div class="modal-header">
              <span>{{ $t('welcome') }}!</span>
              <h3>{{ $t('createPersonalCab') }}</h3>
            </div>
            <div class="modal-body">
              <form @submit.prevent="onSubmit">
                <div class="form-group">
                  <label for="email">{{ $t('email') }}:</label>
                  <input id="email" type="email" :placeholder="$t('enterEmail')" v-model="formData.email" required/>
                  <div class="error-msg" v-if="errors && errors.email">
                    {{ errors.email[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="phone">{{ $t('tel') }}</label>
                  <input id="phone" type="tel" v-model="formData.phone" placeholder="380..." required/>
                  <div class="error-msg" v-if="errors && errors.phone">
                    {{ errors.phone[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="first_name">{{ $t('firstName') }}</label>
                  <input id="first_name" maxlength="30" v-model="formData.first_name" required/>
                  <div class="error-msg" v-if="errors && errors.first_name">
                    {{ errors.first_name[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="last_name">{{ $t('lastName') }}</label>
                  <input id="last_name" maxlength="30" v-model="formData.last_name" required/>
                  <div class="error-msg" v-if="errors && errors.last_name">
                    {{ errors.last_name[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="rememberMe">{{ $t('password') }}:</label>
                  <input id="password" type="password" :placeholder="$t('enterPSWD')" v-model="formData.password"
                         required/>
                  <div class="error-msg" v-if="errors && errors.password">
                    {{ errors.password[0] }}
                  </div>
                  <div class="error-msg" v-if="errors && errors.non_field_errors">
                    {{ errors.non_field_errors[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="re_password">{{ $t('repeatPSWD') }}:</label>
                  <input name="re_password" type="password" :placeholder="$t('repeatPSWD')"
                         v-model="formData.re_password" required/>
                </div>
                <div class="form-group privacy-policy">
                  <input name="agree" type="checkbox" required/>
                  <label for="agree">
                    {{ $t('iAgreeWith') }}
                    <a class="text-link">{{ $t('termsOfServiceUse') }}</a>
                    {{ $t('and') }}
                    <a class="text-link">{{ $t('privacyPolicy') }}</a>
                  </label>
                </div>
                <div class="login-block">
                  <button type="submit" value="Log-in">{{ $t('confirm') }}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="modal">
      <div v-if="showNext" class="modal-mask" @click="showNext=false">
        <div class="modal-container success" @click.stop>
          <button class="close" @click="showNext = false">
            <CloseIcon/>
          </button>
          <div class="modal-content">
            <div class="modal-header">
              <h3>{{ $t('successCreateCab') }}</h3>
            </div>
            <div class="modal-body">
              <p>
                {{ $t('successCreateCabMessage') }}
              </p>
            </div>
            <div class="modal-footer">
            </div>
            <div class="post-info">
              <h4>{{ $t('socialNetworks') }}</h4>
              <div class="social">
                <InstagramLogo />
                <TikTokLogo />
              </div>
            </div>
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
      showNext: true,
    }
  },
  methods: {
    async onSubmit() {
      // await this.$store.dispatch('authModule/onRegister', {...this.formData}).then(() => {
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
      // }).catch(reason => {
      //   this.showNext = true
      //
      //   if (reason.response.status!==500){
      //     return this.errors = reason.response.data
      //   }
      // })
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
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  overflow: hidden;
  overflow-y: scroll;
}

.modal-container {
  padding: 0;
  max-width: 80vw;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  background-color: var(--color-background);
  border-radius: 25px;
  transition: all 0.3s ease;
}
.success{
  max-width: 70vw;
}
.close {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
  border: none;
  z-index: 9999;

}

.modal-content {
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
  justify-content: center;
  width: 100%;
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
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-column-gap: 10px;
  padding: 1rem 0;
}


.form-group {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
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
}

.privacy-policy label a:hover {
  background-color: transparent;
  color: #005BE3;
}

.login-block {
  display: flex;
  width: 100%;
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
.social a{
  padding: 0 .5rem;
}
@media (max-width: 767px) {
  .modal-container{
    position: absolute;
    max-width: 100vw;
    top: 0;
    left: 0;
  }
  .success{
    position: relative;
  }
  .modal-content {
    width: 100%;
    padding: 0 2rem;
  }

  .modal-bg {
    display: none;
  }

  form {
    grid-template-columns: 12fr;
  }
  .text-link {
    color: rgba(0, 91, 227, 1);
    background: none;
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
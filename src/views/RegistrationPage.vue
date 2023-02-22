<template>
  <div class="">
    <div class="form-wrapper">
      <form @submit.prevent="onSubmit">
        <div v-if="regErrors">
          <div v-for="i in regErrors">
            {{ i }}
          </div>
        </div>
        <div class="form-element">
          <label for="email">E-mail</label>
          <input id="email" type="email" v-model="formData.email" required/>
        </div>
        <div class="form-element">
          <label for="phone">Phone</label>
          <input id="phone" type="tel" v-model="formData.phone" placeholder="380..." required/>
        </div>
        <div class="form-element">
          <label for="rememberMe">Password</label>
          <input id="password" type="password" v-model="formData.password" required/>
        </div>
        <div class="form-element">
          <label for="re_password">Repeat password</label>
          <input name="re_password" type="password" v-model="formData.re_password" required/>
        </div>
        <input type="submit" value="Register">
      </form>
    </div>
    <p>OR</p>
    <div class="">
      <router-link to="/login">Log-in</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistrationPage",
  data() {
    return {
      formData: {
        email: null,
        phone: null,
        password: null,
        re_password: null,
      },
      regErrors: null,
    }
  },
  beforeCreate() {
    if (this.$store.getters['authModule/isAuthenticated'] === 'true') {
      this.$router.push('/profile')
    }
  },
  methods: {
    async onSubmit() {
      console.log(this.formData)
      await this.$store.dispatch('authModule/onRegister', {...this.formData}).then(() => {
        this.$router.push('/login')
      }).catch(reason => {
        this.regErrors = reason.response.data
      })
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  width: 100%;
}

.form-wrapper form {
  display: flex;
  flex-direction: column;
}

.form-element {
  display: flex;
  flex-direction: column;
}
</style>
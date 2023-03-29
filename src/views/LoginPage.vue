<template>
  <div class="wrapper">
    <div class="form-wrapper">
      <form @submit.prevent="onSubmit">
        <div v-if="loginErrors">
          {{ loginErrors.detail }}
        </div>
        <div v-if="isExpired">
          <p>Session is expired, re-login please:)</p>
        </div>
        <div class="form-element">
          <label for="email">E-mail</label>
          <input id="email" type="email" v-model="loginData.email"/>
        </div>
        <div class="form-element">
          <label for="rememberMe">Password</label>
          <input id="password" type="password" v-model="loginData.password"/>
        </div>
        <div class="form-element">
          <label for="rememberMe">Remember me</label>
          <input name="rememberMe" type="checkbox" v-model="loginData.rememberMe"/>
        </div>
        <input type="submit" value="Log-in">
      </form>
    </div>
    <p>OR</p>
    <div class="">
      <router-link to="/registration">Register new account</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      loginData: {
        email: null,
        password: null,
        rememberMe: null,
      },
      loginErrors: null,
      isExpired: false,
    }
  },
  beforeCreate() {
    if (this.$store.getters['authModule/isAuthenticated'] === 'true') {
      this.$router.push('/profile')
    }
  },
  mounted () {
    this.isExpired = this.$store.getters['authModule/isSessionExpired']
  },
  unmounted() {
    this.isExpired = this.$store.dispatch('authModule/onSessionExpired', false)
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('authModule/onLogin', {
        email: this.loginData.email,
        password: this.loginData.password,
      }).then(() => {
        this.isExpired = false
        this.$router.push('/profile')
      }).catch(reason => {
        this.loginErrors = reason.response.data
      })
    }
  }
}
</script>

<style scoped>
.wrapper{
  padding: 0 9rem;
}
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
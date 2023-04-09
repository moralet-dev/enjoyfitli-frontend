<template>
  <div class="wrapper">
    <h2>Activate Account</h2>
    <div class="content" v-if="status === 'pending'">
      <p>Activating your account...</p>
    </div>
    <div class="content" v-else-if="status === 'success'">
      <p>Your account has been activated. Now you can <a v-on:click="toLogin">LOG-IN</a> in your account</p>
    </div>
    <div class="content" v-else>
      <p>An error occurred while activating your account. Please, contact our support. <a v-on:click="toLogin">LOG-IN</a></p>
    </div>
  </div>
</template>

<script>
import {authAPI} from "@/api/authAPI/authAPI";

export default {
  name: 'ActivationPage',
  data() {
    return {
      status: 'pending'
    }
  },
  mounted() {
    const uid = this.$route.params.uid;
    const token = this.$route.params.token;
    this.activateAccount(uid, token);
  },
  methods: {
    activateAccount(uid, token) {
      authAPI.activate(uid, token)
          .then(() => {
            this.status = 'success';
          })
          .catch(() => {
            this.status = 'error';
          });
    },
    toLogin(){
      this.$store.dispatch('onOpenLoginPopup')
      this.$router.push({name:'home'})
    }
  }
}
</script>


<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  padding: 0 9rem;
  justify-content: center;
  margin: auto;
}
h2{
  font-size: 30px;
  margin: 4rem 0;
}
.content p a{
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  color: #005BE3;
}
.content p a:hover{
  background: transparent;
}
</style>
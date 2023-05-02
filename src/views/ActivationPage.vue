<template>
  <div class="wrapper">
    <h1>Activate Account</h1>
    <div class="content" v-if="status === 'pending'">
      <p>Activating your account...</p>
    </div>
    <div class="content" v-else-if="status === 'success'">
      <p>Your account has been activated. Now you can <a v-on:click="toLogin">LOG-IN</a> in your account</p>
    </div>
    <div class="content" v-else>
      <p>An error occurred while activating your account. Please, contact our support.</p>
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
  padding: 12rem 9rem 0 9rem;
  justify-content: center;
  margin: auto;
}
h1{
  font-size: 50px;
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
@media (max-width: 767px) {
  .wrapper{
    padding: 8rem 1rem 0 1rem;
  }
  h1{
    font-size: 30px;
    margin: 1rem 0;
  }
}
</style>
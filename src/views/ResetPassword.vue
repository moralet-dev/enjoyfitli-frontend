<template>
  <div class="wrapper">
    <div class="content">
      <h1>Reset password</h1>
      <span>Enter your email to reset password</span>
    </div>
    <div class="content">
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <input id="email" type="email" placeholder="Enter your email" v-model="formData.email"
                 required/>
        </div>
        <div class="error-msg" v-if="errors && errors.email">
          {{ errors.email[0] }}
        </div>

        <button type="submit">Confirm</button>
      </form>
    </div>
    <Teleport to="body">
      <Modal :show="show" @close="show = false; this.$router.push({name:'home'})">
        <template #header>
          <h3>Almost done</h3>
        </template>
        <template #body>
          <p>{{`We have sent you an email with instructions on '${formData.email}' to reset your password.
          Please, check your inbox (or spam, if necessary) and follow the instructions.`}}</p>
        </template>
        <template #footer></template>
      </Modal>
    </Teleport>
  </div>
</template>

<script>
import {authAPI} from "@/api/authAPI/authAPI";
import Modal from "@/components/Modals/Modal.vue";

export default {
  name: "ResetPassword",
  components: {Modal},
  data() {
    return {
      formData:{
        email: null,
      },
      errors: null,
      show: false,
    }
  },
  methods:{
    async resetPassword(){
      await authAPI.passwordReset(this.formData.email).then(()=>{
        this.show = true
      }).catch(reason => {
        this.errors = {...reason.response.data}
      })
    }
  }
}
</script>

<style scoped>
h1{
  font-size: 40px;
  margin: 0 0 1rem 0;
}
.wrapper{
  display: flex;
  flex-direction: column;
  padding: 12rem 9rem;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 1rem 0;
}
.form-group{
  padding:  1rem 0 2rem 0;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
form button{
  margin: 1rem 0;
  border-radius: 100px;
}
.error-msg {
  font-size: 14px;
  color: rgb(255, 69, 0);
  word-wrap: break-word;
}
@media (max-width: 767px) {
  h1{
    font-size: 30px;
  }
  .wrapper{
    padding: 8rem 1rem 0 1rem;
  }
  form input{
    font-size: 16px;
  }
}
</style>
<template>
  <div class="wrapper">
    <div class="content">
      <h1>Reset password</h1>
      <span>Confirm new password</span>
    </div>
    <div class="content">
      <form @submit.prevent="confirmReset">
        <div class="form-group">
          <input id="new_password" type="password" placeholder="Enter new password" v-model="formData.new_password"
                 required/>
        </div>
        <div class="form-group">
          <input id="re_new_password" type="password" placeholder="Repeat your new password" v-model="formData.re_new_password"
                 required/>
        </div>
        <div class="error-msg" v-if="errors && errors.non_field_errors">
          {{ errors.non_field_errors[0] }}
        </div>
        <div class="error-msg" v-if="errors && errors.new_password">
          {{ errors.new_password[0] }}
        </div>
        <button type="submit">Confirm</button>
      </form>
    </div>
    <Teleport to="body">
      <Modal :show="show" @close="show = false; this.$router.push({name:'home'})">
        <template #header>
          <h3>Confirmed</h3>
        </template>
        <template #body>
          <p>Your password was reset successfully.</p>
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
  name: "ResetPasswordConfirm",
  components:{Modal},
  data() {
    return {
      formData:{
        new_password: null,
        re_new_password: null,
      },
      errors: null,
      show: false,
    }
  },
  methods: {
    async confirmReset() {
      const uid = this.$route.params.uid;
      const token = this.$route.params.token;
      const new_password = this.formData.new_password;
      if (this.formData.new_password!==this.formData.re_new_password){
        this.errors = {...this.errors, non_field_errors: ['Password mismatch']}
        return
      }
      await authAPI.passwordResetConfirm(uid, token, new_password)
          .then(()=>{
            this.show = true
          })
          .catch(reason => {
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
  padding: 12rem 9rem 0 9rem;
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
@media (max-width: 767px){
  .wrapper{
    padding: 8rem 1rem 0 1rem;
  }
  h1{
    font-size: 30px;
  }
}
</style>
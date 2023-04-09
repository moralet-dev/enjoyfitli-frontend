<template>
  <div class="">
    <div class="title-wrapper">
      <h3>Settings:</h3>
    </div>
    <div class="main_info">
      <h4>Main Info</h4>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="phone">Phone</label>
          <input id="phone" type="tel" v-model="formData.phone" required/>
          <div class="error-msg" v-if="errors.phone">
            {{ errors.phone[0] }}
          </div>
        </div>
        <div class="form-group">
          <label for="first_name">First name</label>
          <input id="first_name" maxlength="30" v-model="formData.first_name" required/>
          <div class="error-msg" v-if="errors.first_name">
            {{ errors.first_name[0] }}
          </div>
        </div>
        <div class="form-group">
          <label for="last_name">Last name</label>
          <input id="last_name" maxlength="30" v-model="formData.last_name" required/>
          <div class="error-msg" v-if="errors.last_name">
            {{ errors.last_name[0]  }}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false" class="modal_upload">
        <template #header>
          <span>Confirmed</span>
        </template>
        <template #body>
          Data updated
        </template>
        <template #footer>
          <button @click="showModal = false">Close</button>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script>
import {authAPI} from "@/api/authAPI/authAPI";
import Modal from "@/components/Modal.vue";

export default {
  name: "SettingsPage",
  components:{Modal},

  data() {
    return {
      formData: {
        phone: null,
        first_name: null,
        last_name: null,
      },
      errors: {
        phone: null,
        first_name: null,
        last_name: null,
      },
      showModal: false,
    }
  },
  props: {
    me: Object,
  },
  beforeMount() {
    if (this.me) {
      [this.formData.first_name, this.formData.last_name, this.formData.phone] = [this.me.first_name, this.me.last_name, this.me.phone]
    }
  },

  methods: {
    async onSubmit() {
      await authAPI.updateMe({...this.formData}).then(response => {
        this.$store.dispatch('authModule/onCurrentUserSet', response.data)
        this.errors.phone = null
        this.showModal = true
        return response.data
      }).catch(reason => {
        this.errors = reason.response.data
      })
    }
  }
}
</script>

<style scoped>
.title-wrapper {
  padding: 0.5em 0 1rem 0;
}

h3 {
  font-size: 30px;
}
form{
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}
.form-group{
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}
form button{
  width: fit-content;
}
.error-msg{
  font-size: 14px;
  color: red;
}
</style>
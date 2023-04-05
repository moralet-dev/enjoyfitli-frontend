<template>
  <div class="">
    <div class="title-wrapper">
      <h3>Settings:</h3>
    </div>
    <div class="main_info">
      <h4>Main Info</h4>
      <form @submit.prevent="onSubmit">
        <div v-if="errors">
        </div>
        <div class="form-element">
          <label for="phone">Phone</label>
          <input id="phone" type="tel" v-model="formData.phone" required/>
          <div v-if="errors != null">
            {{ errors.phone }}
          </div>
        </div>
        <div class="form-element">
          <label for="first_name">First Name</label>
          <input id="first_name" v-model="formData.first_name" required/>
          <div v-if="errors != null">
            {{ errors.first_name }}
          </div>
        </div>
        <div class="form-element">
          <label for="last_name">Last Name</label>
          <input id="last_name" v-model="formData.last_name" required/>
          <div v-if="errors != null">
            {{ errors.last_name }}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import {authAPI} from "@/api/authAPI/authAPI";

export default {
  name: "SettingsPage",
  data() {
    return {
      formData: {
        phone: null,
        first_name: null,
        last_name: null,
      },
      errors: null,
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
      await authAPI.updateMe(this.formData.first_name, this.formData.last_name, this.formData.phone).then(response => {
        console.log({...response.data})
        this.$store.dispatch('authModule/onCurrentUserSet', response.data)
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
</style>
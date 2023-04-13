<template>
  <div class="wrapper" >
    <Calendar :trList="trainingsList" @p-sign="onSign" @unsign="onUnsign"/>
    <div class="warning">Зверніть увагу, що календарний тиждень тут встановлений з НЕДІЛІ!</div>
    <Modal :show="showModal" @close="showModal = false" :autoHide="true" :autoHiheTime="3">
      <template #header>
        Confirmed
      </template>
      <template #body>
        <p>
          You are successfully {{actionText}} training!
        </p>
      </template>
    </Modal>
  </div>

</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import {authAPI} from "@/api/authAPI/authAPI";
import Calendar from "@/views/Shcedule/Calendar.vue";
import Modal from "@/components/Modals/Modal.vue";

export default {
  name: "SchedulePage",
  components: {Modal, Calendar},
  data() {
    return {
      trainingsList: null,
      showModal: false,
      actionText: null,
    }
  },
  beforeCreate() {
    if (this.$store.getters['authModule/isAuthenticated'] === 'false'
        || !this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push({name: 'home'})
      this.$store.commit('openLoginPopup')

    }
  },
  mounted() {
    this.getGroupTrainingsList()
    this.getMe()
  },
  methods: {
    async getGroupTrainingsList() {
      await trainingsAPI.getGroupTrainings().then(response => {
        this.trainingsList = response.data.results.map(e => e)
      })
    },
    async getMe() {
      await authAPI.getMe().then(response => {
        this.$store.dispatch('authModule/onCurrentUserSet', response.data)
      }).catch(() => this.currentUserData = null)
    },
    async onSign(id) {
      await trainingsAPI.singGroupTraining(id).then(() => {
        this.actionText = 'signed'
        this.showModal = true
        this.getGroupTrainingsList()
      })
    },
    async onUnsign(id) {
      await trainingsAPI.unsignGroupTraining(id).then(() => {
        this.actionText = 'unsigned'
        this.showModal = true
        this.getGroupTrainingsList()
      })
    },
  }
}
</script>

<style scoped>
.wrapper {
  padding: 12rem 9rem;
}
</style>
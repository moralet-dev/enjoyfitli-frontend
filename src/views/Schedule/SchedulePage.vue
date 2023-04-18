<template>
  <div class="wrapper" >
    <div class="show-toggle">
      <span>Switch view</span>
      <Switcher :is-toggled="showCalendar" @toggle="showCalendar= !showCalendar"/>
    </div>
    <transition-group name="fade">
      <div v-if="showCalendar" class="page-view">
        <div class="warning"><span>Зверніть увагу</span>, що календарний тиждень розпочинається з НЕДІЛІ!</div>
        <Calendar :trList="trainingsList" @p-sign="onSign" @unsign="onUnsign"/>
        <Modal :show="showModal" @close="showModal = false" >
          <template #header>
            Confirmed
          </template>
          <template #body>
            <p>
              {{actionText}}
            </p>
          </template>
        </Modal>
      </div>
      <div v-if="!showCalendar" class="page-view">
        <ListedTrainings @sign="onSign" @unsign="onUnsign" @sorting="getSortedTrList" :trList="trainingsList"/>
        <Modal :show="showModal" @close="showModal = false">
          <template #header>
            {{actionStatus}}
          </template>
          <template #body>
            <p>
              {{actionText}}
            </p>
          </template>
        </Modal>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import {authAPI} from "@/api/authAPI/authAPI";
import Calendar from "@/views/Schedule/Calendar.vue";
import Modal from "@/components/Modals/Modal.vue";
import Switcher from "@/components/Switcher.vue";
import ListedTrainings from "@/views/Schedule/ListedTrainings.vue";

export default {
  name: "SchedulePage",
  components: {ListedTrainings, Switcher, Modal, Calendar},
  data() {
    return {
      trainingsList: null,
      showModal: false,
      actionText: null,
      actionStatus: null,
      showCalendar: false,
    }
  },
  created() {
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
    async getSortedTrList(params){
      await trainingsAPI.getGroupTrainings(params).then(response => {
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
        this.actionStatus = 'Confirmed'
        this.actionText = 'You have signed training. You can watching your trainings at Profile->Schedule.'
        this.showModal = true
        this.getGroupTrainingsList()
      }).catch(()=>{
        this.actionStatus = 'Error'
        this.actionText = 'Oops... Something goes wrong. Check that you have enough free trainings and membership equals to training type.'
        this.showModal = true
      })
    },
    async onUnsign(id) {
      await trainingsAPI.unsignGroupTraining(id).then(() => {
        this.actionStatus = 'Confirmed'
        this.actionText = 'You have unsigned training'
        this.showModal = true
        this.getGroupTrainingsList()
      }).catch(()=>{
        this.actionStatus = 'Error'
        this.actionText = 'Oops... Something goes wrong. Check that you have a membership that equals to training type.'
        this.showModal = true
      })
    },
  }
}
</script>

<style scoped>
.wrapper {
  padding: 12rem 9rem;
}
.show-toggle{
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 0 0 2rem 0;
}
.show-toggle span{
  font-size: 20px;
  padding: 1rem 0;
}
.page-view{
  max-height: 50rem;
}
.warning{
  display: inline-block;
  margin: 0 0 1rem 0;
  padding: 1rem;
  border: 2px solid coral;
}
.warning span{
  font-weight: 700;
  color: crimson;
}
@media (max-width: 767px) {
  .wrapper{
    padding: 8rem 1rem;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .wrapper{
    padding: 10rem 1rem;
  }
}



.fade-enter-active {
  transition: all .7s ease-in-out;
}

.fade-leave-active {
  transition: all .7s ease-in-out;
}

.fade-enter-from {
  position: absolute;
  width: 100%;
  opacity: 0;
  max-height: 0;
  transform: translateY(0%);

}

.fade-leave-to {
  /*position: absolute;*/
  width: 100%;
  max-height: 0;
  opacity: 0;
  transform: translateY(-100%);
}
</style>
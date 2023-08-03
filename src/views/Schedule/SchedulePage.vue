<template>
  <div class="wrapper">
    <div class="title">
      <h1>{{ this.$t('schedule') }}</h1>
    </div>

    <div class="calendar__wrapper">
      <div class="calendar__month" v-if="startDate && endDate">
        <span class="animate__animated animate__fadeIn" :key="whatMonth()">
            {{ whatMonth() }}
        </span>
        <div class="calendar__month__nav">
          <ArrowLeftIcon class="arrow" @click="previousWeek()" height="40" width="40"
                         icon-color="var(--color-headings)"/>
          <ArrowIcon class="arrow" @click="nextWeek()" height="40" width="40" icon-color="var(--color-headings)"/>
        </div>
      </div>
      <div class="calendar">
        <div :class="{'calendar__item ':true, 'disabled': day < this.currentDay}"
             @click="onDayClick(day)"
             v-for="day in daysOfWeek"
             :key="day.getDate()"
        >
          <span class="day">
            {{ day.toLocaleDateString(`${this.$store.getters.getLocale}`, {weekday: 'short'}) }}
          </span>
          <span :class="{
            'number animate__animated animate__fadeIn':true,
            'selected': selectedDay.toLocaleDateString() === day.toLocaleDateString()}"
          >
          {{ day.getDate() }}
        </span>
        </div>
      </div>
    </div>
    <div class="trainings-list__wrapper">
      <WeekTrainings v-if="dailyTrainings?.length>0"
                     :dailyTr="dailyTrainings"
                     @onSelect="onTrainingSelect"
                     @sign="onSign"
                     @rescind="onRescind"
                     :key="dailyTrainings"
      />
      <div v-if="dailyTrainings?.length === 0" class="no-trainings animate__animated animate__fadeIn">
        <p class="no-tr">{{selectedDay.getDate()}}: {{ $t('noTrainingsInSchedule') }} </p>
      </div>
      <div v-if="dailyTrainings===null" class="preloader">
        <PreloaderSmall class="trainings-list"/>
      </div>
    </div>
    <ModalCalendarPopup :show="modalTemplate.show" @close="modalTemplate.show = false">
      <template #header>
        <div>{{ !modalTemplate.status ? this.$t('confirm') : this.modalTemplate.heading }}</div>
      </template>
      <template #body>
        <div>
          {{ this.modalTemplate.body }}
        </div>
      </template>
      <template #footer>
        <button class="popup-btn" v-if="modalTemplate.action==='sign'" @click="signTraining(modalTemplate.t_id)">{{this.$t('confirm')}}</button>
        <button class="popup-btn" v-else-if="modalTemplate.action==='rescind'" @click="rescindTraining(modalTemplate.t_id)">{{this.$t('confirm')}}</button>
      </template>
    </ModalCalendarPopup>
  </div>
</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import Calendar from "@/views/Schedule/legacyPages/Calendar.vue";
import Modal from "@/components/Modals/Modal.vue";
import Switcher from "@/components/Switcher.vue";
import ListedTrainings from "@/views/Schedule/legacyPages/ListedTrainings.vue";
import DailyDetail from "@/views/Schedule/DailyDetail.vue";
import Preloader from "@/components/Preloader.vue";
import WeekTrainings from "@/views/Schedule/WeekTrainings.vue";
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import ArrowIcon from "@/components/icons/ArrowRightIcon.vue";
import ModalCalendarPopup from "@/components/Modals/ModalCalendarPopup.vue";

export default {
  name: "SchedulePage",
  components: {
    ModalCalendarPopup,
    ArrowIcon,
    ArrowLeftIcon,
    PreloaderSmall, WeekTrainings, Preloader, DailyDetail, ListedTrainings, Switcher, Modal, Calendar
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      selectedDay: new Date(),
      currentDay: new Date(),
      daysOfWeek: [],
      loading: true,
      trainings: null,
      dailyTrainings: null,
      modalTemplate: {
        show: false,
        action: false,
        status: 0,
        heading: null,
        body: null,
        t_id: null,
      },
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
    this.calculateWeekDays(this.currentDay)
    this.getTrainings().then(() => (this.onDayClick(this.currentDay)))
    window.scroll(0,0)
  },
  methods: {
    calculateWeekDays(date) {
      let sd = new Date(date)
      const currentDayOfWeek = sd.getDay();
      const startDayOfWeek = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      this.startDate = new Date(sd.setDate(sd.getDate() - startDayOfWeek));

      this.daysOfWeek = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date(this.startDate);
        date.setDate(this.startDate.getDate() + i);
        this.daysOfWeek.push(date);
      }
      this.endDate = this.daysOfWeek[6]
    },
    previousWeek() {
      const previousStartDate = new Date(this.startDate)
      const previousEndDate = new Date(this.endDate)
      previousStartDate.setDate(previousStartDate.getDate() - 7)
      previousEndDate.setDate(previousEndDate.getDate() - 7)
      this.startDate = previousStartDate
      this.endDate = previousEndDate
      this.calculateWeekDays(previousStartDate)
    },
    nextWeek() {
      const nextStartDate = new Date(this.startDate)
      const nextEndDate = new Date(this.endDate)
      nextStartDate.setDate(nextStartDate.getDate() + 7)
      nextEndDate.setDate(nextEndDate.getDate() + 7)
      this.startDate = nextStartDate
      this.endDate = nextEndDate
      this.calculateWeekDays(nextStartDate)
    },
    onDayClick(day) {
      this.selectedDay = day
      if (this.trainings?.length > 0) {
        this.dailyTrainings = this.trainings.filter((i) => (
            day.toLocaleDateString() === new Date(i.when).toLocaleDateString() && new Date() < new Date(i.when))
        )
      }
    },
    onTrainingSelect(t) {
      this.selectedTr = t
      this.isDetailView = true
    },
    async getTrainings() {
      this.trainings = await trainingsAPI.getGroupTrainings().then(response => {
        this.loading = false
        return response.data.results
      }).catch(reason => {
        console.log(reason.response.data)
      });
    },
    onSign(id){
      this.modalTemplate.action = 'sign'
      this.modalTemplate.status = 0
      this.modalTemplate.heading = this.$t('confirm')
      const training = this.dailyTrainings.filter(el => el.id === id)[0]
      const date = new Date(training.when).toLocaleDateString(
          `${this.$store.getters.getLocale}`,
          {month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit'})
      this.modalTemplate.t_id = training.id
      this.modalTemplate.body = `${this.$t('sign')}: ${training?.direction?.name} ${date}`
      this.modalTemplate.show = true
    },
    async signTraining(id) {
      event.stopPropagation()
      this.modalTemplate.action = null
      await trainingsAPI.singGroupTraining(id).then(response => {
        this.modalTemplate.heading = this.$t('actionComplete')
        this.modalTemplate.status = response.status
        this.modalTemplate.body = this.$t('signComplete')
        this.getTrainings().then(() => {
          this.onDayClick(this.selectedDay)
        })
      }).catch(reason => {
        this.modalTemplate.heading = this.$t('error')
        this.modalTemplate.status = reason.response.status
        this.modalTemplate.body = reason.response.data?.text
      })
    },
    onRescind(id){
      this.modalTemplate.action = 'rescind'
      this.modalTemplate.status = 0
      this.modalTemplate.heading = this.$t('confirm')
      const training = this.dailyTrainings.filter(el => el.id === id)[0]
      const date = new Date(training.when).toLocaleDateString(
          `${this.$store.getters.getLocale}`,
          {month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit'})
      this.modalTemplate.t_id = training.id
      this.modalTemplate.body = `${this.$t('rescind')}: ${training?.direction?.name} ${date}`
      this.modalTemplate.show = true
    },
    async rescindTraining(id) {
      event.stopPropagation()
      this.modalTemplate.action = null
      await trainingsAPI.unsignGroupTraining(id).then(response => {
        this.modalTemplate.heading = this.$t('actionComplete')
        this.modalTemplate.status = response.status
        this.modalTemplate.body = this.$t('rescindComplete')
        this.getTrainings().then(() => {
          this.onDayClick(this.selectedDay)
        })
      }).catch(reason => {
        this.modalTemplate.show = true
        this.modalTemplate.status = reason.response.status
        this.modalTemplate.body = this.$t('rescindDecline')
      })
    },
    whatMonth() {
      let st = this.startDate
      let end = this.endDate
      if (st.getMonth() === end.getMonth()) {
        return st.toLocaleString(`${this.$store.getters.getLocale}`, {month: 'long'})
      }
      return `${st.toLocaleString(`${this.$store.getters.getLocale}`, {month: 'long'})}` + ' / '
          + `${end.toLocaleString(`${this.$store.getters.getLocale}`, {month: 'long'})}`
    },
  },
}

</script>

<style scoped>
.wrapper {
  padding: 2rem 9rem;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.title {
  display: none;
  margin: 0 0 2rem 0;
}

.calendar__wrapper {
  padding: 0 9rem;
  background: var(--color-elements);
  color: var(--color-headings);
  border-radius: 20px;
  font-family: "Helvetica Neue", sans-serif;
}

.calendar__month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;

}

.arrow {
  margin: 0 10px;
  cursor: pointer;
  transition: .3s;
}

.arrow:hover {
  transform: scale(120%);
}

.calendar {
  font-size: 17px;
  display: flex;
  min-width: 100%;
  justify-content: space-between;
  padding: .5rem .5rem;

}

.calendar__item {
  display: flex;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  transition: .3s;
  font-size: 15px;
}

.day {
  margin: 0 0 .5rem 0;
}

.number {
  line-height: 20px;
  font-size: 15px;
  text-align: center;
  padding: 5px;
  border: 1px solid transparent;
  transition: .3s;
  border-radius: 50%;
  width: 32px;
  font-family: 'Futura New', sans-serif;

}

.number:hover, .selected {
  background: var(--color-headings);
  color: var(--color-text);
}

.disabled {
  color: dimgrey;
  pointer-events: none;
  cursor: default;
}

.trainings-list__wrapper {
  margin: 0 9rem;
  padding: 0 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
}
.no-tr{
  font-size: 1.5rem;
  padding: 3rem 1rem;
}
.popup-btn{
  background: var(--color-background);
  color: var(--color-elements);
}
h1 {
  font-size: 50px;
}

@media (max-width: 767px) {
  .wrapper {
    padding: 0;
  }

  .title {
    padding: 0 1rem;
  }

  h1 {
    font-size: 30px;
  }

  .calendar__wrapper {
    padding: 2rem 1rem;
    border-radius: 0;
  }

  .arrow:hover {
    transform: none;
  }

  .calendar {
    padding: 0;
  }

  .trainings-list__wrapper {
    margin: 1rem .5rem;
  }
}

@media (min-width: 767px) and (max-width: 991px) {
  .wrapper {
    padding: 2rem 1rem;
  }

  h1 {
    font-size: 40px;
  }
}


</style>
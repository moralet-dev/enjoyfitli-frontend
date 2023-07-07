<template>
  <div class="wrapper">
    <div class="title">
      <h1>{{ this.$t('schedule') }}</h1>
    </div>

    <div class="calendar__wrapper">
      <div class="calendar__month" v-if="startDate && endDate">
        <span class="animate__animated animate__fadeIn" :key="whatMonth()">
            {{whatMonth()}}
        </span>
        <div class="calendar__month__nav">
          <ArrowLeftIcon class="arrow" @click="previousWeek()" height="40" width="40" icon-color="var(--color-headings)"/>
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
            'number animate__animated animate__fadeInRight':true,
            'selected': selectedDay.toLocaleDateString() === day.toLocaleDateString()}"
          >
          {{ day.getDate() }}
        </span>
        </div>
      </div>

    </div>
    <div class="trainings-list__wrapper">
      <WeekTrainings v-if="dailyTrainings?.length>0" :dailyTr="dailyTrainings"/>
      <div v-else-if="dailyTrainings?.length === 0" class="no-trainings animate__animated animate__fadeIn"
           :key="randomFloat()">
        <p>No trainings</p>
      </div>
      <div v-else class="preloader">
        <PreloaderSmall class="trainings-list"/>
      </div>
    </div>
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

export default {
  name: "SchedulePage",
  components: {
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
    }
  },
  created() {
    if (this.$store.getters['authModule/isAuthenticated'] === 'false'
        || !this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push({name: 'home'})
      this.$store.commit('openLoginPopup')
    }
  },
  updated() {
  },
  mounted() {
    this.calculateWeekDays(this.currentDay)
    this.getTrainings().then(() => (this.onDayClick(this.currentDay)))
  },
  methods: {
    calculateWeekDays(date) {
      let sd = new Date(date)
      this.startDate = new Date(sd.setDate(sd.getDate() - sd.getDay() + 1));
      this.daysOfWeek = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date(this.startDate);
        date.setDate(this.startDate.getDate() + i);
        this.daysOfWeek.push(date);
      }
      this.endDate = this.daysOfWeek[6]
    },
    previousWeek() {
      const previousStartDate = new Date(this.startDate);
      previousStartDate.setDate(previousStartDate.getDate() - 7);
      this.startDate = previousStartDate;
      this.endDate.setDate(this.endDate.getDate() - 7);
      this.calculateWeekDays(previousStartDate);
    },
    nextWeek() {

      const nextStartDate = new Date(this.startDate);
      nextStartDate.setDate(nextStartDate.getDate() + 7);
      this.startDate = nextStartDate;
      this.endDate.setDate(this.endDate.getDate() + 7);
      this.calculateWeekDays(nextStartDate);
    },
    onDayClick(day) {
      this.selectedDay = day
      let proxyArray = []
      if (this.trainings?.length > 0) {
        proxyArray = this.trainings.filter((i) => (day.toLocaleDateString() === new Date(i.when).toLocaleDateString()))
      }
      this.dailyTrainings = [...proxyArray]
    },
    async getTrainings() {
      this.trainings = await trainingsAPI.getGroupTrainings().then(response => {
        this.loading = false
        return response.data.results
      }).catch(reason => {
        console.log(reason.response.data)
      });
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
    randomFloat:()=>(`${Math.random()}`)
  }
}
</script>

<style scoped>
.wrapper {
  padding: 2rem 9rem;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}

.title {
  display: none;
  margin: 0 0 2rem 0;
}

.calendar__wrapper {
  padding: 0 9rem;
  background: var(--color-text);
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
.day{
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
  background: var(--color-background);
  color: var(--color-text);
  }

.disabled {
  color: slategray;
  pointer-events: none;
  cursor: default;
}

.trainings-list__wrapper {
  margin: 0 9rem;
  padding: 0 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
}

h1 {
  font-size: 50px;
}

@media (max-width: 767px) {
  .wrapper {
    padding: 0;
  }
  .title{
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
  .calendar{
    padding: 0;
  }
  .trainings-list__wrapper {
    margin: 0 2rem;
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
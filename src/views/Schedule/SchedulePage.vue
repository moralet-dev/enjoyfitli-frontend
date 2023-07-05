<template>
  <div class="wrapper">
    <div class="title">
      <h1>{{ this.$t('SchedulePage') }}</h1>
      <button @click="previousWeek()">&lt</button>
      <button @click="nextWeek()"> ></button>
    </div>

    <div class="calendar">
      <div class="calendar__item" v-for="day in daysOfWeek">
        <span class="day">{{ day.toLocaleDateString(`${this.$store.getters.getLocale}`, {weekday: 'short'}) }}</span>
        <span class="number" @click="onDayClick(day)">{{ day.getDate() }} </span>
      </div>
    </div>
    <WeekTrainings :dailyTr="dailyTrainings"/>
  </div>
</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import {authAPI} from "@/api/authAPI/authAPI";
import Calendar from "@/views/Schedule/legacyPages/Calendar.vue";
import Modal from "@/components/Modals/Modal.vue";
import Switcher from "@/components/Switcher.vue";
import ListedTrainings from "@/views/Schedule/legacyPages/ListedTrainings.vue";
import DailyDetail from "@/views/Schedule/DailyDetail.vue";
import Preloader from "@/components/Preloader.vue";
import WeekTrainings from "@/views/Schedule/WeekTrainings.vue";
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "SchedulePage",
  components: {PreloaderSmall, WeekTrainings, Preloader, DailyDetail, ListedTrainings, Switcher, Modal, Calendar},
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
  mounted() {
    this.calculateWeekDays(this.currentDay)
    this.getTrainings()
  },
  methods: {
    calculateWeekDays(date) {
      this.startDate = new Date(date.setDate(date.getDate() - date.getDay() + 1));
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
        proxyArray = this.trainings.filter((i) => {
          return day.toLocaleDateString() === new Date(i.when).toLocaleDateString();
        })
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

  }
}
</script>

<style scoped>
.wrapper {
  padding: 6rem 9rem;
}

.number {
  cursor: pointer;
}

h1 {
  font-size: 50px;
}

@media (max-width: 767px) {
  .wrapper {
    padding: 3rem 1rem;
  }

  h1 {
    font-size: 30px;
  }

}

@media (min-width: 767px) and (max-width: 991px) {
  .wrapper {
    padding: 6rem 1rem;
  }

  h1 {
    font-size: 40px;
  }
}

</style>
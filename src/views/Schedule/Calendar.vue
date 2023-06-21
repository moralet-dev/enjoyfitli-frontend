<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-nav" @click="prevMonth">
        <ArrowLeftIcon/>
      </div>
      <div class="calendar-month">{{ currentMonth }} {{ currentYear }}</div>
      <div class="calendar-nav" @click="nextMonth">
        <ArrowIcon/>
      </div>
    </div>
    <transition name="fade">
      <div v-if="trList" class="calendar-grid">
        <div v-for="day in days" :key="day"
             :class="{'calendar-cell':true, 'bg-green': (day !== 'Sun' && day !== 'Sat'), 'bg-red': day === 'Sun' || day === 'Sat'}">
          {{ day }}
        </div>
        <div v-for="day in daysInMonth" :key="day" @click="showModal(day)"
             :ref="`day-${day}`"
             :class="{
                'calendar-cell': true,
                'disabled': isDisabled(day),
                'NaN': isNaN(day)
             }">
          {{ day }}
        </div>
      </div>
    </transition>
    <ModalCalendarPopup v-if="openDate" @close="showPopup = false"
                        @sign="listenSign"
                        @unsign="listenUnsign"
                        :show="showPopup"
                        :date="openDate"
                        :tr-list="trList"
    />
  </div>
</template>

<script>
import ArrowIcon from "@/components/icons/ArrowRightIcon.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import ModalCalendarPopup from "@/components/Modals/ModalCalendarPopup.vue";

export default {
  name: 'Calendar',
  components: {ModalCalendarPopup, ArrowLeftIcon, ArrowIcon},
  data() {
    return {
      currentDate: new Date(),
      realDate: new Date(),
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',],
      startDay: null,
      openDate: null,
      showPopup: false,
      hasTrLi: null,
      loading: true,
    };
  },
  props: {
    trList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    isLoading() {
      if (this.trList) {
        this.loading = false
      }
    },
    isTrainingsDay() {

    },
    currentDay() {
      return this.currentDate.getDate();
    },
    currentMonth() {
      return this.currentDate.toLocaleString('uk', {month: 'long'});
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    daysInMonth() {
      const firstDay = new Date(this.currentYear, this.currentDate.getMonth(), 1);
      this.startDay = firstDay.getDay();
      const daysInMonth = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0).getDate();
      const daysArray = [];
      for (let d = 1; d <= this.startDay; d++) {
        daysArray.push('X')
      }
      for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }
      return daysArray;
    }
  },
  updated() {
    if (this.trList) {
      this.loading = false
      this.hasTrainings()
    }
  },
  mounted() {
    if (this.trList) {
      this.loading = false
      this.hasTrainings()
    }
  },
  methods: {
    isDisabled(day) {
      if (isNaN(day)) {
        return true
      } else if (day < this.realDate.getDate() && this.currentDate.getMonth() === this.realDate.getMonth()) {
        return true
      } else if (this.currentDate.getMonth() < this.realDate.getMonth()) {
        return true
      }
      return false
    },
    hasTrainings() {
      if (this.trList) {
        this.trList.forEach((i) => {
          let d = new Date(i.when)
          if (d.getMonth() === this.currentDate.getMonth() && d.getDate() >= this.realDate.getDate()) {

            let ref = this.$refs[`day-${d.getDate()}`]
            ref[0].classList.add('has-trainings')

          } else if (d.getMonth() === this.currentDate.getMonth() && d.getMonth() !== this.realDate.getMonth()) {

            let ref = this.$refs[`day-${d.getDate()}`]
            ref[0].classList.add('has-trainings')

          } else {

            let ref = this.$refs[`day-${d.getDate()}`]
            ref[0].classList.remove('has-trainings')
          }
        })
      }
    },
    async showModal(day) {
      this.openDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      this.showPopup = true
    },
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
    listenSign(id) {
      this.$emit('p-sign', id)
    },
    listenUnsign(id) {
      this.$emit('unsign', id)
    }
  }
};
</script>


<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  margin-bottom: 2rem;
}

.calendar-nav {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

.calendar-month {
  font-size: 30px;
  font-weight: bold;
  margin: 0 2rem;
  text-transform: uppercase;
  text-align: center;
  color: var(--color-headings);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: .7rem;
  width: 100%;
  max-height: 35rem;
}

.calendar-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 20px;
  pointer-events: none;
  border: 1px solid var(--color-background-mute);
  background: var(--color-background-soft);
}
@media (max-width: 767px) {
  .calendar-header{
    align-items: center;
  }
  .calendar-grid{
    gap: .3rem;
  }
  .calendar-month{
    font-size: 20px;
  }
  .calendar-cell{
    font-size: 16px;
    height: 40px;
  }
}
.disabled {
  color: #808080;
  background: #616161;
}

.bg-red {
  background-color: crimson;
  color: var(--vt-c-black-soft);
}

.bg-green {
  background-color: var(--color-background-mute);
  color: var(--color-helper);
}

.has-trainings {
  background: sandybrown;
  color: black;
  cursor: pointer;
  pointer-events: all;
  transition: .3s;
}

.has-trainings:hover {
  transform: scale(1.1);
}

.NaN {
  font-family: Inter, sans-serif;
  color: #494949;
}

.fade-enter-active {
  transition: all .5s ease-in-out;
}

.fade-leave-active {
  height: 0;
  padding: 0;
  transition: all .5s ease-in-out;

}

.fade-enter-from {
  opacity: 0;
  padding: 0;
  max-height: 0;
}

.fade-leave-to {
  max-height: 0;
  padding: 0;
  opacity: 0;
}
</style>

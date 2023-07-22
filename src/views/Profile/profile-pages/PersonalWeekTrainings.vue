<template>
  <div>
    <div
        :class="{'training-item animate__animated animate__fadeIn': true, 'disabled': isLessOneHour(t) && isChecked(t)}"
        v-if="trainings.length > 0"
        v-for="t in trainings" :key="t.id">
      <div class="training-item__top">
        <span>{{ $t('personalTraining') }}</span>
        <span class="date">
          {{
            new Date(t?.when).toLocaleDateString(`${this.$store.getters.getLocale}`,
                {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})
          }}
      </span>
      </div>
      <div class="training-item__middle">
        {{ t?.where || this.$t('noPlace') }}
      </div>
      <div class="training-item__bottom">
        <span class="animate__animated animate__backInRight" :key="isChecked(t)">{{ $t('status') }}:
          {{ isChecked(t) ? $t('confirmed') : $t('unchecked') }}</span>
      </div>
      <div class="detail-wrapper">
        <div v-if="isChecked(t) && isLessOneHour(t)" class="actions">
          <span class="actions__text">{{ $t('lessOneHourText') }}</span>
        </div>
        <div v-else class="actions">
          <span class="actions__text">{{ $t('personalTrBottomText') }}</span>
          <button :class="{'next animate__animated animate__backInRight':true,'to-sign': !isChecked(t), 'signed': isChecked(t)}"
                  @click="toggle(t?.id)"
                  :key="isChecked(t)">
            {{ isChecked(t) ? $t('uncheck') : $t('check') }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import DailyDetail from "@/views/Schedule/DailyDetail.vue";
import DoubleArrows from "@/components/icons/DoubleArrows.vue";

export default {
  name: "PersonalWeekTrainings",
  components: {DoubleArrows, DailyDetail},
  props: {
    trainings: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    isDetailView: false,
    selectedTr: null,
  }),
  methods: {
    isLessOneHour(training) {
      const trainingDate = new Date(training.when)
      const now = new Date()
      const oneHourLater = new Date(now.getTime() + (60 * 60 * 1000))
      return trainingDate <= oneHourLater
    },
    isChecked(t) {
      return !!t?.user_confirmed
    },
    toggle(id) {
      this.$emit('toggle', id)
    }
  }
}
</script>

<style scoped>
.training-item {
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  padding: 1rem 2rem;
  background: var(--color-text);
  border-radius: 20px;
  color: var(--color-headings);
  font-family: "Helvetica Neue", sans-serif;
}

.training-item.disabled {
  background: slategray;
}

.training-item > div:nth-child(even),
.training-item > div:nth-child(odd) {
  margin-bottom: .5rem;
}

.training-item__top {
  font-family: 'Futura New', sans-serif;
  font-weight: 700;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
}

.date {
  text-align: right;
  margin: 0 0 0 1rem;
}

.training-item__middle {
  font-size: 16px;
  font-style: italic;
  letter-spacing: 2px;
  color: var(--color-background-soft);
}

.training-item__bottom {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}

.training-item.disabled {
  background: slategray;
  pointer-events: none;
}

.actions {
  display: grid;
  grid-template-columns: 8fr 4fr;
  padding: 1rem 0;
  border-top: 1px solid var(--color-headings);
}

.actions__text {
  align-self: center;
}

.to-sign, .signed {
  justify-self: end;
  align-self: center;
}

.signed {
  background: orange;
}
.to-sign:hover{
  color: var(--color-link-text);
  background: var(--color-helper);
}
.signed:hover{
  color: var(--color-link-text);
}
@media (max-width: 767px) {
  .training-item {
    padding: 1rem;
    margin: 0 0 1rem 0;
  }

  .training-item__top {
    font-size: 18px;
  }

  .training-item__middle {
    font-size: 14px;
  }

  .training-item__bottom {
    font-size: 16px;
  }

  .actions {

    grid-template-columns: 12fr;
    padding: 1rem 0 0 0;
  }

  .actions__text {
    text-align: center;
    margin: 0 0 1rem 0;
  }

  .to-sign, .signed {
    justify-self: center;
  }

}
</style>
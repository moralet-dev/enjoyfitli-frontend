<template>
  <div>
    <div :class="{'training-item animate__animated animate__fadeIn': true, 'disabled': isLessOneHour(t) && isSigned(t)}"
         @click="onTrClick(t)"
         v-if="dailyTr.length > 0"
         v-for="t in dailyTr" :key="t.id">
      <div class="training-item__top">
        <span>
          {{ isSigned(t) && !isProfile ? '✅ ' : '' }}
          {{
            t?.direction?.name ? t?.direction[`name_${this.$store.getters.getLocale}`] : t?.type[`name_${this.$store.getters.getLocale}`]
          }}

        </span>
        <span class="date">
          {{
            !isProfile
                ? new Date(t?.when).toLocaleTimeString(`${this.$store.getters.getLocale}`, {
                  hour: '2-digit',
                  minute: '2-digit'
                })
                : new Date(t?.when).toLocaleDateString(
                    `${this.$store.getters.getLocale}`,
                    {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})
          }}
      </span>

      </div>
      <div class="training-item__middle">
        {{ t?.where || this.$t('noPlace') }}
      </div>
      <div class="training-item__bottom">
        <span>
          {{ `${this.$t('freePlaces')}: ${Math.max(0, t?.max_people - (t?.visitors?.length || 0))}` }}
        </span>
        <span v-if="!isProfile">
        {{ t?.cost }} &#8372;
        </span>
      </div>
      <span class="toggle">
        <DoubleArrows :class="{'arrow':true, 'up':isDetailView&&selectedTr?.id===t?.id}"
                      :height="20" :width="20"
                      :rotate="isDetailView && selectedTr?.id===t?.id ? 90 : -90"
                      icon-color="var(--color-headings)"/>
      </span>
      <transition name="d_fade" mode="out-in">
        <DailyDetail @sign="onSign" @rescind="onRescind"
                     :training="t"
                     :isProfile="isProfile"
                     v-if="isDetailView && selectedTr?.id === t?.id"
                     :key="`s_tr_${t?.id}`"/>
      </transition>

    </div>
  </div>
</template>

<script>
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import DailyDetail from "@/views/Schedule/DailyDetail.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import DoubleArrows from "@/components/icons/DoubleArrows.vue";

export default {
  name: "WeekTrainings",
  components: {DoubleArrows, PlusIcon, ArrowLeftIcon, DailyDetail, PreloaderSmall},
  props: {
    dailyTr: {
      type: Array,
      default: null,
    },
    isProfile: {
      type: Boolean,
      default: false,
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
    onTrClick(t = null) {
      if (t?.id !== this.selectedTr?.id) {
        this.selectedTr = t
        this.isDetailView = true
        return
      }
      [this.selectedTr, this.isDetailView] = [null, false]
    },
    isSigned(t) {
      if (t?.visitors?.length > 0) {
        for (let i of t.visitors) {
          if (i?.visitor === this.$store.getters['authModule/getCurrentUser'].id) {
            return true
          }
        }
      }
      return false
    },
    onSign(id) {
      this.$emit('sign', id)
    },
    onRescind(id) {
      this.$emit('rescind', id)
    }
  }
}
</script>

<style scoped>
.training-item {
  cursor: pointer;
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


.toggle {
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0;
  background: transparent;
}

.d_fade-enter-active,
.d_fade-leave-active {
  transition: all .5s ease-in-out;
}

.d_fade-enter-from,
.d_fade-leave-to {
  max-height: 0;
  opacity: .5;
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

  .d_fade-enter-active,
  .d_fade-leave-active {
    transition: max-height .5s ease-in-out;
  }

  .d_fade-enter-from,
  .d_fade-leave-to {
    max-height: 0;
    opacity: 1;
  }
}
</style>
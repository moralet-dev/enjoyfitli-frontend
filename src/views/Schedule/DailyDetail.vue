<template>
  <div class="detail-wrapper">
    <p  class="detail-wrapper__text" v-if="training?.direction && !isProfile">
      {{ training?.direction[`description_${$store.getters.getLocale}`] }}
    </p>
    <p v-if="!isProfile" class="detail-wrapper__text">{{ $t('level') }}:
      {{ training.direction?.level }}
    </p>
    <div v-if="isSigned()" :class="{'actions': true,}">
      <p v-if="isLessThreeHours()" class="actions__text">
        {{ this.$t('lessOneHourText') }}
        <router-link class="text-link" :to="{'name': 'home'}">{{ $t('details') }}</router-link>
      </p>
      <span v-else class="actions__text">{{ $t('signedText') }}</span>
      <button v-if="!isLessThreeHours()" class="next signed" @click="onRescind">{{ $t('rescind') }}</button>
    </div>
    <div v-if="!isSigned()" class="actions">
      <span class="actions__text">{{ $t('toSignText') }}</span>
      <button class="next to-sign" @click="onSign">{{ $t('sign') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyDetail",
  props: {
    training: {
      type: Object,
    },
    isProfile: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
  },
  methods: {
    isLessThreeHours() {
      const trainingDate = new Date(this.training.when)
      const now = new Date()
      const threeHoursLater = new Date(now.getTime() + (3 * 60 * 60 * 1000))
      return trainingDate <= threeHoursLater
    },
    isSigned() {
      if (this.training?.visitors?.length > 0) {
        for (let i of this.training?.visitors) {
          if (i?.visitor === this.$store.getters['authModule/getCurrentUser'].id) {
            return true
          }
        }
      }
      return false
    },
    async onSign(event) {
      event.stopPropagation()
      this.$emit('sign', this.training.id)
    },
    async onRescind(event) {
      event.stopPropagation()
      this.$emit('rescind', this.training.id)
    },
  }
}
</script>

<style scoped>
.detail-wrapper {
  white-space: pre-wrap;
  max-height: 200vh;
}

.detail-wrapper__text {
  font-size: 16px;
  padding: 1rem .5rem;
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
  border: 2px solid transparent;
}

.signed {
  background: orange;
  color: var(--vt-c-blue-mute);
}
.to-sign:hover{
  background: var(--color-helper);
}
.signed:hover{
  color: var(--vt-c-blue-mute);
}
@media (max-width: 767px) {
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
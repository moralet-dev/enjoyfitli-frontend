<template>
  <div class="training-item animate__animated animate__fadeIn" v-if="dailyTr" v-for="tr in dailyTr" :key="tr.id">
    <div class="training-item__top">
      <span>
      {{ tr?.direction?.name || tr.type.name }}
      </span>
      <span>
      {{
          new Date(tr?.when).toLocaleTimeString(`${this.$store.getters.getLocale}`, {
            hour: '2-digit',
            minute: '2-digit'
          })
        }}
      </span>

    </div>
    <div class="training-item__middle">
      {{ tr?.where || this.$t('noPlace') }}
    </div>
    <div class="training-item__bottom">
      <span>
      {{ this.$t('places') }}: {{ tr?.max_people - tr?.visitors }} / {{ tr?.max_people }}
      </span>
      <span>
        {{ tr?.cost }} &#8372;
      </span>
    </div>
  </div>
</template>

<script>
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "WeekTrainings",
  components: {PreloaderSmall},
  props: {
    dailyTr: {
      type: Array,
      default: null,
    }
  },
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

.training-item__bottom {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}
</style>
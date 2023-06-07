<template>
  <div class="">
    <div class="title-wrapper">
      <h3>{{ this.$t('ProfilePage.myTrainings') }}:</h3>
    </div>
    <div v-if="trainingsList" class="trainings-block animate__animated animate__fadeIn" v-for="t in trainingsList">
      <h4>{{ this.$t('ProfilePage.training') }}:</h4>
      <div class="training">
        <div class="item"><span>{{ this.$t('ProfilePage.name') }}:</span> {{ t[`name_${this.$store.getters.getLocale}`] }}</div>
        <div class="item"><span>{{ this.$t('ProfilePage.trType') }}:</span> {{ t.type[`name_${this.$store.getters.getLocale}`] }}</div>
        <div class="item"><span>{{ this.$t('ProfilePage.specification') }}:</span> {{ t.specification[`name_${this.$store.getters.getLocale}`] }}</div>
        <div class="item">
          <span>{{ this.$t('ProfilePage.when') }}:</span>
          {{
            new Date(t.when).toLocaleString(
            `${this.$store.getters.getLocale}`,
            {weekday: 'short', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'})
          }}
        </div>
        <div class="item"><span>{{ this.$t('ProfilePage.where') }}:</span> {{ t[`where_${this.$store.getters.getLocale}`] || t.where }}</div>
        <div class="item unsign">
          <button type="button" v-on:click="onUnsign(t.id)">X {{this.$t('ProfilePage.unsign')}}</button>
        </div>

      </div>
    </div>
    <div v-else>
      <PreloaderSmall/>
    </div>
  </div>

</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "SchedulePage",
  components: {PreloaderSmall},
  data() {
    return {
      trainingsList: null,
    }
  },

  beforeMount() {
    this.getGroupTrainingsList()
  },
  methods: {
    async getGroupTrainingsList() {
      this.trainingsList = await trainingsAPI.getMyGroupTrainings().then(response => {
        return response.data.results
      })
    },
    async onUnsign(id) {
      await trainingsAPI.unsignGroupTraining(id).then(() => {
        this.getGroupTrainingsList()
      })
    }
  }
}
</script>

<style scoped>
.title-wrapper {
  padding: 0.5em 0 1rem 0;
}

h3 {
  font-size: 30px;
}

.trainings-block {
  padding: 1rem 0;
}

.training {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  border-bottom: solid 1px rgb(217, 217, 217);
}

.item {
  padding: 1rem 0;
  text-align: center;
}

.item span {
  display: block;
  font-weight: 600;
  padding: 0 0 0.5rem 0;
  word-wrap: break-word;
  color: var(--color-headings);
  text-transform: capitalize;
}

.unsign {
  display: flex;
  justify-content: center;
  align-items: center;
}

.unsign button {
  padding: .5rem;
  background-color: transparent;
  transition: 0.3s, transform 2s;
  transition-timing-function: ease-in-out;
  border-radius: 10px;
  color: var(--color-link);
  border: 2px solid darkred;
}

.unsign button:hover {
  border: none;
  background-color: darkred;
  color: var(--color-link-hover);
}

@media (max-width: 767px) {
  h3 {
    font-size: 25px;
  }

  .training {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /*grid-template-columns: 6fr 6fr;*/
  }

  .item {
    flex: 0 0 25%;
  }
}
</style>
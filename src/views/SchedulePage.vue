<template>
  <div class="wrapper">
    <div class="trainings-block" v-for="t in trainingsList">
      <h4>Training:</h4>
      <div class="training">
        <div class="item"><span>Name:</span> {{ t.name }}</div>
        <div class="item"><span>Type:</span> {{ t.type.name }}</div>
        <div class="item"><span>Specification:</span> {{ t.specification.name }}</div>
        <div class="item"><span>When:</span> {{ new Date(t.when).toLocaleString() }}</div>
        <div class="item"><span>Where:</span> {{ t.where }}</div>
        <div class="item"><span>Visitors:</span> {{ t.visitors.length }}/{{ t.max_people }}</div>
        <div class="item unsign" v-if="isSigned(t)">
          <button type="button" v-on:click="onUnsign(t.id)">Unsing</button>
        </div>
        <div class="item sign" v-else>
          <button type="button" class="disabled" v-if="t.visitors.length >= t.max_people" disabled>People's count
            reached
          </button>
          <button type="button" v-else v-on:click="onSign(t.id)">Sing</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import {authAPI} from "@/api/authAPI/authAPI";

export default {
  name: "SchedulePage",
  data() {
    return {
      trainingsList: null,
      currentUserData: {
        first_name: null,
        last_name: null,
        phone: null,
        photo: null,
        id: null,
      },
    }
  },
  beforeCreate() {
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
      this.trainingsList = await trainingsAPI.getGroupTrainings().then(response => {
        return response.data.results
      })
    },
    async getMe() {
      await authAPI.getMe().then(response => {
        this.currentUserData = response.data
      }).catch(() => this.currentUserData = null)
    },
    async onSign(id) {
      await trainingsAPI.singGroupTraining(id).then(() => {
        this.getGroupTrainingsList()
      })
    },
    async onUnsign(id) {
      await trainingsAPI.unsignGroupTraining(id).then(() => {
        this.getGroupTrainingsList()
      })
    },
    isSigned(training) {
      if (training.visitors.length > 0) {
        for (let i of training.visitors) {
          if (i.visitor === this.currentUserData.id) {
            return true
          }
        }
      }
      return false
    },
  }
}
</script>

<style scoped>
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
  color: var(--color-headings);
}

.sign {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign button, .unsign button {
  padding: .5rem;
  background-color: transparent;
  transition: 0.3s, transform 2s;
  transition-timing-function: ease-in-out;
  border-radius: 10px;
  color: var(--color-link);
  border: 2px solid rgba(0, 156, 6, 1);
}

.sign button:hover, .unsign button:hover {
  background-color: rgba(0, 156, 6, 1);
  color: var(--color-link-hover);
}

.sign .disabled {
  cursor: default;
  border: 2px solid rgb(102, 117, 102);
}

.sign .disabled:hover {
  background-color: inherit;
  color: var(--color-link);
}

.unsign button {
  border: 2px solid darkred;
}

.unsign button:hover {
  background-color: darkred;
}
</style>
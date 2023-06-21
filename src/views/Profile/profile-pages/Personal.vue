<template>
  <div class="">
    <div class="title-wrapper">
      <h3>{{ this.$t('ProfilePage.myPersonalTrainings') }}:</h3>
    </div>
    <div v-if="trainingsList?.length > 0" class="trainings-block animate__animated animate__fadeIn" v-for="t in trainingsList">
      <p>{{ this.$t('ProfilePage.personalTraining') }}:</p>
      <div class="training">
        <div class="item">
          <span>{{ this.$t('ProfilePage.when') }}:</span>
          <span>
          {{
            new Date(t.when).toLocaleString(
                `${this.$store.getters.getLocale}`,
                {day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'})
          }}
          </span>
        </div>
        <div class="item">
          <span>{{ this.$t('ProfilePage.where') }}:</span>
          <span>{{ t[`where_${this.$store.getters.getLocale}`] || t.where }}</span>
        </div>
        <div class="item">
          <span>{{ this.$t('status') }}:</span>
          <span>{{ t.user_confirmed? '✅': '➖'}}</span>
        </div>
        <div :class="{'item':true, 'checked': t?.user_confirmed, 'unchecked': !t?.user_confirmed}">
          <span>{{ this.$t('ProfilePage.checkIn') }}:</span>
          <button type="button" @click="onCheck(t.id)">{{ t.user_confirmed? this.$t('ProfilePage.uncheck'): this.$t('ProfilePage.check')}}</button>
        </div>
      </div>
    </div>
    <div v-else-if="trainingsList?.length <= 0" class="trainings-block animate__animated animate__fadeIn">
      <h4>{{ this.$t('ProfilePage.noPersonalTraining') }}:</h4>
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
  name: "Personal",
  data(){
    return{
      trainingsList: null,
    }
  },
  beforeMount() {
    this.getPersonalTr()
  },
  components: {PreloaderSmall},
  methods:{
    async getPersonalTr(){
      this.trainingsList = await trainingsAPI.getPersonalTrainings().then(response=>response.data.results)
    },
    async onCheck(id){
      await trainingsAPI.userConfirmPersonal(id).then(()=>{
        this.getPersonalTr()
      })
    },
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
.trainings-block p{
  text-transform: capitalize;
  font-size: 22px;
}
.training {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  border-bottom: solid 1px var(--color-helper);
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  text-align: center;
}

.item span {
  display: block;
  font-weight: 600;
  padding: 0 0 0.5rem 0;
  word-wrap: break-word;
  color: var(--color-text);
  text-transform: capitalize;
}
.item button{
  padding: 3px 15px;
}
.checked button{
}
.checked button:hover{
  background-color: darkred;
  color: var(--vt-c-white-soft);
}
.unchecked button{
}
.unchecked button:hover{
  background-color: chartreuse;
  color: var(--color-link-text);
}
@media (max-width: 767px) {
  h3 {
    font-size: 30px;
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
  .checked button{
    color: var(--vt-c-white-soft);

    background-color: darkred;
  }
  .unchecked button{
    background-color: chartreuse;
  }
}
</style>
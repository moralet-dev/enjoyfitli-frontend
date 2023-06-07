<template>
  <div class="">
    <div class="title-wrapper">
      <h3>{{this.$t('ProfilePage.nutritionCalc')}}</h3>
    </div>
    <div class="table">
      <form @submit.prevent="calculate">
        <div class="form-group">
          <label for="weight">{{ this.$t('ProfilePage.weightKG') }}</label>
          <input type="number" v-model="weight" min="30" max="150" id="weight" required>
        </div>
        <div class="form-group">
          <label for="height">{{ this.$t('ProfilePage.heightKG') }}</label>
          <input type="number" v-model="height" min="140" max="205" id="height" required>
        </div>
        <div class="form-group">
          <label for="age">{{ this.$t('ProfilePage.age') }}</label>
          <input type="number" v-model="age" min="10" max="100" id="age" required>
        </div>
        <div class="form-group">
          <label>{{ this.$t('ProfilePage.gender') }}</label>
          <select v-model="gender" id="gender" required>
            <option value="male">{{ this.$t('ProfilePage.male') }}</option>
            <option value="female">{{ this.$t('ProfilePage.female') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="activity">{{ this.$t('ProfilePage.activityLVL') }}</label>
          <select v-model="activity" id="activity" required>
            <option value="sedentary" title="Сидячий спосіб життя">{{ this.$t('ProfilePage.week0') }}</option>
            <option value="lightlyActive" title="Легка активність (тренування 1-2 рази на тиждень)">{{ this.$t('ProfilePage.week12') }}</option>
            <option value="moderatelyActive" title="Середня активність (тренування 3-5 разів на тиждень)">{{ this.$t('ProfilePage.week35') }}</option>
            <option value="veryActive" title="Висока активність (тренування 6-7 разів на тиждень)">{{ this.$t('ProfilePage.week67') }}</option>
            <option value="1.9" title="Дуже висока активність (тренування 2 рази на день)">{{ this.$t('ProfilePage.day2') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{ this.$t('ProfilePage.goal') }}</label>
          <select v-model="goal" id="goal" required>
            <option value="weightLoss">{{ this.$t('ProfilePage.weightLoss') }}</option>
            <option value="weightMaintenance">{{ this.$t('ProfilePage.weightKeep') }}</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit">{{ this.$t('ProfilePage.calculate') }}</button>
        </div>

      </form>
      <div class="result" v-if="result">
        <h3>{{ this.$t('ProfilePage.result') }}:</h3>
        <p>{{ this.$t('ProfilePage.calories') }}: {{ result.calories }}</p>
        <p>{{ this.$t('ProfilePage.protein') }}: {{ result.protein }}</p>
        <p>{{ this.$t('ProfilePage.fats') }}: {{ result.fat }}</p>
        <p>{{ this.$t('ProfilePage.carbs') }}: {{ result.carbs }}</p>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'MyNutritionBalance',
  data() {
    return {
      weight: null,
      height: null,
      age: null,
      goal: null,
      gender: null,
      activity: null,
      result: null
    };
  },
  methods: {
    calculate() {
      // Обчислення калорій
      const bmr =
          this.gender === "male"
              ? 66.5   + 13.75 * this.weight + 5.003 * this.height - 6.75 * this.age
              : 447.6 + 9.2 * this.weight + 3.1 * this.height - 4.3 * this.age;

      const calories =
          bmr *
          (this.activity === "sedentary"
              ? 1.2
              : this.activity === "lightlyActive"
                  ? 1.375
                  : this.activity === "moderatelyActive"
                      ? 1.55
                      : this.activity === "veryActive"
                          ? 1.725
                          : 1.9);

      let calorieIntake;
      if (this.goal === "weightLoss") {
        calorieIntake = calories - 500;
      } else if (this.goal === "weightMaintenance") {
        calorieIntake = calories;
      }
      console.log(calorieIntake)
      let protein = 0, fat = 0, carbs = 0;

      if (this.goal === 'weightLoss') {
        protein = this.weight * 1.8;
        fat = (calorieIntake * 0.2) / 9;
        carbs = (calorieIntake - ((protein * 4) + (fat * 9))) / 4;
      } else if (this.goal === 'weightMaintenance') {
        protein = this.weight * 1.5;
        fat = (calorieIntake * 0.25) / 9;
        carbs = (calorieIntake - ((protein * 4) + (fat * 9))) / 4;
      }


      // Обчислення КБЖУ
      // const protein = this.weight * (this.goal === "weightLoss" ? 1.8 : 2.2);
      // const fat = calories * (this.goal === "weightLoss" ? 0.25 : 0.3) / 9;
      // const carbs = (calories - protein * 4 - fat * 9) / 4;

      // Збереження результату
      this.result = {
        calories: Math.round(calorieIntake),
        protein: Math.round(protein),
        fat: Math.round(fat),
        carbs: Math.round(carbs),
      };
    },
  },
};
</script>

<style scoped>
.title-wrapper{
  padding: 0.5rem 0 1rem 0;
}
h3 {
  font-size: 30px;
}
.table{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
form{
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  width: 100%;
}
.form-group{
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  width: 100%;

}
.form-group input{
  width: 100%;
}
.result{
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
}
.result h3{
  margin: 0 0 1rem 0;
}
label:first-letter{
  text-transform: uppercase;
}
.result p:first-letter {
  text-transform: uppercase;
}
@media (max-width: 767px) {
  .title-wrapper{
    padding: 1rem 0 0 0;
  }
  h3{
    font-size: 25px;
  }
  form{
    display: grid;
    grid-template-columns: 12fr;
    grid-gap: 10px;
    font-size: 16px;
  }
  .form-group select{
    font-size: 16px;
  }
  .result{
    padding: 0;
  }
}
</style>
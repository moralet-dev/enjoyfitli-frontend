<template>
  <div class="">
    <div class="title-wrapper">
      <h3>{{$t('nutritionCalc')}}</h3>
    </div>
    <div class="table">
      <form @submit.prevent="calculate">
        <div class="form-group">
          <label>{{ $t('gender') }}</label>
          <select v-model="gender" id="gender" required>
            <option value="male">{{ $t('male') }}</option>
            <option value="female">{{ $t('female') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="age">{{ $t('age') }}</label>
          <input type="number" v-model="age" min="10" max="100" id="age" required>
        </div>
        <div class="form-group">
          <label for="height">{{ $t('heightKG') }}</label>
          <input type="number" v-model="height" min="140" max="235" id="height" required>
        </div>
        <div class="form-group">
          <label for="weight">{{ $t('weightKG') }}</label>
          <input type="number" v-model="weight" min="30" max="250" id="weight" required>
        </div>

        <div class="form-group">
          <label for="activity">{{ $t('activityLVL') }}</label>
          <select v-model="activity" id="activity" required>
            <option value="sedentary" title="Сидячий спосіб життя">{{ $t('week0') }}</option>
            <option value="lightlyActive" title="Легка активність (тренування 1-2 рази на тиждень)">{{ $t('week12') }}</option>
            <option value="moderatelyActive" title="Середня активність (тренування 3-5 разів на тиждень)">{{ $t('week35') }}</option>
            <option value="veryActive" title="Висока активність (тренування 6-7 разів на тиждень)">{{ $t('week67') }}</option>
            <option value="1.9" title="Дуже висока активність (тренування 2 рази на день)">{{ $t('day2') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{ $t('goal') }}</label>
          <select v-model="goal" id="goal" required>
            <option value="weightLoss">{{ $t('weightLoss') }}</option>
            <option value="weightMaintenance">{{ $t('weightKeep') }}</option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn" type="submit">{{ $t('calculate') }}</button>
        </div>

      </form>
      <div class="result" v-if="result">
        <h3>{{ $t('result') }}:</h3>
        <p>{{ $t('calories') }}: {{ result.calories }}</p>
        <p>{{ $t('protein') }}: {{ result.protein }}</p>
        <p>{{ $t('fats') }}: {{ result.fat }}</p>
        <p>{{ $t('carbs') }}: {{ result.carbs }}</p>
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
  width: 100%;
  padding: 0 0 1rem 0;
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
  .table{
    padding: 1rem 0;
  }
  h3{
    font-size: 25px;
  }
  form{
    display: grid;
    grid-template-columns: 12fr;
    grid-gap: 10px;
  }
  .form-group select{
    font-size: 16px;
  }
  .result{
    padding: 0;
  }
}
</style>
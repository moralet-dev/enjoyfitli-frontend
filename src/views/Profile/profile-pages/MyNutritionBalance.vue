<template>
  <div class="">
    <div class="title-wrapper">
      <h3>Калькулятор КБЖУ</h3>
    </div>
    <div class="table">
      <form @submit.prevent="calculate">
        <div class="form-group">
          <label for="weight">Вага (кг)</label>
          <input type="number" v-model="weight" min="30" max="150" id="weight" required>
        </div>
        <div class="form-group">
          <label for="height">Зріст (см)</label>
          <input type="number" v-model="height" min="140" max="205" id="height" required>
        </div>
        <div class="form-group">
          <label for="age">Вік (років)</label>
          <input type="number" v-model="age" min="10" max="100" id="age" required>
        </div>
        <div class="form-group">
          <label>Стать</label>
          <select v-model="gender" id="gender" required>
            <option value="male">Чоловік</option>
            <option value="female">Жінка</option>
          </select>
        </div>
        <div class="form-group">
          <label for="activity">Рівень активності</label>
          <select v-model="activity" id="activity" required>
            <option value="sedentary">Сидячий спосіб життя</option>
            <option value="lightlyActive">Легка активність (тренування 1-2 рази на тиждень)</option>
            <option value="moderatelyActive">Середня активність (тренування 3-5 разів на тиждень)</option>
            <option value="veryActive">Висока активність (тренування 6-7 разів на тиждень)</option>
            <option value="1.9">Дуже висока активність (тренування 2 рази на день)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Мета</label>
          <select v-model="goal" id="goal" required>
            <option value="weightLoss">Схуднення</option>
            <option value="weightMaintenance">Підтримка</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit">Розрахувати</button>
        </div>

      </form>
      <div class="result" v-if="result">
        <h3>Результат:</h3>
        <p>Калорії: {{ result.calories }}</p>
        <p>Білки: {{ result.protein }}</p>
        <p>Жири: {{ result.fat }}</p>
        <p>Вуглеводи: {{ result.carbs }}</p>
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
}
.form-group{
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}
.form-group input{
}
.result{
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
}
</style>
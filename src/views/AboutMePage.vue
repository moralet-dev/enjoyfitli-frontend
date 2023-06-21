<template>
  <div class="wrapper">
    <div class="title">
      <h1>I am Liza! Your future coach.</h1>
    </div>
    <div class="content">
      <p>
        Моя спеціалізація - це функціональний тренінг (робота з власною вагою), силовий тренінг (робота з додатковою
        вагою) та Pilates.
      </p>
      <p>
        Я маю вищу освіту за спеціальностями «Психологія» та «Тренерська діяльність». Тож, йдучи до мене, ти
        потраплятимеш не просто на тренування, а туди, де можна поспілкуватися, вивільнити емоції та зробити тіло
        прикладом власного ідеалу! Я чекаю саме на тебе!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutMePage"
}
</script>

<style scoped>
.wrapper{
  padding: 6rem 9rem;
}
h1 {
  padding: 1.5rem 0;
  font-size: 50px;
}
.content{
  width: 50%;
}
.content p{
  margin: 1rem 0;
}
@media (max-width: 767px) {
  .wrapper{
    padding: 3rem 1rem;
  }
  h1{
    font-size: 30px;
  }
  .content{
    width: 100%;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .wrapper{
    padding: 6rem 5rem;
  }
}
</style>
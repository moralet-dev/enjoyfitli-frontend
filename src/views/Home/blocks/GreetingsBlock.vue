<template>
  <div class="wrapper">
    <div>
      <p class="title">Моя спеціалізація - це<br>функціональний тренінг,<br>силовий тренінг та Pilates.</p>
      <p>Я маю вищу освіту за спеціальностями «Психологія» та «Тренерська діяльність». <br>Тож, йдучи до мене, ти
        потраплятимеш не просто на тренування, а туди, де можна поспілкуватися, вивільнити емоції та зробити тіло
        прикладом власного ідеалу!<br> Я чекаю саме на тебе!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GreetingsBlock"
}
</script>

<style scoped>
.wrapper {
  padding: 6rem 9rem;
}

.content {
  padding: 0;
  margin: 0;
}

.content p {
  margin: 0 0 2rem 0;
  padding: 0 3rem;
  font-size: 24px;
}

p.title {
  font-family: "Helvetica Neue", sans-serif;
  color: var(--color-headings);
  text-shadow: 1px 1px 2px black;
  font-size: 50px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
}

@media (max-width: 767px) {
  .wrapper {
    padding: 3rem 1rem;
  }

  .content {
    margin: 0;
    padding: 0;
  }

  .content p {
    margin: 0 0 2rem 0;
    font-size: 16px;
  }

  p.title {
    font-family: "Helvetica Neue", sans-serif;
    color: var(--color-headings);
    text-shadow: 1px 1px 1px black;
    font-size: 30px;
    font-weight: 700;
    text-transform: uppercase;
  }
}

@media (min-width: 768px)and (max-width: 991px) {
  .wrapper {
    padding: 6rem 5rem;
  }
}
</style>
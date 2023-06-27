<template>
  <div class="wrapper">
    <div class="media-container">
      <div class="content-block">
        <div class="content-block__text">
          <span class="number">01</span>
          <span class="title">FatBurning</span>
          <p>Це ідеальне функціональне тренування на всі групи м’язів, яке чудово підійде для тих хто хоче скинути зайву
            вагу та зробити тіло більш підтягнутим!</p>
          <p>Ще більше активних вправ для формування нереального рельєфу вашого тіла.</p>
        </div>
      </div>
      <div class="content-block">
        <div class="content-block__image" style="background-image: url('src/assets/bg-images/fatburn.png')">
        </div>
      </div>
    </div>
    <div class="media-container">
      <div class="content-block">
        <div class="content-block__text">
          <span class="number">02</span>
          <span class="title">Power</span>
          <p>Якщо ти хочеш підтягнути своє тіло, зробити його міцним та виносливим, зменшити болі в спині, наростити
            м’язи, скинути лишню вагу та зробити красивий рельєф-тоді тобі точно допоможуть в цьому силові тренування.
          </p>
          <p>Працюй з різним обладненням, вдосконалюй ті зони тіла, які тебе турбують і качай міцні та великі ягодиці
            разом зі мною!</p>
        </div>
      </div>
      <div class="content-block">
        <div class="content-block__image"
             style="background-image: url('src/assets/bg-images/power_photo.png')">

        </div>
      </div>
    </div>
    <div class="media-container">
      <div class="content-block">
        <div class="content-block__text">
          <span class="number">03</span>
          <span class="title">Rehab</span>
          <p>Незабувай твої м’язи також прагнуть розслаблення та відновлення.Моє тренування допоможе тобі розслабити всі
            групи м’язів і при цьому щей підтягнути тіло. Від втоми чи стресу не залишиться ані сліду!
          </p>
          <p>Релексуй та кайфуй від кожної частинки свого тіла під спокійну музику разом зі мною!</p>
        </div>
      </div>
      <div class="content-block">
        <div class="content-block__image" style="background-image: url('src/assets/bg-images/rehab.png')">
        </div>
      </div>
    </div>
    <h3>Обийрай та дізнавайся<br>про тренування які<br>підходять тобі найбільше</h3>
  </div>
</template>

<script>
export default {
  name: "GlobalTrainingWays"
}
</script>

<style scoped>
.wrapper {
  padding: 0 9rem;
}

.wrapper h3 {
  font-size: 50px;
  padding: 6rem 0;
  text-align: center;
  text-transform: uppercase;
}

.media-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 4rem;
}

.media-container:nth-child(even) .content-block:first-child {
  text-align: right;
  order: 1;
}

.media-container:nth-child(even) .content-block:first-child .content-block__text {
  padding: 3rem 0 3rem 3rem;
}

.content-block {
  min-width: 50%;
}

.content-block__text {
  padding: 3rem 3rem 3rem 0;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
}

.content-block__image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 100%;
  border-radius: 25px;
  box-shadow: 0 0 15px 0 #000000;
}

span.number, span.title {
  font-size: 50px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px black;
  color: var(--color-headings);
  margin: 0 0 1rem 0;
}

span.title {
  font-size: 30px;
}

@media (max-width: 767px) {
  .wrapper {
    padding: 0 1rem;
  }

  .wrapper h3 {
    font-size: 30px;
    padding: 6rem 0;
    text-align: center;
  }

  .media-container {
    flex-direction: column;
    margin: 0;
  }

  .media-container.reverse {
    flex-direction: column-reverse;
  }

  .media-container:nth-child(even) .content-block:first-child .content-block__text,
  .content-block__text {
    min-height: auto;
    padding: 1rem 0 2rem 0;
  }

  .media-container:nth-child(even) .content-block:first-child {
    text-align: right;
    order: 0;
  }

  .content-block__image, .content-block__image {
    height: 300px;
    margin: 0 0 2rem 0;
  }

  span.title {
    font-size: 24px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .wrapper {
    padding: 0 5rem;
  }
}
</style>
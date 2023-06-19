<template>
  <div class="wrapper">
    <transition name="preloader">
      <Preloader v-if="loading"/>
    </transition>
    <div class="banner">
      <h1>ENJOY FITNESS<br>STUDIO</h1>
      <h4>Let's make your body healthy and you happy.</h4>
    </div>
    <div class="content-block">
      <p>Привіт! Мене звати Ліза і я твій майбутній тренер.</p>
      <p>Моя спеціалізація - це функціональний тренінг (робота з власною вагою), силовий тренінг (робота з додатковою
        вагою) та Pilates.</p>
      <p>Я маю вищу освіту за спеціальностями «Психологія» та «Тренерська діяльність». Тож, йдучи до мене, ти
        потраплятимеш не просто на тренування, а туди, де можна поспілкуватися, вивільнити емоції та зробити тіло
        прикладом власного ідеалу! Я чекаю саме на тебе!</p>
    </div>
    <!--    Media section-->
    <div class="content-block-media">
      <div class="content-block-media-l">
        <div class="content-block-media-l__text">
          <span class="number">01</span>
          <span class="title">FatBurning</span>
          <p>Це ідеальне функціональне тренування на всі групи м’язів, яке чудово підійде для тих хто хоче скинути зайву
            вагу та зробити тіло більш підтягнутим!</p>
          <p>Ще більше активних вправ для формування нереального рельєфу вашого тіла.</p>
        </div>
      </div>
      <div class="content-block-media-r">
        <div class="content-block-media-r__video">
          <video/>
        </div>
      </div>
    </div>
    <div class="content-block-media reverse">
      <div class="content-block-media-l">
        <div class="content-block-media-l__video">

        </div>
      </div>
      <div class="content-block-media-r">
        <div class="content-block-media-r__text">
          <span class="number">02</span>
          <span class="title">Power</span>
          <p>Якщо ти хочеш підтягнути своє тіло, зробити його міцним та виносливим, зменшити болі в спині, наростити
            м’язи, скинути лишню вагу та зробити красивий рельєф-тоді тобі точно допоможуть в цьому силові тренування.

          </p>
          <p>Працюй з різним обладненням, вдосконалюй ті зони тіла, які тебе турбують і качай міцні та великі ягодиці
            разом зі мною!</p>
        </div>
      </div>
    </div>
    <div class="content-block-media">
      <div class="content-block-media-l">
        <div class="content-block-media-l__text">
          <span class="number">03</span>
          <span class="title">Rehab</span>
          <p>Незабувай твої м’язи також прагнуть розслаблення та відновлення.Моє тренування допоможе тобі розслабити всі
            групи м’язів і при цьому щей підтягнути тіло. Від втоми чи стресу не залишиться ані сліду!
          </p>
          <p>Релексуй та кайфуй від кожної частинки свого тіла під спокійну музику разом зі мною!</p>
        </div>
      </div>
      <div class="content-block-media-r">
        <div class="content-block-media-r__video">
          <video/>
        </div>
      </div>
    </div>
    <!--    Media section-->
    <div class="content-block full">
      <div class="title">
        <h2>Training Types</h2>
        <span>Join and learn more about trainings</span>
      </div>
      <div class="cards">
        <TrainingTypeCard
            :imageSrc="'assets/personal-card-bg.jpg'"
            title="Personal"
            desc="Тренувальний комплекс повністю налаштовується під тебе, адже головний герой - ти!"
        />
        <TrainingTypeCard
            :imageSrc="'assets/split-card-bg.jpg'"
            title="Split"
            desc="Тренування для двох, а саме: закохана пара, друзі, рідні люди або з тим, з ким хочеться проводити час"
        />
        <TrainingTypeCard
            :imageSrc="'src/assets/bg-images/4girls-card-bg.png'"
            title="4girls"
            desc="Тренуйся в хорошій команії да досягай своєї мети з легкістю та задоволенням"
        />
        <TrainingTypeCard
            :imageSrc="'src/assets/bg-images/party-group-card-bg.jpg'"
            title="Party Group"
            desc="Тренуйся під наглядом тренера,спілкуйся у топовій компанії та отримуй максимум задоволення від процесу!"
        />
      </div>
      <div class="cards-swiper">
        <HomeTrTypesSwiper :types="types"/>
      </div>
    </div>
    <div class="content-block">
      <div class="title">
        <h2>Memberships</h2>
        <span>Choose what you want</span>
      </div>
      <MembershipCardsBlock/>
    </div>
    <div class="content-block">
      <div class="title">
        <h2>Questions and answers</h2>
        <span>Answer on most popular questions</span>
      </div>
      <div class="dropdown-block">
        <dropdown heading="Що я отримаю займаючись з вами?">
          <template #content>
            <p>
              Я впевнена, що тренування приноситимуть вам лише позитивні емоції та проходитимуть з кайфом.
              Мої клієнти - моя сім’я, яку я люблю та про яку піклуюсь. В нас точно не буде «Я твій вчитель-слухайся
              мене і повторюй», ми станем друзями та я буду допомагати, мотивувати та підтримувати тебе.
            </p>
            <p>
              Хочеш займатися під свою улюблену пісню? Не проблема, ввімкнем на повну! Не любиш випади? Компенсуємо їх
              іншою вправою! Хочеш знайти однодумців? Знайдеш класних друзів та команду! Також тебе чекатиме моя
              підтримка 24/7 ❤️
            </p>
            <p>
              Вдосконалюй своє тіло і отримуй від цього задоволення!
              Займаючись зі мною ти точно забудеш про висловлювання «Спорт-це не моє!»
              Чекаю саме на тебе!
            </p>
          </template>
        </dropdown>
        <dropdown heading="Чи згорить тренування з абонементу, якщо я не матиму змоги прийти?">
          <template #content>
            <p>Тренування згорить лише у тому випадку, якщо за 3 години до тренування ми не будемо попередженні про те,
              що ви не зможете прийти. В разі попередження тренування переноситься на інший зручний для Вас день)</p>
          </template>
        </dropdown>
        <dropdown heading="Для чого потрібна повна передоплата, якщо я займаюсь разово?">
          <template #content>
            <p>Повна передоплата потрібна, оскільки ми набираємо закриті групи для тренувань, і для того, щоб ваше місце
              не пропало, ми змушені себе перестраховувати. У разі попередження за 10 годин, що Вас не буде - тренування
              переноситься на інший зручний для Вас день.</p>
          </template>
        </dropdown>
        <dropdown heading="Краще займатись разово чи з абонементом?">
          <template #content>
            <p>Відповідь очевидна - абонемент!
              Особливо якщо Ви займаєтесь персонально або ж на спліт тренуваннях.
              1. абонемент продумано так, щоб вигідно, перш за все, було ВАМ!
            </p>
            <p>
              2. абонементи на персональні або спліт тренування є двох видів: 8 або 12 тренувань на місяць,
              зоорієнтовано це на те, скільки разів на тиждень Ви готові займатися та вдосконалювати своє тіло!
            </p>
            <p>
              3. маючи абонемент Ви точно будете займатися, оскільки не рідко трапляється так, що Ви хочете привести
              своє тіло у форму,але сходивши на одне-два тренування втрачається мотивація чи з’являється лінь… Ви
              привчите себе займатися та будете кайфувати від тренувань, оскільки звичка виробляється близько двох
              тижнів, а маючи абонемент ви наврядчи здастесь!)
            </p>
          </template>
        </dropdown>
      </div>
    </div>
  </div>

</template>

<script>
import TrainingTypeCard from "@/views/Home/TrainingTypeCardsList.vue";
import MembershipCardsBlock from "@/views/Home/MembershipCardsBlock.vue";
import Dropdown from "@/components/Dropdown.vue";
import Preloader from "@/components/Preloader.vue";
import HomeTrTypesSwiper from "@/components/HomeTrTypesSwiper.vue";
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";

export default {
  name: "HomePage",
  components: {HomeTrTypesSwiper, Preloader, Dropdown, MembershipCardsBlock, TrainingTypeCard},
  mounted() {
    this.loaded()
    this.getTrTypes()
  },
  data() {
    return {
      loading: true,
      types: null,
    }
  },
  methods: {
    loaded() {
      setTimeout(
          () => (this.loading = false), 0
      )
    },
    async getTrTypes(){
      this.types = await trainingsAPI.getTrTypes().then(response=>response.data.results)
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 0;
}

h1 {
  text-transform: uppercase;
  font-size: 70px;
  text-align: center;
  margin: 0 0 5rem 0;
}

h2 {
  font-size: 50px;
}

h4 {
  font-size: 18px;
}

p {
  font-size: 20px;
  margin: 0 0 2rem 0;
}
@media (max-width: 767px) {
  h2{
    font-size: 30px;
  }
  p{
    font-size: 16px;
  }
}
.banner {
  background: url("../../assets/bg-images/home_banner_bg.jpg") center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 16rem 9rem;
  margin: 0 0 4rem 0;
}

.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.banner h1, .banner h4 {
  color: var(--vt-c-white-soft);
}

@media (max-width: 767px) {
  .banner {
    padding: 10rem 0;
  }

  .banner h1, .banner h4 {
    padding: 0 2rem;
    text-align: center;
    font-size: 14px;
  }

  .banner h1 {
    font-size: 40px;
    padding: 0 1rem;
  }
}

.content-block {
  padding: 3rem 9rem;
}

@media (max-width: 767px) {
  .content-block {
    padding: 0 1rem;
  }

  p {
    font-size: 16px;
  }
}

.title {
  padding: 3rem 0;
}

.title h2 {
  margin: 0 0 2rem 0;
}

.full {
  padding: 3rem 0;
}

.full > .title {
  padding: 3rem 9rem;
}
@media (max-width: 767px) {
  .title {
    padding: 0;
  }
  .title h2{

  }
  .full .title{
    padding: 0 0 2rem 0;
    text-align: center;
  }
}

.content-block-media {
  display: flex;
  flex-direction: row;
}

.content-block-media-r, .content-block-media-l {
  min-width: 50%;
}

.content-block-media-r__text, .content-block-media-l__text {
  padding: 3rem 9rem 15rem 9rem;
  display: flex;
  flex-direction: column;
}

.content-block-media-r__text {
  text-align: right;
}

.content-block-media-r__video, .content-block-media-l__video {
  min-height: 100%;
  background-color: grey;
}

span.number, span.title {
  font-size: 50px;
  font-family: 'Futura New', sans-serif;
  color: var(--color-headings);
  margin: 0 0 1rem 0;
}

span.title {
  font-size: 30px;
}

@media (max-width: 767px) {
  .content-block-media {
    flex-direction: column;
  }
  .content-block-media.reverse{
    flex-direction: column-reverse;
  }
  .content-block-media-l__text, .content-block-media-r__text {
    padding: 2rem 1rem;
  }
  .content-block-media-r__video, .content-block-media-l__video{
    height: 300px;
    margin: 0 0 2rem 0;
  }
  span.title {
    font-size: 24px;
  }
}

.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  transition: .5s;
}
.cards-swiper{
  display: none;
}
@media (max-width: 767px){
  .cards{
    display: none;
  }
  .cards-swiper{
    display: block;
  }
}
.dropdown-block {
  display: flex;
  flex-direction: column;
}

.dropdown-block .dropdown {
  margin: 2rem 0 1rem 0;
}

.preloader-enter-active {
  transition: all 0.0s;
}

.preloader-leave-active {
  transition: all 0.5s;
}

.preloader-enter-from {
  opacity: 1;
}

.preloader-leave-to {
  opacity: 0;
}
</style>
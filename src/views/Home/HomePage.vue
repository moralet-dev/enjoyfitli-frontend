<template>
  <div class="wrapper">
    <div class="banner" ref="banner">
      <div class="banner__logo-wrapper">
        <img src="../../assets/logos/Asset15-4x-white.png" alt="Enjoy Fitness Studio логотип">
      </div>
      <h1>ENJOY FITNESS<br>STUDIO</h1>
      <span>{{ $t('homePage.title') }}</span>
      <div class="banner__buttons-wrapper">
        <div class="banner__buttons">
          <router-link class="btn banner__buttons-btn" :to="{name: 'tr-types'}">{{ $t('trainingTypes') }}</router-link>
          <button class="btn banner__buttons-btn" type="button" @click="scrollDirs">{{ $t('trainingDirections') }}
          </button>
          <router-link class="btn banner__buttons-btn" :to="{name: 'memberships'}">{{ $t('membershipsInfo') }}
          </router-link>
        </div>
      </div>
    </div>
    <GreetingsBlock ref="greetings"/>
    <TrainingDirections/>
    <TrTypesBlock/>
    <MembershipsBlock/>
    <div class="content-block">
      <div class="title">
        <h2>{{ $t('homePage.qAndA') }}</h2>
        <span>{{ $t('homePage.qAndATitle') }}</span>
      </div>
      <div class="dropdown-block">
        <dropdown :heading="$t('homePage.whatIGot')">
          <template #content>
            <p>{{ $t('homePage.whatIGotText1') }}</p>
            <p>{{ $t('homePage.whatIGotText2') }}</p>
            <p>{{ $t('homePage.whatIGotText3') }}</p>
          </template>
        </dropdown>
        <dropdown heading="Як записатись на тренування?">
          <template #content>
            <p>У вас має бути активований абонемент хоча б із одним доступним тренуванням</p>
            <p>Якщо ви є зареєстрованим користувачем - все дуже легко! Вам треба перейти на строінку "Розклад",
              скориставшись меню у шапці сайту, далі обираєте день у календарі, який вам потрібен, після чого ви
              побачите доступні тренування на обраний день.
              Далі натискаєте на саме тренування у списку, натискаєте на кнопку записатись і побачите сповіщення про те,
              що ви успішно записались не тренування.</p>
            <p>Якщо ви не є користувачем сайту, то просто звяжіться із нами і ми в онлайн режимі проконсультуємо вас
              щодо наявних тренувань і запишемо вас на те, яке вам буде до вподоби.</p>
          </template>
        </dropdown>
        <dropdown heading="Як підготуватись до тренування?">
          <template #content>
            <p>1. Перш за все, ви повинні впевнитись, що стан вашого здоров'я дозволяє вам відвідати тренування. Якщо ви
              маєте сумніви, проконсультуйтесь із лікарем.</p>
            <p>2. Поїжте не менш ніж за 1-1.5 години до тренування. Не можна тренувантись на пустий шлунок.</p>
            <p>3. Перевірте, чи записані ви на бажане тренування, або запишіться на нього. Це легко можна зробити, за
              наявного абонементу, використовуючи ваш персональний кабінет на сайті, або ж звязавшись із нами, будь-яким
              зручним для вас способом.</p>
            <p>4. Підготуйте зручний спортивний одяг та взуття. Ваша нова сукня вам, звісно, дуже пасує, але це не
              найкращий вибір для тренування.</p>
            <p>5. Не пийте забагато води перед тренуванням. Натомість візьміть воду із собою, під час тренування вона
              знадобиться.</p>
          </template>
        </dropdown>
        <dropdown heading="Де проходять тренування?">
          <template #content>
            <p>Тренування проходять у нашій студіі (EF-Studio) у Києві, за адресою вул. Гарматна 38А</p>
            <p>Оналйн тренування відбуваються на зручній для вас платформі (Zoom, Google Meet, тощо)</p>
          </template>
        </dropdown>
        <dropdown :heading="$t('homePage.willBurnTraining')">
          <template #content>
            <p>{{ $t('homePage.willBurnTrainingText') }}</p>
          </template>
        </dropdown>
        <dropdown :heading="$t('homePage.whatNeedPrePay')">
          <template #content>
            <p>{{ $t('homePage.whatNeedPrePayText') }}</p>
          </template>
        </dropdown>
        <dropdown :heading="$t('homePage.oneTimeOrMemb')">
          <template #content>
            <p>{{ $t('homePage.oneTimeOrMembText1') }}</p>
            <p>{{ $t('homePage.oneTimeOrMembText2') }}</p>
            <p>{{ $t('homePage.oneTimeOrMembText3') }}</p>
            <p>{{ $t('homePage.oneTimeOrMembText4') }}</p>
          </template>
        </dropdown>

      </div>
    </div>
  </div>

</template>

<script>
import Dropdown from "@/components/Dropdown.vue";
import Preloader from "@/components/Preloader.vue";
import HomeTrTypesSwiper from "@/views/Home/blocks/TrTypesSwiper.vue";
import GreetingsBlock from "@/views/Home/blocks/GreetingsBlock.vue";
import TrTypesBlock from "@/views/Home/blocks/TrTypesBlock.vue";
import MembershipsBlock from "@/views/Home/blocks/MembershipsBlock.vue";
import TrainingDirections from "@/views/Home/blocks/TrainingDirections.vue";

export default {
  name: "HomePage",
  components: {
    TrainingDirections,
    MembershipsBlock,
    TrTypesBlock,
    GreetingsBlock, HomeTrTypesSwiper, Preloader, Dropdown,
  },
  data() {
    return {
      loading: true,
      types: null,
      scrolled: false,
      backScroll: false
    }
  },
  mounted() {
    this.loaded()
  },
  methods: {
    loaded() {
      setTimeout(
          () => (this.loading = false), 1000
      )
    },
    scrollDirs() {
      window.scrollTo({
        top: this.$refs.banner.nextElementSibling.offsetTop,
        behavior: 'smooth'
      })
    },

  }
}
</script>

<style scoped>
h1 {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 70px;
  text-align: center;
  margin: 0 0 1rem 0;
}

h2 {

  font-size: 50px;
}

h4 {
  font-size: 22px;
  text-transform: lowercase;
}

h4:first-letter {
  text-transform: uppercase;
}

p {
  margin: 0 0 2rem 0;
}

.banner {
  background: url("../../assets/bg-images/home_banner_bg.webp") center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  position: relative;
  padding: 80px 0;
  min-height: calc(100lvh - 80px);
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

.banner__logo-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1 1 calc(20lvh - 80px);
}

.banner__logo-wrapper img {
  max-height: calc(30lvh - 80px);
  object-fit: contain;
}

.banner h1, .banner span {
  color: var(--vt-c-white-soft);
}

.banner span {
  font-weight: 400;
}

.content-block {
  padding: 3rem 9rem;
}

.title {
  padding: 3rem 0;
}

.title h2 {
  margin: 0 0 2rem 0;
}

.banner__buttons-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  margin: 2rem 0 0 0;
}

.banner__buttons {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.banner__buttons-btn {
  text-align: center;
  padding: .5rem 1rem;
  margin: 0 1rem;
}

.dropdown-block {
  display: flex;
  flex-direction: column;
}

.dropdown-block .dropdown {
  margin: 1rem 0;
}

@media (max-width: 767px) {
  h2 {
    font-size: 30px;
  }

  .banner h1, .banner h4 {
    padding: 0 2rem;
    text-align: center;
    font-size: 22px;
  }

  .banner h1 {
    font-size: 40px;
    padding: 0 1rem;
  }

  .content-block {
    padding: 0 1rem;
  }

  p {
  }

  .title {
    padding: 0;
  }

  .banner__buttons-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex: 1 1 auto;
    width: 100%;
    margin: 2rem 0 0 0;
  }

  .banner__buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .banner__buttons-btn {
    min-width: 50lvw;
    padding: .5rem 1rem;
    margin-bottom: .5rem;
  }
}
</style>
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
          <router-link class="btn banner__buttons-btn" :to="{name: 'tr-types'}">{{$t('trainingTypes')}}</router-link>
          <button class="btn banner__buttons-btn" type="button" @click="scrollDirs">{{$t('trainingDirections')}}</button>
          <router-link class="btn banner__buttons-btn" :to="{name: 'memberships'}">{{$t('membershipsInfo')}}</router-link>
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
    scrollDirs(){
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
  max-height: calc(30lvh - 80px);
}

.banner__logo-wrapper img {
  max-height: 100%;
  max-width: 100%;
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
.banner__buttons-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  margin: 2rem 0 0 0;
}
.banner__buttons{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.banner__buttons-btn{
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
  .banner__buttons-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex: 1 1 auto;
    width: 100%;
    margin: 2rem 0 0 0;
  }
  .banner__buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .banner__buttons-btn{
    min-width: 50lvw;
    padding: .5rem 1rem;
    margin-bottom: .5rem;
  }
}
</style>
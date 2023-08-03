<template>
  <div class="wrapper">
    <div class="banner" ref="banner">
      <div class="banner__logo-wrapper">
        <img src="../../assets/logos/Asset15-4x-white.png" alt="Enjoy Fitness Studio логотип">
      </div>
      <h1>ENJOY FITNESS<br>STUDIO</h1>
      <h4>{{ $t('homePage.title') }}</h4>
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
    window.scroll(0, 0)
    window.addEventListener('scroll', this.handleScroll)
    this.loaded()
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    loaded() {
      setTimeout(
          () => (this.loading = false), 1000
      )
    },
    handleScroll() {
      if (!this.scrolled && !this.backScroll) {
        if (window.scrollY > 0) {
          this.scrolled = true;
          window.scrollTo({
            top: this.$refs.banner.nextElementSibling.offsetTop,
            behavior: 'smooth'
          });
        }
      }
      if (window.scrollY > this.$refs.banner.nextElementSibling.offsetTop && !this.backScroll){
        this.backScroll = true
        console.log('move out from banner and backScroll = true')
        console.log(this.scrolled, this.backScroll)
      }
      if (this.backScroll && window.scrollY < this.$refs.banner.nextElementSibling.offsetTop){
        console.log('move on to banner again and scroll up')
        console.log(this.$refs.banner.offsetTop)
        window.scrollTo({
          top: this.$refs.banner.offsetTop,
          behavior: 'smooth'
        })
        this.backScroll = false
      }

      if (window.scrollY === 0){
        this.scrolled = false
      }
    }

  }
}
</script>

<style scoped>
h1 {
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
  font-size: 20px;
  margin: 0 0 2rem 0;
}

.banner {
  background: url("../../assets/bg-images/home_banner_bg.jpg") center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 80px;
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
  height: calc(30lvh - 80px);
}

.banner__logo-wrapper img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.banner h1, .banner h4 {
  color: var(--vt-c-white-soft);
}

.banner h4 {
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

.full > .title {
  padding: 3rem 9rem;
}

.dropdown-block {
  display: flex;
  flex-direction: column;
}

.dropdown-block .dropdown {
  margin: 2rem 0 1rem 0;
}

@media (max-width: 767px) {
  h2 {
    font-size: 30px;
  }

  p {
    font-size: 16px;
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
    font-size: 16px;
  }

  .title {
    padding: 0;
  }

  .title h2 {

  }

  .full .title {
    padding: 0 0 2rem 0;
    text-align: center;
  }
}
</style>
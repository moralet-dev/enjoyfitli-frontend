<template>
  <div class="wrapper">
    <div ref="titleBlock" class="title animate__animated animate__fadeIn">
      <h1>{{ this.$t('memberships') }}</h1>
      <button class="scroller" @click="scrollToMemberships" type="button" >
        <DoubleArrows/>
        <span>{{ this.$t('membershipsPageSubtitle')}}</span>
        <DoubleArrows/>
      </button>
      <p class="title-descr">
        {{ this.$t('membershipsPageDescription')}}
        <router-link class="text-link" :to="{name: 'public-offer'}">{{$t('publicOffer')}}</router-link>
      </p>
      <p class="title-descr">{{ this.$t('membershipsPageDescription2')}}</p>
    </div>
    <div v-for="type in types" v-if="memberships" class="membership-block animate__animated animate__fadeIn">
      <div class="descr">
        <h4>{{ type[`name_${this.$store.getters.getLocale}`] }}</h4>
        <p>
          {{ type[`description_${this.$store.getters.getLocale}`] }}
        </p>
      </div>
      <MembershipBlock  :memberships="memberships.filter(el => el.type.id === type.id)" arrow-color="var(--color-link-text)"/>
    </div>
    <PreloaderSmall v-else/>

  </div>
</template>

<script>
import MembershipBlock from "@/views/Memberships/MembershipBlock.vue";
import {profileAPI} from "@/api/profileAPI/profileAPI";
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import Preloader from "@/components/Preloader.vue";
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import DoubleArrows from "@/components/icons/DoubleArrows.vue";

export default {
  name: "MembershipsPage",
  components: {DoubleArrows, PreloaderSmall, Preloader, MembershipBlock},
  data() {
    return {
      types: null,
      memberships: null,
    }
  },
  mounted() {
    this.getTypes()
    this.getMemberships()
  },
  methods: {
    async getTypes(){
      this.types = await trainingsAPI.getTrTypes().then(response => response.data.results)
    },
    async getMemberships() {
      this.memberships = await profileAPI.getMemberships().then(response => response.data.results)
    },
    scrollToMemberships(){
      this.$refs.titleBlock.nextElementSibling.scrollIntoView({block:'start', behavior: 'smooth'})
    }
  }
}
</script>

<style scoped>
.wrapper{
  padding: 6rem 0;
}
h1, h4 {
  font-size: 50px;
}
h4 {
  font-size: 30px;
  margin-bottom: 2rem;
}
p{
  line-height: 31px;
}
.title {
  padding: 0 9rem;
}
.scroller{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}
.scroller svg{
  fill: var(--color-link-text);
  height: 20px;
  width: 20px;
  margin: 0 .5rem;
}
.scroller:hover, .scroller:hover svg{
  transition: .3s;
  fill: var(--vt-c-white-soft);
  color: var(--vt-c-white-soft);
}
.title-descr{
  margin: 1rem 0;
  white-space: pre-wrap;
}
.membership-block {
  display: grid;
  grid-template-columns: 4fr 8fr;
  padding: 1.5rem 9rem;
  scroll-margin-top: 82px;
}
@media (max-width: 767px) {
  .wrapper{
    padding: 3rem 0 0 0 ;
  }
  .title{
    padding: 0 1rem 3rem 1rem;
  }
  h1{
    font-size: 40px;
  }
  h4{
    font-size: 25px;
  }
  .membership-block{
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
  }
  p{
    line-height: inherit;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .wrapper{
    padding: 6rem 0 0 0;
  }
  .title{
    padding: 0 5rem 3rem 5rem;
  }
  .membership-block{
    padding: 1.5rem;
    grid-template-columns: 6fr 6fr;
  }
  p{
    line-height: 25px;
  }
}
@media (min-width: 992px) and (max-width: 1440px) {
  .membership-block{
    padding: 5rem 9rem;
    grid-template-columns: 6fr 6fr;
  }
}
</style>
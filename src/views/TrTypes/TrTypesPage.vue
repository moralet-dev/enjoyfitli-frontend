<template>
  <div class="wrapper">
    <div class="content-box" v-if="types">
      <div :class="{'types':true, 'collapsed': detailShowed}">
        <div class="type-card" v-for="t in types" :style="{backgroundImage: `url(${t.image})`}">
          <router-link :to="{ name: 'type-detail', params: { slug: t.slug }, query: { typeID: t.id } }"
                       class="type-card__link" @click="onTypeClick(t)">
            <div class="type-card__text">
              <span>{{ t[`name_${this.$store.getters.getLocale}`] || t?.name }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="type__detail--wrapper">
        <router-view v-slot="{ Component, route }">
          <transition name="fadeIn-fadeOut" mode="out-in" translate="yes">
            <component class="type__detail" v-if="Component" :is="Component" :key="$route.fullPath"/>
          </transition>
        </router-view>
      </div>
    </div>
    <div class="preloader" v-else>
      <PreloaderSmall/>
    </div>

  </div>
</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "TrTypesPage",
  components: {PreloaderSmall},
  data: () => ({
    types: null,
    selectedType: null,
    detailShowed: false,
  }),
  computed(){
  },
  mounted() {
    this.getTypes()
    this.detailShowed = false
  },
  updated() {
    console.log(this.$route.params?.slug)
    !this.$route.params?.slug ? this.detailShowed = false : this.detailShowed = true
  },
  methods: {
    async getTypes() {
      this.types = await trainingsAPI.getTrTypes().then(response => response.data.results)
    },
    onTypeClick(type) {
      if (type?.slug !== this.$route.params?.slug) {
        console.log('on click')
        this.selectedType = type
        this.detailShowed = true
      } else {
        this.detailShowed = false
        this.selectedType = null
        this.$router.push('/training-types')
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.title{
  padding: 2rem 9rem;
}
.content-box{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.types {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  z-index: 3;
  min-height: 100vh;
  width: 100%;
  transition: all 1s;
}
.collapsed{
  min-height: 200px;
  transition: all 1s;
}
.type-card > a.router-link-exact-active, .type-card > a:hover{
  background: var(--color-link-text);
  color: var(--color-headings);
}
.type-card{
  flex: 1 1 auto;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.type-card:before{
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, .35);
}
.type-card__link{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  min-width: 100%;
}
.type-card__text{
  font-size: 25px;
  color: var(--color-headings);
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px #000;
}
.type__detail--wrapper{
  min-height: 100%;
}
.type__detail{
  padding: 3rem 9rem;
  z-index: 2;
  min-height: 100%;
  transition: all .6s ease-in-out;

}
/*.fadeIn-fadeOut-enter-active {*/
/*  transition: all 3.3s ease-in-out;*/
/*}*/

/*.fadeIn-fadeOut-leave-active {*/
/*  transition: all 3.3s ease-in-out;*/
/*}*/

.fadeIn-fadeOut-enter-from,
.fadeIn-fadeOut-leave-to {
  transform: translateY(-100%);
  opacity: 0;

}
</style>
<template>
  <div class="wrapper">
    <div class="content-box animate__animated animate__fadeIn" v-if="types">
      <div :class="{'types':true, 'collapsed': detailShowed}">
        <div class="type-card" v-for="t in types" :style="{backgroundImage: `url(${t.image})`}" :key="t?.id">
          <router-link :to="{ name: 'type-detail', params: { slug: t.slug }, query: { typeID: t.id } }"
                       class="type-card__link" @click="onTypeClick(t)">
              <span class="type-card__text">{{ t[`name_${this.$store.getters.getLocale}`] || t?.name }}</span>
          </router-link>
        </div>
      </div>
      <div class="type__detail-wrapper">
        <router-view v-slot="{ Component, route }">
          <transition name="drop-down" mode="out-in" translate="yes">
            <component  v-if="Component" :is="Component" :key="route.path"/>
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
  computed() {
  },
  mounted() {
    this.getTypes()
    this.detailShowed = false
  },
  updated() {
    !this.$route.params?.slug ? this.detailShowed = false : this.detailShowed = true
  },
  methods: {
    async getTypes() {
      this.types = await trainingsAPI.getTrTypes().then(response => response.data.results)
    },
    onTypeClick(type) {
      if (type?.slug !== this.$route.params?.slug) {
        this.selectedType = type
        this.detailShowed = true
      } else {
        this.detailShowed = false
        this.$router.push('/training-types')
      }
    }
  }
}
</script>

<style scoped>
.preloader{
  min-height: 100svh;
}
.wrapper {
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.content-box {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

.types {
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr;
  z-index: 3;
  height: 100svh;
  width: 100%;
  transition: all 1s;
}

.types.collapsed {
  height: 200px;
  transition: all 1s;
}

.type-card > a.router-link-exact-active, .type-card > a:hover {
  background: var(--color-elements);
  color: var(--color-headings);
}

.type-card {
  flex: 1 1 auto;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.type-card:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, .35);
}

.type-card__link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  min-width: 100%;
}

.type-card__text {
  font-size: 25px;
  display: block;
  text-align: center;
  color: var(--color-headings);
  font-family: "Helvetica Neue", sans-serif;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px #000;
}

.type__detail-wrapper {
  min-height: 100%;
}
@media (max-width: 767px) {
  .types {
    display: grid;
    grid-template-columns: 6fr 6fr;
    grid-auto-rows: 2fr;
    z-index: 3;
    min-height: 100vh;
    width: 100%;
    transition: all 1s;
  }
  .type-card > a:hover{
    background: transparent;
  }
  .type-card > a.router-link-exact-active{
    background: var(--color-elements);
  }
  .collapsed {
    min-height: 20vh;
    transition: all 1s;
  }
}
.drop-down-enter-from,
.drop-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
  margin: 0;

}
</style>
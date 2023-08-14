<template>
  <Carousel :itemsToShow="1.2" :transition="500" :wrap-around="true" :mouse-drag="false" :touch-drag="true" ref="carousel" v-model="currentSlide">
    <Slide v-for="t in types" :key="t.id">
      <div class="carousel__item">
        <TrTypeCardContent :trType="t"/>
      </div>
    </Slide>
    <template #addons>
      <div class="tr-types-carousel__nav">
        <button class="tr-types-carousel__nav__arrow" @click="prev">
          <ArrowLeftIcon :icon-color="arrowColor"/>
        </button>
        <button class="tr-types-carousel__nav__arrow" @click="next">
          <ArrowRightIcon :icon-color="arrowColor"/>
        </button>
      </div>
    </template>
  </Carousel>
</template>

<script>
import {defineComponent} from 'vue'
import {Carousel, Navigation, Slide, Pagination} from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
import ArrowRightIcon from "@/components/icons/ArrowRightIcon.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import ModalMembership from "@/components/Modals/Modal.vue";
import {profileAPI} from "@/api/profileAPI/profileAPI";
import TrTypeCardContent from "@/views/Home/blocks/TrTypeCardContent.vue";


export default defineComponent({
  name: "HomeTrTypesSwiper",
  components: {
    TrTypeCardContent,
    ArrowRightIcon,
    Navigation,
    Pagination,
    ArrowLeftIcon,
    Carousel,
    Slide,
    ModalMembership,
  },
  props: {
    arrowColor: {type: String, default: 'var(--color-headings)'},
    types: Array,
  },
  data: () => ({
    currentSlide: 0,
    showModal: false,
    current: null,
    nextMessage: null,
    showNextModal: false,
  }),
  methods: {
    next() {
      this.$refs.carousel.next()
    },
    prev() {
      this.$refs.carousel.prev()
    },
    async getNewMembership(pk) {
      await profileAPI.requestMembership(pk).then(() => {
        this.nextMessage = 'Thank you for your request.\nWe will connect you to confirm the details.'
        this.showModal = false
        this.showNextModal = true
      }).catch(reason => {
        if (reason.response.data.status === 'ASR') {
          this.nextMessage = 'Sorry, but you are already sent request for that type of membership.\nIf you think that here is some mistake - connect to us.'
          this.showModal = false
          this.showNextModal = true
        }
      })
    }
  }
})
</script>

<style scoped>
.carousel {
}

.carousel__viewport {
}

.carousel__item {
  width: 100%;
  margin: 0 1rem;
  padding: 1rem 0;
  height: 100%;
  background: linear-gradient(to bottom right, var(--color-background), var(--color-background));
  border-radius: 15px;
  border: none;
  display: flex;
}

.carousel__track {
  transform-style: flat;
}

.carousel__slide {
  display: flex;
  transform: none;
  padding: 0;
}

.carousel__slide--active ~ .carousel__slide {
  transform: none;
}

.carousel__slide--prev {
  opacity: .6;
  scale: 1;
  transform: none;
}

.carousel__slide--next {
  opacity: .6;
  scale: 1;
  transform: none;
}

.carousel__slide--active {
  opacity: 1;
  transform: none;
}

.tr-types-carousel__nav {
  padding: 1rem 0;
  display: flex;
  /*position: absolute;*/
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.tr-types-carousel__nav__arrow {
  padding: 0 1rem;
  height: 100%;
  background-color: transparent;
  border: none;
}

.tr-types-carousel__nav__arrow:hover {
  border: none;
  transform: scale(110%);
}

.carousel__pagination-button::after {
  background-color: #616161;
}

.carousel__pagination-button:hover::after {
  background-color: coral;
}

.carousel__pagination-button--active::after {
  background-color: var(--color-headings);
}
@media (max-width: 767px) {
  .carousel__item{
    max-height: 50vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
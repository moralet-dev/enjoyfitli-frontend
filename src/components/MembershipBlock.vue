<template>
  <Carousel :itemsToShow="3" :wrapAround="true" ref="carousel" v-model="currentSlide">
    <Slide v-for="m in memberships" :key="slide">
      <div class="carousel__item">
        <div class="carousel__card">
          <span class="carousel__card__title">{{ m.name.toUpperCase() }}</span>
          <span class="carousel__card__price">{{ m.price }} &#8372;</span>
          <button @click="showModal = true; current = m">Придбати</button>
        </div>
      </div>
    </Slide>
    <template #addons>
      <div class="carousel__nav">
        <button class="carousel__nav__arrow" @click="prev">
          <ArrowLeftIcon :icon-color="arrowColor"/>
        </button>
        <button class="carousel__nav__arrow" @click="next">
          <ArrowRightIcon :icon-color="arrowColor"/>
        </button>
      </div>
    </template>
  </Carousel>
  <Teleport to="body">
    <ModalMembership :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Confirmation</h3>
      </template>
      <template #body>
        {{ current.name }}
      </template>
      <template #footer>
        <button @click="showModal = false">Cancel</button>
        <button @click="getNewMembership(current.id)">Confirm</button>
      </template>
    </ModalMembership>
  </Teleport>
  <Teleport to="body">
    <ModalMembership :show="showNextModal" @close="showNextModal = false">
      <template #header>
        <h3>Confirmation</h3>
      </template>
      <template #body>
        {{ nextMessage }}
      </template>
      <template #footer>
        <button @click="showNextModal = false">Close</button>
      </template>
    </ModalMembership>
  </Teleport>
</template>

<script>
import {defineComponent} from 'vue'
import {Carousel, Slide} from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
import ArrowRightIcon from "@/components/icons/ArrowRightIcon.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import ModalMembership from "@/components/Modal.vue";
import {profileAPI} from "@/api/profileAPI/profileAPI";


export default defineComponent({
  name: "MembershipBlock",
  components: {
    ArrowRightIcon,
    ArrowLeftIcon,
    Carousel,
    Slide,
    ModalMembership,
  },
  props: {
    memberships: Array,
    arrowColor: {type: String, default: 'var(--color-headings)'}
  },
  data() {
    return {
      showModal: false,
      current: null,
      nextMessage: null,
      showNextModal: false,
    }
  },
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
        if (reason.response.data.status === 'ASR'){
          this.nextMessage = 'Sorry, but you are already sent request for that type of membership.\nIf you think that here is some mistake - connect to us.'
          this.showModal = false
          this.showNextModal = true
        }
      })
    }
  }
})
</script>

<style>
.carousel {
  display: grid;
  grid-template-columns: 12fr;
  margin: 4rem 10rem 2rem 10rem;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background: grey;
  color: var(--color-link-hover);
  border-radius: 25px;
  display: flex;
  justify-content: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  bottom: 0;
}

.carousel__card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /*padding: 0.5rem 11rem;*/
}

.carousel__card__title {
  font-weight: 700;
}

.carousel__card__price {
  font-size: 25px;
}

.carousel__card button {
  display: flex;
  background: var(--vt-c-white-soft);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-transform: uppercase;

}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.75);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-20deg) scale(0.75);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(20deg) scale(0.75);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

.carousel__nav {
  padding: 1rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: start;
}

.carousel__nav__arrow {
  padding: 0 1rem;
  background-color: transparent;
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

</style>
<template>
  <Carousel :itemsToShow="3" :wrapAround="true" ref="carousel" :breakpoints="breakpoints" v-model="currentSlide">
    <Slide v-for="m in memberships" :key="m.id">
      <div class="carousel__item" :style="{backgroundImage: `url(${m?.image})`}">
        <div class="carousel__card">
          <span class="carousel__card__title">{{
              m?.type[`name_${this.$store.getters.getLocale}`]?.toUpperCase()
            }}</span>
          <span class="carousel__card__title">{{ m.count }} {{
              m.count < 5 ? $t('training') : $store.getters.getLocale === 'uk' ? $t('trainingsUA') : $t('trainings')
            }}
          </span>
          <span class="carousel__card__price">{{ $t('price') }}:<br>{{ m.price }} &#8372;</span>
          <button @click="[current, showModal] = [m, true]">{{ $t('buy') }}</button>
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
        <h3>{{ this.$t('confirmation') }}</h3>
      </template>
      <template #body>
        <p class="popup-text" v-if="current.type?.name_uk && current.type?.name_en">
          {{ current.type[`name_${$store.getters.getLocale}`] }} - {{ current?.count }}
        </p>
        <p class="popup-text">
          Ви можете перейти на сторінку оплати, щоб сплатити за абонемент, або відправити нам запит на отримання,
          для подальшого оформлення абонементу в онлайн-режимі.
        </p>
      </template>
      <template #footer>

        <router-link class="btn" :to="{name: 'm-payment', params: {id: current.id}}">
          {{ $t('buy') }}
        </router-link>
        <button class="btn" @click="getNewMembership(current.id)">{{ this.$t('makeRequest') }}</button>
      </template>
    </ModalMembership>
  </Teleport>
  <Teleport to="body">
    <ModalMembership :show="showNextModal" @close="showNextModal = false">
      <template #header>
        <h3>{{ this.$t('confirmation') }}</h3>
      </template>
      <template #body>
        <p>{{ nextMessage }}</p>
      </template>
      <template #footer>
        <button @click="showNextModal = false">{{ this.$t('close') }}</button>
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
import ModalMembership from "@/components/Modals/Modal.vue";
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
      breakpoints: {
        320: {
          itemsToShow: 1,
          snapAlign: 'center',
        },
        767: {
          itemsToShow: 1.5,
          snapAlign: 'center',
        },
        991: {
          itemsToShow: 2,
          snapAlign: 'center',
        },
        1440: {
          itemsToShow: 3,
          snapAlign: 'center',
        }
      }
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
        this.nextMessage = this.$t('requestAccepted')
        this.showModal = false
        this.showNextModal = true
      }).catch(reason => {
        if (reason.response.data.status === 'ASR') {
          this.nextMessage = this.$t('requestDeclined')
          this.showModal = false
          this.showNextModal = true
        } else if (reason.request.status === 401) {
          this.showModal = false
          this.$store.dispatch('onOpenLoginPopup')
        }
      })
    }
  }
})
</script>

<style scoped>
.carousel {
  display: grid;
  grid-template-columns: 12fr;
  margin: 0 10rem 0 10rem;
  height: fit-content;
}

.carousel__slide--prev,
.carousel__slide--next {
  pointer-events: none;
}

.carousel__item {
  min-height: 300px;
  width: 100%;
  -webkit-background-size: cover;
  background-size: cover;
  border-radius: 25px;
  border: 2px solid var(--color-link-text);
  color: var(--vt-c-white-soft);
  display: flex;
  justify-content: center;
  transition: .3s;
}

.carousel__item:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 23px;

  background: var(--color-elements-semi-opacity);
}

@media (max-width: 767px) {
  .carousel {
    margin: 1rem;
  }
}

@media (max-width: 991px) {
  .carousel {
    margin: 1rem;
  }
}

@media (max-width: 1440px) {
  .carousel {
    margin: 1rem;
  }
}

.carousel__slide {
  padding: 10px;
}

.carousel__card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

}

.carousel__card__title {
  font-weight: 400;
}

.carousel__card__price {
  font-weight: 600;
}
.popup-text{
  margin-bottom: .5rem;
}
.modal-footer{
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.btn{
  padding: 1rem .5rem;
  margin: 0 1rem;
}
.carousel__card button {
  display: flex;
  text-transform: uppercase;

}

@media (max-width: 767px) {
  .carousel__card button {
    padding: .5rem 1rem;
  }
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
  transform: rotateY(-20deg) scale(0.1);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(40deg) scale(0.75);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-40deg) scale(0.75);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}

.carousel__nav {
  padding: 1rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: start;
}

@media (max-width: 767px) {
  .carousel__nav {
    justify-content: space-between;
  }
}

.carousel__nav__arrow {
  padding: 0 1rem;
  background-color: transparent;
  border: none;
}

.carousel__nav__arrow:hover {
  background-color: transparent;
  border: none;
  transform: scale(120%);
}

</style>
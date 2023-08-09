<template>
  <div class="wrapper">
    <div class="media-container" v-if="dirs" v-for="(d, index) in dirs">
      <div class="content-block">
        <div class="content-block__text">
          <span class="number">{{ (index+1)>9 ? index+1 : `0${index +1}` }}</span>
          <span class="title">{{ d?.name }}</span>
          <p v-if="d?.description_en && d?.description_uk">
            {{ d[`description_${$store.getters.getLocale}`] }}
          </p>
          <p v-else>{{ d?.description }}</p>
        </div>
      </div>
      <div class="content-block">
        <div v-if="d?.image" class="content-block__image" :style="{backgroundImage: `url(${d.image})`}">
        </div>
        <div v-else class="content-block__image default">
        </div>
      </div>
    </div>
    <div class="loader" v-else><PreloaderSmall/></div>
    <h3>{{ $t('homePage.TrDirsBottomTitle')}}</h3>
  </div>
</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "TrainingDirections",
  components: {PreloaderSmall},
  data: () => ({
    dirs: null
  }),
  mounted() {
    this.getDirs()
  },
  methods: {
    async getDirs() {
      this.dirs = await trainingsAPI.getDirs().then(response => response.data.results).catch(reason => null)
    }
  }

}
</script>

<style scoped>
.wrapper {
  padding: 0 9rem;
}

.wrapper h3 {
  font-size: 50px;
  padding: 6rem 0;
  text-align: center;
  text-transform: uppercase;
}

.media-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 0;
}

.media-container:nth-child(even) .content-block:first-child {
  text-align: right;
  order: 1;
}

.media-container:nth-child(even) .content-block:first-child .content-block__text {
  padding: 3rem 0 3rem 3rem;
}

.content-block {
  min-width: 50%;
}

.content-block__text {
  padding: 3rem 3rem 3rem 0;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
}

.content-block__image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 100%;
  border-radius: 0;
  -webkit-box-shadow: 0 0 5px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0 0 5px 1px rgba(0,0,0,0.75);
  box-shadow: 0 0 5px 1px rgba(0,0,0,0.75);
}
.content-block__image.default{
  background: var(--color-background);
}
span.number, span.title {
  font-size: 50px;
  font-weight: 700;
  text-transform: uppercase;

  margin: 0 0 1rem 0;
}

span.title {
  font-size: 30px;
}

@media (max-width: 767px) {
  .wrapper {
    padding: 0 1rem;
  }

  .wrapper h3 {
    font-size: 20px;
    padding: 3rem 0;
    text-align: center;
  }

  .media-container {
    flex-direction: column;
    margin: 0;
  }

  .media-container:nth-child(even) .content-block:first-child .content-block__text,
  .content-block__text {
    min-height: auto;
    padding: 1rem 0 2rem 0;
  }

  .media-container:nth-child(even) .content-block:first-child {
    text-align: right;
    order: 0;
  }

  .content-block__image, .content-block__image {
    height: 300px;
    margin: 0 0 2rem 0;
  }

  span.title {
    font-size: 24px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .wrapper {
    padding: 0 5rem;
  }

  .wrapper h3 {
    padding: 3rem 0;
  }
}
</style>
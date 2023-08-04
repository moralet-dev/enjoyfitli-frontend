<template>
  <div class="card-box">
    <div :class="{'card-wrapper':true, 'clicked': current?.id === m.id}"  v-for="m in memberships"
         :style="{backgroundImage: `url(${m?.image})`}"
         :key="m.id">
      <div class="card" @click="setCurrent(m)">
        <span class="card-title">{{ m.count }} {{ m.count < 5 ? $t('training') : $store.getters.getLocale === 'uk'?$t('trainingsUA'):$t('trainings') }}</span>
        <span class="card-price">{{$t('price')}}: {{ m?.price }} &#8372;</span>
        <span class="card-price">{{ Math.ceil( m?.price / m?.count) }} &#8372; <br>{{$t('perTraining')}}</span>
        <button @click="$router.push('/memberships')">{{$t('buy')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {router} from "@/routers/router";

export default {
  name: "MembTypedCards",
  props: {
    memberships: {
      type: Array,
    },
    showModal: false
  },
  data: () => ({
    current: null
  }),
  mounted() {
    if (this.memberships) {
      this.current = this.memberships[0]
    }
  },
  methods: {
    router() {
      return router
    },
    setCurrent(membership) {
      this.current = membership
    }
  },
}
</script>

<style scoped>
.card-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 9rem;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  flex: 0 1 22%;
  min-height: 250px;
  border-radius: 15px;
  box-shadow: 0 0 5px var(--color-text);

  border: 2px solid var(--color-text);
  transition: all .5s;
  margin: .5rem;
  color: var(--vt-c-white-soft);
  -webkit-background-size: cover;
  background-size: cover;
}
.card-wrapper:before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;

  background: var(--color-elements-semi-opacity);
}
.card {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1rem .25rem;

}

.card button {
  /*color: var(--color-headings);*/
  /*background: transparent;*/
  /*border-color: var(--color-headings);*/
}

.card button:hover {
  /*color: var(--color-text);*/
  /*background: var(--color-headings);*/
}

.card-title {
  font-size: 20px;
}

.card-price {
  font-size: 30px;
  text-align: center;
}

@media (max-width: 767px) {
  .card-box {
    padding: 0;
    justify-content: center;
  }

  .card-wrapper {
    flex: none;
    margin: 0;
    transform: scale3d(0.8, 0.8, 80%);
  }

  .clicked {
    transform: scale3d(1, 1, 100%);
  }

  .card-title {
    font-size: 16px;
  }

  .card-price {
    font-size: 18px;
  }

  .card button {
    font-size: 14px;
    padding: 5px 1rem;
  }
}
</style>
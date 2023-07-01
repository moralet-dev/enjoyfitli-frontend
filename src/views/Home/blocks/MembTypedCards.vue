<template>
  <div class="card-box">
    <div :class="{'card-wrapper':true, 'clicked': current?.id === m.id}"  v-for="m in memberships"
         :key="m.id">
      <div class="card" @click="setCurrent(m)">
        <span class="card-title">{{ m.count }} trainings</span>
        <span class="card-price">{{ m.price }} &#8372;</span>
        <button @click="showModal = true; current = m">Придбати</button>
      </div>
    </div>
  </div>
</template>

<script>
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
  justify-content: space-around;
  padding: 0 9rem;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  flex: 0 1 33.33%;
  min-height: 200px;
  background: transparent;
  border-radius: 0px;
  border: 5px solid var(--color-text);
  transition: all .5s;
  margin: .5rem;
  color: var(--color-text);
}

.card {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;

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
  font-size: 40px;
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
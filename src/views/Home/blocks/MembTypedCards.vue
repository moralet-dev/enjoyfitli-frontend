<template>
  <div class="card-box">
    <div class="card-wrapper" v-for="m in memberships" :key="m.id">
      <div class="card">
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
    current: null,
    showModal: false
  }
}
</script>

<style scoped>
.card-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  flex: 0 0 25%;
  min-height: 200px;
  background: linear-gradient(to bottom right, var(--vt-c-blue-mute), var(--vt-c-blue-mute-lighter));
  border-radius: 25px;
  color: var(--color-headings);
  transition: all .5s;
  margin: .5rem;
}

.card {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
}
.card button{
  color: var(--color-headings);
  background: transparent;
  border-color: var(--color-headings);
}
.card button:hover{
  color: var(--color-text);
  background: var(--color-headings);
}
.card-title {
  font-size: 20px;
}

.card-price {
  font-size: 40px;
}
@media (max-width: 767px) {
  .card-box{
  }
  .card-title{
    font-size: 16px;
  }
  .card-price{
    font-size: 20px;
  }
  .card button{
    font-size: 14px;
    padding: 5px 1rem;
  }
}
</style>
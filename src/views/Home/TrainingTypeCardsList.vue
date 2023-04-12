<template>
  <div class="wrapper-card"
       @mouseover="show = true"
       @mouseleave="show = false"
       :style="{
         background: `url('${this.imageSrc}') center no-repeat`,
         backgroundSize: 'cover'
        }"
  >
      <div class="card-content">
        <h5>
          {{ title }}
        </h5>
        <transition name="fade">
          <div v-if="show">
            <p>{{ desc }}</p>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
export default {
  name: "TrainingTypeCard",
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    desc: {
      type: String,
      default: 'Description'
    },
    imageSrc: String,
  },
  data() {
    return {
      show: false,
    }
  }
}
</script>

<style scoped>
.wrapper-card {
  min-height: 491px;
  flex: 0 0 25%;

  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
  padding: 10% 3rem;
}

h5 {
  font-size: 24px;
  margin: 1.5rem 0;
}

.wrapper-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.card-content{
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
}

.fade-enter-active {
  transition: all .5s;
}

.fade-leave-active {
  transition: all .5s;
}

.fade-enter-from {
  opacity: 0;
  max-height: 0;
}

.fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
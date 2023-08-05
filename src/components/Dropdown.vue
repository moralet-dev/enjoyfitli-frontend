<template>
  <div class="dropdown">
    <div class="top-content" @click="toggle">
      <slot name="heading">
        <span class="title">{{ heading }}</span>
      </slot>
      <slot>
        <div class="toggle-button" @click="toggle">
          <PlusIcon @click="toggle" :is-minus="isOpen"/>
        </div>
      </slot>
    </div>

    <transition name="fade">
      <div class="dropdown-content" v-if="isOpen">
        <slot name="content">

        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import PlusIcon from "@/components/icons/PlusIcon.vue";

export default {
  name: "Dropdown",
  components: {PlusIcon},
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    heading: {
      type: String,
    },
  },
  computed: {},
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
};
</script>

<style scoped>
.dropdown-content {
  max-height: 200vh;
  padding: 1rem 0;
}
.top-content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
}
@media (max-width: 767px) {
  .top-content{
    font-size: 20px;
  }
}
.fade-enter-active {
  transition: all .5s ease-in-out;
}

.fade-leave-active {
  max-height: 0;
  padding: 0;
  transition: all .5s ease-in-out;

}

.fade-enter-from {
  opacity: 0;
  padding: 0;
  max-height: 0;
}

.fade-leave-to {
  max-height: 0;
  padding: 0;
  opacity: 0;
}
</style>
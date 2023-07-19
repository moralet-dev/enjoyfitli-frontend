<script>
import CloseIcon from "@/components/icons/CloseIcon.vue";

export default {
  name: 'ModalCalendarPopup',
  components: {CloseIcon},
  props: {
    show: Boolean,
  },
  data() {
    return {
      dailyTrainings: null,
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @click="onClose">
      <div class="modal-container">
        <button class="close" @click="onClose">
          <CloseIcon icon-color="var(--color-text)"/>
        </button>
        <div class="modal-header">
          <slot name="header">

          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">

          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  padding: 2rem;
  min-width: 30vw;
  max-width: 75vw;
  min-height: 30vh;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-headings);
  border-radius: 10px;
  border: 2px solid var(--color-text);
  color: var(--color-text);
  transition: all 0.3s ease;
}
.close {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  cursor: pointer;
  z-index: 9999;
  background: transparent;
  padding: 1rem;
  border: 0;
}
.modal-header {
  font-family: 'Futura New', sans-serif;
  padding: 1rem 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
}

.modal-body {
  font-family: "Helvetica Neue", sans-serif;
  padding: 1rem 0;
}
.modal-footer{
  display: flex;
  justify-content: center;
}
@media (max-width: 767px) {
  .modal-container{
    padding: 2rem 1rem;
  }
  .modal-body{
    padding: 1rem 0;
  }

  .modal-header{
    font-size: 25px;
  }

}

.modal-enter-from, .modal-leave-to {
  transition: .5s;
  opacity: 0;

}

.modal-leave-to {
  opacity: 0;
}
</style>
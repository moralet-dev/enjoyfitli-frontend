<script>
import InstagramLogo from "@/components/icons/InstagramLogo.vue";
import TikTokLogo from "@/components/icons/TikTokLogo.vue";
export default {
  components:{InstagramLogo, TikTokLogo},
  props: {
    show: Boolean,
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('close')">
              Cancel
            </button>
          </slot>
        </div>
        <div class="post-info">
          <h4>Social networks</h4>
          <div class="">
            <InstagramLogo />
            <TikTokLogo />
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  margin: auto;
  padding: 1rem 2rem;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background-soft);
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-header{
  font-family: 'Futura New', sans-serif;
  font-size: 30px;
  color: var(--color-headings);
  padding: 1rem 0 0 0;
}
.modal-body {
  padding: 2rem 0;
}
.modal-footer{
  display: flex;
}
.post-info{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 0 0;
  border-top: solid 1px grey;
  margin: 2rem 0 0 0;
}
.post-info svg{
  margin: 10px 10px;
}
.modal-footer button{
  border: none;
  margin: 0 10px;
  border-radius: 15px;
  padding: 5px 10px;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
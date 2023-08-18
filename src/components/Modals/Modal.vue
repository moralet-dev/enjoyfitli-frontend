<script>
import InstagramLogo from "@/components/icons/InstagramLogo.vue";
import TikTokLogo from "@/components/icons/TikTokLogo.vue";
import vClickOutside from "click-outside-vue3";
import CloseIcon from "@/components/icons/CloseIcon.vue";

export default {
  components: {CloseIcon, InstagramLogo, TikTokLogo},
  props: {
    show: Boolean,
    autoHide: {
      type: Boolean,
      default: false
    },
    autoHideTime: {
      type: Number,
      default: 5,
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  },
  updated() {
    if (this.autoHide){
      setTimeout(()=>{
        this.$emit('close')
      }, this.autoHideTime*1000)
    }
  },
  mounted() {
    if (this.autoHide){
      setTimeout(()=>{
      }, (this.autoHideTime*1000))
      // this.$emit('close')
    }
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container" v-click-outside="onClose">
        <div class="close" @click="onClose"><CloseIcon/></div>
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="onClose">
              {{ $t('cancel') }}
            </button>
          </slot>
        </div>
        <div class="post-info">
          <h4>{{ $t('socialNetworks') }}</h4>
          <div class="logos">
            <InstagramLogo/>
            <TikTokLogo/>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
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
  min-width: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background);
  border-radius: 15px;
  transition: all 0.3s ease;
}
.close{
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  padding: 1rem;
}
.modal-header {
  font-size: 30px;
  padding: 1rem 0 0 0;
}

.modal-body {
  padding: 2rem 0;
}

.modal-footer {
  display: flex;
}

.post-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 0 0;
  border-top: solid 1px grey;
  margin: 2rem 0 0 0;
}
.logos{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.logos a{
  display: flex;
  height: 100%;
  padding: .5rem;
}

.modal-footer button {
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
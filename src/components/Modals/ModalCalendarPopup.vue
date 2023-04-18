<script>
import CloseIcon from "@/components/icons/CloseIcon.vue";

export default {
  name: 'ModalCalendarPopup',
  components: {CloseIcon},
  props: {
    show: Boolean,
    trList: {
      type: Array,
    },
    date: {
      type: Date,
      required: true,
    }
  },
  data() {
    return {
      dailyTrainings: null,
    }
  },
  updated() {
    this.getDailyTrainings()
  },
  mounted() {
    this.getDailyTrainings()
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    isSigned(tr) {
      if (tr.visitors.length > 0) {
        for (let i of tr.visitors) {
          if (i.visitor === this.$store.getters['authModule/getCurrentUser'].id) {
            return true
          }
        }
      }
      return false
    },
    async onSign(id) {
      this.$emit('sign', id)
    },
    async onUnsign(id) {
      this.$emit('unsign', id)
    },
    async getDailyTrainings() {
      this.dailyTrainings = this.trList.filter(el =>
          new Date(el.when).getDate() === this.date.getDate() && new Date(el.when).getMonth() === this.date.getMonth()
      )
    }
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <button class="close" @click="onClose">
          <CloseIcon @click="onClose"/>
        </button>
        <div class="modal-header">
          <slot name="header">{{ date.toLocaleDateString() }}</slot>
        </div>
        <div class="modal-body">
          <div class="training" v-for="t in dailyTrainings">
            <div class="title">
              <span>{{ t.name }}</span>
            </div>
            <div class="info">
              <div class="info-item">
                <span class="info-item-title">When:</span>
                <span>{{ new Date(t.when).toLocaleTimeString() }}</span>
              </div>
              <div class="info-item">
                <span class="info-item-title">Where:</span>
                <span>{{ t.where }}</span>
              </div>
              <div class="info-item">
                <span class="info-item-title">Type</span>
                <span>{{ t.type.name }}</span>
              </div>
              <div class="info-item">
                <span class="info-item-title">Specif</span>
                <span>{{ t.specification.name }}</span>
              </div>
              <div class="info-item">
                <span class="info-item-title">Level</span>
                <span>{{ t.specification.level }}</span>
              </div>
              <div class="info-item helpers" :class="{'sign': !isSigned(t), 'unsign': isSigned(t)}">
                <button v-if="isSigned(t)" class="unsign" @click="onUnsign(t.id)">Unsign</button>
                <button v-else class="sign" @click="onSign(t.id)">Sign</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.close {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  cursor: pointer;
  z-index: 9999;
  padding: 1rem;
}
button.close:hover{
  background-color: transparent;
}
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
  padding: 1rem 2rem;
  min-width: 35%;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-soft);
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow-y: auto;
}

.modal-header {
  font-family: 'Futura New', sans-serif;
  font-size: 30px;
  padding: 1rem 0;
  color: var(--color-headings);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 2rem 0;
}

.training {
  padding: 1rem;
  margin: 1rem;
  border-bottom: 2px solid coral;
  border-top: 2px solid coral;
  border-radius: 15px;

}

.info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense;
}

.title, .info-item-title {
  color: var(--color-headings);
  margin: 1rem 1rem;
}

.title {
  font-size: 25px;
}

.info-item {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  text-align: center;
}
@media (max-width: 767px) {
  .modal-container{
    padding: 0;
  }
  .modal-body{
    padding: 1rem 0;
  }
  .training{
    margin: 1rem 0;
  }
  .modal-header{
    font-size: 25px;
  }
  .title{
    font-size: 20px;
  }
  .info-item{
    font-size: 16px;
  }
}
.helpers button {
  transition: .5s;
}

.sign button, .unsign button {
  padding: .5rem;
  background-color: transparent;
  transition: 0.3s, transform 2s;
  transition-timing-function: ease-in-out;
  border-radius: 10px;
  color: var(--color-link);
  border: 2px solid rgba(0, 156, 6, 1);
}

.sign button:hover, .unsign button:hover {
  background-color: rgba(0, 156, 6, 1);
  color: var(--color-link-hover);
}

.sign .disabled {
  cursor: default;
  border: 2px solid rgb(102, 117, 102);
}

.sign .disabled:hover {
  background-color: inherit;
  color: var(--color-link);
}

.unsign button {
  border: 2px solid darkred;
}

.unsign button:hover {
  background-color: darkred;
}

.modal-enter-from, .modal-leave-to {
  transition: .5s;
  opacity: 0;

}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateX(-100%);
  /*-webkit-transform: scale(1.1);*/
  /*transform: scale(1.1);*/
}
</style>
<template>
  <button :class="{'switch-btn': true, 'active':isToggled}" @click="toggle"></button>
</template>

<script>
export default {
  name: "Switcher",
  props:{
    isToggled: {type: Boolean, default:false}
  },
  methods:{
    toggle(){
      this.$emit('toggle')
    }
  }
}
</script>

<style scoped>
.switch-btn {
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: rgb(231, 228, 228);
  position: relative;
  /*border: 2px solid rgb(199, 198, 198);*/

  transition: background-color 0.4s ease-in-out;
  cursor: pointer;
}

.switch-btn::after {
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  background-color: white;

  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: left 0.2s ease-in-out;
}

.switch-btn.active {
  background-color: coral;
}

.switch-btn.active::after {
  left: calc(100% - 27px);
}
</style>
<template>
  <div id="cont" :data-pct="trainingsLeft" ref="circle">
    <svg id="svg" :width="width" :height="height"
         xmlns="http://www.w3.org/2000/svg">
      <circle :r="radius" :cx="Number(width)/2" :cy="Number(width)/2" fill="transparent" :stroke="circleColor" :stroke-dasharray="square"
              stroke-dashoffset="0"></circle>
      <circle id="bar" :r="radius" :cx="Number(width)/2" :cy="Number(width)/2" fill="transparent" :stroke="this.mainColor" :stroke-dasharray="square"
              :stroke-dashoffset="strokeDashoffset"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: "TrainingsLeftCircle",
  props: {
    width:{
      type: [Number, String],
      default: 200,
    },
    height:{
      type: [Number, String],
      default: 200,
    },
    radius:{
      type: [Number, String],
      default: 90,
    },
    trainingsLeft: {
      type: Number,
    },
    trainingsCount:{
      type: Number,
    },
    circleColor:{
      type:String,
      default: 'rgba(97, 97, 97, 0.14)'
    },
    circleMainColor:{
      type:String,
      default: 'rgba(0, 156, 6, 1)'
    },
  },
  data(){
    return{
      strokeDashoffset: 0,
      square: 0,
      mainColor: this.circleMainColor,
    }
  },
  mounted(){
      this.circle(this.trainingsLeft, this.trainingsCount, this.radius)
  },
  methods:{
    circle(trLeft, trMax, r) {
      trLeft = Number(trLeft)
      trMax = Number(trMax)
      r = Number(r)
      const square = Math.PI * (r * 2);

      const pct = square - (trLeft / trMax * square);
      this.square = square
      this.strokeDashoffset = pct
      if (40 >= (trLeft / trMax * 100) && (trLeft / trMax * 100) > 20){
        this.mainColor = 'rgb(215,148,4)'
      } else if((trLeft / trMax * 100) <= 20){
        this.mainColor = 'rgb(161,13,13)'
      }
    },
  }
}
</script>

<style scoped>
#svg {
  transform: rotate(-90deg);
}
#svg circle {
  transition: stroke-dashoffset 1s linear;
  stroke-width: 0.5em;
}

#cont {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  position: relative;
}

#cont:after {
  position: absolute;
  display: block;
  content: attr(data-pct);
  border-radius: 100%;
  font-size: 2em;
}
</style>
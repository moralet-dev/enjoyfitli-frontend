<template>
  <div class="pagination">
    <div class="page animate__animated  animate__bounceIn" v-if="currentPage > 2 && pageCount > 3" @click="changePage(1)">First</div>
    <div class="num-pages">
      <div :class="{'selected': i=== currentPage, 'page': true}" @click="changePage(i)" v-if="pageCount > 1" v-for="i in pageCount" :key="i">
        {{ i }}
      </div>
    </div>
    <div class="page animate__animated  animate__bounceIn" v-if="currentPage < pageCount-2 && pageCount > 1" @click="changePage(pageCount)">Last</div>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: "Pagination",
  props: {
    pageCount: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods:{
    changePage(num){
      this.$emit('page', num)
      this.currentPage=num
    }
  }
}
</script>

<style scoped>
.pagination{
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  justify-content: center;
}
.num-pages{
  display: flex;
}
.page{
  cursor: pointer;
  color: var(--color-headings);
  padding: 5px;
}
.page:hover{
  background: coral;
  color: black;
}
.selected{
  color: var(--color-background-soft);
  background: var(--color-headings);
  pointer-events: none;
}
</style>
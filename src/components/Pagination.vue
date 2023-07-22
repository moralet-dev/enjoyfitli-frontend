<template>
  <div class="pagination">
    <div class="page animate__animated  animate__bounceIn display" v-if="currentPage >= 3 && pageCount >= 3"
         @click="changePage(1)">
      &lt;&lt;
    </div>
    <div class="num-pages" v-if="pageCount>1">
      <div v-for="i in pageCount"
           :class="{'selected': i === currentPage, 'page': true, 'display': currentPage-3<i && i<currentPage+3}"
           @click="changePage(i)"
           :key="i">
        <span >
          {{ i }}
        </span>
      </div>
    </div>
    <div class="page animate__animated  animate__bounceIn display" v-if="currentPage <= pageCount-3 && pageCount >= 3"
         @click="changePage(pageCount)">>>
    </div>
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
  methods: {
    changePage(num) {
      this.$emit('page', num)
      this.currentPage = num
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  flex-direction: row;
  margin: .5rem 0;
  justify-content: center;
}

.num-pages {
  display: flex;
}

.page, .display {
  display: none;
  cursor: pointer;
  color: var(--color-text);
  border: 1px solid var(--color-text);
  border-radius: 15px;
  padding: 5px 9px;
  margin: 0 1px;
}
.display{
  display: block;
}
.page:hover {
  color: var(--color-link-text-hover);
  background: var(--color-link-bg-hover);
}

.selected {
  color: var(--color-headings);
  background: var(--color-text);
  pointer-events: none;
}

@media (max-width: 767px) {
  .page {
    margin: 0 4px;
  }

  .page:hover {
    color: var(--color-headings);
    background: var(--color-text);
  }
}
</style>
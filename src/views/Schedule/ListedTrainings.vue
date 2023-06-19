<template>
  <div v-if="trList" class="table-container">
    <table>
      <thead>
      <tr>
        <th
            v-for="i in headings"
            @click="sortTrainings(`${i}`)"
            :key="i"
            :class="{'selected-up': this.selectedFilter === i, 'selected-down': this.selectedFilter === `-${i}`}"
            class="animate__animated animate__fadeIn"
        >
          {{ i.slice(0, 8) }}
        </th>
        <th class="clear-filter animate__animated animate__fadeIn"
            @click="sortTrainings('')"
            v-if="selectedFilter"
        ><CloseIcon/></th>
        <th class="empty animate__animated animate__fadeIn" v-else></th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="i in trList" class="animate__animated animate__fadeIn" :key="i.id">
          <td>{{ i.name }}</td>
          <td>{{ i.type.name }}</td>
          <td>{{ i.specification.name }}</td>
          <td>{{ i.specification.level }}</td>
          <td>
            {{
              new Date(i.when).toLocaleString('uk',
                  {weekday: 'short', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'})
            }}
          </td>
          <td>{{ i.where }}</td>
          <td>{{ i.visitors.length }}/{{ i.max_people }}</td>
          <td :class="{'sign': !isSigned(i), 'unsign': isSigned(i), }">
            <button v-if="isSigned(i)" @click="this.$emit('unsign', i.id)">Unsign</button>
            <button v-else @click="this.$emit('sign', i.id)" :class="{'disabled': i.visitors.length >= i.max_people}"
            >Sign
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import 'animate.css';
import CloseIcon from "@/components/icons/CloseIcon.vue";

export default {
  name: "ListedTrainings",
  components: {CloseIcon},
  props: {
    trList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headings: ['name', 'type', 'specification', 'level', 'when', 'where', 'visitors'],
      selectedFilter: null,
    }
  },
  mounted() {
  },
  updated() {
    // this.sortTrainings('name')
  },
  methods: {
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
    sortTrainings(target) {
      let p = {}
      if(target){
        if (target === this.selectedFilter) {
          p['sort_by'] = `-${target}`
          this.selectedFilter = `-${target}`
          this.$emit('sorting', p)
          return
        }
        p['sort_by'] = target
        this.selectedFilter = target
        this.$emit('sorting', p)
        return
      }
      this.selectedFilter = null
      this.$emit('sorting')
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
th,
td {
  padding: 1rem;
  font-size: 20px;
  font-family: 'Futura New', sans-serif;
  text-align: center;
  word-wrap: break-word;
}
@media (max-width: 767px) {
  table{
    table-layout: auto;

  }
  .table-container{
    overflow-x: scroll;
  }
  th, td{
    font-size: 18px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  th, td{
    font-size: 18px;
  }
}
th {
  text-transform: uppercase;
}

tr:first-child {
  max-width: 25%;
}

td {
  font-family: Inter, sans-serif;
  font-size: 18px;
}

thead {
  background: coral;
  color: var(--color-link-bg);
}
.clear-filter{
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty:hover{
  background: transparent;
  cursor: auto;
}
thead tr th{
  cursor: pointer;
  transition: .5s;
}
thead tr th:hover{
  background: #000;
  color: white;
}
.selected-up::after{
  content: '<';
  display: inline-block;
  position: absolute;
  transition: .5s;
  margin: 0 1rem;
  transform: rotate(90deg);
}
.selected-down::after{
  content: '>';
  margin: 0 1rem;
  position: absolute;
  display: inline-block;
  transition: .5s;
  transform: rotate(90deg);
}
tbody tr {
  border-bottom: 1px solid #ddd;
  transition: .5s;
}

tbody tr:hover {
  background: slategrey;
  color: white;
}

tbody tr:last-child {
  border-bottom: none;
}

.sign button, .unsign button {
  padding: .5rem;
  background-color: transparent;
  transition: 0.3s, transform 2s;
  transition-timing-function: ease-in-out;
  border-radius: 10px;
  color: var(--color-link-text);
  border: 2px solid rgba(0, 156, 6, 1);
}

.sign button:hover, .unsign button:hover {
  background-color: rgba(0, 156, 6, 1);
  color: var(--color-link-bg);
}

.sign .disabled {
  cursor: default;
  pointer-events: none;
  background: grey;
  color: dimgrey;
  border: 2px solid rgba(0, 156, 6, 1);
}

.sign .disabled:hover {
  background-color: transparent;
}

.unsign button {
  border: 2px solid darkred;
}

.unsign button:hover {
  background-color: darkred;
}
.fade-table-enter-active {
  transition: all 1.5s ease-in-out;
}

.fade-table-leave-active {
  transition: all 1.5s ease-in-out;
}

.fade-table-enter-from {
  position: absolute;
  width: 100%;
  opacity: 0;
  max-height: 0;
  transform: translateY(100%);

}

.fade-table-leave-to {
  /*position: absolute;*/
  width: 100%;
  max-height: 0;
  opacity: 0;
  transform: translateY(100%);
}
</style>
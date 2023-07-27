<template>
  <div class="wrapper-types">
    <ul class="training-types">
      <li v-for="t in types" @click="trigger(t.id)" :class="{'active-membership': triggerID === t.id }" :key="t.id">
        <span v-if="t?.name_en && t?.name_uk">
          {{ t[`name_${this.$store.getters.getLocale}`] }}
        </span>
        <span v-else>
          {{ t?.name}}
        </span>
      </li>
    </ul>
    <div>
      <transition name="fade">
        <keep-alive>
          <transition-group name="fade" mode="out-in">
            <MembTypedCards v-if="typedMemberships?.length > 0" :memberships="typedMemberships"
                            :key="typedMemberships[0].id"/>
          </transition-group>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import MembTypedCards from "@/views/Home/blocks/MembTypedCards.vue";
import 'animate.css';

export default {
  name: "MembershipTypedList",
  components: {MembTypedCards},
  props: {
    types: {
      type: Array,
    },
    memberships: {
      type: Array,
    }
  },
  data() {
    return {
      triggerID: null,
      typedMemberships: null,
      show: true,
    }
  },
  updated() {
    this.show = true
  },
  mounted() {
    this.trigger(this.types[0]?.id)
  },
  methods: {
    trigger(id) {
      this.show = false
      this.triggerID = id
      this.typedMemberships = this.memberships.filter(el => el.type.id === id)
    }
  }
}
</script>

<style scoped>
.wrapper-types {
  display: flex;
  flex-direction: column;
}

ul.training-types {
  display: flex;
  width: fit-content;
  align-self: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 0 4rem 0;
  padding: .1rem;
  border: 3px solid var(--color-link-text);
  border-radius: 29px;
}

ul.training-types li {
  cursor: pointer;
  text-align: center;
  padding: 1rem 3rem;
}

@media (max-width: 767px) {
  .wrapper-types {
    padding: 0 1rem;
  }
  ul.training-types{
    display: grid;
    grid-template-columns: 12fr;
    width: 100%;
    margin: 0 0 1rem 0;

  }
  ul.training-types li {

  }

  .active-membership {
  }

}

.active-membership {
  color: var(--color-headings);
  border: solid 2px var(--color-text);
  background: var(--color-text);
  border-radius: 100px;
}
.fade-enter-active {
  transition: all .5s;
}

.fade-leave-active {
  position: absolute;
  width: 100%;
  transition: all .9s;
  transform: scale(1%);
}

.fade-enter-from {
  transform: scale(1.5);
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
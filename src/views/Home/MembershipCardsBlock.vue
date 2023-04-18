<template>
  <div class="wrapper-cards">
    <ul class="training-types">
      <li @click="trigger('personal')" :class="{'active-membership': triggers.trPersonal }">Personal</li>
      <li @click="trigger('group')" :class="{'active-membership': triggers.trGroup }">Group</li>
      <li @click="trigger('4girls')" :class="{'active-membership': triggers.tr4girls }">4girls</li>
      <li @click="trigger('online')" :class="{'active-membership': triggers.trOnline }">Online</li>
    </ul>
    <transition name="fade">
      <keep-alive>
        <transition-group name="fade" mode="out-in">
          <MembershipCardsList v-if="triggers.trPersonal" :memberships="personalMemberships" :key="'personal'"/>
          <MembershipCardsList v-if="triggers.trGroup" :memberships="groupMemberships" :key="'group'"/>
          <MembershipCardsList v-if="triggers.tr4girls" :memberships="forGirlsMemberships" :key="'4girls'"/>
          <MembershipCardsList v-if="triggers.trOnline" :memberships="onlineMemberships" :key="'online'"/>
        </transition-group>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import {profileAPI} from "@/api/profileAPI/profileAPI";
import MembershipCardsList from "@/views/Home/MembershipCard.vue";

export default {
  name: "MembershipCardsBlock",
  components: {MembershipCardsList},
  data() {
    return {
      triggers: {
        trPersonal: false,
        trGroup: false,
      },
      memberships: null,
      personalMemberships: null,
      groupMemberships: null,
      onlineMemberships: null,
      forGirlsMemberships: null,
    }
  },
  mounted() {
    this.getMemberships()
    this.triggers.trPersonal = true
  },
  methods: {
    async getMemberships() {
      this.memberships = await profileAPI.getMemberships().then(response => {
        this.personalMemberships = response.data.results.filter(el => el.type.name === 'Personal')
        this.groupMemberships = response.data.results.filter(el => el.type.name === 'Group')
        this.forGirlsMemberships = response.data.results.filter(el => el.type.name === '4girls')
        this.onlineMemberships = response.data.results.filter(el => el.type.name === 'Online')
        return response.data.results
      })
    },
    trigger(action) {
      this.triggers.trPersonal = false
      this.triggers.trGroup = false
      this.triggers.tr4girls = false
      this.triggers.trOnline = false
      switch (action) {
        case 'personal':
          this.triggers.trPersonal = true
          break
        case 'group':
          this.triggers.trGroup = true
          break
        case '4girls':
          this.triggers.tr4girls = true
          break
        case 'online':
          this.triggers.trOnline = true
          break
      }
    }
  }
}
</script>

<style scoped>
.wrapper-cards {
  padding: 3rem 0;
}

ul.training-types {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 0 4rem 0;
}

ul.training-types li {
  font-family: 'Futura New', sans-serif;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  padding: 1rem 3rem;
  margin: 0 0 1rem 0;
}
@media (max-width: 767px) {
  ul.training-types li{
    font-size: 18px;
    border-bottom: 2px solid transparent;
  }
  .active-membership {
    color: var(--color-headings);
    border-bottom: solid 2px var(--color-headings) !important;
  }

}
.active-membership {
  color: var(--color-headings);
  border-bottom: solid 2px var(--color-headings);
}

.fade-enter-active {
  transition: all 0.9s;
}

.fade-leave-active {
  position: absolute;
  width: 100%;
  transition: all 0.9s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
<template>
  <div class="pages-wrapper">
    <aside>
      <div>
        <router-link :to="{name: 'my-memberships'}">
          <MembershipIcon/>
          <span>Memberships</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name: 'my-schedule'}">
          <ScheduleIcon/>
          <span>Schedule</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name:'my-nutrition-balance'}">
          <MyPFCCIcon/>
          <span>My Nutrition Balance</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name: 'purchase-history'}">
          <PurchaseHistoryIcon/>
          <span>Purchase History</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{name: 'settings'}">
          <EditIcon/>
          <span>Settings</span>
        </router-link>
      </div>
    </aside>

    <div class="pages-content-wrapper">
      <router-view  v-slot="{Component, route}">
        <transition name="fade" translate="yes" mode="out-in">
          <component :me="me" :is="Component" :key="route.path"/>
        </transition>
      </router-view>
    </div>
  </div>

</template>

<script>
import MembershipIcon from "@/components/icons/MembershipIcon.vue";
import ScheduleIcon from "@/components/icons/ScheduleIcon.vue";
import MyPFCCIcon from "@/components/icons/MyPFCCIcon.vue";
import PurchaseHistoryIcon from "@/components/icons/PurchaseHistoryIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";

export default {
  name: "ProfilePagesWrapper",
  components: {EditIcon, PurchaseHistoryIcon, MyPFCCIcon, ScheduleIcon, MembershipIcon},
  props: {
    me: {type: Object}
  }
}
</script>

<style scoped>
.pages-wrapper {
  display: grid;
  grid-template-columns: 4fr 8fr;
  padding: 6rem 0;
}

aside {
  display: flex;
  flex-direction: column;
  border-right: solid 1px rgb(217, 217, 217);
}

aside div {
  display: flex;
  padding: 0 0 1.25em 0;
}

a {
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0.5em 1rem;
}

a span {
  margin: 0 10px;
}

.pages-content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 0 0 0 7rem;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
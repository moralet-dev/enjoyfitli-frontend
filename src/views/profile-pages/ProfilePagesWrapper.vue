<template>
  <div class="pages-wrapper">
    <aside>
        <div>
          <router-link :to="{name: 'memberships'}">
            <MembershipIcon/><span>Memberships</span>
          </router-link>
        </div>
        <div>
          <router-link :to="{name: 'my-schedule'}">
            <ScheduleIcon/><span>Schedule</span>
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
      <router-view></router-view>
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
  components: {EditIcon, PurchaseHistoryIcon, MyPFCCIcon, ScheduleIcon, MembershipIcon}
}
</script>

<style scoped>
.pages-wrapper{
  display: grid;
  grid-template-columns: 4fr 8fr;
  padding: 6rem 0;
}
aside{
  display: flex;
  flex-direction: column;
  border-right: solid 1px rgb(217, 217, 217);
}
aside div{
  display: flex;
  padding: 0 0 1.25em 0;
}
a{
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0.5em 1rem;
}
a span{
  margin: 0 10px;
}
.pages-content-wrapper{
  display: flex;
  flex-direction: column;
  padding: 0 0 0 7rem;
}
</style>
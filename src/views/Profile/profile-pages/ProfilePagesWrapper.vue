<template>
  <div class="pages-wrapper">
    <aside class="animate__animated animate__fadeIn">
      <div v-for="link in links" class="pages-link">
        <router-link :to="link.to">
          <component :is="link.icon"/>
          <span>{{ $t(link.text) }}</span>
        </router-link>
        <router-view class="pages-content-wrapper" v-if="$vuetify.display.smAndDown"
                     :name="link.mobileName" v-slot="{Component, route}">
          <transition name="slide-down">
            <component :me="me" :is="Component" :key="route.path"/>
          </transition>
        </router-view>
      </div>
    </aside>

    <div v-if="$vuetify.display.mdAndUp && me?.id" class="pages-content-wrapper">
      <router-view v-slot="{Component, route}">
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
import 'animate.css'

export default {
  name: "ProfilePagesWrapper",
  data() {
    return {
      links: [
        {
          to: { name: 'my-memberships' },
          icon: MembershipIcon,
          text: 'memberships',
          mobileName: 'mob_membership'
        },
        {
          to: { name: 'my-schedule' },
          icon: ScheduleIcon,
          text: 'schedule',
          mobileName: 'mob_schedule'
        },
        {
          to: { name: 'personal' },
          icon: ScheduleIcon,
          text: 'personalTrainings',
          mobileName: 'mob_personal'
        },
        {
          to: { name: 'my-nutrition-balance' },
          icon: MyPFCCIcon,
          text: 'myNutritionBalance',
          mobileName: 'mob_my_nutrition_balance'
        },
        {
          to: { name: 'purchase-history' },
          icon: PurchaseHistoryIcon,
          text: 'purchaseHistory',
          mobileName: 'mob_purchase_history'
        },
        {
          to: { name: 'settings' },
          icon: EditIcon,
          text: 'settings',
          mobileName: 'mob_settings'
        }
      ]
    };
  },
  components: {EditIcon, PurchaseHistoryIcon, MyPFCCIcon, ScheduleIcon, MembershipIcon},
  props: {
    me: {type: Object}
  },
  methods: {
    goBack() {
    },
  },
}
</script>

<style scoped>
.pages-wrapper {
  display: grid;
  grid-template-columns: 4fr 8fr;
  border-top: 1px solid var(--color-helper);
}

aside {
  display: flex;
  flex-direction: column;
  border-right: solid 1px var(--color-helper);
  padding: 1rem 0 0 0;
}

.pages-link {
  display: flex;
  padding: 0 0 .5em 0;
}

.pages-link a {
  display: flex;
  align-items: center;
  background: var(--color-background);
  border: 3px solid transparent;
  border-radius: 10px;
  padding: 0.5em 1rem;
}
.pages-link a.router-link-active {
  background: transparent;
}
.pages-link a.router-link-exact-active{
  background: var(--color-link-text-hover);
  color: var(--color-headings);
  border: 3px solid var(--color-elements);
}

.pages-link a.router-link-exact-active:hover{
  color: var(--color-headings);
  background: var(--color-link-text-hover);
}
.pages-link a:hover{
  background: var(--color-background-soft);
  color: var(--color-elements);
  border: 3px solid var(--color-link-text);
}
.pages-link a span {
  margin: 0 10px;
  text-transform: capitalize;
}

.pages-content-wrapper {
  display: flex;
  max-width: 100%;
  flex-direction: column;
  padding: 1rem 0 0 5rem;
}

@media (max-width: 767px) {
  aside {
    border: none;
  }

  .pages-wrapper {
    display: grid;
    grid-template-columns: 12fr;
  }

  .pages-link {
    flex-direction: column;
    padding: 0;
  }
  .pages-link a{
    border: 3px solid var(--color-link-text);
    margin-bottom: 2px;
  }
  .pages-content-wrapper {
    padding: 1rem 0.5rem 0 ;
  }
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

.slide-down-enter-active, .slide-down-leave-active {
  transition: all .7s;
}

.slide-down-enter-from {
  max-height: 0;
  opacity: 0;
  padding: 0;
}

.slide-down-enter-to {
  max-height: 200vh;
}

.slide-down-leave-from {
  max-height: 200vh;
}

.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0;
}
</style>
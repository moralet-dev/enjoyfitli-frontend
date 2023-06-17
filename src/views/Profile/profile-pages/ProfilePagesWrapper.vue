<template>
  <div class="pages-wrapper">
    <aside class="animate__animated animate__fadeIn">
      <div class="pages-link">
        <router-link :to="{name: 'my-memberships'}" @click="goBack">
          <MembershipIcon/>
          <span>{{this.$t('memberships')}}</span>
        </router-link>
        <router-view class="pages-content-wrapper"
                     v-if="$vuetify.display.smAndDown"
                     name="mob_membership"
                     v-slot="{Component, route}"
        >
          <transition name="slide-down">
            <component :is="Component" :key="route.path"/>
          </transition>
        </router-view>
      </div>
      <div class="pages-link">
        <router-link :to="{name: 'my-schedule'}">
          <ScheduleIcon/>
          <span>{{this.$t('schedule')}}</span>
        </router-link>
        <router-view class="pages-content-wrapper"
                     v-if="$vuetify.display.smAndDown"
                     name="mob_schedule"
                     v-slot="{Component, route}"
        >
          <transition name="slide-down">
            <component :is="Component" :key="route.path"/>
          </transition>
        </router-view>
      </div>
      <div class="pages-link">
        <router-link :to="{name: 'personal'}">
          <ScheduleIcon/>
          <span>{{this.$t('ProfilePage.personalTrainings')}}</span>
        </router-link>
        <router-view class="pages-content-wrapper"
                     v-if="$vuetify.display.smAndDown"
                     name="mob_personal"
                     v-slot="{Component, route}"
        >
          <transition name="slide-down">
            <component :is="Component" :key="route.path"/>
          </transition>
        </router-view>
      </div>
      <div class="pages-link">
        <router-link :to="{name:'my-nutrition-balance'}">
          <MyPFCCIcon/>
          <span>{{this.$t('myNutritionBalance')}}</span>
        </router-link>
        <router-view class="pages-content-wrapper"
                     v-if="$vuetify.display.smAndDown"
                     name="mob_my_nutrition_balance"
                     v-slot="{Component, route}"
        >
          <transition name="slide-down">
            <component :is="Component" :key="route.path"/>
          </transition>
        </router-view>
      </div>
      <div class="pages-link">
        <router-link :to="{name: 'purchase-history'}">
          <PurchaseHistoryIcon/>
          <span>{{ this.$t('purchaseHistory') }}</span>
        </router-link>
        <router-view class="pages-content-wrapper"
                     v-if="$vuetify.display.smAndDown"
                     name="mob_purchase_history"
                     v-slot="{Component, route}"
        >
          <transition name="slide-down">
            <component :is="Component" :key="route.path"/>
          </transition>
        </router-view>
      </div>
      <div class="pages-link">
        <router-link :to="{name: 'settings'}">
          <EditIcon/>
          <span>{{ this.$t('settings') }}</span>
        </router-link>
        <router-view class="pages-content-wrapper"
                     v-if="$vuetify.display.smAndDown"
                     name="mob_settings"
                     v-slot="{Component, route}"
        >
          <transition name="slide-down">
            <component :me="me" :is="Component" :key="route.path"/>
          </transition>
        </router-view>
      </div>
    </aside>

    <div v-if="$vuetify.display.mdAndUp" class="pages-content-wrapper">
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
import {th} from "vuetify/locale";

export default {
  name: "ProfilePagesWrapper",
  computed: {
    th() {
      return th
    }
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
  padding: 6rem 0;
}

aside {
  display: flex;
  flex-direction: column;
  border-right: solid 1px rgb(217, 217, 217);
}

.pages-link {
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
  text-transform: capitalize;
}

.pages-content-wrapper {
  display: flex;
  max-width: 100%;
  flex-direction: column;
  padding: 0 0 0 7rem;
}

@media (max-width: 767px) {
  aside {
    border: none;
  }

  .pages-wrapper {
    display: grid;
    grid-template-columns: 12fr;
    padding: 6rem 0 0 0;
  }

  .pages-link {
    flex-direction: column;
  }

  .pages-link a {
  }

  .pages-wrapper {
  }

  .pages-content-wrapper {
    /*max-height: 200vh;*/
    padding: 0 0 2rem 0;
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
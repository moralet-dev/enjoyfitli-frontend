<template>
  <div>

      <div class="title-wrapper">
        <h3>{{ this.$t('ProfilePage.myMemberships') }}</h3>
      </div>
    <div class="loading" v-if="loading">
      <PreloaderSmall/>
    </div>
    <div v-else>
      <div v-if="isMembList" class="animate__animated animate__fadeIn">
        <div v-for="m in membList" :key="m.id" class="membership">
          <div class="membership-info">
            <span class="m-name">{{ m.membership.type[`name_${this.$store.getters.getLocale}`] }}</span>

          </div>
          <div class="membership-info-current">
            <span class="trainings-title">{{ this.$t('ProfilePage.trainingsStatus') }}:</span>
            <div class="trainings-info">
              <TrainingsLeftCircle v-if="$vuetify.display.mdAndUp" :trainings-left="m.trainings_left"
                                   :trainings-count="m.membership.count" radius="80"
                                   width="180" height="180"/>
              <TrainingsLeftCircle v-else :trainings-left="m.trainings_left" :trainings-count="m.membership.count"
                                   radius="40"
                                   width="100" height="100"/>
              <div class="trainings-info__description">
                <span>{{ this.$t('ProfilePage.trainingsLeft') }}: {{ m.trainings_left }}/{{ m.membership.count }}</span>
                <span class="expired">{{ this.$t('ProfilePage.expiringAt') }}:<br>{{
                    new Date(m?.date_end).toLocaleString()
                  }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div v-else>
        <p>{{ this.$t('ProfilePage.noMembershipText') }}
        </p>
        <br>
        <div class="">
          <router-link :to="{name: 'memberships'}">{{ this.$t('ProfilePage.chooseMembership') }}</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {profileAPI} from "@/api/profileAPI/profileAPI";
import TrainingsLeftCircle from "@/components/TrainingsLeftCircle.vue";
import SchedulePage from "@/views/Profile/profile-pages/Schedule.vue";
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "MembershipPage",
  components: {PreloaderSmall, SchedulePage, TrainingsLeftCircle},
  data() {
    return {
      membList: null,
      loading: true
    }
  },
  beforeMount() {
    this.getMemberships()
  },
  computed: {
    isMembList() {
      if (this.membList) {
        return this.membList.length > 0;
      } else {
        return false
      }
    }
  },
  methods: {
    async getMemberships() {
      this.membList = await profileAPI.getMyMemberships().then(response => {
        this.loading = false
        return response.data.results
      })
    },
  }
}
</script>

<style scoped>
.title-wrapper {
  padding: 0.5em 0 1rem 0;
}

h3 {
  font-size: 40px;
}
.membership{
  margin: 0 0 1rem 0;
}
.membership-info, .membership-info-current {
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
}

.membership-info-current {
  border-bottom: solid 1px var(--color-helper);
}

.m-name {
  font-weight: 700;
  font-size: 30px;
}

.m-count-block p {
  font-size: 18px;
  padding: 0 0 0.75rem 0;
}
.trainings-title {
  display: block;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 0 0 .5rem 0;
}

.trainings-info {
  display: flex;
  align-items: center;
  padding: 0 0 1.5rem 0;
}

.trainings-info__description {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.trainings-info__description span {
  padding: 1rem;
  margin: 1rem;
}
.m-count-block {
  display: flex;
}
.expired {
  border: 2px solid var(--color-link-text);
  border-radius: 15px;
}
.loading{
  margin-top: 1rem;
}
@media (max-width: 767px) {
  h3{
    font-size: 30px;
  }
  .title-wrapper {
  }

  .membership-info, .membership-info-current {
  }

  .m-name {
    font-size: 22px;
    text-align: center;
  }

  .m-count-block {

  }

  .trainings-title {
  }

  .trainings-info {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .trainings-info__description span {
    padding: 0 0 .5rem 0;
    margin: 0;
  }
  span.expired {
    padding: 1rem;
    border: 2px solid var(--color-link-text);
    border-radius: 15px;
  }
}
</style>
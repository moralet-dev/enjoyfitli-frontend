<template>
  <div>
    <div class="title-wrapper">
      <h3>{{ this.$t('myMemberships') }}</h3>
    </div>
    <div class="loading" v-if="loading">
      <PreloaderSmall/>
    </div>
    <div v-else>
      <div v-if="isMembList" class="animate__animated animate__fadeIn">
        <div v-for="m in membList" :key="m.id" class="membership">
          <div class="membership-info">
            <span class="m-name">{{ m.user_type_connector?.type[`name_${this.$store.getters.getLocale}`] }}</span>
          </div>
          <div class="membership-info-current">
            <div class="trainings-info">
              <TrainingsLeftCircle v-if="$vuetify.display.mdAndUp" :trainings-left="m.trainings_left"
                                   :trainings-count="20" radius="80"
                                   width="180" height="180"/>
              <TrainingsLeftCircle v-else :trainings-left="m.trainings_left" :trainings-count="20"
                                   radius="40"
                                   width="90" height="90"/>
              <div class="trainings-info__description">
                <span class="trainings-info__description__title">{{ this.$t('trainingsLeft') }}:</span>
                <span> {{ m.trainings_left }}/ 20</span>
                <span class="trainings-info__description__title">{{ this.$t('expiresAt') }}:</span>
                <span>{{
                    new Date(m?.date_end).toLocaleDateString(
                        `${this.$store.getters.getLocale}`,
                        {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})
                  }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div v-else class="no-memberships">
        <p>{{ this.$t('noMembershipText') }}
        </p>
        <br>
        <div class="text-link">
          <router-link :to="{name: 'memberships'}">{{ this.$t('chooseMembership') }}</router-link>
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
  font-size: 30px;
}

.no-memberships {
  padding: 0 0 2rem 0;
  text-align: center;
}

.text-link {
  font-size: 1.5rem;
}

.membership {
  margin: 0 0 1rem 0;
}

.membership-info, .membership-info-current {
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
}

.membership-info-current {
  border-bottom: solid 1px var(--color-elements);
}

.m-name {
  font-weight: 700;
  font-size: 22px;
}

.m-count-block p {
  padding: 0 0 0.75rem 0;
}

.trainings-info {
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  padding: 0 0 1.5rem 0;
}

.trainings-info__description {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.trainings-info__description span {
  display: block;
  padding: 1rem;
  text-align: right;
}

span.trainings-info__description__title {
  display: block;
  flex: 0 1 auto;
  border-radius: 15px;
  text-align: left;
}

.loading {
  margin-top: 1rem;
}

@media (max-width: 767px) {
  h3 {
    font-size: 25px;
  }

  .title-wrapper {
  }

  .membership-info, .membership-info-current {
  }

  .m-name {
    font-size: 20px;
    text-align: center;
  }

  .trainings-info {
    flex-direction: row;
    justify-content: space-between;
  }

  .trainings-info__description span {
    padding: 0 0 .5rem 0;
    margin: 0;
    text-align: right;
  }

}
</style>
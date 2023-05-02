<template>
  <div class="">
    <div class="title-wrapper">
      <h3>My Memberships:</h3>
    </div>
    <div v-if="isMembList">
      <div v-for="m in membList" :key="m.id">
        <div class="membership-info">
          <span class="m-name">{{ m.membership.name }}</span>
          <div class="m-count-block">
            <p>Trainings count</p>
            <h4>{{ m.membership.count }}</h4>
          </div>
        </div>
        <div class="membership-info-current">
          <span class="trainings-title">Trainings:</span>
          <div class="trainings-info">
            <TrainingsLeftCircle v-if="$vuetify.display.mdAndUp" :trainings-left="m.trainings_left" :trainings-count="m.membership.count" radius="80"
                                 width="180" height="180"/>
            <TrainingsLeftCircle v-else :trainings-left="m.trainings_left" :trainings-count="m.membership.count" radius="40"
                                 width="100" height="100"/>
            <div class="trainings-info__description">
              <span>Trainings left: {{ m.trainings_left }}</span>
              <span class="expired">Expiring at:<br>{{ new Date(m.date_end).toLocaleString() }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-else>You haven't any payed and activated memberships:( Choose the best one for you on -&lt;"here"&lt;- or waiting for our call, if you already sent request for membership</div>
  </div>
</template>

<script>
import {profileAPI} from "@/api/profileAPI/profileAPI";
import TrainingsLeftCircle from "@/components/TrainingsLeftCircle.vue";
import SchedulePage from "@/views/Profile/profile-pages/Schedule.vue";

export default {
  name: "MembershipPage",
  components: {SchedulePage, TrainingsLeftCircle},
  data() {
    return {
      membList: null,
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

.membership-info, .membership-info-current {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.membership-info-current {
  border-bottom: solid 1px rgb(217, 217, 217);
}

.m-name {
  font-weight: 700;
  font-size: 24px;
  padding: 1.5rem 0 1.5rem 0;
}

.m-count-block {
  padding: 0 0 1.5rem 0;
}

.m-count-block p {
  font-size: 18px;
  padding: 0 0 0.75rem 0;
}

.m-count-block h4, .trainings-title {
  font-family: 'Futura New', sans-serif;
  font-weight: 700;
  font-size: 50px;
  letter-spacing: 0.02em;
}

.trainings-title {
  font-size: 30px;
  padding: 0 0 1.5rem 0;
}

.trainings-info {
  display: flex;
  align-items: center;
  padding: 0 0 1.5rem 0;
}
.trainings-info__description{
  display: flex;
  flex-direction: row;
}
.trainings-info__description span{
  padding: 1rem;
}
.expired{
  border: 2px solid orangered;
  border-radius: 15px;
}
@media (max-width: 767px) {
  .title-wrapper{
    padding: 1rem 0;
  }
  .membership-info, .membership-info-current{
    padding: 0;
  }
  .m-name{
    font-size: 22px;
    text-align: center;
  }
  .m-count-block{

  }
  .m-count-block h4, .trainings-title{
    font-size: 22px;
  }
  .trainings-info{
    flex-direction: column;
    align-items: start;
  }
  .trainings-info__description{
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
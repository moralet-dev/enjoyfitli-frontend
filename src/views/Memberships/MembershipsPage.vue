<template>
  <div class="wrapper">
    <div class="title">
      <h1>Memberships</h1>
      <p>Choose most comfortable variant for you</p>
    </div>
    <div v-for="type in types" class="membership-block">
      <div class="descr">
        <h4>{{ type.name }}</h4>
        <p>
          {{ type.description }}
        </p>
      </div>
      <MembershipBlock :memberships="memberships.filter(el => el.type.id === type.id)" />
    </div>
  </div>
</template>

<script>
import MembershipBlock from "@/views/Memberships/MembershipBlock.vue";
import {profileAPI} from "@/api/profileAPI/profileAPI";
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";

export default {
  name: "MembershipsPage",
  components: {MembershipBlock},
  data() {
    return {
      types: null,
      memberships: null,
      personalMemberships: null,
      groupMemberships: null,
      onlineMemberships: null,
      forGirlsMemberships: null,
    }
  },
  mounted() {
    this.getTypes()
    this.getMemberships()
  },
  updated() {
  },
  methods: {
    async getTypes(){
      this.types = await trainingsAPI.getTrTypes().then(response => response.data.results)
    },

    async getMemberships() {
      this.memberships = await profileAPI.getMemberships().then(response => {
        this.personalMemberships = response.data.results.filter(el => el.type.name === 'Personal')
        this.groupMemberships = response.data.results.filter(el => el.type.name === 'Group' || 'Групове')
        this.forGirlsMemberships = response.data.results.filter(el => el.type.name === '4girls')
        this.onlineMemberships = response.data.results.filter(el => el.type.name === 'Online')
        return response.data.results
      })
    }
  }
}
</script>

<style scoped>
.wrapper{
  padding: 12rem 0;
}
h1, h4 {
  font-size: 50px;
}
h4 {
  font-size: 30px;
  margin-bottom: 2rem;
}
p{
  line-height: 31px;
}
.title {
  padding: 0 9rem 5rem 9rem;
}

.membership-block {
  display: grid;
  grid-template-columns: 4fr 8fr;
  padding: 9rem 9rem;
}
.dark{
  background: var(--color-background-section-dark);
}
.dark h1, .dark h4{
  color: var(--vt-c-white-soft);
}
@media (max-width: 767px) {
  .wrapper{
    padding: 8rem 0 0 0 ;
  }
  .title{
    padding: 0 1rem 3rem 1rem;
  }
  h1{
    font-size: 30px;
  }
  h4{
    font-size: 25px;
  }
  .membership-block{
    display: flex;
    flex-direction: column;
    padding: 3rem 1rem;
  }
  p{
    line-height: inherit;
  }
}
@media (min-width: 678px) and (max-width: 991px) {
  .wrapper{
    padding: 10rem 0 0 0;
  }
  .title{
    padding: 0 5rem 3rem 5rem;
  }
  .membership-block{
    padding: 5rem;
    grid-template-columns: 6fr 6fr;
  }
  p{
    line-height: 25px;
  }
}
@media (min-width: 992px) and (max-width: 1440px) {
  .membership-block{
    padding: 5rem 9rem;
    grid-template-columns: 6fr 6fr;
  }
}
</style>
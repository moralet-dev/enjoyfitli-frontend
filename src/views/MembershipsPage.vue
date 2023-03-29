<template>
  <div class="wrapper">
    <div class="title">
      <h1>Memberships</h1>
      <p>Choose most comfortable variant for you</p>
    </div>
    <div class="membership-block">
      <div class="descr">
        <h4>Personal training</h4>
        <p>
          Не маєш часу відвідувати зал або ж проживаєш не в Києві ? Ти можеш досягти бажаного результату займаючись
          вдома!<br>
          Онлайн персональне тренування - повністю налаштовується під тебе, я зможу проконтролювати весь процес
          тренування навіть якщо ти будеш на відстані!
        </p>
      </div>
      <MembershipBlock :memberships=personalMemberships />
    </div>
    <div class="membership-block dark">
      <div class="descr">
        <h4>Group training</h4>
        <p>
          Комплекс тренувань створюється, орієнтуючись на спільну фізичну форму та бажану мету тренуючись.
          Великою превілеєю спліт тренування стане ретельна  увага тренера на виконання комплексних вправ з твоїм партнером.
          Буде круто!
        </p>
      </div>
      <MembershipBlock :memberships=groupMemberships arrow-color="var(--color-background-section-dark-arrows)" />
    </div>
    <div class="membership-block">
      <div class="descr">
        <h4>4girl</h4>
        <p>
          Спеціальне тренування персоналізованого формату.
          Перевагою даного тренування є максимальна увага тренера до кожного клієнта,завдяки чому твоя техніка виконання
          буде бездоганною, персоналальний підхід та максимум різних вправ.
        </p>
      </div>
      <MembershipBlock :memberships=forGirlsMemberships />
    </div>
    <div class="membership-block dark">
      <div class="descr">
        <h4>Online training</h4>
        <p>
          Не маєш часу відвідувати зал або ж проживаєш не в Києві ? Ти можеш досягти бажаного результату займаючись
          вдома!<br>
          Онлайн персональне тренування - повністю налаштовується під тебе, я зможу проконтролювати весь процес
          тренування навіть якщо ти будеш на відстані!
        </p>
      </div>
      <MembershipBlock :memberships=onlineMemberships arrow-color="var(--color-background-section-dark-arrows)" />
    </div>
  </div>
</template>

<script>
import MembershipBlock from "@/components/MembershipBlock.vue";
import {profileAPI} from "@/api/profileAPI/profileAPI";

export default {
  name: "MembershipsPage",
  components: {MembershipBlock},
  data() {
    return {
      memberships: null,
      personalMemberships: null,
      groupMemberships: null,
      onlineMemberships: null,
      forGirlsMemberships: null,
    }
  },
  mounted() {
    this.getMemberships()
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
    }
  }
}
</script>

<style scoped>
h1, h4 {
  font-family: "Futura New", sans-serif;
  padding: 1.5rem 0;
  font-size: 50px;
}
h4 {
  font-size: 30px;
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
</style>
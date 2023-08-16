<template>
  <div class="wrapper">
    <div class="title">
      <h1>
        {{ $t('payForMembership') }}
      </h1>
      <button class="back" type="button" @click="$router.push({name:'memberships'})">
        <arrow-left-icon height="25" width="50" icon-color="var(--color-header-text)"/>
      </button>
    </div>
    <div class="content-wrapper" v-if="membership">
      <div class="content-title">
        <div class="membership-info">
          <p>
            <span>{{$t('membershipType')}}</span>
            <span>{{ membership?.type[`name_${$store.getters.getLocale}`] || membership?.type?.name}}</span>
          </p>
          <p>
            <span>{{$t('trainingsCount')}}</span>
            <span>{{ membership?.count }}</span>
          </p>
          <p>
            <span>{{$t('price')}}</span>
            <span>{{ membership?.price }}</span>
          </p>
          <p>
            <span>{{$t('term')}}</span>
            <span>{{ 31 }}</span>
          </p>
        </div>
        <div class="payment-note">
          <p>{{$t('paymentNoteTitle')}}</p>
          <p>{{$t('paymentNoteSubtitle')}}</p>
        </div>
      </div>
      <div class="pay-methods">
        <div class="non-reg-users">
          <div class="requisites">
            <h2>{{$t('requisites')}}:</h2>
            <p class="item">
              <span class="item-title">Отримувач:</span>
              ФОП Бухтіярова Єлизавета Дмитрівна
            </p>
            <p class="item">
              <span class="item-title">IBAN:</span>
              UA533220010000026006330135718
            </p>
            <p class="item">
              <span class="item-title">ІПН/ЄДРПОУ:</span>
              3684100188
            </p>
            <p class="item">
              Акціонерне товариство
              УНІВЕРСАЛ БАНК
            </p>
            <p class="item">
              <span class="item-title">МФО:</span>
              322001
            </p>

            <p class="item">
              <span class="item-title">ОКПО Банку:</span>
              21133352
            </p>
          </div>
        </div>
        <div class="reg-users">
          <div class="">
            <button type="button">Future Partner</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <preloader-small/>
    </div>
  </div>

</template>

<script>
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import {profileAPI} from "@/api/profileAPI/profileAPI";
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "MembershipPayment",
  components: {PreloaderSmall, ArrowLeftIcon},
  data: () => ({
    membership: null,
  }),
  mounted() {
    this.getMembership(this.$route.params.id)
  },
  methods: {
    async getMembership(id) {
      profileAPI.getMemberships(id).then(response => {
        this.membership = response.data
      })
    }
  }
}
</script>

<style scoped>
.wrapper{
  padding: 6rem 9rem;
  display: flex;
  flex-direction: column;
}
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1{
  font-size: 50px;
}
.back{
  background: var(--color-background-header);
}
.content-wrapper{
  padding: 2rem 0;
}
.content-title{
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
</style>
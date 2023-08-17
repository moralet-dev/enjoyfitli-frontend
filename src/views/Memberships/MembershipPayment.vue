<template>
  <div class="wrapper">
    <div class="title">
      <h1>
        {{ $t('payForMembership') }}
      </h1>
      <button class="back" type="button" @click="$router.push({name:'memberships'})">
        <arrow-left-icon height="1rem" width="50" icon-color="var(--color-header-text)"/>
        {{ $t('back') }}
      </button>

    </div>
    <div class="content-wrapper" v-if="membership">
      <div class="content-title">
        <div class="payment-note">
          <p>*{{ $t('paymentNoteTitle') }}</p>
        </div>
      </div>
      <div class="data">
        <div class="membership-info">
          <em class="membership-info__title">{{ $t('membershipData') }}:</em>
          <p>
            <span>{{ $t('trainingsType') }}: </span>
            <span class="membership-info__value">
              {{
                membership?.type[`name_${$store.getters.getLocale}`] || membership?.type?.name
              }}
            </span>
          </p>
          <p>
            <span>{{ $t('trainingsCount') }}: </span>
            <span class="membership-info__value">{{ membership?.count }}</span>
          </p>
          <p>
            <span>{{ $t('price') }}: </span>
            <span class="membership-info__value">{{ membership?.price }} &#8372;</span>
          </p>
          <p>
            <span>{{ $t('term') }}: </span>
            <span class="membership-info__value">{{ 31 }} {{ $t('day') }}</span>
          </p>
        </div>
        <div v-if="me?.id" class="membership-info user-data">
          <em class="membership-info__title">{{ $t('userData') }}:</em>
          <p>
            <span>{{ $t('firstName') }}: </span>
            <span class="membership-info__value"> {{ me?.first_name }}</span>
          </p>
          <p>
            <span>{{ $t('lastName') }}: </span>
            <span class="membership-info__value"> {{ me?.last_name }}</span>
          </p>
          <p>
            <span>{{ $t('email') }}: </span>
            <span class="membership-info__value"> {{ me?.email }}</span>
          </p>
          <p>
            <span>{{ $t('phone') }}: </span>
            <span class="membership-info__value"> {{ me?.phone }}</span>
          </p>
        </div>
        <div v-else class="membership-info user-data">
          <em class="membership-info__title">{{ $t('userData') }}:</em>
          <p>{{ $t('notRegistredUserPaymentText') }}</p>
          <div class="not-reg-links">
            <button @click="$store.commit('openLoginPopup')">{{$t('login')}}</button>
            <router-link class="btn" :to="{name: 'reg'}">{{$t('registration')}}</router-link>
          </div>
        </div>
      </div>
      <div class="pay-methods">
        <div class="pay-block requisites">
          <h3>{{ $t('requisites') }}:</h3>
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
          <p class="item">
            <span class="item-title">Призначення платежу:</span>
            <br>
            "Абонемент
            {{me?.first_name && me?.last_name ? `${me.first_name} ${me.last_name}`: '(ім\'я) (прізвище)'}},
            {{me?.phone? me.phone: '(номер телефону)'}}, {{membership?.type.name}} {{membership?.count}}"
          </p>
        </div>
        <div class="pay-block">
          <h3>{{$t('paymentSystems')}}:</h3>
          <div class="links">
            <p class="note">*Наразі цей функіонал знаходиться у розробці. Як тільки оплата через платіжні системи стане
              доступна - ми сповістимо наших користувачів.</p>
            <button class="port" type="button">Future payment 1</button>
            <button class="port" type="button">Future payment 2</button>
            <button class="port" type="button">Future payment 3</button>
          </div>
        </div>
      </div>
      <div class="bottom-info">
        <p>*{{$t('paymentMembershipBottomInfo')}}</p>
        <router-link class="btn" :to="{name: 'payment'}">{{$t('paymentPage')}}</router-link>
        <router-link class="btn" :to="{name: 'public-offer'}">{{$t('publicOffer')}}</router-link>
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
import {authAPI} from "@/api/authAPI/authAPI";

export default {
  name: "MembershipPayment",
  components: {PreloaderSmall, ArrowLeftIcon},
  data: () => ({
    membership: null,
    me: null,
  }),
  mounted() {
    this.getData(this.$route.params.id)
    this.getMe()
  },
  methods: {
    async getData(id) {
      this.membership = await profileAPI.getMemberships(id).then(response => response.data)
    },
    async getMe() {
      this.me = await authAPI.getMe().then(response => response.data).catch((reason)=>{
        console.log(reason.response)
        return null
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 3rem 9rem;
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: start;
}

h1 {
  font-size: 30px;
  margin-bottom: 1rem;
}

.back {
  background: var(--color-background-header);
  color: var(--color-header-text);
}
.btn{
  display: block;
}
.content-wrapper {
  padding: 2rem 0;
}

.content-title {
  margin-bottom: 1rem;
}

.data {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.membership-info, .user-data {
  display: flex;
  flex-direction: column;
  flex: 0 1 33.33%;
  padding: 2rem;

  background: var(--color-background-header);
  color: var(--color-header-text);
  border-radius: 15px;
  border: 2px solid var(--color-background-header);
}

.user-data {
  background: var(--color-background);
  color: var(--color-text);
}

.membership-info__title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 1.5rem;
}

.membership-info p {
  margin-bottom: 1rem;
}

.membership-info p:first-letter {
  text-transform: uppercase;
}

.membership-info p span {
}

.membership-info__value {
  font-style: italic;
  text-decoration: underline;
  white-space: nowrap;
}

.pay-methods {
  display: grid;
  grid-template-columns: 6fr 6fr;
}
.pay-block{
  display: flex;
  flex-direction: column;
}
.pay-block h3{
  font-size: 22px;
  margin-bottom: 2rem;
}
.pay-block p{
  margin-bottom: 1rem;
}
.not-reg-links{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.links{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.links button{
  margin: .25rem 0;
}
.note {
  font-size: 14px;
}
.port{
  background: #fc3131;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  pointer-events: none;
}
.bottom-info{
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
}
.bottom-info *:nth-child(even),.bottom-info *:nth-child(odd){
  margin-bottom: .5rem;
}
@media (max-width: 991px) {
  .wrapper{
    padding: 3rem 5rem;
  }
}
@media (max-width: 767px) {
  .wrapper{
    padding: 3rem 1rem;
  }
  .title{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  h1{
    flex: 0 1 30%;
  }
  .content-wrapper{
    padding: 1rem 0;
  }
  .data{
    flex-direction: column;
  }
  .membership-info{
    padding: 1rem;
    margin-bottom: .5rem;
  }
  .pay-methods{
    display: flex;
    flex-direction: column-reverse;
  }
  .pay-block{
    margin-bottom: .5rem;
  }
  .pay-block h3{
    margin-bottom: 1rem;
  }
}
</style>
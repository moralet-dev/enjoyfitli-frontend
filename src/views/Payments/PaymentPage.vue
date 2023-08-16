<template>
  <div class="wrapper">
    <div class="title">
      <h1>{{ $t('payment') }}</h1>
      <p class="title-descr">{{ $t('paymentPageTitle') }}</p>
    </div>
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
    <div class="buttons">
      <router-link class="btn" :to="{name: 'public-offer'}">{{$t('publicOffer')}}</router-link>
      <router-link class="btn" :to="{name: 'memberships'}">{{$t('memberships')}}</router-link>
      <router-link class="btn" :to="{name: 'contacts'}">{{$t('contacts')}}</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "PaymentPage"
}
</script>

<style scoped>
.wrapper{
  padding: 6rem 9rem;
  display: flex;
  flex-direction: column;
}
h1{
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 1rem;
}
.title{
  margin-bottom: 2rem;
}
.title-descr{
  white-space: pre-wrap;
}
.requisites{
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 2rem;
}
.requisites h2{
  font-size: 25px;
}
.item{
  margin: 1rem 0 0 1rem;
  min-height: 2rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.item-title{
  font-family: 'Futura New', sans-serif;
  margin-right: .5rem;
}
.buttons{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.btn{
  display: block;
  margin: 0 1rem;
}
@media (max-width: 991px) {
  .wrapper{
    padding: 6rem 5rem;
  }
}

@media (max-width: 767px) {
  .wrapper{
    padding: 3rem 1rem;
  }
  h1{
    font-size: 30px;
  }
  .buttons{
    flex-direction: column;
    align-items: center;
  }
  .btn{
    margin: .5rem 0;
    width: 70%;
    text-align: center;
  }
}
</style>
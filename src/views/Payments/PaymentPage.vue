<template>
  <div class="wrapper">
    <div class="title">
      <h1>{{ $t('payment') }}</h1>
      <p>{{ $t('paymentPageTitle') }}</p>
    </div>
    <div class="requisites">
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
</template>

<script>
export default {
  name: "PaymentPage"
}
</script>

<style scoped>
.wrapper{
  padding: 3rem 9rem;
}
h1{
  font-size: 50px;
  font-weight: 700;

}
.title{
  margin-bottom: 2rem;
}
.requisites{
  display: flex;
  flex-direction: column;
  align-items: start;
}
.item{
  margin-bottom: 1rem;
  min-height: 2rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.item-title{
  font-family: 'Futura New', sans-serif;
  margin-right: .5rem;
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
}
</style>
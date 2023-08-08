<template>
  <div class="wrapper">
    <h1>{{ $t('contacts') }}</h1>
    <section class="contacts">
      <p>{{ $t('address')}}: {{ $t('studioAddress') }}</p>
      <p>
        {{ $t('phone') }}:
        <a class="text-link" href="tel:+380737304509"> +380 (73) 730 45 09</a>
      </p>
      <p>
        {{ $t('email') }}:
        <a class="text-link" href="mailto:enfoyfit@gmail.com"> enjoyfitnesstudio@gmail.com</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "ContactsPage"
}
</script>

<style scoped>
.wrapper{
  padding: 6rem 9rem;
}
h1{
  font-size: 50px;
  padding: 1.5rem 0;
}
.contacts{
  margin: 1rem 0;
}

.contacts p:first-letter{
  text-transform: uppercase;
}
p{
  margin: 1rem 0;
}
.text-link{
  text-transform: lowercase;
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
}
</style>
<template>
  <div class="wrapper">
    <div>
      <h2 class="title">{{$t('homePage.mainTrainingDirections')}}</h2>
      <p >
        {{ $t('homePage.greetingTitle') }}
      </p>
      <p>{{ $t('homePage.greetingSubtitle') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GreetingsBlock"
}
</script>

<style scoped>
.wrapper {
  padding: 6rem 9rem;
  white-space: pre-wrap;
}

.title {
  font-size: 50px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
}

@media (max-width: 767px) {
  .wrapper {
    padding: 3rem 1rem;
  }

  .title {
    font-size: 30px;
  }
}

@media (min-width: 768px)and (max-width: 991px) {
  .wrapper {
    padding: 6rem 5rem;
  }
}
</style>
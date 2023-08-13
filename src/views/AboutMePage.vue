<template>
  <div class="wrapper">
    <div class="title">
      <h1>Ми - фітнес студія Enjoy.</h1>
    </div>
    <div class="content">
      <p>
        {{ $t('homePage.greetingTitle') }}
      </p>
      <p>{{ $t('homePage.greetingSubtitle') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutMePage",
}
</script>

<style scoped>
.wrapper {
  padding: 6rem 9rem;
}

h1 {
  padding: 1.5rem 0;
  font-size: 50px;
}

.content {
  width: 50%;
}

.content p {
  margin: 1rem 0;
  white-space: pre-wrap;
}

@media (max-width: 767px) {
  .wrapper {
    padding: 3rem 1rem;
  }

  h1 {
    font-size: 30px;
  }

  .content {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .wrapper {
    padding: 6rem 5rem;
  }
}
</style>
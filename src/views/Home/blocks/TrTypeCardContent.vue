<template>
  <div class="content-wrapper">
    <div class="title">
      <h3>{{ trType?.name }}</h3>
    </div>
    <div class="text">
      <div class="text__section description">
        <div class="description__wrapper">
          <p>
            {{ trType?.description }}


          </p>
        </div>
        <router-link class="btn" :to="{'name': 'memberships'}">{{this.$t('signUp')}}</router-link>
      </div>
      <div class="text__section advantages">
        <div class="adv" v-if="trType.advantages.length > 0" v-for="[index, item] in trType.advantages.entries()">
          <span class="round">{{ index + 1 }}</span>
          <p>
            {{ item?.adv }}
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrTypeCardContent",
  props: {
    trType: {type: Object, default: null},
  },
  data: () => ({}),
}
</script>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  width: 100%;
  text-align: left;
  text-shadow: none;
}

.content-wrapper > *:nth-child(even),
.content-wrapper > *:nth-child(odd) {
  padding: 0 0 1rem;
}

.title {
  margin: 2rem 0 5rem 0;
}

.title h3 {
  font-size: 30px;
  text-align: center;
  color: var(--color-text);
  text-shadow: none;
  font-weight: 700;
}

.text {
  display: flex;
  color: var(--color-text);
}

.text__section {
  margin: 0 0;
  padding: 0 0;
  flex: 1 1 50%;
}
.description{
  display: flex;
  flex-direction: column;
}
.description p{
  display: flex;
  max-width: 85%;
}
.description p:before {
  content: '';
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 10px;
  padding: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--color-link-text);
  background-color: #fff;
}
.btn{
  margin: 1rem 36px;
  background: transparent;
}
.btn:hover{
  background: var(--color-link-text);
}
.advantages {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.adv{
  display: flex;
  align-items: start;
  margin-bottom: 2rem;
}
.advantages p {
  display: flex;
  align-items: center;
  padding: 0 1rem 0 1rem;
}

.round {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 21px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #fff;
  font-size: 24px;
  border: 2px solid var(--color-link-text);
}
@media (max-width: 768px) {
  .content-wrapper{
    padding: 1rem;
  }
  .title{
    margin: 1rem 0;
  }
  .title h3 {
    font-size: 25px;
  }
  .text{
    flex-direction: column-reverse;
  }
  .description>.btn{
    align-self: center;
  }
  .description p{
    max-width: 100%;
  }
  .description p:before{
    padding: 4px;
    width: 8px;
    height: 8px;
  }
  .adv{
    margin-bottom: 1rem;
  }
  .round{
    font-size: inherit;
    padding: 11px;
    width: 22px;
    height: 22px;
  }
}
</style>
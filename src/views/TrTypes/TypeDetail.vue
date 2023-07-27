<template>
  <div class="type__detail" v-if="trType">
    <div class="detail-content">
      <div class="detail-content__image">
        <img :src="trType?.image" alt="training type image">
      </div>
      <div class="detail-content__text">
        <div class="detail-content__title" :style="{backgroundImage: this.$vuetify.display.mdAndDown ? `url(${trType?.image})`: 'none'}">
          <h1>{{ trType[`name_${this.$store.getters.getLocale}`] || trType?.name }} {{ this.$t('training') }}</h1>
        </div>
        <div class="detail-content__description">
          <div class="description">
            <p>{{ trType[`description_${this.$store.getters.getLocale}`] || trType?.description }}</p>
          </div>
          <div class="advantages" v-if="trType?.advantages?.length > 0">
            <h3>{{this.$t('advantages')}}:</h3>
            <p v-for="a in trType?.advantages">{{ a.adv }}</p>
          </div>

        </div>
        <div class="memb-cards" v-if="trType?.advantages?.length > 0">
          <h3>{{this.$t('memberships')}}:</h3>
          <div class="memb-cards__box">
            <div v-for="m in trType?.memberships" class="memb-card">
              <span>{{m.count}} {{$t('trainings')}}</span>
              <span>{{Math.round(m.price / m.count)}} &#8372; {{$t('perTraining')}}</span>
              <span v-if="countEconomy(m.price, m.count, trType.memberships[0].price)>0"
                    :class="{'economy': true}">
                {{this.$t('economy')}} {{ this.countEconomy(m.price, m.count, trType.memberships[0].price)}} &#8372;
              </span>
              <router-link to="/memberships" class="btn">{{$t('buy')}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {trainingsAPI} from "@/api/trainingsAPI/trainingsAPI";

export default {
  name: "TypeDetail",
  data: () => ({
    trType: null
  }),
  mounted() {
    this.getTypeDetail(this.$route.query.typeID)
  },
  methods: {
    async getTypeDetail(id) {
      this.trType = await trainingsAPI.getTrTypeDetail(id).then(response => response.data).catch(reason => {
        console.log(reason.response)
      })
    },
    countEconomy(price, count, oneTimePrice){
      return `${(oneTimePrice * count) - price}`
    }
  }
}
</script>

<style scoped>
.type__detail {
  z-index: 2;
  min-height: 100%;
  transition: all .6s ease-in-out;
}

h1, h3{
  font-size: 40px;
  text-transform: uppercase;
}
h3{
  font-size: 20px;
  padding: 0 0 1rem 0;
}
.detail-content {
  display: flex;
  margin: 3rem 0;
}

.detail-content__image {
  flex: 0 0 33.33%;
}

.detail-content__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.detail-content__description{
  padding: 0 0 3rem 0;
}
.detail-content__text {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 4rem 2rem;
  border-top: 3px solid var(--color-link-text);
  border-bottom: 3px solid var(--color-link-text);
  border-right: 3px solid var(--color-link-text);
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}
.detail-content__text p{
  display: flex;
  padding: 0 0 1rem 1rem;
}
.description p{
  padding: 0 0 2rem 1rem;
}
.detail-content__text p:before{
  content: '';
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: .5rem;
  margin: 0 .5rem 0 0;
  height: .5rem;
  border-radius: 50%;
  border: 2px solid var(--color-link-text);
  background-color: #fff;
}
.detail-content__title{
  padding: 0 0 3rem 0;
}
.memb-cards__box{
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
}

.memb-card{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 5px solid var(--color-text);
  padding: 1rem;
  margin: 1rem;
  flex: 0 1 auto;
}
.memb-card span{
  margin-bottom: 3rem;
}
.economy{
  color: darkred;
}
@media (min-width: 768px) and (max-width: 991px) {
  .detail-content__image {
    display: none;
  }
  .detail-content__description{
    padding: 2rem 5rem;
  }
  .detail-content__text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0;
    border-top: none;
    border-bottom: 3px solid var(--color-link-text);
    border-right: none;
    border-bottom-right-radius: 0;
  }
  .detail-content__title{
    padding: 6rem 0;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
  .detail-content__title:before{
    content: '';
    background: rgb(0, 0, 0, 0.3);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .memb-cards{
    padding: 1rem 5rem;
  }
  .memb-card{
    flex: 0 1 auto;
  }

}
@media(max-width: 767px){
  h1, h3{
    font-size: 30px;
  }
  h3{
    font-size: 18px;
    padding: 0 0 .5rem 0;
  }
  .detail-content {
    display: flex;
    flex-direction: column;
  }
  .detail-content__image {
    display: none;
  }

  .detail-content__text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0;
    border-top: none;
    border-bottom: 3px solid var(--color-link-text);
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .detail-content__title{
    padding: 6rem 0;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
  .detail-content__title:before{
    content: '';
    background: rgb(0, 0, 0, 0.3);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .detail-content__text p{
    display: flex;
    padding: 0 1rem 1rem 1rem;
  }
  .detail-content__description{
    padding: 2rem 1rem;
  }
  .description p{
    padding: 0 0 2rem 1rem;
  }
  .memb-cards{
    padding: 0 1rem;
  }
}
</style>
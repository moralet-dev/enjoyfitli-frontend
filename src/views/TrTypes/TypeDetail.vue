<template>
  <div class="type__detail" v-if="trType">
    <div class="detail-content">
      <div class="detail-content__text">
        <div class="detail-content__title" :style="{backgroundImage: `url(${trType?.image})`}">
          <h1>{{ trType[`name_${$store.getters.getLocale}`] || trType?.name }} {{ $t('training') }}</h1>
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
        <div class="memb-cards" v-if="trType?.memberships?.length > 0">
          <h3>{{this.$t('memberships')}}:</h3>
          <div class="memb-cards__box">
            <div v-for="m in trType?.memberships"
                 class="memb-card"
                 :style="{backgroundImage: `url(${m?.image})`}"
            >
              <span>{{ m.count }} {{ m.count < 5 ? $t('training') : $store.getters.getLocale === 'uk'?$t('trainingsUA'):$t('trainings') }}</span>

              <span>{{$t('price')}}: {{ m.price}} &#8372;</span>
              <span>{{Math.round(m.price / m.count)}} &#8372; {{$t('perTraining')}}</span>
              <span v-if="countEconomy(m.price, m.count, trType.memberships[0].price)>0 && trType.memberships[0].count === 1"
                    :class="{'economy': true}">
                {{this.$t('economy')}} {{ this.countEconomy(m.price, m.count, trType.memberships[0].price)}} &#8372;
              </span>
              <router-link :to="{name: 'm-payment', params:{id: m.id}}" class="btn">{{$t('buy')}}</router-link>
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
}

.detail-content__description{
  padding: 3rem 9rem;
}
.detail-content__text {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 0;
  border-top: 3px solid var(--color-link-text);
  border-bottom: 3px solid var(--color-link-text);
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
  padding: 5rem 9rem;
  background-attachment: fixed;
  background-size: cover;
  text-align: center;
}
.detail-content__title:before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  opacity: .5;
  width: 100%;
  height: 100%;
  background-color: var(--vt-c-blue-mute);
}
.detail-content__title h1{
  color: var(--vt-c-white-soft);
}
.memb-cards h3{
  padding: 0 9rem;
  margin-bottom: 1rem;
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
  -webkit-background-size: cover;
  background-size: cover;
  border-radius: 17px;
  border: 2px solid var(--color-text);
  box-shadow: 0 0 5px var(--color-text);
  padding: 1rem;
  margin: 1rem;
  flex: 0 1 auto;
  color: var(--vt-c-white-soft);
}
.memb-card:before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;

  background: var(--color-elements-semi-opacity);
}
.memb-card span{
  margin-bottom: 3rem;
}
.economy{
  color: var(--vt-c-red-dark);
}
@media (min-width: 768px) and (max-width: 991px) {
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
    background-attachment: scroll;

  }

  .memb-cards h3{
    padding: 0 5rem;
  }
  .memb-card{
    flex: 0 1 25%;
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
    background-attachment: scroll;

  }
  .detail-content__title h1{
    color: var(--vt-c-white-soft);
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
    padding: 0;
  }
  .memb-cards__box{
    margin: 1rem 0 0 0;

  }
  .memb-cards h3{
    padding: 0 1rem;
  }
  .memb-card{
    margin: .5rem;
  }
}
</style>
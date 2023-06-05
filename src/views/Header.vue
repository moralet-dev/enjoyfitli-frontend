<template>
  <header class="header">
    <div class="header-label">
      <router-link :to="{name:'home'}" @click="isOpened=false">
        <img src="../assets/logos/logo_transparent_1.png" alt=""/>
      </router-link>
    </div>
    <div :class="{'header__burger':true, 'active': isOpened}"  @click="toggleOpen">
      <span></span>
    </div>
    <div :class="{'nav__container':true, 'active': isOpened}">
      <nav>
        <ul class="nav-list">
          <li>
            <router-link :to="{name: 'memberships'}" @click="isOpened=false">{{ this.$t('memberships') }}</router-link>
          </li>
          <li>
            <router-link :to="{name: 'schedule'}" @click="isOpened=false">{{ this.$t('schedule') }}</router-link>
          </li>
          <li>
            <router-link :to="{name: 'about'}" @click="isOpened=false">{{ this.$t('about') }}</router-link>
          </li>
        </ul>
      </nav>
      <HeaderLoginLogout @closeMenu="this.isOpened=false"/>
    </div>
  </header>

</template>

<script>
import HeaderLoginLogout from "@/components/HeaderLoginLogout.vue";
import SchedulePage from "@/views/Schedule/SchedulePage.vue";

export default {
  name: "Header",
  components: {SchedulePage, HeaderLoginLogout},
  data(){
    return{
      isOpened:false,
    }
  },
  updated() {
  },
  methods:{
    closeBurger(){
      this.isOpened = false
    },
    toggleOpen(){
      this.isOpened = !this.isOpened
      if (this.isOpened) {
        // Зберегти початкову позицію прокрутки
        this.scrollTop = window.scrollY;
        // Заблокувати прокрутку
        window.addEventListener('scroll', this.blockScroll);
        document.body.style.overflow = 'hidden';
      } else {
        // Повернути початкову позицію прокрутки
        window.scrollTo(0, this.scrollTop);
        // Розблокувати прокрутку
        window.removeEventListener('scroll', this.blockScroll);
        document.body.style.overflow = 'auto';
      }
    },
    blockScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    },
  }
}
</script>

<style scoped>

.header{
  display: grid;
  height: 100px;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  grid-template-columns: 4fr 8fr;
  box-shadow: 0 0 45px var(--color-header-shadow);
  padding: 0 9rem;
  position: fixed;
  left: 0;
  top: 0;
  text-transform: uppercase;
  z-index: 1;
}
.header::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.8);
}
.header__burger{
  display: none;
}
.header a{
  color: rgb(255, 127, 80);
  padding: 3px;
  font-size: 14px;
}
.header-label {
  display: flex;
  align-items: center;
  justify-content: start;
}

.header-label a,
.header-label a.router-link-active,
.header-label a.router-link-exact-active{
  box-shadow: none;
  background: transparent;
  padding: 0;
}

.header-label a img{
  display: block;
  max-height: 100px;
  max-width: 100%;
}
.nav__container{
  display: grid;
  grid-template-columns: 6fr 6fr;
}
.nav-list {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  min-height: 100%;
}

.nav-list li a {
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
}
@media (min-width: 768px) and (max-width: 991px) {
  .header{
    padding: 0 0 0;
  }
}
@media (max-width: 767px) {
  .header{
    display: flex;
    width: 100%;
    height: 70px;
    padding: 0;
    justify-content: space-between;
    align-items: center;
  }
  .header::before{
    z-index: 2;
    background: #000;
  }
  .header__burger{
    display: block;
    width: 30px;
    height: 20px;
    cursor: pointer;
    z-index: 3;
    padding: 1rem;
    margin: 0 2rem 0 0;
  }
  .header__burger::before,
  .header__burger::after {
    content: '';
    color: coral;
    position: absolute;
    background-color: coral;
    width: 100%;
    height: 5px;
    left: 0;
  }
  .header__burger::before{
    transition: .3s;
    top: 0;
  }
  .header__burger::after{
    transition: .3s;
    bottom: 0;
  }

  .header__burger span{
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    top: 12px;
    background-color: coral;
    transition: .3s;
  }
  .header__burger.active::before{
    top: 11px;
    transform: rotate(45deg);
  }
  .header__burger.active::after{
    bottom: 11px;
    transform: rotate(-45deg);
  }
  .header__burger.active span{
    transform: scale(0);
  }
  .nav__container{
    position: fixed;
    left: 0;
    opacity: 0;
    top: -100%;
    width: 100%;
    max-height: 100%;
    padding: 6rem 0 3rem 0;
    background-color: #616161;
    display: flex;
    flex-direction: column;
    transition: .5s;
  }
  .nav__container.active{
    opacity: 1;
    top: 0;
  }
  .nav-list{
    display: flex;
    flex-direction: column;
    align-items: start;
    min-height: auto;
  }
  .nav-list li{
    width: 100%;
    margin: 1rem 0;
  }
  .nav-list li a{
    padding: 2rem 1rem;
  }
  .header-label{
    z-index: 3;
  }
  .header-label a img{
    max-height: 50px;
  }
}
</style>
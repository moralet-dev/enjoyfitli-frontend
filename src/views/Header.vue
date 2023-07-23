<template>
  <header class="header animate__animated animate__fadeInDown">
    <div class="header-label">
      <router-link :to="{name:'home'}" @click="isOpened=false">
        <img src="../assets/logos/logo_transparent_1.png" alt="E.F.S. LOGO"/>
      </router-link>
    </div>
    <div :class="{'nav__container':true, 'active': isOpened}">
      <nav>
        <ul class="nav-list">
          <li>
            <router-link :to="{name: 'home'}" @click="isOpened=false">{{ this.$t('home') }}</router-link>
          </li>
          <li>
            <router-link :to="{name: 'tr-types'}" @click="isOpened=false">{{ this.$t('trainings') }}</router-link>
          </li>
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
      <HeaderLoginLogout v-if="$vuetify.display.mdAndDown" @closeMenu="this.isOpened=false"/>
    </div>

    <div v-if="$vuetify.display.mdAndDown" :class="{'header__burger':true, 'active': isOpened}"  @click="toggleOpen">
      <span></span>
    </div>
    <HeaderLoginLogout v-if="$vuetify.display.lgAndUp" @closeMenu="this.isOpened=false"/>
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
      scrollTop: 0,
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
        this.scrollTop = window.scrollY;
        document.body.style.overflow = 'hidden';
      } else {
        window.scrollTo(0, this.scrollTop);
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
  position: fixed;
  display: grid;
  width: 100%;
  min-height: 5rem;
  background-color: var(--color-background-header);
  grid-template-columns: auto auto 3fr;
  box-shadow: 0 0 5px var(--color-header-shadow);
  padding: 0 5rem;
  left: 0;
  top: 0;
  text-transform: uppercase;
  z-index: 9997;
}
.header::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-header);
}
.header__burger{
  display: none;
}
.header a{
  /*padding: 3px;*/
  font-size: 14px;
  color: var(--color-header-text);
}
.header a.router-link-active{
  color: var(--color-link-text);
  background: var(--color-header-text-hover-bg);
}
.header a:hover{
  color: var(--color-link-text);
  background: var(--color-header-text-hover-bg);

}
.header-label {
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  justify-content: center;
}

.header-label a,
.header-label a:hover,
.header-label a.router-link-active,
.header-label a.router-link-exact-active{
  box-shadow: none;
  background: transparent;
  padding: 0;
}

.header-label a img{
  display: block;
  max-height: 5rem;
  max-width: 100%;
}
.nav__container{
  display: grid;
  grid-template-columns: 12fr;
}
.nav-list {
  display: flex;
  min-height: 100%;
}

.nav-list li a {
  display: flex;
  min-height: 100%;
  align-items: center;
  padding: 0 .5rem;
  justify-content: center;
  transition: .3s;
}
.nav-list li a:hover{
  padding: 0 1rem;
}
.nav-list li a.router-link-active:hover{
  padding: 0 .5rem;
}
@media (max-width: 991px) {
  .header{
    display: flex;
    width: 100%;
    padding: 0;
    justify-content: space-between;
    align-items: center;
  }
  .header::before{
    z-index: 2;
  }
  li a.router-link-active{
    background: var(--color-background);
  }
  li a:hover{
    background: var(--color-background);
  }
  .header-label a img{
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
    color: var(--color-headings);
    position: absolute;
    background-color: var(--color-headings);
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
    height: 5px;
    top: 12px;
    background-color: var(--color-headings);
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
    top: -100vh;
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    padding: 6rem 0 3rem 0;
    background-color: var(--color-header-burger-bg);
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
    margin: 0;
  }
  .nav-list li a{
    padding: 2rem 1rem;
    color: var(--color-header-text);
  }
  .nav-list li a:hover{
    padding: 2rem 1rem;
  }
  .nav-list li a.router-link-active:hover{
    padding: 2rem 1rem;
  }
  .header-label{
    z-index: 3;
  }

}
</style>
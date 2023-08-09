<template>
  <header class="header animate__animated animate__fadeInDown">
    <div class="header-label">
      <router-link :to="{name:'home'}" @click="[isOpened, selected]=[false, false]">
        <Asset14x1 icon-color="var(--color-header-text"/>
      </router-link>
    </div>
    <div :class="{'nav__container':true, 'active': isOpened}">
      <nav>
        <ul class="nav-list">
          <li class="nav-list__item">
            <router-link class="nav-list__link" :to="{name: 'home'}" @click="closeBurger">{{ this.$t('home') }}</router-link>
          </li>
          <li class="nav-list__item" @click="selected=!selected">
            <span :class="{'nav-list__link': true, 'selected': selected,}">{{$t('trainings')}} <DropdownIcon/></span>
            <ul :class="{'sub-nav-list': true, 'show': selected, 'hide': !selected}">
              <li>
                <router-link class="sub-nav__link" :to="{name: 'tr-types'}" @click.stop="closeBurger">{{ this.$t('trainingTypes') }}</router-link>
              </li>
              <li>
                <router-link class="sub-nav__link" :to="{name: 'memberships'}" @click.stop="closeBurger">{{ this.$t('memberships') }}</router-link>
              </li>
              <li>
                <router-link class="sub-nav__link" :to="{name: 'schedule'}" @click.stop="closeBurger">{{ this.$t('schedule') }}</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-list__item">
            <router-link class="nav-list__link" :to="{name: 'contacts'}" @click="closeBurger">{{ this.$t('contacts') }}</router-link>
          </li>
          <li class="nav-list__item">
            <router-link class="nav-list__link" :to="{name: 'payment'}" @click="closeBurger">{{ this.$t('payment') }}</router-link>
          </li>
          <li class="nav-list__item">
            <router-link class="nav-list__link" :to="{name: 'about'}" @click="closeBurger">{{ this.$t('about') }}</router-link>
          </li>
        </ul>
      </nav>
      <HeaderLoginLogout v-if="$vuetify.display.mdAndDown" @closeMenu="closeBurger"/>
    </div>

    <div v-if="$vuetify.display.mdAndDown" :class="{'header__burger':true, 'active': isOpened}"  @click="toggleOpen">
      <span></span>
    </div>
    <HeaderLoginLogout v-if="$vuetify.display.lgAndUp" @closeMenu="closeBurger"/>
  </header>

</template>

<script>
import HeaderLoginLogout from "@/components/HeaderLoginLogout.vue";
import SchedulePage from "@/views/Schedule/SchedulePage.vue";
import Asset14x1 from "@/components/logos/Asset1x1.vue";
import DropdownIcon from "@/components/icons/DropdownIcon.vue";

export default {
  name: "Header",
  components: {DropdownIcon, Asset14x1, SchedulePage, HeaderLoginLogout},
  data(){
    return{
      isOpened:false,
      scrollTop: 0,
      selected: false,
    }
  },
  updated() {
  },
  methods:{
    closeBurger(){
      this.isOpened = false
      this.selected = false
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
  min-height: 80px;
  background-color: var(--color-background-header);
  grid-template-columns: auto auto 3fr;
  box-shadow: 0 0 5px var(--color-header-shadow);
  padding: 0 2rem;
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
.header{
  font-size: 14px;
  color: var(--color-header-text);
}
.header a.router-link-active,
.header span.router-link-active{
  color: var(--color-link-text);
  background: var(--color-header-text-hover-bg);
}
.header a:hover, .header span:hover{
  cursor: pointer;
  color: var(--color-link-text);
  background: var(--color-header-text-hover-bg);
}
.header span:hover svg{
  fill: var(--color-link-text);
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
  padding: 5px 0;
}

.header-label a,
.header-label a.router-link-active,
.header-label a.router-link-exact-active{
  display: block;
  padding: 5px 0;
  margin: 0 1rem;
}
.header-label svg{
  display: block;
  max-width: 100%;
  min-height: 70px;
  max-height: 70px;
}
.nav__container{
  display: grid;
  grid-template-columns: 12fr;
}
.nav-list {
  display: flex;
  min-height: 100%;
  z-index: 15;
}
.nav-list__item{
  z-index: 12;
}
.nav-list__link svg{
  min-height: 1rem;
  margin: 0 0 0 5px;
  fill: var(--color-header-text);
}
.nav-list__link{
  position: relative;
  z-index: 2;
}
.nav-list__link, .sub-nav__link{
  display: flex;
  min-height: 100%;
  align-items: center;
  padding: 0 .5rem;
  justify-content: center;
  transition: .3s;
  color: var(--color-header-text);
  background: var(--color-background-header);

}

.nav-list__link:hover{
  padding: 0 1rem;
}
.nav-list__link.router-link-active:hover{
  padding: 0 1rem;
}
.sub-nav-list{
  width: max-content;
  transition: .3s;
  z-index: 0;
  opacity: 0;
  position: absolute;
  background: var(--color-background-header);
  color: var(--color-header-text);
}
.sub-nav__link{
  padding: 1.5rem;
}
.selected{
  color: var(--color-link-text);
  background: var(--color-header-text-hover-bg);
  padding: 0 1rem;
}
.selected svg{
  fill: var(--color-link-text);
}
.sub-nav-list.show{
  opacity: 1;
  transform: translateY(0);
}
.sub-nav-list.hide{
  opacity: 0;
  transform: translateY(-100%);
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
  .header-label {
    display: flex;
    flex: 0 1 50%;
    align-items: center;
    justify-content: start;
  }
  li a.router-link-active{
    background: var(--color-background);
  }
  li a:hover{
    background: var(--color-background);
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
  .nav-list .nav-list__item{
    width: 100%;
    margin: 0;
  }
  .nav-list__link{
    padding: 2rem 0;

    color: var(--color-header-text-hover);
    background: transparent;
  }
  .header-label{
    z-index: 3;
  }
  .sub-nav-list{
    position: relative;
    width: 100%;
    transition: .3s;
    opacity: 1;
    background: transparent;
  }
  .nav-list__item span{
    display: none;
  }
  .sub-nav__link{
    color: var(--color-header-text-hover);
    background: transparent;
    padding: 2rem 0;
  }
  .selected{
    color: var(--color-link-text);
    background: var(--color-header-text-hover-bg);
  }
  .sub-nav-list.hide, .sub-nav-list.show{
    opacity: 1;
    transform: none;
  }
}
</style>
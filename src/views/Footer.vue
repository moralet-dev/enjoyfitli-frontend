<template>
  <footer>
    <div class="wrapper">
      <div class="footer-block contacts">
        <div class="icons">
          <TikTokLogo />
          <InstagramLogo />
        </div>
        <span>{{$t('studioAddress')}}</span>
        <a class="text-link" href="tel:+380737304509">+380 (73) 730 45 09</a>
        <a class="text-link" href="mailto:enfoyfit@gmail.com">enjoyfitnessstudio@gmail.com</a>
      </div>
      <div class="footer-block pages">
        <router-link class="text-link" :to="{name:'home'}">{{$t('home')}}</router-link>
        <router-link class="text-link" :to="{name:'tr-types'}">{{$t('trainings')}}</router-link>
        <router-link class="text-link" :to="{name:'memberships'}">{{$t('memberships')}}</router-link>
        <router-link class="text-link" :to="{name:'schedule'}">{{$t('schedule')}}</router-link>
        <router-link class="text-link" :to="{name:'about'}">{{$t('about')}}</router-link>
        <router-link class="text-link" :to="{name: 'terms'}">{{$t('termsOfServiceUse')}}</router-link>
        <router-link class="text-link" to="">{{$t('')}}</router-link>
      </div>
    </div>

  </footer>
</template>

<script>
import TikTokLogo from "@/components/icons/TikTokLogo.vue";
import InstagramLogo from "@/components/icons/InstagramLogo.vue";

export default {
  name: "Footer",
  components: {TikTokLogo, InstagramLogo},
}
</script>

<style scoped>
footer{
  z-index: 9996;
}
.wrapper{
  padding: 2rem 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}
.footer-block{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
.footer-block span{
  color: var(--color-headings);
}
.contacts span{
  margin-bottom: 1rem;
  white-space: pre-wrap;
}
.icons{
  flex-direction: row;
  align-self: center;
  margin: 0 0 1rem 0;
}
.icons a{
  margin: 0 1rem;
}
.pages{
  align-items: start;
}
.text-link{
  text-decoration: none;
  color: var(--color-header-text);
  margin: 0 0 1rem 0;
}
.contacts .text-link{
  text-transform: lowercase;
  text-decoration: underline;
}
.text-link.router-link-exact-active{
  background: transparent;
}
@media (max-width: 767px) {
  footer{
    padding: 0;
  }
  .wrapper{
    flex-direction: column-reverse;
  }
  .pages, .contacts{
    align-items: center;
  }

}
</style>
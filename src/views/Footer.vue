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
        <a class="text-link" href="mailto:connect@enjoyfitnes.com">connect@enjoyfitnes.com</a>
      </div>
      <div class="footer-logo__wrapper">
        <Asset14x1 icon-color="var(--color-headings)"/>
      </div>
      <div class="footer-block pages">
        <router-link class="text-link" :to="{name:'home'}">{{$t('home')}}</router-link>
        <router-link class="text-link" :to="{name:'tr-types'}">{{$t('trainings')}}</router-link>
        <router-link class="text-link" :to="{name:'memberships'}">{{$t('memberships')}}</router-link>
        <router-link class="text-link" :to="{name:'schedule'}">{{$t('schedule')}}</router-link>
        <router-link class="text-link" :to="{name:'about'}">{{$t('about')}}</router-link>
        <router-link class="text-link" :to="{name: 'terms'}">{{$t('termsOfServiceUse')}}</router-link>
        <router-link class="text-link" :to="{name: 'public-offer'}">{{$t('publicOffer')}}</router-link>
      </div>
    </div>

  </footer>
</template>

<script>
import TikTokLogo from "@/components/icons/TikTokLogo.vue";
import InstagramLogo from "@/components/icons/InstagramLogo.vue";
import Asset14x1 from "@/components/logos/Asset1x1.vue";

export default {
  name: "Footer",
  components: {Asset14x1, TikTokLogo, InstagramLogo},
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
.footer-block span, .footer-block a{
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
.text-link.router-link-exact-active,
.text-link.router-link-active{
  background: transparent;
}
.footer-logo__wrapper{
  display: flex;
  max-width: 20vw;
  align-items: start;
  order: 0;
  margin: 2rem;
}
@media (max-width: 767px) {
  footer{
    padding: 0;
  }
  .footer-logo__wrapper{
    display: flex;
    max-width: 30vw;
    align-items: center;
    order: 0;
    margin-bottom: 2rem;
  }
  .wrapper{
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .pages{
    order: 1;
  }
  .contacts{
    order: 2;
  }
  .pages, .contacts{
    align-items: center;
  }

}
</style>
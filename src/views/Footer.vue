<template>
  <footer>
    <div class="wrapper">

      <div class="footer-block contacts">
        <span>{{$t('studioAddress')}}</span>
        <a class="text-link" href="tel:+380737304509">+380 (73) 730 45 09</a>
        <p>
          <span>{{$t('email')}}:</span>
          <br>
          <a class="text-link" href="mailto:connect@enjoyfitnes.com">connect@enjoyfitnes.com</a>
        </p>
        <p>
          <span>{{$t('support')}}:</span>
          <br>
          <a class="text-link" href="mailto:support@enjoyfitnes.com">support@enjoyfitnes.com</a>
        </p>
        <div class="icons">
          <TikTokLogo />
          <InstagramLogo />
        </div>
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
    <div class="bottom-labels">
      <div class="rights-reserved"><span>© enjoyfitnes.com, 2023</span></div>
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
  padding: 2rem 6rem;
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
.contacts span, .contacts p{
  margin-bottom: 1rem;
  white-space: pre-wrap;
}
.icons{
  flex-direction: row;
  align-self: center;
  margin: 1rem 0 0 0;
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
  text-align: center;
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
.bottom-labels{
  font-size: 12px;
  background: var(--vt-c-black-soft);
  padding: .5rem;
}
.rights-reserved{
  color: var(--vt-c-white-soft);
}
@media (max-width: 767px) {
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
    margin: 1.5rem 0;
  }

}
</style>
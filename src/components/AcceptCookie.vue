<template>
  <div v-if="!cookieConsent">
    <div class="cookie-consent">
      <p>{{$t('weUseCookies')}}</p>
      <button @click="acceptCookies">{{ $t('accept') }}</button>
    </div>
  </div>
</template>

<script>
import {getCookie, setCookie} from "@/api";

export default {
  name: 'AcceptCookie',
  data() {
    return {
      cookieConsent: false,
    };
  },
  created() {
    this.checkCookieConsent();
  },
  methods: {
    checkCookieConsent() {
      const cookieValue = getCookie("accept-cookie-use");
      this.cookieConsent = cookieValue === "true";
    },
    acceptCookies() {
      setCookie("accept-cookie-use", "true", {days:365})
      this.cookieConsent = true;
    },
  },
};
</script>

<style>
.cookie-consent {
  z-index: 9999;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-background);
  padding: 10px;
  text-align: center;
}
.cookie-consent button{
  margin-top: 1rem;
}
</style>

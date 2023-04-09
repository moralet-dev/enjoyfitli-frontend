<template>
<div class="wrapper">
  <div class="footer-block icons">
    <TikTokLogo :border="'white'"/>
    <InstagramLogo :border="'white'"/>
  </div>
  <div class="footer-block">
    <span>м.Шулявка, ТЦ Мармелад</span>
    <span>Борщагівська 154, Київ</span>
  </div>
</div>
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
.wrapper{
  padding: 2rem 0;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}
.footer-block{
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  justify-content: center;
  align-items: center;
}
.icons{
  flex-direction: row;
}
.icons svg{
  margin: 0 1rem;
}
</style>
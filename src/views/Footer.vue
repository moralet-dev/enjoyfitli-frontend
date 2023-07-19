<template>
  <footer>
    <div class="wrapper">
      <div class="footer-block icons">
        <TikTokLogo :border="'var(--color-headings)'" :icon-color="'transparent'"/>
        <InstagramLogo :border="'var(--color-headings)'" :icon-color="'transparent'"/>
      </div>
      <div class="footer-block">
        <span>м.Шулявка, ТЦ Мармелад</span>
        <span>Борщагівська 154, Київ</span>
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
  flex-direction: column;
}
.footer-block{
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  justify-content: center;
  align-items: center;
}
.footer-block span{
  color: var(--color-headings);
}
.icons{
  flex-direction: row;
}
.icons a{
  margin: 0 1rem;
}
@media (max-width: 767px) {
  footer{
    padding: 0;
  }
  .wrapper{

  }
}
</style>
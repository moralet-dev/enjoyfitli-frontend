<template>
    <div class="header-label">
      <router-link to="/">Liza Bukhtiyarova</router-link>
    </div>
    <nav>
      <ul class="nav-list">
        <li>
          <router-link to="/abonements">Abonements</router-link>
        </li>
        <li>
          <router-link to="/sheldue">Sheldue</router-link>
        </li>
        <li>
          <router-link to="/about">About me</router-link>
        </li>
      </ul>
    </nav>
    <HeaderLoginLogout/>
</template>

<script>
import HeaderLoginLogout from "@/components/HeaderLoginLogout.vue";

export default {
  name: "HeaderComponent",
  components: {HeaderLoginLogout},
}
</script>

<style scoped>
a {
  padding: 3px;
}

a:hover {
  background-color: transparent;
  box-shadow: 0 0 10px #000000;
}

h1 {
  text-align: center;
  font-size: 24px;
}

h1 a:hover {
  background-color: transparent;
  box-shadow: none;
  text-decoration: underline;
}

.header-label {
  display: flex;
  align-items: center;
  justify-content: start;
}

.header-label a {
  padding: 2rem 0;
  font-size: 24px;
  min-height: 100%;
}
.header-label a:hover{
  background-color: transparent;
  box-shadow: none;
  text-decoration: underline;
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
</style>
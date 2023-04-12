<template>
    <div class="header-label">
      <router-link :to="{name:'home'}">
        <img src="../assets/logos/logo_transparent_1.png" alt=""/>
      </router-link>
    </div>
    <nav>
      <ul class="nav-list">
        <li>
          <router-link :to="{name: 'memberships'}">Memberships</router-link>
        </li>
        <li>
          <router-link :to="{name: 'schedule'}">Schedule</router-link>
        </li>
        <li>
          <router-link :to="{name: 'about'}">About me</router-link>
        </li>
      </ul>
    </nav>
    <HeaderLoginLogout/>
</template>

<script>
import HeaderLoginLogout from "@/components/HeaderLoginLogout.vue";

export default {
  name: "Header",
  components: {HeaderLoginLogout},
}
</script>

<style scoped>
a {
  padding: 3px;
  font-size: 14px;
}

a:hover {
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
}

.header-label a img{
  height: 86px;
  max-width: 100%;
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
<template>
  <div class="wrapper">
    <div class="welcome-block">
      <div class="user-avatar">
        <img v-if="currentUserData.photo" :src="currentUserData.photo" alt="">
        <DownloadIcon class="user-avatar_download-icon" width="35" height="35" icon-color="green"/>
      </div>
      <div class="welcome-block_text">
        <h1>Profile</h1>
        <h3>Hi{{ `, ${this.currentUserData.first_name || 'dear athlete'}` }} {{ this.currentUserData.last_name }}!</h3>
      </div>
    </div>
    <div class="">
    </div>
  </div>

</template>

<script>
import {authAPI} from "@/api/authAPI";
import Logout from "@/components/Logout.vue";
import DownloadIcon from "@/components/DownloadIcon.vue";

export default {
  name: "ProfilePage",
  components: {DownloadIcon, Logout},
  data() {
    return {
      me: null,
      currentUserData: {
        first_name: null,
        last_name: null,
        phone:null,
        photo:null,
      },
    }
  },
  beforeCreate() {
    if (this.$store.getters['authModule/isAuthenticated'] === 'false'
        || !this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push('/login')
    }
  },
  beforeMount() {
    this.getMe()
  },
  methods: {
    async getMe() {
      await authAPI.getMe().then(response => {
        this.me = response.data
        authAPI.getCurrentUserData(this.me.id).then(response => {
          this.currentUserData = {...response.data}
          console.log(this.currentUserData)

        })
      }).catch(() => this.me = null)

    }
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 12fr;
  min-width: 100%;
}

.welcome-block {
  display: flex;

}

.welcome-block img {
  max-width: 110px;
  /*background: #ffffff;*/
}

.welcome-block_text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 2rem;
}

h1 {
  font-size: 50px;
}

h3 {
  font-size: 30px;
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #EAEAEA;
}

.user-avatar_download-icon {
  position: absolute;
  opacity: 0.5;
  transition: 0.5s;
  cursor: pointer;
}

.user-avatar_download-icon:hover {
  opacity: 1;
}
</style>
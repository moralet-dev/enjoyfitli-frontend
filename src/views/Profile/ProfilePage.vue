<template>
  <div class="wrapper" v-if="this.$store.getters['authModule/getCurrentUser'].id">
    <div class="welcome-block animate__animated animate__fadeIn">
      <div class="user-avatar">
        <img ref="photo" v-bind:src="this.$store.getters['authModule/getCurrentUser'].photo" alt="">
        <label for="photo_input">
          <DownloadIcon class="user-avatar_download-icon"/>
          <input id="photo_input" type="file" ref="profilePhoto" accept="image/jpeg, image/png" hidden="hidden"
                 @change="showModalUpload = true">
        </label>
      </div>
      <div class="user-avatar-helpers">

      </div>
      <div class="welcome-block_text">
        <h1>{{ this.$t('profile') }}</h1>
        <p>{{ this.$t('welcome') }}, {{ `${this.$store.getters['authModule/getCurrentUser'].first_name}` }}
          {{ this.$store.getters['authModule/getCurrentUser'].last_name }}!</p>
      </div>
    </div>
    <ProfilePagesWrapper :me="this.$store.getters['authModule/getCurrentUser']"/>
    <Teleport to="body">
      <Modal :show="showModalUpload" @close="showModalUpload = false" class="modal_upload">
        <template #header>
          <span>{{ this.$t('confirmChanges') }}</span>
        </template>
        <template #body>
          {{ this.$t('ProfilePage.updatePhotoText') }}
        </template>
        <template #footer>
          <button @click="showModalUpload = false">{{ this.$t('close') }}</button>
          <button @click="changePhoto">{{ this.$t('confirm') }}</button>
        </template>
      </Modal>
    </Teleport>
  </div>
  <div class="wrapper" v-else>
    <PreloaderSmall />
  </div>
</template>

<script>
import {authAPI} from "@/api/authAPI/authAPI";
import DownloadIcon from "@/components/icons/DownloadIcon.vue";
import ProfilePagesWrapper from "@/views/Profile/profile-pages/ProfilePagesWrapper.vue";
import Modal from "@/components/Modals/Modal.vue";
import PreloaderSmall from "@/components/PreloaderSmall.vue";

export default {
  name: "ProfilePage",
  components: {PreloaderSmall, ProfilePagesWrapper, DownloadIcon, Modal},
  data() {
    return {
      showModalUpload: false,
    }
  },
  beforeMount() {
    if (!this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push({name:'home'})
      this.$store.commit('openLoginPopup')
    }
  },
  updated() {
    if (!this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push({name:'home'})
      this.$store.commit('openLoginPopup')
    }
  },
  mounted() {
    this.getMe()
  },
  methods: {
    async getMe() {
      await authAPI.getMe().then(response => {
        this.$store.dispatch('authModule/onCurrentUserSet', response.data)
      }).catch((reason) => {
        console.log(reason.response)
      })
    },
    async changePhoto() {
      const photo = this.$refs.profilePhoto.files[0]
      await authAPI.updateMe({
        'first_name': this.$store.getters['authModule/getCurrentUser'].first_name,
        'last_name': this.$store.getters['authModule/getCurrentUser'].last_name,
        'photo': photo}
      ).then(response=>{
        this.$store.dispatch('authModule/onCurrentUserSet', response.data)
        this.showModalUpload= false
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 12fr;
  min-width: 100%;
  padding: 6rem 9rem 0 9rem;
}

.welcome-block {
  display: flex;
  transition: 5s;
}

.welcome-block_text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 2rem;
  word-wrap: break-word;
}

h1 {
  font-size: 50px;
}

h3 {
  font-size: 30px;
  word-wrap: break-word;

}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;

}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: solid 5px slategray;
  background: darkgray;
  border-radius: 50%;

}
.user-avatar label{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.5s;
  opacity: 1;
}
.user-avatar label:hover{
  opacity: 1;
  background: rgb(77, 161, 241, 0.8);
}
.user-avatar_download-icon {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  opacity: 0.5;
  transition: 0.5s;
}
.user-avatar_download-icon:hover {
  opacity: 1;
}
.user-avatar-helpers {
  display: flex;
  justify-content: start;
  align-items: start;
}
.modal_upload span{
  font-size: 30px;
}
.modal_upload button{

}
@media (max-width: 991px) {
  .wrapper{
    padding: 6rem 5rem 0 5rem;

  }
}
@media (max-width: 767px) {
  .wrapper{
    padding: 3rem 1rem 0 1rem;
  }
  .welcome-block{
  }
  h1{
    font-size: 40px;
  }
  p{
    font-size: 20px;
  }
  .user-avatar{
    width: 90px;
    height: 90px;
  }
}
</style>
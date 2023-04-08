<template>
  <div class="wrapper">
    <div class="welcome-block">
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
        <h1>Profile</h1>
        <h3>Hi, {{ `${this.$store.getters['authModule/getCurrentUser'].first_name}` }}
          {{ this.$store.getters['authModule/getCurrentUser'].last_name }}!</h3>
      </div>
    </div>
    <ProfilePagesWrapper :me="this.$store.getters['authModule/getCurrentUser']"/>
    <Teleport to="body">
      <Modal :show="showModalUpload" @close="showModalUpload = false" class="modal_upload">
        <template #header>
          <span>  Confirm changes</span>
        </template>
        <template #body>
          Are you sure that you want to update photo?
        </template>
        <template #footer>
          <button @click="showModalUpload = false">Close</button>
          <button @click="changePhoto">Confirm</button>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script>
import {authAPI} from "@/api/authAPI/authAPI";
import DownloadIcon from "@/components/icons/DownloadIcon.vue";
import ProfilePagesWrapper from "@/views/profile-pages/ProfilePagesWrapper.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "ProfilePage",
  components: {ProfilePagesWrapper, DownloadIcon, Modal},
  data() {
    return {
      showModalUpload: false,
    }
  },
  beforeCreate() {
    if (this.$store.getters['authModule/isAuthenticated'] === 'false'
        || !this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push('/login')
    }
  },
  mounted() {
    this.getMe()
    this.$store.watch(
        () => this.$store.getters['authModule/getCurrentUser'].photo,
        (newVal) => {
          this.$refs.photo.src = newVal;
        }
    );
  },
  methods: {
    async getMe() {
      await authAPI.getMe().then(response => {
        this.$store.dispatch('authModule/onCurrentUserSet', response.data)
      }).catch(() => null)
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
  padding: 0 9rem;
}

.welcome-block {
  display: flex;
  transition: all 5s ease;

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
  opacity: 0.3;
}
.user-avatar label:hover{
  opacity: 1;
  background: rgba(0, 156, 6, 0.53);
}
.user-avatar_download-icon {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  opacity: 0.3;
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
</style>
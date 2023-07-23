<template>
  <div class="wrapper" v-if="$store.getters['authModule/getCurrentUser'].id">
    <div class="welcome-block animate__animated animate__fadeIn">
      <div class="avatar-section">
        <div class="user-avatar">
          <img ref="photo" class="animate__animated animate__fadeIn"
               v-if="$store.getters['authModule/getCurrentUser']?.photo"
               :src="$store.getters['authModule/getCurrentUser']?.photo" alt="user_avatar">
          <img v-else class="animate__animated animate__fadeIn"
               src="src/assets/icons/user-avatar.png" alt="user_avatar">
        <div class="controllers">
          <label class="ctrl upload" for="photo_input">
            <UploadIcon width="30" height="30" icon-color="var(--color-helper)"/>
            <input id="photo_input" type="file" ref="profilePhoto" accept="image/jpeg, image/png" hidden="hidden"
                   @change="showModalUpload = true">
          </label>
          <span class="ctrl delete" @click="del_photo" >
            <DeleteIcon width="30" height="30" icon-color="var(--color-helper)"/>
          </span>
        </div>
        </div>
      </div>
      <div class="welcome-block_text">
        <h1>{{ $t('profile') }}</h1>

        <p >{{ $t('welcome') }}, {{ `${$store.getters['authModule/getCurrentUser'].first_name}` }}
          {{ $store.getters['authModule/getCurrentUser'].last_name }}!</p>
        <p >{{ $t('welcomeProfileText') }}</p>
      </div>
    </div>
    <ProfilePagesWrapper :me="$store.getters['authModule/getCurrentUser']"/>
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
    <PreloaderSmall/>
  </div>
</template>

<script>
import {authAPI} from "@/api/authAPI/authAPI";
import DownloadIcon from "@/components/icons/DownloadIcon.vue";
import ProfilePagesWrapper from "@/views/Profile/profile-pages/ProfilePagesWrapper.vue";
import Modal from "@/components/Modals/Modal.vue";
import PreloaderSmall from "@/components/PreloaderSmall.vue";
import UploadIcon from "@/components/icons/UploadIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

export default {
  name: "ProfilePage",
  components: {DeleteIcon, UploadIcon, PreloaderSmall, ProfilePagesWrapper, DownloadIcon, Modal},
  data() {
    return {
      showModalUpload: false,
    }
  },
  beforeMount() {
    if (!this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push({name: 'home'})
      this.$store.commit('openLoginPopup')
    }
  },
  updated() {
    if (!this.$store.getters['authModule/isAuthenticated']) {
      this.$router.push({name: 'home'})
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
      })
    },
    async changePhoto() {
      const photo = this.$refs.profilePhoto.files[0]
      await authAPI.updateMe({
            'first_name': this.$store.getters['authModule/getCurrentUser'].first_name,
            'last_name': this.$store.getters['authModule/getCurrentUser'].last_name,
            'photo': photo
          }
      ).then(response => {
        this.$store.dispatch('authModule/onCurrentUserSet', response.data)
        this.showModalUpload = false
      })
    },
    async del_photo(){
      if (this.$store.getters['authModule/getCurrentUser']?.photo){
        await authAPI.updateMe({
              'first_name': this.$store.getters['authModule/getCurrentUser'].first_name,
              'last_name': this.$store.getters['authModule/getCurrentUser'].last_name,
              'photo': ''
            }
        ).then(response => {
          this.$store.dispatch('authModule/onCurrentUserSet', response.data)
          this.showModalUpload = false
        })
      }

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
  padding: 0 0 1rem 0;
}

.welcome-block_text {
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  word-wrap: break-word;
}

h1 {
  font-size: 50px;
  margin-bottom: 2rem;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 1 10%;
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50%;
  flex-direction: column;
}

.user-avatar img {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border: solid 2px var(--color-text);
  border-radius: 50%;

}

.controllers {
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 15px;
  margin: 1rem 0 0 0;
}

.ctrl {
  display: block;
  padding: .5rem 1rem 0;
  cursor: pointer;
  background: var(--color-background-header);

  transition: .5s;
}

.ctrl:hover {
  background: var(--color-link-bg-hover);
}

.upload {
  border-right: 1px solid var(--color-helper);
  border-bottom-left-radius: 35px;
  border-top-left-radius: 15px;
}

.upload:hover {
  background: rgba(0, 156, 6, 1);
}

.delete {
  border-left: 1px solid var(--color-helper);
  border-bottom-right-radius: 15px;
  border-top-right-radius: 35px;
  transition: .5s;

}

.delete:hover {
  background: var(--vt-c-red-dark);
}

@media (max-width: 991px) {
  .wrapper {
    padding: 6rem 5rem 0 5rem;

  }
}

@media (max-width: 767px) {
  .wrapper {
    padding: 3rem 1rem 0 1rem;
  }
  .welcome-block{
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  .welcome-block_text{
    padding: 0;
  }
  .welcome-block_text p{
    padding: .5rem .25rem;
  }
  h1 {
    font-size: 30px;
    margin: 0 0 1rem 1rem;
  }
  .upload {
    background: rgba(0, 156, 6, 1);
  }
  .delete {
    background: var(--vt-c-red-dark);
  }
}
</style>
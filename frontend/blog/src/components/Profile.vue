<template>
  <div class="profile">
    <div class="container">
      <div class="profile-container">
        <h1 class="mb-4">Cập nhật</h1>
        <form @submit.prevent="editProfile">
          <div class="image-user">
            <label for="file-upload" v-show="!imagePreview || imagePreview">
              <img
                :src="path + '/images/' + profilePic"
                v-if="!imagePreview"
                alt=""
              />
              <font-awesome-icon :icon="['fas', 'camera']" class="icon" />
              <img :src="imagePreview" v-if="imagePreview" alt="" />
              <input
                id="file-upload"
                type="file"
                @change="uploadImage"
                name="profilePic"
                accept=".png, .jpg, .jpeg"
                style="color: transparent; display: none"
              />
            </label>
          </div>
          <input type="text" placeholder="Tên người dùng" v-model="username" />

          <input type="text" placeholder="Email" v-model="email" />

          <input type="password" placeholder="Mật khẩu" v-model="password" />

          <!-- <div class="upload-image">
          <label for="file-upload" v-show="!imagePreview || imagePreview">
            <span
              class="select"
              v-show="!imagePreview || imagePreview"
              v-bind:style="{
                color: !imagePreview ? 'blue' : imagePreview ? '#fff' : '',
                display: !imagePreview ? 'block' : '',
              }"
              >{{ imagePreview ? 'Chọn ảnh khác' : 'Chọn ảnh' }}</span
            >

            <img :src="imagePreview" v-if="imagePreview" alt="" />
            <input
              id="file-upload"
              type="file"
              @change="uploadImage"
              name="profilePic"
              accept=".png, .jpg, .jpeg"
              style="color: transparent; display: none"
            />
          </label>
        </div> -->
          <button type="submit">Thay đổi</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      profilePic: '',
      imagePreview: '',
      path: 'http://localhost:5000',
    }
  },
  created() {
    axios
      .get('http://localhost:5000/users/' + localStorage.getItem('userid'))
      .then((response) => {
        this.username = response.data.username
        this.email = response.data.email
        this.profilePic = response.data.profilePic
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    editProfile() {
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('profilePic', this.profilePic)
      axios
        .put(
          'http://localhost:5000/users/' + localStorage.getItem('userid'),
          formData
        )
        .then((response) => {
          console.log(response)
          this.username = ''
          this.email = ''
          this.password = ''
          this.$router.push('/')
          window.location.href = '/'
        })
        .catch((error) => {
          console.log(error)
        })
    },

    uploadImage(event) {
      this.profilePic = event.target.files[0]
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imagePreview = reader.result
      }
    },
  },
}
</script>

<style scoped>
.profile {
  padding-top: 120px;
}
img {
  width: 100%;
  height: 100%;
}
.profile-container {
  height: 560px;
  width: 480px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.profile-container form {
  width: 100%;
  padding: 0 50px;
}

.image-user {
  text-align: center;
}

.image-user label {
  position: relative;
  cursor: pointer;
}

.image-user img {
  width: 85px;
  height: 85px;
  border-radius: 50%;
}

.image-user .icon {
  position: absolute;
  bottom: 0;
  left: 62px;
  background-color: #3a3b3c;
  border-radius: 50%;
  padding: 5px;
  color: #fff;
  z-index: 99;
}

.profile-container form input {
  display: flex;
  width: 100%;
  margin: 15px 0;
  outline: none;
  border: 1px solid #ced4da;
  padding: 12px 20px;
  background-color: #f8f9fa;
  border-radius: 2px;
}

.profile-container form input:focus {
  border: 1px solid #fc00ff;
}

.profile-container form button {
  display: flex;
  margin: 28px auto 0px;
  border-radius: 2px;
  padding: 5px 35px;
  background: rgb(17, 107, 143);
  border: none;
  color: #fff;
}

.upload-image {
  border: 2px dashed #41b883;
  transition: 0.3s ease all;
  height: 180px;
  margin: 15px 0;
}

.upload-image label {
  color: #000;
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-image label img {
  transition: 0.3s ease;
}

.select {
  position: absolute;
  font-size: 18px;
  z-index: 9999;
  display: none;
  transition: 0.3s ease;
}

.upload-image:hover .select {
  display: block;
}

.upload-image:hover img {
  filter: brightness(0.5);
}

.image-user label img {
  transition: 0.3s ease;
}

.image-user label:hover img {
  filter: brightness(0.5);
}

@media screen and (max-width: 468px) {
  .profile-container {
    width: 100%;
  }

  .profile-container form {
    padding: 0 10px;
  }
}
</style>

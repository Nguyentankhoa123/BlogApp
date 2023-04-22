<template>
  <div class="register login-register-page">
    <h1>Đăng ký</h1>
    <form @submit.prevent="register">
      <input
        type="text"
        placeholder="Tên người dùng"
        v-model="username"
        v-bind:class="{ 'is-invalid': errors.username }"
      />
      <div class="invalid-feedback" v-if="errors.username">
        {{ errors.username }}
      </div>
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        v-bind:class="{ 'is-invalid': errors.email }"
      />
      <div class="invalid-feedback" v-if="errors.email">
        {{ errors.email }}
      </div>
      <input
        type="password"
        placeholder="Mật khẩu"
        v-model="password"
        v-bind:class="{ 'is-invalid': errors.password }"
      />
      <div class="invalid-feedback" v-if="errors.password">
        {{ errors.password }}
      </div>
      <div class="upload-image">
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
            v-bind:class="{ 'is-invalid': errors.profilePic }"
            style="color: transparent; display: none"
          />
        </label>
      </div>
      <div class="invalid-feedback" v-if="errors.profilePic">
        {{ errors.profilePic }}
      </div>
      <button type="submit">Đăng ký</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      errors: {
        username: '',
        email: '',
        password: '',
        profilePic: '',
      },
      username: '',
      email: '',
      password: '',
      profilePic: '',
      imagePreview: '',
      isRegistered: false,
    }
  },

  methods: {
    validateEmail() {
      return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
    },
    async validate() {
      let isValid = true

      this.errors.username = ''
      this.errors.email = ''
      this.errors.password = ''
      this.errors.profilePic = ''

      if (!this.username) {
        this.errors.username = 'Tên người dùng không được để trống'
        isValid = false
      } else {
        const response = await axios.get('http://localhost:5000/users')
        const existingUsername = response.data

        for (let i = 0; i < existingUsername.length; i++) {
          if (existingUsername[i].username === this.username) {
            this.errors.username = 'Tên người dùng đã tồn tại'
            isValid = false
            break
          }
        }
      }

      if (!this.email) {
        this.errors.email = 'Email không được để trống'
        isValid = false
      } else if (this.validateEmail()) {
        this.errors.email = 'Email không hợp lệ'
        isValid = false
      } else {
        const response = await axios.get('http://localhost:5000/users')
        const existingEmail = response.data

        for (let i = 0; i < existingEmail.length; i++) {
          if (existingEmail[i].email === this.email) {
            this.errors.email = 'Email đã được sử dụng'
            isValid = false
            break
          }
        }
      }

      if (!this.password) {
        this.errors.password = 'Mật khẩu không được để trống'
        isValid = false
      }

      if (!this.profilePic) {
        this.errors.profilePic = 'Ảnh người dùng không được để trống'
        isValid = false
      }
      return isValid
    },
    register() {
      const isValid = this.validate()

      if (isValid) {
        const formData = new FormData()
        formData.append('username', this.username)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('profilePic', this.profilePic)

        axios
          .post('http://localhost:5000/auth/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log(response)
            localStorage.setItem('jwtToken', response.data.token)
            this.username = ''
            this.email = ''
            this.password = ''
            this.profilePic = ''
            this.imagePreview = ''
            alert('Đăng ký thành công')
            this.$router.push('/Login')
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
    clearImagePreview() {
      // this.imagePreview = null
      this.$refs.fileInput.value = ''
    },
    showSelect() {
      this.showSelect = true
    },
    hideSelect() {
      this.showSelect = false
    },
  },
}
</script>

<style scoped>
.is-invalid {
  border-color: red;
}

.is-invalid ~ .invalid-feedback {
  display: block;
}
img {
  width: 100%;
  height: 100%;
}
.register {
  height: 680px;
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

.register form {
  width: 100%;
  padding: 0 50px;
}

.register form input {
  display: flex;
  width: 100%;
  margin: 15px 0;
  outline: none;
  border: 1px solid #ced4da;
  padding: 12px 20px;
  background-color: #f8f9fa;
  border-radius: 2px;
}

.register form input:focus {
  border: 1px solid #fc00ff;
}

.register form button {
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
</style>

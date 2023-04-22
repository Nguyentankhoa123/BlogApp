<template>
  <div class="login login-register-page">
    <h1>Đăng nhập</h1>
    <form @submit.prevent="login">
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        v-bind:class="{ 'is-invalid': errors }"
      />
      <div class="invalid-feedback" v-if="errors">{{ errors }}</div>
      <input type="password" placeholder="Mật khẩu" v-model="password" />
      <button type="submit">Đăng nhập</button>
      <div style="text-align: center">
        <span>Nếu chưa có tài khoản? </span>
        <router-link :to="{ name: 'Register' }">Đăng Ký</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
// import { useUserName } from '../store/username'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errors: '',
    }
  },

  methods: {
    login() {
      axios
        .post('http://localhost:5000/auth/login', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response)
          // const usestore = useUserName()
          const userid = response.data.user._id
          const isLogin = response.data.u
          // const profilePic = response.data.user.profilePic
          // const username = response.data.user.username
          const jwtToken = response.data.token
          localStorage.setItem('jwtToken', jwtToken)
          localStorage.setItem('userid', userid)
          // localStorage.setItem('profilePic', profilePic)
          // localStorage.setItem('username', username)
          // usestore.setUsername(userid)
          alert('Đăng nhập thành công')
          this.$router.push('/')
          window.location.href = '/'
        })
        .catch((error) => {
          console.log(error)
          this.errors = 'Email hoặc mật khẩu không chính xác'
        })
    },
  },
  // created() {
  //   const usestore = useUserName()
  //   const storedUsername = localStorage.getItem('userid')
  //   // if (storedUsername) {
  //   //   usestore.setUsername(JSON.parse(storedUsername))
  //   // }
  // },
}
</script>

<style scoped>
.is-invalid {
  border-color: red;
}

.is-invalid ~ .invalid-feedback {
  display: block;
}

.login {
  height: 450px;
  width: 450px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.login form {
  width: 100%;
  padding: 0 50px;
}

.login form input {
  display: flex;
  width: 100%;
  margin: 15px 0;
  outline: none;
  border: 1px solid #ced4da;
  padding: 12px 20px;
  background-color: #f8f9fa;
  border-radius: 2px;
}

.login form input:focus {
  border: 1px solid #fc00ff;
}

.login form button {
  display: flex;
  margin: 15px auto;
  border-radius: 2px;
  padding: 5px 35px;
  background: rgb(17, 107, 143);
  border: none;
  color: #fff;
}
</style>

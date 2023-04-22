<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" to="/">Blog</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }"
            >Trang chủ</router-link
          >

          <router-link
            v-if="userid.username"
            class="link"
            :to="{ name: 'Post' }"
            >Tạo Blog</router-link
          >

          <router-link v-else class="link" :to="{ name: 'Login' }"
            >Đăng nhập/Đăng ký</router-link
          >
          <div
            v-if="userid.username"
            @click="toggleProfileMenu"
            class="profile"
            ref="profile"
          >
            <img
              :src="path + '/images/' + userid.profilePic"
              alt="Lỗi"
              class="profilePic"
            />
            <span>{{ userid.username }}</span>
            <div v-show="profileMenu" class="profile-menu">
              <div class="info">
                <router-link
                  class="option"
                  :to="{ name: 'BlogCard' }"
                  style="text-decoration: none"
                >
                  <font-awesome-icon :icon="['fas', 'user']" class="icon" />
                  <router-link :to="{ name: 'Profile' }">Thông tin</router-link>
                </router-link>
                <div class="option">
                  <font-awesome-icon :icon="['fas', 'sign-out']" class="icon" />
                  <p @click="logOut()">Đăng xuất</p>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </nav>

    <font-awesome-icon
      :icon="['fas', 'bars']"
      class="menu-icon"
      @click="toggleMobileNav"
      v-show="mobile"
    />

    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <div class="profile">
          <img
            v-if="userid.username"
            :src="path + '/images/' + userid.profilePic"
            alt="Lỗi"
            class="profilePic"
          />
          <span v-if="userid.username">{{ userid.username }}</span>
        </div>
        <router-link
          @click="toggleMobileNav()"
          mobileNav="false"
          class="link"
          :to="{ name: 'Home' }"
        >
          <font-awesome-icon :icon="['fas', 'house']" class="icon" />
          Trang chủ
        </router-link>
        <router-link
          v-if="userid.username"
          @click="toggleMobileNav()"
          mobileNav="false"
          class="link"
          :to="{ name: 'Post' }"
        >
          <font-awesome-icon :icon="['fas', 'pen']" class="icon" />
          Tạo Blog
        </router-link>
        <router-link
          v-else
          @click="toggleMobileNav()"
          mobileNav="false"
          class="link"
          :to="{ name: 'Login' }"
        >
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="icon" />
          Đăng nhập/Đăng ký
        </router-link>
        <div class="info">
          <router-link
            class="option"
            :to="{ name: 'Profile' }"
            style="text-decoration: none"
            @click="toggleMobileNav()"
            mobileNav="false"
          >
            <font-awesome-icon :icon="['fas', 'user']" class="icon" />
            <p>Thông tin</p>
          </router-link>
          <div class="option">
            <font-awesome-icon :icon="['fas', 'sign-out']" class="icon" />
            <p @click="logOut()">Đăng xuất</p>
          </div>
        </div>
      </ul>
    </transition>
  </header>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../store/user'
export default {
  name: 'Navigation',
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windownWidth: null,
      userid: [],
      path: 'http://localhost:5000',
    }
  },

  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()

    if (localStorage.getItem('userid') != null) {
      axios
        .get('http://localhost:5000/users/' + localStorage.getItem('userid'))
        .then((response) => {
          console.log(response.data)
          this.userid = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  methods: {
    checkScreen() {
      this.windownWidth = window.innerWidth
      if (this.windownWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },

    toggleProfileMenu() {
      this.profileMenu = !this.profileMenu
    },
    closeProfileMenu(event) {
      if (!this.$refs.profile.contains(event.target)) {
        this.profileMenu = false
      }
    },

    logOut() {
      localStorage.clear()
      this.$router.push('/')
      window.location.href = '/'
    },
  },
  mounted() {
    document.addEventListener('click', this.closeProfileMenu)
  },
}
</script>

<style scoped>
header {
  background-color: #fff;
  padding: 0 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}

.link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
}

.link:hover {
  color: #1eb8b8;
}

nav {
  display: flex;
  padding: 15px 0;
}

nav .branding {
  display: flex;
  align-items: center;
}

nav .branding .header {
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-decoration: none;
}

nav .nav-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}

nav .nav-links ul {
  margin-right: 32px;
  display: flex;
  align-items: center;
}

nav .nav-links ul .profile {
  color: #000;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}

nav .nav-links ul .profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

nav .nav-links ul .profile span {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

nav .nav-links ul .profile .profile-menu {
  position: absolute;
  top: 60px;
  right: 0;
  width: 180px;
  background-color: #303030;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.profile-menu .option {
  display: flex;
  color: #fff;
  align-items: center;
  margin: 15px 10px;
}

.profile-menu .option .icon {
  width: 18px;
  height: auto;
}

.profile-menu .option p {
  font-size: 14px;
  margin-left: 12px;
}

.profile-menu .option a {
  font-size: 14px;
  margin-left: 12px;
  color: #fff;
  text-decoration: none;
}

nav .nav-links ul .link {
  margin-right: 32px;
  text-decoration: none;
}

nav .nav-links ul .link:last-child {
  margin-right: 0;
}

header .menu-icon {
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 25px;
  height: 20px;
  width: auto;
}

header .mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #1d1b28;
  top: 0;
  left: 0;
}

header .mobile-nav .link {
  padding: 12px 0;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

header .mobile-nav .link .icon {
  margin-right: 12px;
}

header .mobile-nav-enter-active {
  transition: all 1s ease;
}
header .mobile-nav-leave-active {
  transition: all 1s ease;
}

header .mobile-nav-enter-from {
  transform: translateX(-250px);
}

header .mobile-nav-enter-to {
  transform: translateX(0);
}

header .mobile-nav-leave-to {
  transform: translateX(-250px);
}

header .mobile-nav .profile {
  display: flex;
  align-items: center;
}

header .mobile-nav .profile img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

header .mobile-nav .option {
  display: flex;
  align-items: center;
  padding: 12px 0;
  color: #fff;
}

header .mobile-nav .option .icon {
  margin-right: 12px;
}

header .mobile-nav .profile span {
  color: #fff;
  margin-left: 10px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profilePic {
  width: 50px;
  height: 50px;
}
</style>

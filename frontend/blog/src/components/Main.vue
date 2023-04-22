<template>
  <div
    class="main"
    v-bind:class="{ 'login-register-page': isLoginPageOrRegisterPage }"
  >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main',
  computed: {
    isLoginPageOrRegisterPage() {
      return this.$route.path === '/Login' || this.$route.path === '/Register'
    },
  },
}
</script>

<style>
.main {
  padding: 65px 0 130px 0;
  background-color: #f2f2f2;
  min-height: 100%;
}

.login-register-page {
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>

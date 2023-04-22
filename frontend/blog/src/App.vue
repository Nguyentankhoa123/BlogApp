<template>
  <div>
    <Navigation
      v-if="this.$route.path !== '/Login' && this.$route.path !== '/Register'"
    />
    <Main />
    <Footer
      v-if="this.$route.path !== '/Login' && this.$route.path !== '/Register'"
    />
  </div>
</template>

<script>
import Main from './components/Main.vue'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: { Navigation, Main, Footer },
}
</script>

<style></style>

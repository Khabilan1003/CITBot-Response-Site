<script>
import Home from './views/Home.vue';
import UpdateResponse from './Components/UpdateResponse.vue';
import Login from './views/Login.vue';
export default {
  name: "App",
  components: {
    Home,
    UpdateResponse,
    Login
  },
}
</script>

<template>
  <div class="app-container">
    <router-view> </router-view>
  </div>

</template>

<style scoped>
.app-container {
  height: 100vh;
}
</style>

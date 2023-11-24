<template>
  <div class="navigation-bar">
    <div class="navigation-title">CIT-Bot</div>
    <div class="logout" @click="logout">Logout</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavigationBar",
  methods: {
    logout() {
      axios
        .post(
          "http://34.125.178.209:3000/logout",
          {},
          { withCredentials: true }
        )
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
};
</script>

<style scoped>
.navigation-bar {
  user-select: none;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  cursor: default;
}

.navigation-title {
  display: inline-block;
  font-size: 25px;
  font-weight: 700;
  padding: 5px;
}

.logout {
  display: inline;
  padding: 10px;
}

.logout:hover {
  cursor: pointer;
  background-color: #665a5a;
}

.logout:active {
  background-color: black;
}
</style>

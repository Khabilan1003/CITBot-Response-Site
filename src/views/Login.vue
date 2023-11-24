<template>
  <div class="flex-container">
    <div class="login-container">
      <div class="login-title">Login</div>
      <div class="login-details">
        <label for="">Username</label>
        <input type="text" v-model="username" />
        <label for="" class="password-label">Password</label>
        <input type="password" v-model="password" />
        <div class="forget-password">Forget Password?</div>
      </div>
      <div class="button-container">
        <button @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.username === "") return;
      else if (this.password == "") return;
      else {
        try {
          await axios.post(
            "http://34.125.178.209:3000/login",
            { username: this.username, password: this.password },
            { withCredentials: true }
          );
          console.log(this.$cookies.get("token"));
          this.$router.push({ name: "Home" });
        } catch (error) {
          console.log("Login Error : ", error);
        }
      }
    },
  },
  async beforeCreate() {
    var token = this.$cookies.get("token");
    try {
      const res = await axios.post(
        "http://34.125.178.209:3000/check",
        {},
        { withCredentials: true }
      );
      this.$router.push({ name: "Home" });
    } catch (err) {
      console.log("Before Create : ", err);
    }
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 500px;
  height: 320px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.login-title {
  background-color: black;
  color: white;
  padding: 15px 0;
  margin: 0;
  text-align: center;
  font-size: 24px;
  font-weight: 900;
}

.login-details {
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
}

.login-details > label {
  margin-top: 10px;
  margin-bottom: 5px;
}

.login-details > input {
  padding: 5px;
  font-size: 16px;
}

.forget-password {
  color: rgb(0, 115, 255);
  cursor: pointer;
}

button {
  position: relative;
  top: 20px;
  width: 100%;
  padding: 5px;
  font-size: 18px;
  color: white;
  border: none;
  background-color: rgb(0, 42, 255);
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.02);
  background-color: rgba(0, 0, 255, 0.807);
}

.button-container {
  margin-top: 10px;
  padding: 0 20px;
}
</style>

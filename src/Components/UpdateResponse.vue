<template>
  <div class="transparent-container"></div>
  <div class="update-response-container">
    <div class="tag-name">
      {{ tagName }}
    </div>
    <div class="tag-response-container flex-container">
      <label class="tag-response-text">Tag Response</label>
      <textarea class="tag-response" type="text" v-model="tagResponseField" />
    </div>
    <div class="button-container">
      <button @click="closeDialog">Close</button>
      <button @click="updateResponseTemp(id, tagName, tagResponseField)">
        Update
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UpdateResponse",
  data() {
    return {
      tagResponseField: "",
    };
  },
  props: {
    id: Number,
    tagName: String,
    tagResponse: String,
  },
  methods: {
    ...mapActions(["updateResponse", "closeDialog"]),
    async updateResponseTemp(id, tagName, tagResponseField) {
      const result = await this.updateResponse({
        id,
        tagName,
        tagResponseField,
      });
      if (!result) {
        this.$router.push({ name: "Login" });
      }
    },
  },
  mounted() {
    this.tagResponseField = this.tagResponse;
  },
};
</script>

<style scoped>
.transparent-container {
  position: fixed;
  z-index: 100;
  height: 100%;
  width: 100%;
  background-color: rgba(217, 216, 216, 0.448);
}

.button-container {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.tag-name {
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 800;
}

button {
  border: none;
  margin: 5px;
  font-size: 16px;
  color: white;
  background-color: black;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.07);
}

.tag-response {
  height: 100px;
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

.tag-response-text {
  margin: 10px 0;
}

.tag-response-container {
  display: flex;
  flex-direction: column;
}

.update-response-container {
  background-color: white;
  position: fixed;
  padding: 10px;
  z-index: 100;
  height: 40%;
  width: 40%;
  top: 30%;
  left: 30%;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.081);
}

@media screen and (max-width: 768px) {
  .update-response-container {
    height: 40%;
    width: 60%;
    top: 30%;
    left: 20%;
  }
}
</style>

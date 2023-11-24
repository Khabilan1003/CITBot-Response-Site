import axios from "axios";

export default {
  state: () => ({
    originalTags: [],
    filteredTags: [],
    error: "",
    isDialog: false,
    dialogData: {
      id: 0,
      tagName: "",
      tagResponse: "",
    },
  }),
  getters: {
    originalTags: (state) => state.originalTags,
    filteredTags: (state) => state.filteredTags,
    error: (state) => state.error,
    isDialog: (state) => state.isDialog,
    dialogData: (state) => state.dialogData,
  },

  actions: {
    async fetchTags({ commit }) {
      const res = await axios.post(
        "http://34.125.178.209:3000/data",
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      try {
        if (res.data.login === true) {
          console.log(res.data);
          commit("add", res.data.responses);
          return true;
        } else {
          return false;
        }
      } catch (err) {
        commit("addError", "The Server is not working properly");
      }
    },
    filterTags({ commit }, filterText) {
      commit("filter", filterText);
    },
    async updateResponse({ commit }, data) {
      try {
        const res = await axios.patch(
          "http://34.125.178.209:3000/data",
          {
            id: data.id,
            tagName: data.tagName,
            tagResponse: data.tagResponseField,
          },
          { withCredentials: true }
        );
        console.log(res.data);
        if (res.data.login) {
          commit("updateResponse", data);
          commit("closeDialog");
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        commit("closeDialog");
      }
    },
    openDialog({ commit }, data) {
      commit("openDialog", data);
    },
    closeDialog({ commit }) {
      commit("closeDialog");
    },
  },

  mutations: {
    add: (state, data) => {
      state.originalTags = data;
      state.filteredTags = data;
    },
    filter: (state, filterText) => {
      state.filteredTags = state.originalTags.filter((element) => {
        var a = filterText.toLowerCase();
        var b = element.tag_name.toLowerCase();
        return b.includes(a);
      });
    },
    addError: (state, message) => {
      state.error = message;
    },
    updateResponse: (state, data) => {
      for (let i = 0; i < state.originalTags.length; i++) {
        if (state.originalTags[i].id === data.id) {
          state.originalTags[i].tag_response = data.tagResponseField;
          break;
        }
      }
      for (let i = 0; i < state.filteredTags.length; i++) {
        if (state.filteredTags[i].id === data.id) {
          state.filteredTags[i].tag_response = data.tagResponseField;
          break;
        }
      }
    },
    openDialog: (state, data) => {
      state.dialogData.id = data.id;
      state.dialogData.tagName = data.tagName;
      state.dialogData.tagResponse = data.tagResponse;
      state.isDialog = true;
    },
    closeDialog: (state) => {
      state.isDialog = false;
    },
  },
};

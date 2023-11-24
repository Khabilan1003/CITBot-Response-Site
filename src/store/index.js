import Vuex from "vuex";
import tags from "./modules/tags";

const store = new Vuex.Store({
  modules: {
    tags,
  },
});

export default store;

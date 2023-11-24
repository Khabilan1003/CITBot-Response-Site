import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  VueCookies  from 'vue-cookies'
import store from "./store";
import Vuex from 'vuex';

createApp(App).use(Vuex).use(store).use(router).use(VueCookies).mount('#app')

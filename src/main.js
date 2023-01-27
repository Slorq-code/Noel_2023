import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from "@/plugins/vuetify";
import "./styles.scss";
import "@/plugins/axios";
import AxiosInterceptor from "@/plugins/axios-interceptor";

import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, { 
  siteKey: '6Ld-9ywkAAAAAKs9F2F96jYVLR6yhw_A1ES9ns32',
  explicitRenderParameters: {
    size: 'invisible'
  }
})


new AxiosInterceptor();

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

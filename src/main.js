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
  siteKey: '6LeUtRMkAAAAANg5tKLCHt_Wfw646cij30KsWKlT',
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

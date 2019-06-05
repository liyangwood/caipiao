import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import language from './i18n';

import 'font-awesome/css/font-awesome.min.css';
import './style/index.scss';

Vue.use(VueI18n)
Vue.config.productionTip = false;

const dl = navigator.language === 'zh-CN' ? 'zh' : 'en';

const i18n = new VueI18n({
  locale: dl,
  messages : language
})

// temp change language method
window.changeLanguage = (lang='en')=>{
  i18n.locale = lang;
}


export const vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
import Vue from 'vue'

import App from './App.vue'
import router from './router' 
import store from './store'

import './assets/css/fonts.css'
import './assets/css/reset.css'

import VueTitle from './components/VueTitle'


Vue.component('vue-title', VueTitle)

Vue.config.productionTip = (process.env.NODE_ENV === 'development') ? false : true;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

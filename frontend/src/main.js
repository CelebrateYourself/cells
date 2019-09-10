import Vue from 'vue'

import App from './App.vue'
import router from './router' 
import store from './store'

import './assets/css/fonts.css'
import './assets/css/reset.css'

import VueLoading from './components/VueLoading'
import VueTitle from './components/VueTitle'


Vue.config.productionTip = (process.env.NODE_ENV === 'development') ? false : true;

Vue.component('vue-loading', VueLoading)
Vue.component('vue-title', VueTitle)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

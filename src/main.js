// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';

/* 开启debug模式 */
Vue.config.debug = true;

Vue.use(Router);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

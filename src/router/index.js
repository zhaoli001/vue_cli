import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import Goods from 'components/goods/goods';
import Satings from '../components/satings/satings';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/satings',
      name: 'satings',
      component: Satings
    }
  ]
});

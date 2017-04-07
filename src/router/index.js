import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import Goods from 'components/goods/goods';
import Satings from '../components/ratings/ratings';
import Seller from '../components/seller/seller';

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
      path: '/ratings',
      name: 'ratings',
      component: Satings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
});

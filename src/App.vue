<template>
  <div id="app">
   <v-header class="header"></v-header>
   <div class="section">
     <div class="nav">
         <span>
              <router-link to="/goods">商品</router-link>
         </span>
         <span>
              <router-link to="/ratings">评价</router-link>
         </span>
         <span>
            <router-link to="/seller">商家</router-link>
         </span>
     </div>
     <keep-alive>
      <router-view class="view" keep-alive></router-view>
     </keep-alive>
   </div>
  </div>
</template>

<script>
  import Head from 'components/header/header';
  export default {
    name: 'app',
    components: {
       'v-header': Head
    }
  };
</script>

<style lang="scss">
  @import "common/scss/mixin.scss";
  #app{
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
  }
  .nav{
    width: 100%;
    height: 50px;
    display:flex;
    @include border-1px(rgba(0,0,0,0.1));
    span{
      display:block;
      flex:1;
      text-align:center;
      line-height:50px;
      font-size:.18px;
    }
  }
  .router-link-active{
    color:red;
  }
</style>

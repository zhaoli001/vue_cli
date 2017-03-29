<template>
    <div class="contrulor">
        <div class="food-btn">
            <div v-show="food.count>0" @click.stop="removeCart($event)">－</div>
            <span v-show="food.count>0">{{food.count}}</span>
            <div @click.stop="addCart($event)">＋</div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Vue from 'vue';
    export default{
        props:{
            food:{
                type:Object
            }
        },
        methods:{
            addCart (event) {
                if(!event._constructed){
                    return;
                }
                if(!this.food.count){
                    Vue.set(this.food,"count",1);
                }else{
                    this.food.count++;
                }
            },
            removeCart(event){
               if(!event._constructed){
                   return;
               } 
               this.food.count--;
            }
        }
    };
</script>
<style type="text/css" lang="scss">
    .food-btn{
        position:absolute;
        bottom:0;
        right:0;
        div{
            font-size:24px;
            display:inline-block;
            color:rgb(147,153,159);
            width: 24px;
            height: 24px;
            border:1px solid rgb(0,160,220);
            border-radius:50%;
            line-height: 24px;
            text-align:center;
        }
        span{
          font-size:10px;
          width: 24px;
          line-height: 24px;
          color: rgb(147,153,159); 
        }
    }
</style>

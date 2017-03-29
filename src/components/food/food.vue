<template>
    <transition name="fadeLeft">
        <div class="particulars" v-show="pershow" ref="particulars">
            <div class='content'>
                <div class="image-header">
                    <img :src="food.image"/>
                    <div class="back" @click="hide">
                        返回
                    </div> 
                </div>
                <div class="food-inform">
                    <h1>{{food.name}}</h1>
                    <p>月售{{food.sellCount}}份 好评率{{food.rating}}%</p>
                    <div>
                        <span class="price">￥{{food.price}}</span>
                        <span v-if='food.oldPrice' class="oldprice">￥{{food.oldPrice}}</span>
                    </div>
                    <v-con :food="food"></v-con>
                    <div class="addShop" v-show="!food.count || food.count===0" @click="addFrist($event)">加入购物车</div>
                </div>
                <div class="qq" v-show="food.info"></div>
                <div class="intrudution" v-show="food.info">
                    <h2>商品介绍</h2>
                    <p>{{food.info}}</p>
                </div>
                <div class="qq"></div>
                <div class="evaluate">
                    <h2>商品评价</h2>
                    <v-rating :selectType="selectType" :onlyContent="onlyContent" :des="des" :ratings="food.ratings"></v-rating>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll';
import Vue from "vue";
import contrulor from "components/contrulor/contrulo";
import ratings from "components/ratingselect/ratingselect";

var POSITIVE = 0;
var NEGATIVE = 1;
var ALL = 2;

    export default{
        data () {
            return {
                pershow:false,
                selectType:ALL,
                onlyContent:true,
                des:{
                    all:"全部",
                    positive:"推荐",
                    negative:"吐槽"
                }
            }
        },
        props:{
            food:{
                type:Object
            }
        },
        computed:{

        },
        methods:{
            show () {
                this.pershow = true;
                this.selectType = ALL;
                this.onlyContent = true;
                if(this.food!=undefined){
                   this.pershow = true;
                   this.$nextTick(function(){
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.particulars,{
                                click:true
                            })
                        }else{
                            this.scroll.refresh();
                        }
                   })
                }
            },
            hide () {
                this.pershow = false;
            },
            addFrist (event) {
                if(!event._constructed){
                    return;
                }
                Vue.set(this.food,"count",1);
            }
        },
        components :{
            'v-con':contrulor,
            'v-rating':ratings
        }
    }
</script>
<style type="text/css" lang="scss">
   
    .particulars{
        width: 100%;
        position:fixed;
        top:0;
        left:0;
        bottom:46px;
        background:#fff;
        z-index:1;
        &.fadeLeft-enter-active,&.fadeLeft-leave-active {
          transition: all 1s;
        }
        &.fadeLeft-enter,&.fadeLeft-leave-active {
          -webkit-transform: translateX(100%);
             -moz-transform: translateX(100%);
              -ms-transform: translateX(100%);
               -o-transform: translateX(100%);
                  transform: translateX(100%);
            opacity:0;
        }
        .image-header{
            width: 100%;
            position:relative;
            height:0;
            padding-top:100%;
            img{
                position: absolute;
                top:0;
                left:0;
                width: 100%;
                height: 100%;
            }
            .back{
                position:absolute;
                top:10px;
                left:10px;
                font-size:14px;
                text-align:center;
                line-height:20px;
                color:#000;
                width: 60px;
                height: 20px;
                border-radius:25%;
                background:#fff;
            }
        }
        .food-inform{
            padding:18px;
            position:relative;
            h1{
                width: 100%;
                font-size:14px;
                font-weight:700;
                color:rgb(7,17,27);
                line-height:14px;
                margin-bottom:8px;
            }
            p{
                font-size:10px;
                color:rgb(147,153,159);
                line-height:10px;
                margin-bottom:18px;
            }
            .price{
                font-size:14px;
                font-weight:700;
                color:rgb(240,20,20);
                line-height:24px;
            }
            .oldprice{
                font-size:10px;
                font-weight:700;
                color:rgb(147,153,159);
                line-height:24px;
                text-decoration:line-throught;
            }
            .addShop{
                position:absolute;
                width: 74px;
                height:24px;
                background:rgb(0,160,220);
                border-radius:12px;
                font-size:10px;
                color:#fff;
                line-height:24px;
                text-align:center;
                right:18px;
                bottom:18px;
            }
        }
        .intrudution{
            padding:18px;
            h2{
                width: 100%;
                font-size:14px;
                color:rgb(7,17,27);
                line-height:14px;
                margin-bottom:8px;
            }
            p{
                font-size:12px;
                color:rgb(77,85,93);
                line-height:24px;
            }
        }
        .evaluate{
            padding:18px;
            h2{
                width: 100%;
                font-size:14px;
                color:rgb(7,17,27);
                line-height:14px;
                margin-bottom:8px;
            }
        }
        .qq{
            width: 100%;
            height: 16px;
            border-top:1px solid rgba(7,17,27,0.1);
            border-bottom:1px solid rgba(7,17,27,0.1);
            background:#f3f5f7;
        }
    }
</style>

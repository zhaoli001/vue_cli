<template>
    <transition name="fadeLeft">
        <div class="particulars" v-show="pershow" ref="particulars">
            <div class='content'>
                <div class="image-header">
                    <img :src="food.image"/>
                    <div class="back" @click="hide">
                        BACK
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
                    <v-rating :selectType="selectType" :onlyContent="onlyContent" :des="des" :ratings="food.ratings"  v-on:ratingselect-select="ratingselectSelect" v-on:ratingselect-content="ratingselectContent"></v-rating>
                    <div class="ratingsWrapper">
                        <ul v-show="food.ratings">
                            <li  v-for="ratings in food.ratings" v-show="needShow(ratings.rateType,ratings.text)" class="ratingList">
                                <div class="ratings-content">
                                    <p class="ratingTime">{{ratings.rateTime | fomatDate}}</p>
                                    <p class="ratingText"><span :class="{'on':ratings.rateType===0,'on':ratings.rateType===1}"></span>{{ratings.text}}</p>
                                </div>
                                <div class="ratings-image">
                                    <span>{{ratings.username}}</span>
                                    <img :src="ratings.avatar" alt=""/>
                                </div>
                            </li>
                        </ul>
                        <div class="noratings" v-show="!food.ratings || food.ratings.length===0">暂无评论</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll';
import Vue from "vue";
import {fomatDateFn} from "common/js/date.js";
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
                onlyContent:false,
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
                this.pershow = false;
                this.selectType = ALL;
                this.onlyContent = false;
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
                this.$emit("cart.add",event.target);
                Vue.set(this.food,"count",1);
            },
            needShow (type,text){
                if(this.onlyContent && !text){
                    return false;
                }

                if(this.selectType === ALL){
                    return true;
                }else{
                    return type === this.selectType;
                }
            },
            ratingselectSelect (type){
                this.selectType = type;
                this.$nextTick(function(){
                    this.scroll.refresh();
                })
            },
            ratingselectContent (onlyContent) {
                this.onlyContent = onlyContent;
                this.$nextTick(function(){
                    this.scroll.refresh();
                })
            }
        },
        filters:{
            fomatDate (time) {
                var date = new Date(time);
                return fomatDateFn(date);
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
    .ratingsWrapper{
        .ratingList{
            border-bottom:1px solid #ccc;
            padding:16px 0;
            position:relative;
            .ratings-image{
                position:absolute;
                right:0;
                top:16px;
                span{
                    display:inline-block;
                }
                img{
                  float:right;
                  width:12px;
                  height:12px;
                  margin-left:6px;
                  border-radius:50%;
                  overflow:hidden;
                }

            }
            .ratings-content{
                .ratingTime{
                    font-size:10px;
                    color:rgb(147,153,159);
                    line-height:12px;
                }
                .ratingText{
                    span{
                        display:inline-block;
                        width:15px;
                        height:15px;
                        border-radius:50%;
                        background:rgb(147,153,159);
                        margin-right:5px;
                        &.on{
                            background:rgb(0,160,220);
                        }
                    }
                    font-size:12px;
                    color:rgb(7,17,27);
                    line-height:16px;
                }
            }
        }
        .noratings{
            padding:10px;
            line-height:23px;
            color:rgb(147,153,159);
        }
    }
</style>

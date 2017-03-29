<template>
    <div class="shopcar">
        <div class="wrapper-connent" @click="toggleList">
            <div class="wrapper-left">
                <div class="wrapper-logo">
                    <div class="logo">
                        <span class="shop" :class="{'hightLogo':tatolCount>0}">购物车</span>
                        <span class="num" v-show="tatolCount>0">{{tatolCount}}</span>
                    </div>
                </div>
                <div class="wrapper-price" :class="{'hightPrice':tatolCount>0}">￥<span>{{tatolPrice}}</span></div>
                <div class="wrapper-text">另需配送费{{seller.deliveryPrice}}元</div>
            </div>
            <div class="wrapper-right" :class="payClass" @click.stop='pay'>
                <button class="btn">{{Payfor}}</button>
            </div>
        </div>
        <transition name="slidetoggle">
            <div class="shopshop" v-show="listShow">
                <div class="dialog">
                    <div class="shoptitle clearfix">
                        <h1>购物车</h1>
                        <span @click="emptyFn()">清空</span>
                    </div>
                    <div class="shop-content" ref="shopconent">
                        <ul>
                            <li class="shoplist" v-for="food in selectedFoods">
                                <span class="name">{{food.name}}</span>
                                <span class="price">￥{{food.price*food.count}}</span>
                                <v-con :food="food"></v-con>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll';
import contrulor from "components/contrulor/contrulo";
    export default{
        data () {
            return {
                seller:{
                    type:Object
                },
                foodcar:true
            }
        },
        props:{
            selectedFoods:{
                type:Array,
                default :function () {
                    return [];
                }
            }
        },
        created () {
            this.$http.get('/static/data.json').then(function(res){
                this.seller = res.body.seller;
            },function(){
                console.log("错误！")
            })
        },
        computed:{
            tatolPrice () {
                var Price = 0;
                this.selectedFoods.forEach(function(food,index){
                    Price += food.price*food.count;
                })
                return Price;
            },
            tatolCount () {
                var count = 0;
                this.selectedFoods.forEach(function(food){
                    count+=food.count;
                })
                return count;
            },
            Payfor () {
                if(this.tatolPrice==0){
                    return "￥"+this.seller.minPrice+"元起结算";
                }else if(this.tatolPrice<this.seller.minPrice){
                    return "还差"+(this.seller.minPrice-this.tatolPrice)+"元结算";
                }else{
                    return "去结算";
                }
            },
            payClass () {
                if(this.tatolPrice<this.seller.minPrice){
                    return "no-enough";
                }else{
                    return "enough";
                }
            },
            listShow () {
                if(!this.tatolCount){
                    this.foodcar = true;
                    return false;
                }
                var show = !this.foodcar;
                    if(show){
                        if(!this.showlist){
                           this.$nextTick(function(){
                              this.showlist = new BScroll(this.$refs.shopconent, {
                                  click:true
                              }) 
                           }) 
                       }else{
                            this.showlist.refresh();
                       }
                        
                    }
                return show;
            }
        },
        methods: {
            toggleList () {
                console.log(!this.tatolCount)
                if(!this.tatolCount){
                    return;
                }
                this.foodcar=!this.foodcar;
            },
            emptyFn () {
                this.selectedFoods.forEach(function(food){
                    food.count=0;
                })
            },
            pay () {
                if(this.tatolPrice<this.seller.minPrice){
                    return;
                }
                alert("需结算"+this.tatolPrice+"元");
            }
        },
        components:{
            'v-con':contrulor
        }
    }
</script>
<style type="text/css" lang='scss'>
    .shopcar{
        position:fixed;
        bottom:0;
        left:0;
        width: 100%;
        z-index:9;
        .wrapper-connent{
           display:flex;
           flex-deraction:column;
           background:#141d27;
        }
        .wrapper-left{
           flex:1;
           padding-left:18px;
           display:flex;
           flex-deraction:column;
           position:relative;
           .logo{
            width:46px;
            height:46px;
            border-radius:50%;
            position:absolute;
            z-index:999999;
            bottom:8px;
            background:#141d27;
            color:rgba(255,255,255,0.4);
            font-weight:800; 
            font-size:12px;
            line-height:46px;
            text-align:center;
            .shop{
               &.hightLogo{
                    color:rgb(0,160,220); 
                } 
            }
            
            .num{
                 position:absolute;
                 top:-15px;
                 right:50%;
                 color:red;
            }
           }
           .wrapper-price{
                line-height:46px;
                color:rgba(255,255,255,0.4);
                font-weight:800; 
                font-size:16px;
                margin-left:64px;
                z-index:9999;
                &.hightPrice{
                    color:#fff;
                }
           }  
           .wrapper-text{
                line-height:46px;
                color:rgba(255,255,255,0.4);
                font-size:16px;
                margin-left:24px;
                z-index:9999;
           }
        }
        .wrapper-right{
            width: 105px;
            height: 100%;
            z-index:999;
            background-color:rgba(0,0,0,0.2);
            line-height:46px;
            text-align:center;
            .btn{
               color:rgba(255,255,255,0.4);
               font-weight:800; 
               font-size:12px;
            }
            &.no-enough{
                .btn{
                    color:#fff;
                }
            }
            &.enough{
                background:#00b43c;
                .btn{
                    color:#fff;
                }
            }
        }
        .shopshop{
            position:fixed;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,0.7);
            z-index:10;
            &.slidetoggle-enter-active,&.slidetoggle-leave-active {
              transition: all .5s;
            }
            &.slidetoggle-enter,&.slidetoggle-leave-active {
              -webkit-transform: translateY(100%);
                 -moz-transform: translateY(100%);
                  -ms-transform: translateY(100%);
                   -o-transform: translateY(100%);
                      transform: translateY(100%);
                opacity:0;
            }
        }
        .dialog{
            position:absolute;
            left:0;
            bottom:46px;
            background:#fff;
            width: 100%;
            .shoptitle{
                height:40px;
                line-height:40px;
                width: 100%;
                background:#f3f5f7;
                padding:0 18px;
                h1{
                    display:inline-block;
                    float:left;
                    font-size:14px;
                    color:rgb(7,17,27);
                }
                span{
                    float:right;
                    font-size:14px;
                    color:rgb(0,160,220);
                }
            }
            .shop-content{
                width: 100%;
                max-height:310px;
                padding:0 18px;
                overflow:hidden;
                li{
                    height: 48px;
                    border-bottom:1px solid rgba(7,17,27,0.1);
                    position:relative;
                    .name{
                        float:left;
                        line-height:48px;
                        font-size:14px;
                        color:rgb(7,17,27);
                    }
                    .price{
                        float:right;
                        margin-right:100px;
                        line-height:48px;
                        font-size:14px;
                        color:rgb(240,20,20);
                    }
                }
            }
            
        }
    }
</style>

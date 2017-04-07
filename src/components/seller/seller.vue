<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="seller-warpper">
                <div class="seller-top">
                    <p class="seller-name">{{seller.name}}</p>
                    <p class="seller-star">
                       <v-star :size='36' :score="seller.score"></v-star>
                       <span>({{seller.sellCount}}) 月售{{seller.ratingCount}}</span>
                    </p>
                    <div class="seller-right" @click="toggleFavorite($event)">
                        <span :class="{'on':favorite}">❤</span>{{favoriteText}}
                    </div>
                </div>
                <div class="seller-price">
                    <div class="seller-start">
                        <p>起送价</p>
                        <p>{{seller.minPrice}}元</p>
                    </div>
                    <div class="seller-com">
                        <p>商家配送</p>
                        <p>{{seller.deliveryPrice}}元</p>
                    </div>
                    <div class="seller-jun">
                        <p>平均配送时间</p>
                        <p>{{seller.deliveryTime}}元</p>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="seller-bulletin">
                <p class="bulletin-title">公告与活动</p>
                <p class="bulletin-text">{{seller.bulletin}}</p>
            </div>
            <div class="seller-list">
                <ul class="supports">
                    <li v-for="supports in seller.supports"  class="supports-item">
                       <span class="icon" :class="classMap[supports.type]"></span>
                       <span class="text">{{supports.description}}</span> 
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="image">
                <p>商家实景</p>
                <div class="imageBox" ref="imageBox">
                    <div class="image-list" ref="pic">
                      <span v-for="pics in seller.pics">
                          <img :src="pics" alt="" />
                      </span>  
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="seller-infom">
                <p>商家信息</p>
                <ul>
                   <li v-for="infos in seller.infos">
                       {{infos}}
                   </li> 
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Bscroll from "better-scroll";
import Star from "components/star/star";
    export default {
        data () {
            return {
                seller:Object,
                favorite:false
            }
        },
        created(){
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
            this.$http.get("/static/data.json").then(function(res){
                this.seller = res.body.seller;
                this.$nextTick(function(){
                    this.scroll = new Bscroll(this.$refs.seller,{
                        click:true
                    })
                })
                var picW = 120;
                var margin = 6;
                this.$refs.pic.style.width = (picW+margin)*this.seller.pics.length+"px";
                this.picScroll = new Bscroll(this.$refs.imageBox,{
                    scrollX:true,
                })
            })
        },
        computed:{
            favoriteText () {
                return this.favorite ? "已收藏" : "未收藏";
            }
        },
        methods:{
            toggleFavorite (event) {
                if (!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
            }
        },
        components:{
            "v-star":Star
        }
    };
</script>
<style type="text/css" lang="scss">
@import "../../common/scss/mixin.scss";
    .seller{
        width: 100%;
        position:absolute;
        top:184px;
        left:0;
        bottom:0;
        overflow:hidden;
        .seller-warpper{
            padding:18px;
        }
        .seller-top{
            border-bottom:1px solid rgba(7,17,27,0.1);
            position:relative;
            .seller-name{
                font-size:14px;
                color:rgb(7,17,27);
                line-height:14px;
                margin-bottom:8px;
            }
            .star{
                display:inline-block;
                text-align:left;
                margin:0;
                width:132px;
                vertical-align:top;
            }
            .seller-star{
                font-size:10px;
                color:rgb(77,85,90);
                line-height:18px;
                margin-bottom:18px;
            }
            .seller-right{
                position:absolute;
                top:0;
                right:0;
                text-align:center;
                span{
                    display:block;
                    color:#d4d6d9;
                    &.on{
                        color:red;
                    }
                }

            }
        }
        .seller-price{
            padding:18px 0;
            height:50px;
            div{
                width: 33.3%;
                float:left;
                text-align:center;
                vertical-align:middle;
                p:nth-child(1){
                    font-size:10px;
                    color:rgb(147,153,159);
                    line-height:10px;
                    margin-bottom:4px;
                }
                p:nth-child(2){
                    font-size:24px;
                    color:rgb(7,17,27);
                    line-height:24px;
                }
            }
            div:nth-child(2){
                border-left:1px solid rgba(7,17,27,0.1);
                border-right:1px solid rgba(7,17,27,0.1);
            }
        }
        .line{
            width: 100%;
            height: 16px;
            border-top:1px solid rgba(7,17,27,0.1);
            border-bottom:1px solid rgba(7,17,27,0.1);
            background:#f3f5f7;
        }
        .seller-bulletin{
           padding:18px;
           .bulletin-title{
                font-size:24px;
                color:rgb(7,17,27);
                line-height:24px;
           } 
           .bulletin-text{
                padding:8px 12px 18px 12px;
                font-size:12px;
                color:rgb(240,20,20);
                line-height:24px;
                border-bottom:1px solid rgba(7,17,27,0.1);
           } 
        }
        .seller-list{
           padding:0 18px;
           li{
            padding:16px 0;
            border-bottom:1px solid rgba(7,17,27,0.1);
           }
            .supports{
              .icon{
                display:inline-block;
                vertical-align:top;
                width: 16px;
                height: 16px;
                margin-right:4px; 
                background-size:16px 16px;
                background-repeat:no-repeat;
                &.decrease{
                  @include bg-image('../../assets/img/decrease_1');
                }
                &.discount{
                  @include bg-image('../../assets/img/discount_1');
                }
                &.guarantee{
                  @include bg-image('../../assets/img/guarantee_1');
                }
                &.invoice{
                  @include bg-image('../../assets/img/invoice_1');
                }
                &.special{
                  @include bg-image('../../assets/img/special_1');
                }
              }
              .text{
                line-height:16px;
                font-size:10px;
              }
            }
        }
        .image{
            p{
               font-size:24px;
               color:rgb(7,17,27);
               line-height:24px;
               margin-bottom:12px; 
            }
            padding:18px;
            .imageBox{
                width: 100%;
                white-space:nowrap;
                overflow:hidden;
                .image-list{
                    font-size:0;
                    span{
                        display:inline-block;
                        width: 120px;
                        height: 90px;
                        overflow:hidden;
                        margin-right:6px;
                    }
                }
            }
        }
        .seller-infom{
            padding:18px;
            p{
               font-size:24px;
               color:rgb(7,17,27);
               line-height:24px;
               margin-bottom:12px; 
            }
            li{
                border-top:1px solid rgba(7,17,27,0.1);
                padding:16px 12px;
                font-size:12px;
                color:rgb(7,17,27);
                line-height:16px;
            }
        }
        
    }  
</style>

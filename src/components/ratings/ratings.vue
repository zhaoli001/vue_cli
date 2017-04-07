<template>
    <div class="ratings" ref="ratingswarpper"   >
        <div class="ratings-warpper">
            <div class="overview">
                <div class="left">
                    <p class="gade">{{seller.score}}</p>
                    <p class="text">综合评分</p>
                    <p class="sideHight">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="right">
                    <p>
                        <span class="headTitle">服务态度</span>
                        <v-star :size="36" :score="seller.serviceScore"></v-star>
                        <span class="stroe">{{seller.serviceScore}}</span>
                    </p>
                    <p>
                        <span class="headTitle">服务态度</span>
                        <v-star :size="36" :score="seller.foodScore"></v-star>
                        <span class="stroe">{{seller.foodScore}}</span>
                    </p>
                    <p>
                        <span class="headTitle">送达时间</span>
                        <span class="stroe">{{seller.ratingCount}}分钟</span>
                    </p>
                </div>
            </div>
            <div class="Hight"></div>
            <div class="rating-content">
               <v-rating :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"  v-on:ratingselect-select="ratingselectSelect" v-on:ratingselect-content="ratingselectContent"></v-rating> 
                <div class="content">
                    <ul>
                        <li v-for="rating in ratings" class="rating-list" v-show="needShow(rating.rateType,rating.text)">
                            <div class="image">
                                <img :src="rating.avatar" alt="" />
                            </div>
                            <div class="rating-text">
                                <p class="rating-name">{{rating.username}}</p>
                                <p><v-star :size="24" :score="rating.score"></v-star><span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟内送达</span></p>
                                <p class="text">{{rating.text}}</p>
                                <p v-show="rating.recommend && rating.recommend.length" class="recommend">
                                    <b :class="{'on':rating.rateType===0}"></b><span v-for="recommend in rating.recommend">{{recommend}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div> 
</template>
<script type="text/javascript">
    import Bscroll from "better-scroll";
    import Star from "components/star/star";
    import Rating from "components/ratingselect/ratingselect";

    var ALL=2;

    export default{
        data () {
            return {
              seller:{
                  type:Object,
                  default:null
              },
              ratings:[],
              selectType: ALL,
              onlyContent: false 
            }
        },
        created () {
            this.$http.get("/static/data.json").then(function(res){
                this.seller = res.body.seller;
                this.ratings = res.body.ratings;
                this.$nextTick(function(){
                    this.scroll = new Bscroll(this.$refs.ratingswarpper,{
                        click:true
                    })
                })
            })
        },
        methods: {
          needShow(type, text) {
            if (this.onlyContent && !text) {
              return false;
            }
            if (this.selectType === ALL) {
              return true;
            } else {
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
        components:{
            'v-star':Star,
            'v-rating':Rating
        }
    };
</script>
<style type="text/css" lang="scss">
    .ratings{
        width:100%;
        position:absolute;
        top:184px;
        bottom:0;
        left:0;
        overflow:hidden;
        .overview{
            width: 100%;
            display:flex;
            padding:18px 24px;
            .left{
                width:109.5px;
                border-right:1px solid rgba(7,17,27,0.2);
                text-align:center;
                .gade{
                  font-size:24px;
                  color:rgb(255,153,0);
                  line-height:28px;  
                }
                .text{
                    font-size:12px;
                    color:rgb(7,17,27);
                    line-height:18px;
                }
                .sideHight{
                    font-size:10px;
                    color:rgba(7,17,27,0.7);
                    line-height:10px;
                }
            }
            .right{
                flex:1;
                padding-left:5px;
                p:nth-child(2){
                    margin:8px 0;
                }
                .headTitle{
                    font-size:12px;
                    color:rgb(7,17,27);
                    line-height:18px;
                    margin-right:3px;
                }
                .star{
                    display:inline-block;
                    margin:0 2px;
                    vertical-align:top;
                    width:124px;
                }
            }

        }
        .Hight{
            width: 100%;
            height: 16px;
            border-top:1px solid rgba(7,17,27,0.1);
            border-bottom:1px solid rgba(7,17,27,0.1);
            background:#f3f5f7;
        }
        .rating-content{
            padding:18px;
        }
        .rating-list{
            padding:18px 0;
            border-bottom:1px solid rgba(7,17,27,0.2);
            display:flex;
            .image{
                width: 28px;
                margin-right:12px;
                img{
                    height:28px;
                    border-radius:50%;
                    overflow:hidden;
                }
            }
            .rating-text{
                flex:1;
                .rating-name{
                    font-size:10px;
                    color:rgb(7,17,27);
                    line-height:12px;
                    margin-bottom:4px;
                }
                .star{
                    display:inline-block;
                    margin:0 2px;
                    vertical-align:top;
                    width:64px;
                }
                .deliveryTime{
                    font-size:10px;
                    color:rgb(147,153,159);
                    line-height:12px;
                }
                .text{
                    font-size:12px;
                    color:rgb(7,17,27);
                    line-height:18px;
                    margin:6px 0 8px 0;
                }
                .recommend{
                    b{
                        display:inline-block;
                        width: 10px;
                        height:10px;
                        border-radius:50%;
                        overflow:hidden;
                        background:#ccc;
                        &.on{
                            background:red;
                        }
                    }
                    span{
                        display:inline-block;
                        border:1px solid rgba(7,17,27,0.1);
                        font-size:9px;
                        color:rgb(147,153,159);
                        line-height:16px;
                        margin:0 4px;
                    }
                }
            }
        }
        
    }
</style>


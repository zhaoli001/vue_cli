<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentScroll===index}" @click="selected(index,$event)">
                    <span class="text border-1px">
                        <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="foods-list foods-list-hooks">
                    <h1>{{item.name}}</h1>
                    <ul v-if="item.foods">
                        <li v-for="food in item.foods" class="foods-item" @click="selectfoods(food,$event)">
                            <div class="food-img">
                                <img :src="food.icon"/>
                            </div>
                            <div class="food-des">
                                <h2>{{food.name}}</h2>
                                <p class="food-des-text" v-if="food.description">{{food.description}}</p>
                                <p class="food-sell"><span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span></p>
                                <p class="food-price"><span>￥{{food.price}}</span><span v-if="food.oldPrice">￥{{food.oldPrice}}</span></p>
                            </div>
                            <v-con :food="food"></v-con>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <v-shop :selected-foods="selectedFoods"></v-shop>
        <v-food :food="selectfood" ref="food"></v-food>
    </div>
</template>
<script type="text/javascript">
    import BScroll from 'better-scroll';
    import shopcar from 'components/shopcar/shopcar';
    import contrulor from "components/contrulor/contrulo";
    import food from "components/food/food";
    export default {
        data () {
            return {
                goods: {
                    type:Object
                },
                seller: {
                    type:Object
                },
                listHeight: [],
                scrollY: 0,
                selectfood:{}
            };
        },
        computed: {
            currentScroll:function () {
                for(let i=0; i < this.listHeight.length; i++){
                    var height1 = this.listHeight[i];
                    var height2 = this.listHeight[i + 1];
                    if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                        return i;
                    }
                }
                return 0;
            },
            selectedFoods:function(){
                var foods = [];
                if(this.goods.length!=undefined){
                   this.goods.forEach(function(good){
                       good.foods.forEach(function(food){
                           if(food.count){
                               foods.push(food)
                           }
                       })
                   }) 
                  return foods; 
                }
                
            }
        },
        created () {
            var that = this;
            that.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
            that.$http.get('/static/data.json').then(function (response) {
                that.goods = response.body.goods;
                that.seller = response.body.seller;
                that.$nextTick(function () {
                    that._initScroll();
                    that._ScrollHeight();
                });
            }, function () {
                console.log("错误");
            });
        },
        methods: {
            selected (index, event) {
                if(!event._constructed){
                    return;
                }
                var foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hooks');
                var el = foodList[index];
                this.foodsScroll.scrollToElement(el,300);
            },
            selectfoods (food,event) {
                if(!event._constructed){
                    return;
                }
                this.selectfood = food;
                //调用子组件的方法
                this.$refs.food.show();
            },
            _initScroll () {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                });
                //better-scroll声明的scroll事件
                var that = this;
                this.foodsScroll.on('scroll',function(pos){
                    that.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _ScrollHeight () {
                var foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hooks');
                var Height = 0;
                this.listHeight.push(Height);
                for(let i=0; i<foodList.length; i++){
                    var item = foodList[i];
                    var clientHeight = item.clientHeight;
                        Height += clientHeight;
                        this.listHeight.push(Height);
                }
            }
        },
        components: {
            'v-shop':shopcar,
            'v-con':contrulor,
            'v-food':food
        }
    };
</script>
<style type="text/css" lang='scss'>
@import "../../common/scss/mixin.scss";
    .goods{
        position:absolute;
        top:184px;
        width: 100%;
        bottom:46px;
        overflow:hidden;
        display:flex;
        .menu-wrapper{
            flex:0 0 80px;
            width:80px;
            background:#f3f5f7;
            .menu-item{
                display:table;
                height: 54px;
                width: 56px;
                margin:0 12px;
                line-height:14px;
                &.current{
                    color:red;
                }
                .icon{
                  display:inline-block;
                  vertical-align:top;
                  width: 12px;
                  height: 12px;
                  margin-right:2px; 
                  background-size:12px 12px;
                  background-repeat:no-repeat;
                  &.decrease{
                    @include bg-image('../../assets/img/decrease_3');
                  }
                  &.discount{
                    @include bg-image('../../assets/img/discount_3');
                  }
                  &.guarantee{
                    @include bg-image('../../assets/img/guarantee_3');
                  }
                  &.invoice{
                    @include bg-image('../../assets/img/invoice_3');
                  }
                  &.special{
                    @include bg-image('../../assets/img/special_3');
                  }
                }
                .text{
                    display:table-cell;
                    width: 56px;
                    vertical-align:middle;
                    font-size:12px;
                    @include border-1px(rgba(7,17,27,0.1));
                }
            }
        }
        .foods-wrapper{
            flex:1;
            .foods-list{
                width: 100%;
                h1{
                    border-left:3px solid #ddd;
                    height: 26px;
                    background:#f3f5f7;
                    padding-left:14px;
                    font-size:12px;
                    color:rgb(147,153,159);
                    line-height: 26px;
                }
                .foods-item{
                    margin:18px;
                    display:flex;
                    position: relative;
                    @include border-1px(rgba(7,17,27,0.1));
                    .food-img{
                        width: 57px;
                        height: 57px;
                        margin-right:10px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .food-des{
                        flex:1;
                        h2{
                            font-size:14px;
                            color:rgb(7,17,27);
                            line-height: 14px;
                            padding:4px 0;
                        }
                        .food-des-text{
                            font-size:10px;
                            color:rgb(147,153,159);
                            line-height:10px;
                            padding:4px 0;
                        }
                        .food-sell{
                            font-size:10px;
                            color:rgb(147,153,159);
                            line-height:10px;
                            padding:4px 0;
                            span{
                                margin-right:12px;
                            }
                        }
                        .food-price{
                            padding:4px 0;
                            span:nth-child(1){
                               font-size:14px;
                               color:red;
                               font-weight:800;
                               line-height:24px;
                               margin-right:8px; 
                            }
                            span:nth-child(2){
                               font-size:10px;
                               color:rgb(147,153,159);
                               line-height:24px;
                               margin-right:8px; 
                            }
                        }
                    }
                }
            }
        }
    }

</style>

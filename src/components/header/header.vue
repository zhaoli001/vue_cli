<template>
    <div class="header">
        <div class="header-top">
          <div class="header-connent">
              <div class="header-img">
                <img :src="allList.avatar" width='64' height="64" />
              </div>
            </div>
            <div class="header-bulletin">
                <div class="header-title">
                  <span class="brand"></span>
                  <span class="name">{{allList.name}}</span>
                </div>
                <div class="header-description">
                  {{allList.description}}/{{allList.deliveryTime}}分钟送达
                </div>
                <div v-if="allList.supports" class="supports">
                  <span class="icon" :class="classMap[allList.supports[0].type]"></span>
                  <span class="text">{{allList.supports[0].description}}</span>
                </div>
            </div>
            <div class="suport" v-if="allList.supports" @click="showDetail">
              <span class="list">{{allList.supports.length}}个</span>
              <i class="inline">></i>
            </div>
        </div>
       <div class="bulletin-wrapper">
         <span class="bulletin-title"></span><span class="bulletin-text">{{allList.bulletin}}</span>
         <i class="arrow-right">></i>
       </div> 
        <div class="background">
          <img :src="allList.avatar" alt="" width='100%' height="100%" />
        </div>
        <transition name="fade">
          <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
              <div class="detail-main">
                <h1 class="name">{{allList.name}}</h1>
                <v-star :size="48" :score="allList.score"></v-star>
                <div class="line-box">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
                </div>
                <ul v-if="allList.supports" class="supports">
                  <li v-for="item in allList.supports" class="supports-item">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{item.description}}</span>
                  </li>
                </ul>

                <div class="line-box">
                  <div class="line"></div>
                  <div class="text">商家公告</div>
                  <div class="line"></div>
                </div>
                <div class="bulletin">{{allList.bulletin}}</div>
              </div>
            </div>
            <div class="detail-close" @click="closeDetail">
              <i>×</i>
            </div>
          </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
     import star from 'components/star/star';
    export default{
        data () {
          return {
            allList: {},
            detailShow: false
          };
        },
        methods: {
          showDetail () {
            this.detailShow = true;
          },
          closeDetail () {
            this.detailShow = false;
          }
        },
        created () {
          var that = this;
          that.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
          that.$http.get('/static/data.json').then(function (response) {
            that.allList = response.body.seller;
          }, function (err) {
            console.log(err);
          });
        },
        components: {
          'v-star': star
        }
    };
</script>
<style type="text/css" lang="scss">
@import "../../common/scss/mixin.scss";
    .header{
      position:relative;
      background:rgba(7,17,27,0.5);
      overflow:hidden;
    }
    .header-top{
      padding:24px 12px 18px 24px;
      color:#fff;
      font-size:0;
      position:relative;
      .header-connent{
        display:inline-block;
        margin-right:16px;
      }
      .suport{
        position:absolute;
        right:12px;
        bottom:18px;
        border-radius:14px;;
        height:24px;
        padding:0 8px;
        line-height:24px;
        background:rgba(0,0,0,0.2);
        text-align:center;
        display:inline-block;
        .list{
          color:#fff;
          font-size:12px;
        }
        .inline{
          font-size:12px;
          line-height:12px;
        }
      }
      .header-bulletin{
        display:inline-block;
        font-size:14px;
        vertical-align:top;
        .header-title{
          margin:2px 0 8px 0;
          .brand{
            display:inline-block;
            width:30px;
            height:18px;
            @include bg-image('../../assets/img/brand');
            background-size:30px 18px;
            background-repeat:no-repeat;
            vertical-align:middle;
          }
          .name{
            margin-left:16px;
            font-size:16px;
            font-weight:bold;
          }
        }
        .header-description{
          margin-bottom:10px;
          line-height:12px;
          font-size:12px;
        }
        .supports{
          .icon{
            display:inline-block;
            vertical-align:top;
            width: 12px;
            height: 12px;
            margin-right:4px; 
            background-size:12px 12px;
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
            line-height:12px;
            font-size:10px;
          }
        }
      }
    }
    .bulletin-wrapper{
      height: 28px;
      line-height:28px;
      white-space:nowrap;
      padding:0 22px 0 22px;
      overflow:hidden;
      text-overflow:ellipsis;
      background:rgba(7,17,27,0.2);
      position:relative;
      .bulletin-title{
        display:inline-block;
        width: 22px;
        height: 12px;
        vertical-align:top;
        margin-top:7px;
        @include bg-image('../../assets/img/bulletin');
        background-size:22px 12px;
        background-repeat:no-repeat;
      }
      .bulletin-text{
        font-size:10px;
        margin:0 4px;
        vertical-align:top;
        color:#fff;
      } 
      .arrow-right{
        position:absolute;
        font-size:10px;
        right:12px;
         color:#fff;
      }
    }
    .background{
      position:absolute;
      z-index:-1;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      filter:blur(10px);
    }
    .detail{
      position:fixed;
      top:0;
      left:0;
      z-index:100;
      width: 100%;
      height: 100%;
      overflow:auto;
      background:rgba(7,17,27,0.8);
      &.fade-enter-active,&.fade-leave-active {
        transition: opacity .5s;
      }
      &.fade-enter,&.fade-leave-active {
        opacity: 0;
      }
      .detail-wrapper{
        min-height:100%;
        width:100%;
        .detail-main{
          margin-top:64px;
          padding-bottom:64px;
          color:#fff;
          .name{
            line-height:16px;
            text-align:center;
            font-size:16px;
            font-weight:700;
          }
        }
      }
      .detail-close{
        position:relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear:both;
        font-size:32px;
        color:#fff;
      }
      .line-box{
        margin:0 36px 24px 36px;
        display:flex;
        .line{
          flex:1;
          position:relative;
          top:-6px;
          border-bottom:1px solid rgba(255,255,255,0.2);
        }
        .text{
          flex:1;
          text-align:center;
          font-size:14px;
          font-weight:700;
        }
      }
      .supports{
        padding:0 36px 28px 36px;
        li{
          padding-left:12px;
          margin-bottom:12px;
        }
        .icon{
          display:inline-block;
          vertical-align:top;
          width: 16px;
          height: 16px;
          margin-right:6px; 
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
          font-size:12px;
          color:rgb(255,255,255);
          line-height: 14px;
        }
      }
      .bulletin{
        padding:0 36px 28px 36px;
        font-size:12px;
        color:rgb(255,255,255);
        line-height: 24px;;
      }
    }
</style>

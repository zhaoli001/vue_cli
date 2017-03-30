<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" :class="{'active':selectType===2}">{{des.all}}<b class="count">47</b></span>
            <span @click="select(1,$event)" :class="{'active':selectType===1}">{{des.positive}}<b class="count">47</b></span>
            <span @click="select(0,$event)" :class="{'active':selectType===0}">{{des.negative}}<b class="count">47</b></span>
        </div>
        <div class="switch">
            <span class="select-look" :class="{'on':onlyContent===true}">√</span>
            <span>只查看有内容的评价</span>
        </div>
        <div class="ratings-content">
            
        </div>
    </div>
</template>
<script type="text/javascript">
import Vue from "vue";
var POSITIVE = 0;
var NEGATIVE = 1;
var ALL = 2;
    export default {
        props:{
            ratings: {
                type:Array,
                default () {
                    return [];
                }
            },
            selectType:{
                type:Number,
                default:ALL
            },
            onlyContent:{
                type:Boolean,
                default:false
            },
            des:{
                type:Object,
                default () {
                    return {
                        all:"全部",
                        positive:"满意",
                        negative:"不满意"
                    };
                }
            }
        },
        created () {
            console.log(this.selectType)  
        },
        methods:{
            select (type,event) {
                if(!event._constructed){
                    return;
                }
                this.selectType = type;
                this.$emit("ratingselect.select",type);
            }
        }
    }
</script>
<style type="text/css" lang="scss">
    .ratingselect{
        .rating-type{
          width: 100%;
          height:28px;
          margin:18px 0;
          span{
            display:inline-block;
            padding:8px 12px;
            margin-right:8px;
            font-size:12px;
            .count{
                margin-left:5px;
            }
          }
          span:nth-child(1){
            background:rgba(0,160,220,0.2);
            color:rgb(77,85,93);
            &.active{
                background:rgb(0,160,220);
                color:#fff;
            }
          } 
          span:nth-child(2){
            background:rgba(0,160,220,0.2);
            color:rgb(77,85,93);
            &.active{
                background:rgb(0,160,220);
                color:#fff;
            }
          } 
          span:nth-child(3){
            background:rgba(77,85,93,0.2);
            color:rgb(77,85,93);
            &.active{
                background:rgb(77,85,93);
                color:#fff;
            }
          } 
        }
        .switch{
            .select-look{
                display:inline-block;
                padding:5px 7px;
                border-radius:50%;
                background:#ccc;
                color:#fff;
                &.on{
                    background:#00c850;
                }
            }
        }
    }
</style>

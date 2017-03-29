<template>
    <div class="star" :class="starType">
       <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span> 
    </div>
</template>

<script type="text/javascript">
var length = 5;
var on = 'on';
var half = 'half';
var off = 'off';
    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType () {
                return 'star-' + this.size;
            },
            itemClasses () {
                var result = [];
                var scord = Math.floor(this.score * 2) / 2;
                var hasDecimal = scord % 1 !== 0;
                var integer = Math.floor(scord);
                for (var i = 0; i < integer; i++) {
                    result.push(on);
                }
                if (hasDecimal) {
                    result.push(half);
                }
                if (result.length < length) {
                   result.push(off);
                };
                return result;
            }
        }
    };
</script>

<style type="text/css" lang='scss'>
@import "../../common/scss/mixin.scss";
    .star{
        font-size:0;
        height:24px;
        width:100%;
        margin:16px 0 28px 0;
        text-align:center;
        line-height:24px;;
        .star-item{
            display:inline-block;
            background-repeat:no-repeat;
        }
        &.star-48{
            .star-item{
                width: 20px;
                height: 20px;
                margin-right:22px;
                background-size:20px 20px;
                &:last-child{
                    margin-right:0;
                }
                &.on{
                    @include bg-image('../../assets/img/star48_on');
                }
                &.half{
                   @include bg-image('../../assets/img/star48_half'); 
                }
                &.off{
                   @include bg-image('../../assets/img/star48_off'); 
                }
            }
        }
        &.star-36{
            .star-item{
                width: 20px;
                height: 20px;
                margin-right:6px;
                background-size:20px 20px;
                &:last-child{
                    margin-right:0;
                }
                &.on{
                    @include bg-image('../../assets/img/star36_on');
                }
                &.half{
                   @include bg-image('../../assets/img/star36_half'); 
                }
                &.off{
                   @include bg-image('../../assets/img/star36_off'); 
                }
            }
        }
        &.star-24{
           .star-item{
            width: 10px;
            height: 10px;
            margin-right:3px;
            background-size:10px 10px;
            &:last-child{
                margin-right:0;
            }
            &.on{
                @include bg-image('../../assets/img/star24_on');
            }
            &.half{
               @include bg-image('../../assets/img/star24_half'); 
            }
            &.off{
               @include bg-image('../../assets/img/star24_off'); 
            }
           }
        }
    }
</style>

<template>
<div class='main' :style="{width:setSize,border:setBorder,color:setFontColor,fontSize:setFontSize}">
    {{value}}
   </div>
</template>

<script>
export default {
    props: {
        size:{
            default:'middle'
        },
        value: {
            require: true,
            default: '提交'
        },
        border: {
            require: false,
            default:{
                width: '1',
                type:'solid',
                color:'rgba(6, 73, 105, 1)'
            }
        },
        font:{
            require:false,
            default:{
                size: 12,
                color:'#064969'
            }
        },
    },
    data() {
        return {

        }
    },
    computed:{
        setBorder(){
            return `${this.border.width*2.34375}rpx ${this.border.type} ${this.border.color}`
        },
        setFontColor(){
            return `${this.font.color}`
        },
        setFontSize(){
            return `${this.font.size*2.34375}rpx`
        },
        setSize(){
            switch(this.size){
                case 'small':
                    return 2.24375*60+'rpx'
                    break;
                case 'middle':
                    return 2.34375*80+'rpx'
                    break;
                case 'large':
                    return 2.34375*120+'rpx'
                    break;
                default:
                    return ''
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.main {
    height: cr(30);
    color: #064969;
    border: 1px solid rgba(6, 73, 105, 1);
    border-radius: cr(4);
    line-height: cr(30);
    font-size: cr(12);
    padding: 0 cr(5);
    text-align: center;
}
</style>

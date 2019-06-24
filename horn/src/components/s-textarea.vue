<template>
<textarea v-model="content" class="textarea" :placeholder="placeholder" @input="input" :maxlength='maxlength'></textarea>
</template>

<script>
export default {
    props: ['placeholder','maxlength','value'],
    data() {
        return {
            content:'',
            timer:null
        }
    },
    methods:{
        _input(){
            this.$emit('change',this.content)
        },
        input(){
            let res=this._debounce(this._input);
            res();
        },
        _debounce(fn){
            let context=this;
            return function(){
                let args=arguments;
                if(context.timer){
                    clearTimeout(context.timer);
                    context.timer=null
                }
                context.timer=setTimeout(function(){
                    fn.apply(context,args)
                },500)
            }
        } 
    }
}
</script>

<style lang="scss" scoped>
.textarea {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(6, 73, 105, 0.7);
    font-size: cr(12);
    padding: cr(6) cr(6);
    border-radius: cr(4);
    color: rgba(136,136,136,1);
    box-sizing: border-box;
}
</style>

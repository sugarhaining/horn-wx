<template>
<textarea v-model="content" class="textarea" :placeholder="placeholder" @input="input" :maxlength='maxlength'></textarea>
</template>

<script>
export default {
    props: ['placeholder','maxlength'],
    data() {
        return {
            content:''
        }
    },
    methods:{
        input(){//做函数节流处理
            this.$emit('change',this.content)
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

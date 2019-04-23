<template>
<div class='main-wrap'>
    <tab-swiper></tab-swiper>
</div>
</template>

<script>
import tabSwiper from '../../components/tab-swiper.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        tabSwiper
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>

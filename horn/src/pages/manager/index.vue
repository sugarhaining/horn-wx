<template>
<div class='main-wrap bg-img'>
    <div class="panel-top">
        <panel-top :identity='identity'></panel-top>
    </div>
    <div class="message-show">
        <div class="item" v-for="(item,index) in data" :key='index'>
            <s-card :info='item'></s-card>
        </div>
    </div>
</div>
</template>

<script>
import panelTop from '@/components/panel-top.vue'
import sCard from '@/components/s-card.vue'
export default {
    data() {
        return {
            identity: 0,
            data: [
                {
                    "ques_id": 1,
                    "ques_question": "因为爱情，不会轻易悲伤，所以我们都是幸福的模样",
                    "ques_name": "乖乖",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
                {
                    "ques_id": 2,
                    "ques_question": "五一放假时间？",
                    "ques_name": "zxcvbnm",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
                {
                    "ques_id": 3,
                    "ques_question": "五一放假时间？",
                    "ques_name": "zxcvbnm",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
                {
                    "ques_id": 3,
                    "ques_question": "五一放假时间？",
                    "ques_name": "zxcvbnm",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
                {
                    "ques_id": 3,
                    "ques_question": "五一放假时间？",
                    "ques_name": "zxcvbnm",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
                {
                    "ques_id": 3,
                    "ques_question": "五一放假时间？",
                    "ques_name": "zxcvbnm",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
                {
                    "ques_id": 3,
                    "ques_question": "五一放假时间？",
                    "ques_name": "zxcvbnm",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
                {
                    "ques_id": 3,
                    "ques_question": "五一放假时间？",
                    "ques_name": "zxcvbnm",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
                {
                    "ques_id": 3,
                    "ques_question": "五一放假时间？",
                    "ques_name": "zxcvbnm",
                    "ques_image": "https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg",
                    "ques_date": "2019.4.21",
                    "session_id": "123456789zxcvbnm",
                    "form_id": "zxcvbnm123456789"
                },
            ]
        }
    },
    components: {
        panelTop,sCard
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    .panel-top {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }

    .message-show {
        width: 100%;
        padding: 0 cr(15);
        box-sizing: border-box;
        flex: 2;
        overflow-y: scroll;
        margin-top: cr(50);
        @include flex_column;
        .item{
            width: 100%;
            margin-bottom: cr(10);
        }
    }
}
</style>

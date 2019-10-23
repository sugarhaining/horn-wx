<template>
<div class='main-wrap bg-img'>
    <account-form v-if="showForm" @hidden='hiddenForm' @update='update'></account-form> 
    <div class="float-modal">
        <div class="main">
            <span class="title">目前的管理员:</span>
            <div class="lists">
                <div class="list-item" v-for="(list,index) in accounts" :key="index">
                    <div class="account">{{list.phone}}</div>
                    <div class="user">{{list.remark}}</div>
                    <img src="/static/icons/delete.png" @click="remove(list,index)">
                </div>
                </div>
                <div class="btn-nav">
                    <div class="btn-wrap" @click="add">
                        <s-button value='添加' size='small'></s-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sButton from '@/components/s-button.vue'
import accountForm from '@/components/account-form.vue'
import {
    showToast
} from '@/utils/index'
import {getManagersInfo,deleteManage} from '@/apis/manager'
export default {
    data() {
        return {
            accounts:[],
            showForm: false
        }
    },
    components: {
        sButton,
        accountForm
    },
    methods: {
        add() {
            this.showForm=true;
        },
        update(value){
            this.accounts.push(value)
        },
        async remove(list,index) {
            try{
                let res=await deleteManage({id:list.id})
                this.accounts.splice(index,1)
                showToast('删除成功','success')
            }catch(e){
                showToast('删除失败,请重试')
            }
        },
        hiddenForm(){
            this.showForm=false;
        },
        async _initData(){
            let res=await getManagersInfo();
            this.accounts=res.data.data
        }
    },
    onLoad(){
        this._initData()
    }
}
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    @include flex_column;
    padding: cr(20) cr(5);
    box-sizing: border-box;

    .title {
        width: 90%;
        font-size: cr(12);
        text-align: left;
    }

    .lists {
        width: 90%;
        height: cr(300);
        margin-top: cr(10);
        overflow-y: scroll;
        border: 1px solid rgba(6, 73, 105, 1);
        color: rgba(6, 73, 105, 1);
        border-radius: cr(4);
        font-size: cr(12);
        padding: cr(10) cr(5);
        box-sizing: border-box;

        .list-item {
            width: 100%;
            margin-bottom: cr(10);
            @include flex_row;

            .account,
            .user {
                border: 1px solid rgba(6, 73, 105, 1);
                height: cr(25);
                line-height: cr(25);
                text-align: center;
                border-radius: cr(5);
            }

            .account {
                width: cr(100);
            }

            .user {
                width: cr(80);
                margin-left: cr(10);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            >img {
                width: cr(20);
                height: cr(20);
                margin-left: cr(10);
            }
        }
    }

    .btn-nav {
        width: 70%;
        @include flex_row;
        margin-top: cr(15);
        justify-content: center;
    }
}
</style>

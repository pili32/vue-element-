<template>
    <div class="app_header">
        <bread-nav></bread-nav>
        <!-- <color-picker></color-picker> -->
       <el-button type="primary" style="margin-right:100px;" @click="outThere">退出</el-button>
    </div>
</template>

<style >
.app_header{
    width: 100%;
    display: inline-block;
    text-align: right;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 5px ;
    box-sizing: border-box;
}

</style>


<script>
import ColorPicker from "@/layout/colorpicker";
import BreadNav from "./BreadNav.vue";

export default {
    data(){
        return{
           
        }
    },
    components:{
        ColorPicker,
    BreadNav,

    },
    methods:{
        outThere(){
            this.$router.push(`/login`)
            // window.location.origin + window.location.pathname获取到当前的地址 + 路径
            // window.location.href = window.location.origin +window.location.pathname
        }
    }
}
</script>
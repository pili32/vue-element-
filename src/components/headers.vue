<template>
    <div class="app_header">
        <color-picker></color-picker>
       <el-button type="primary" style="margin-right:100px;" @click="outThere">退出</el-button>
    </div>
</template>

<style >
.app_header{
    background :red;
    height: 80px;
    width: 100%;
    background: #ddd;
    display: inline-block;
    text-align: right;
      line-height: 80px
}

</style>


<script>
import ColorPicker from "@/layout/colorpicker/index";
export default {
    data(){
        return{
           
        }
    },
    components:{
        ColorPicker
    },
    methods:{
        outThere(){
            // window.location.origin + window.location.pathname获取到当前的地址 + 路径
            window.location.href = window.location.origin +window.location.pathname
        }
    }
}
</script>
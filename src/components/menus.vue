<template>
    <div class="menu_list">
        <el-menu
          default-active="2"
          router mode="vertical"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen"
            @close="handleClose"
        >
        <template v-for="(item,index) in navaList">
            <!-- el-submenu   这里必须将菜单栏放进去 -->
            <el-submenu :index='pathUrl+"/"+item.path'>
                <template slot='title'>
                    <router-link :to='pathUrl+"/"+item.path'>
                    <i :class='item.meta.icon'></i>
                    <span>{{item.name}}</span>
                    </router-link>
                </template>
                <template v-for='(itemChildren,indexChildren) in item.children'>
                      <router-link :to="itemChildren.path">
                            <el-menu-item :index="item.path+'/'+itemChildren.path">
                            <i v-if="itemChildren.meta.icon" :class="itemChildren.meta.icon"></i>
                            {{itemChildren.name}}
                    </el-menu-item>
                </router-link>
                </template>
            </el-submenu>
        </template>
    </el-menu>
    </div>
</template>

<script> 
//取出router.js
import  router from '@/router'
export default {
    data(){
        return{
            navaList:[
            ],
            pathUrl:"",
        }
    },
    created(){
        console.log(router)
        //取出路由中需要的路径
        this.pathUrl = router.options.routes[1].path
        console.log(this.pathUrl)
         let routers =router.options.routes[1].children
        this.navaList = routers
        console.log( this.navaList )

    },
    methods:{
        handleOpen(key ,keyPath){
            console.log(key)
            console.log(keyPath)

        },
        handleClose(){
            // console.log(key,keyPath)
        }
    }
    
}
</script>

<style >

</style>
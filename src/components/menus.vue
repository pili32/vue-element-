<template>
    <div class="menu_list">
        <el-menu
            default-active="2"
            router
            mode="vertical"
            @open="handleOpen"
            @close="handleClose"
            collapse-transition
            :unique-opened='uniqueOpened'
        >
        <div v-for="(item,index) in navaList"  :key="index" >
            <el-submenu 
                :key="item.name"
                :index="item.path"
            >
            <template slot="title">
                <i class="iconfont" :class="item.meta.icon"></i>
                <span class="sub-title">{{ item.name }}</span>
            </template>
             <template v-for='(itemChildren,indexChildren) in item.children'>
                <el-menu-item
                    :key="indexChildren"
                    :index="itemChildren.path"
                    style="padding-left: 16px"
                    class="sub-menu"
                >
                    <i class="iconfont" :class="itemChildren.icon" style="margin-right:10px;font-weight:400"></i>
                    {{ itemChildren.name }}
                </el-menu-item>
                </template>
            </el-submenu>
        </div>
    </el-menu>
    </div>
</template>
<script> 
//取出router.js
import { mapActions } from 'vuex'
// import  router from '@/router'
export default {
    data(){
        return{
            navaList:[
            ],
            uniqueOpened:true,
            pathUrl:"",
            store:this.$store.state.routerMenu
        }
    },
    created(){
        this.navaList = this.store[1].children
        console.log( this.navaList )

    },
    setMenu(item){
        console.log(item)
    },
    selectMenu(index,indexPath){
    },
    methods:{
        handleOpen(key){
            console.log(key)
            const item = this.store[1].children.filter( e => e.path === key)
            console.log(item)
            let result =  this.$filterMenu(key,item[0])
            console.log(result)

            this.$store.dispatch('setBreadNav', result)
 

        },
        handleClose(){
            // console.log(key,keyPath)
        }
    }
    
}
</script>

<style  >
/* ul li{
    background: red
}
.el-menu-item .is-active{
    background: red
} */

</style>
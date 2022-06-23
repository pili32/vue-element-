

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item 
        v-for="(item,index) in breadNav"
        :key="index"
        :to="{path: item.path}"
        >{{item.name}}
      </el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>
<script>
export default {
    name:'BreadNav',
    data(){
        return {
            navaList:[]
        }
    },
     computed: {
       breadNav(){
         return this.$store.state.breadNav
       }        
    },
      created(){
    },
}
</script>

<style>
.breadcrumb{
  padding: 20px 0;
}

</style>
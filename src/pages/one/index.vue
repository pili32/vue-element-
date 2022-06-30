<template>
    <div :style="{width:'100%',height:'100%'}">
      <router-view></router-view>
    </div>
</template>
<script>
export default {
  data() {
    return {

    }
    

  },
  created(){
    console.log(1111)
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>

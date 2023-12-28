<template>
    <div class="warp">
        <car-ousel :imageList='imageList'></car-ousel>
    </div>
</template>


<script>
import CarOusel from "@/components/carousel";
export default {
    components:{CarOusel},
    data(){
        return{
           imageList:[
               {imageUrl:require('@/assets/carousel/img1.jpg')},
               {imageUrl:require('@/assets/carousel/img2.jpg')},
               {imageUrl:require('@/assets/carousel/img3.jpg')},
               {imageUrl:require('@/assets/carousel/img4.jpg')},
               {imageUrl:require('@/assets/carousel/img5.jpg')},
               {imageUrl:require('@/assets/carousel/img6.jpg')},
           ]
        }
    },
    
}
</script>

<style lang="less">
    .warp{
        height: 100%;
    }
</style>
<template>
  <div id="echart">
    <el-row>
  <el-col :span="8">
    <div id="myChart" style="width: 300px;height:400px;"></div>
  </el-col>
  <el-col :span="8">
    <div id='main' style="width:300px;height:400px"></div>
  </el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
    
  </div>
</template>
<script>
export default {
  name: "app",
  return:{
    color: ['#d12','#32edf','#d12','#dw21','#ea7e53'],

  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 指定图表的配置项和数据
      let option = {
        // color:this.color,
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            itemStyle: {
              normal: {
                //　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color:function(params){
                         var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)','red','yellow'];
                        return colorList[params.dataIndex];
                  }
              }
          },
            data: [5, 20, 36, 10, 10, 20],
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    chke(){
      let chkeCharts = this.$echarts.init(document.getElementById("main")).setOption({
            series: {
                type: 'pie',
                data: [
                    {name: 'A', value: 1212},
                    {name: 'B', value: 2323},
                    {name: 'C', value: 1919}
                ]
            }
      })
        

    }

  },
  mounted() {
    this.drawChart();
    this.chke()
  }
};
</script>

<style >
  #echart{
    width: 100%;
    height: 100%;
  }

</style>


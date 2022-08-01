<template>
  <div class="warp">
    <div class="box-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        border
        show-summary
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="早餐：">
                <span>{{ props.row.morningfood }}</span>
              </el-form-item>
              <el-form-item label="中餐：">
                <span>{{ props.row.noonfood }}</span>
              </el-form-item>
              <el-form-item label="晚餐：">
                <span>{{ props.row.nightfood }}</span>
              </el-form-item>
              <el-form-item label="其他：">
                <span>{{ props.row.else }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.props"
          :label="item.label"
          v-for="(item, index) in column"
          :key="index"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
const morningfood = "包子+鸡蛋";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2022-07-19",
          morning: 21,
          noon: 15,
          night: 15,
          morningfood: "黄鹤楼+" + morningfood,
          noonfood: "小碗菜",
          nightfood: "2个桶面加零食",
          else: "",
          total: "",
          elseMoney:null,

          // address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: "2022-07-20",
          morning: 62,
          noon: 1,
          night: 7,
          morningfood: "三包蓝楼+" + morningfood,
          noonfood: "炸酱面+鸡蛋,11元减去优惠劵10 ",
          nightfood: "鸡蛋炒饭",
          else: '零食',
          elseMoney:39.1,
          total: "",
          // address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: "2022-07-21",
          morning: 5,
          noon: 14,
          night: 3.5,
          morningfood:  morningfood,
          noonfood: "五谷鱼粉",
          nightfood: "花生豆",
          else: '停车费,电动车充电',
          elseMoney:15,
          total: "",
          // address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: "2022-07-22",
          morning: 5,
          noon: 12,
          night: null,
          morningfood:  morningfood,
          noonfood: "肉丝炒饭",
          nightfood: "",
          else: '加油',
          elseMoney:100,
          total: "",
          // address: '上海市普陀区金沙江路 1518 弄'
        },
      ],
      column: [
        {
          props: "date",
          label: "时间",
        },
        {
          props: "morning",
          label: "早上（元）",
        },
        {
          props: "noon",
          label: "中午（元）",
        },
        {
          props: "night",
          label: "晚上（元）",
        },
        {
          props: "elseMoney",
          label: "其他（元）",
        },
        {
          props: "total",
          label: "总计（元）",
          dicFormatter: ((row,column)=>{
            console.log(row)
          }), 
        },
      ],
    };
  },
  mounted() {
    this.tableData.forEach((m) => {
      m.total = m.morning + m.noon + m.night+m.elseMoney;
    });
    this.total =  this.tableData.length
  },
  methods: {
    getSummaries() {},
  },
};
</script>

<style lang="less">
.warp {
  height: 100%;
  .box-table {
    height: calc(100% - 40px);
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 60px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    padding-left: 50px;
  }
}
.el-table_1_column_8{
  color: red !important;
}
// .has-gutter 
</style>
<template>
  <div class="warp">
    <div class="box-table">
      <el-table :data="tableData" style="width: 100%" height="100%" border show-summary>
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
              <el-form-item label="晚场：">
                <span>{{ props.row.nightfood }}</span>
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
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2022-6-22",
          morning: "23",
          noon: "13",
          night: "0",
          morningfood: "包子",
          noonfood: "米饭",
          nightfood: "菜",

          // address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: "2022-6-23",
          morning: "20",
          noon: "13",
          night: "0",
          morningfood: "包子",
          noonfood: "包子",
          nightfood: "包子",
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
          label: "早上",
        },
        {
          props: "noon",
          label: "中午",
        },
        {
          props: "night",
          label: "晚上",
        },
      ],
    };
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
</style>
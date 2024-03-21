<template>
    <div style="background: #fff; padding: 0 0">
      <el-table
        :row-style="{ height: '40px' }"
        :cell-style="{ padding: '0px' }"
        ref="elTable"
        @cell-dblclick="rowDoubleClick"
        @row-click="rowClick"
        @selection-change="$emit('selection-change', $event)"
        class="base-table full-width"
        v-loading="loading"
        :data="tableListCopy"
        :size="size"
        :border="border"
        :stripe="stripe"
        :default-sort="defaultSort"
        :height="height"
        :show-summary="showSummary"
        :tree-props="treeProps"
        row-key="id"
        highlight-current-row
      >
        <el-table-column v-if="selection" width="50" type="selection"></el-table-column>
        <!-- <el-table-column
          v-if="order"
          align="center"
          label="序号"
          :fixed="paginationOptions.hasOwnProperty('orderFixed') ? paginationOptions.orderFixed : false"
          width="50"
          type="index"
        ></el-table-column> -->
        <template v-for="(item, index) in columns">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align "
            :width="item.width "
            :fixed="item.hasOwnProperty('fixed') ? item.fixed : false"
            :sortable="item.sortable"
            show-overflow-tooltip
            v-if="item.hasOwnProperty('show') ? item.show : true"
          >
            <template slot-scope="{ row }">
              <template v-if="item.clickEnable">
                <el-button @click="$emit('click', row, item)" type="text">
                  {{ formatData(item, row) }}
                </el-button>
              </template>
              <template v-else-if="item.render">
                <expand-dom :column="item" :row="row" :render="item.render"></expand-dom>
              </template>
              <template v-else>
                {{ formatData(item, row) }}
              </template>
            </template>
          </el-table-column>
        </template>
        <slot></slot>
      </el-table>
      <EPagination
        v-if="!isHidePagination"
        class="pagination"
        :total="paginationOptions.total || paginationTotal"
        @currentPageClick="currentPageClickHandle"
      />
    </div>
  </template>
  
  <script>
  import EPagination from '@/components/EPagination';
  import { format } from 'date-fns';
  /**
   * 基础表格
   *
   * @prop {Array} data 表格数据，example：[{ [prop]: String }]
   * @prop {Array} columns 表格栏目
   * - example：[{
   *     prop: String, label: String, width: Number, sortable: Boolean,
   *     clickEnable: Boolean, type: String, dateFormat: String, formatter: Function
   *   }]
   * - sortable 是否排序
   * - clickEnable 是否可点击，会触发表格的 click 事件，详情见下面的 click 事件
   * - type 数据类型，date 为时间戳 dic为字典
   * - dateFormat 时间转换格式， 默认 'yyyy-MM-dd HH:mm:ss'
   * - formatter(value) 格式化单元格数据，参数为当前单元格数据，需返回展示的内容
   *
   * @prop {Boolean} border 是否有边框，默认无
   * @prop {Boolean} stripe 是否斑马条纹，默认有
   * @prop {String} size 表格大小，默认 mini
   * @prop {Boolean} order 是否有序号，默认无
   * @prop {Object} defaultSort 默认排序，example：{ prop: 'area', order: 'descending' }
   * @prop {String} height 表格高度
   * @prop {Boolean} showSummary 是否展示总计行，默认 false
   * @prop {Boolean} selection 是否展示复选框，默认 false
   * @prop {Object} treeProps 树形菜单的 props 对应参数，默认 { children: 'children' }
   *
   * @event selection-change 复选框勾选事件
   * @event click(data, column) 栏目点击事件，data 当前行的数据，column 当前栏目的数据
   * @event row-click(row, column, cell, event 行点击事件
   *
   * @method setCurrentRow(row) 设置当前行
   */
  export default {
    props: {
      data: {
        type: Array,
        default: () => {
          return [];
        },
      },
      columns: Array,
      border: {
        type: Boolean,
        default: false,
      },
      stripe: {
        type: Boolean,
        default: true,
      },
      size: {
        type: String,
        default: 'medium',
      },
      defaultSort: Object,
      height: {
        type: String,
        default: 'auto',
      },
      showSummary: {
        type: Boolean,
        default: false,
      },
      // order: {
      //   type: Boolean,
      //   default: true,
      // },
      selection: {
        type: Boolean,
        default: false,
      },
      treeProps: {
        type: Object,
        default() {
          return { children: 'children' };
        },
      },
      options: {
        type: Object,
        default() {
          return {};
        },
      },
      loading: {
        type: Boolean,
        default: false,
      },
      //是否隐藏分页默认不隐藏
      isHidePagination: {
        type: Boolean,
        default: false,
      },
      //全局分页统一，先用临时字段
      paginationTotal: {
        type: Number,
        default: 0,
      },
    },
    components: {
      EPagination,
      expandDom: {
        functional: false,
        props: {
          row: Object,
          render: Function,
          index: Number,
          column: {
            type: Object,
            default: null,
          },
        },
        render: function (h) {
          return this.render(h, this.row);
        },
      },
    },
    data() {
      return {
        optionsDefault: {
          total: 0,
          pageSize: 10,
          current: 1,
          loading: false,
        },
        tableListCopy: this.data,
      };
    },
    computed: {
      paginationOptions: {
        get: function () {
          const temp = Object.assign({}, this.optionsDefault);
          for (const index in this.options) {
            temp[index] = this.options[index];
          }
          return temp;
        },
        set: function (obj) {
          this.optionsDefault = Object.assign(this.optionsDefault, obj);
        },
      },
    },
    created() {},
    methods: {
      // 单元格数据格式化
      formatData(column, row) {
        const value = row[column.prop];
        if (value) {
          if (column.type === 'date') {
            return format(value, column.dateFormat || 'yyyy-MM-dd HH:mm:ss');
          } else if (column.formatter instanceof Function) {
            return column.formatter(value, row);
          } else {
            return value;
          }
        } else {
          return value;
        }
      },
  
      // 双击事件
      rowDoubleClick(row, column, cell, event) {
        this.$emit('cell-dblclick', row, column, cell, event);
      },
  
      // 表格行点击事件
      rowClick(row, column, cell, event) {
        this.$emit('row-click', row, column, cell, event);
      },
  
      // 设置当前行
      setCurrentRow(row) {
        this.$refs.elTable.setCurrentRow(row);
      },
  
      toggleSelection(row,chicked=true) {
        this.$refs.elTable.toggleRowSelection(row,chicked);
      },
      setCurrentRowListt(row) {
        this.$refs.elTable.setCurrentRow(row);
      },
      // 清空勾选
      clearSelection() {
        this.$refs.elTable.clearSelection();
      },
      // 分页查询
      currentPageClickHandle(val) {
        // this.paginationOptions.current = val.pageNum
        // this.paginationOptions.pageSize = val.pageSize
        this.$emit('afterCurrentPageClick', val, function () {});
      },
      // table数据赋值
      setPageList(tableList) {
        this.tableListCopy = tableList;
      },
      // table数据赋值
      setPageInfo(current, total, tableList) {
        this.paginationOptions.current = current;
        this.paginationOptions.total = total;

        this.tableListCopy = tableList;
      },
      initPage() {
        this.paginationOptions.current = 1;
        this.paginationOptions.total = 10;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .pagination-col {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .funtionbtn {
    margin-bottom: 5px;
  }
  .left {
    display: flex;
    justify-content: space-between;
  }
  .resctbtn {
    margin-left: 10px;
  }
  .right {
    display: flex;
    margin-left: 10px;
  }
  .detelbtn {
    margin-left: 10px;
  }
  .funtionbtn {
    display: flex;
    justify-content: space-between;
  }
  .pagination {
    background: #fff;
    padding:0;
    // padding-bottom: 10px;
    width: 1250px;
    height: 40px;
    line-height: 40px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
  ::v-deep .el-table {
    border-top: 1px solid rgba(241, 241, 241, 1);
    border-bottom: 1px solid rgba(241, 241, 241, 1);
  
    th {
      background-color: rgba(255, 255, 255) !important;
      height: 53px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      font-family: Microsoft YaHei !important;
      color: #444444 !important;
    }
  
    .el-table__row--striped td {
      background-color: rgba(245, 246, 247, 1) !important;
    }
  
    //用来设置当前页面element全局table,hover某行时的背景色
    .el-table__body tr.hover-row > td {
      background-color: #fbeff0 !important;
      // color: white;
      color: #515866;
    }
    // 用来设置当前页面element全局table 选中某行时的背景色
    .el-table__body tr.current-row > td {
      background-color: #fbeff0 !important;
      color: #515866;
  
    }
  }
  ::v-deep .el-table .cell.el-tooltip{
    white-space: pre-wrap;
  }
  .el-tabs--border-card>.el-tabs__content{
    padding: 0;
  }
  </style>
  
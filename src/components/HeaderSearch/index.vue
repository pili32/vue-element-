<template>
    <div class="table-filter">
      <el-form :inline="true">
        <div class="filter">
          <div>
            <template v-for="(filter, index) in filterGroup">
              <span class="filter-item" :key="index" v-show="filter.show !== false">
                <label class="input-label" v-if="filter.label" :class="'input-label-' + index">{{ filter.label }}</label>
                <template v-if="filter.type === 'select'">
                  <el-select
                    @keydown.enter.native="search"
                    :clearable="!filter.clearable"
                    @change="change"
                    v-model="filter.value"
                    :placeholder="filter.placeholder"
                    size="small"
                  >
                    <el-option
                      v-for="item in filter.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
  
                <template v-else-if="filter.type === 'date'">
                  <el-date-picker
                    @keydown.enter.native="search"
                    v-model="filter.value"
                    type="date"
                    size="small"
                    :format="filter.format || 'yyyy-MM-dd'"
                    :value-format="filter.valueformat || 'yyyy-MM-dd'"
                    :placeholder="filter.placeholder"
                  ></el-date-picker>
                </template>
  
                <template v-else-if="filter.type === 'dateYear'">
                  <el-date-picker
                    @keydown.enter.native="search"
                    v-model="filter.value"
                    type="year"
                    size="small"
                    :format="filter.format || 'yyyy'"
                    :value-format="filter.valueformat || 'yyyy'"
                    :placeholder="filter.placeholder"
                  ></el-date-picker>
                </template>
  
                <template v-else-if="filter.type === 'dateRange'">
                  <el-date-picker
                    @keydown.enter.native="search"
                    v-model="filter.options[0].value"
                    :type="filter.options[0].type || 'date'"
                    size="small"
                    :format="filter.options[0].format || 'yyyy-MM-dd'"
                    :value-format="filter.options[0].valueformat || 'yyyy-MM-dd'"
                    :placeholder="filter.options[0].placeholder"
                    :picker-options="startTime(filter.options[1].value, filter.isDisable)"
                  ></el-date-picker
                  >&nbsp;
                  <label class="input-label input-date-end" v-if="filter.centerLabel">{{
                    filter.filterCenterLabel
                  }}</label>
                  &nbsp;
                  <el-date-picker
                    @keydown.enter.native="search"
                    v-model="filter.options[1].value"
                    :type="filter.options[1].type || 'date'"
                    size="small"
                    :format="filter.options[1].format || 'yyyy-MM-dd'"
                    :value-format="filter.options[1].valueformat || 'yyyy-MM-dd'"
                    @change="endTimeChange"
                    :placeholder="filter.options[1].placeholder"
                    :picker-options="endTime(filter.options[0].value, filter.isDisable)"
                  ></el-date-picker>
                </template>
  
                <template v-else-if="filter.type === 'dateTime'">
                  <el-date-picker
                    @keydown.enter.native="search"
                    v-model="filter.options[0].value"
                    :type="filter.options[0].type || 'date'"
                    size="small"
                    :format="filter.options[0].format || 'yyyy-MM-dd HH:mm:ss'"
                    :value-format="filter.options[0].valueformat || 'yyyy-MM-dd HH:mm:ss'"
                    :placeholder="filter.options[0].placeholder"
                    :picker-options="startTime(filter.options[1].value, filter.isDisable)"
                  ></el-date-picker
                  >&nbsp;
                  <label class="input-label input-date-end" v-if="filter.centerLabel">{{
                    filter.filterCenterLabel
                  }}</label>
                  &nbsp;
                  <el-date-picker
                    @keydown.enter.native="search"
                    v-model="filter.options[1].value"
                    :type="filter.options[1].type || 'date'"
                    size="small"
                    :format="filter.options[1].format || 'yyyy-MM-dd HH:mm:ss'"
                    :value-format="filter.options[1].valueformat || 'yyyy-MM-dd HH:mm:ss'"
                    @change="endTimeChange"
                    :placeholder="filter.options[1].placeholder"
                    :picker-options="endTime(filter.options[0].value, filter.isDisable)"
                  ></el-date-picker>
                </template>
  
                <template v-else-if="filter.type === 'selectTree'">
                  <el-select-tree
                    @keydown.enter.native="search"
                    size="small"
                    :placeholder="filter.placeholder"
                    clearable
                    checkStrictly
                    :multiple="filter.hasOwnProperty('multiple') ? filter.multiple : false"
                    :data="filter.treeData"
                    :props="filter.treeProps"
                    v-model="filter.value"
                    @change="filter.change ? filter.change(filter.value) : null"
                  ></el-select-tree>
                </template>
                <template v-else-if="filter.type === 'cascader'">
                  <el-cascader
                    ref="cascader"
                    @change="change"
                    v-model="filter.value"
                    :options="filter.options"
                    :placeholder="filter.placeholder"
                    :show-all-levels="false"
                    :props="{ ...cascaderProps, ...filter.props }"
                    size="small"
                    filterable
                    @keydown.enter.native="search"
                  ></el-cascader>
                </template>
                <template v-if="filter.type === 'input'">
                  <el-input
                    clearable
                    v-model="filter.value"
                    :placeholder="filter.placeholder"
                    size="small"
                    :disabled="filter.disabled"
                    @keydown.enter.native="search"
                  ></el-input>
                </template>
              </span>
            </template>
          </div>
          <div class="right-btn">
            <el-button type="primary" @click.stop="search()" size="small">查询</el-button>
            <el-button type="danger" @click.stop="reset()" size="small" plain>清空</el-button>
            <slot name="otherBtn"></slot>
          </div>
        </div>
      </el-form>
    </div>
  </template>
  
  <script>
  /**
   * 表格过滤组件
   *
   * @prop filterGroup 过滤配置组，作为 model，支持三种类型数据（查看下面实例结构）
   *
   * @event change(filterGroup) 数据更新事件
   * @event search() 查询
   * @event reset() 重置
   */
  export default {
    name: 'HeaderSearch',
    props: {
      /**
       * 过滤配置组
       * example: [
       *   // 级联选择器 props 参考 data 中的配置
       *   { type: 'cascader', options: [{label: 'test', value: 1, children: []}], placeholder: '', value: '', props: {} },
       *
       *   // 下拉框
       *   { type: 'select', options: [{label: 'test', value: 1}], placeholder: '', value: '' },
       *
       *   // 下拉字典
       *   { type: 'dicSelect', placeholder: '', dicType: '', value: '' },
       *
       *   // 输入框
       *   { type: 'input', placeholder: '', value: '' },
       *
       *   // 时间段 默认格式 2010-10-01 默认值 时间戳
       *   { type: 'date', options: [{placeholder: '', value: '', format: 'yyyy - MM - dd', valueformat: 'timestamp'}] },
       * ]
       */
      filterGroup: Array,
      EDialogConfig: {
        type: Object,
        default: () => {
          return {
            visible: false,
            maxLength: 3,
          };
        },
      },
      btnsConfig: {
        type: Object,
        default: () => {
          return {
            clearBtnText: '重置',
            showResetBtn: false,
            showExportBtn: false,
            showMoreBtn: false,
          };
        },
      },
    },
    model: {
      prop: 'filterGroup',
      event: 'change',
    },
    data() {
      return {
        filterGroupRow: [],
        cascaderProps: {
          children: 'children',
          value: 'value',
          label: 'label',
          emitPath: false,
        },
        endTime: {},
        startTime: {},
      };
    },
    mounted() {
      const result = [];
      let i = 0;
      let j = 0;
      let maxLength = this.EDialogConfig.maxLength;
      result[j] = [];
      this.filterGroup.forEach((item) => {
        // debugger;
        if (item.type !== 'dateRange') {
          result[j].push(item);
          i++;
        } else if (result[j].length < maxLength - 1) {
          result[j].push(item);
          i++;
          maxLength = maxLength - 1;
        } else if (result[j].length >= maxLength - 1) {
          i = 0;
          j++;
          // console.log(result[j]);
          result[j] = [];
          result[j].push(item);
        }
  
        if (i === maxLength) {
          i = 0;
          j++;
          result[j] = [];
          maxLength = this.EDialogConfig.maxLength;
        }
      });
      if (result[result.length - 1].length <= 0) {
        result.splice(result.length - 1, 1);
      }
      this.filterGroupRow = result;
    },
    created() {
      this.startTime = function (value, isDisable) {
        //默认不做限制，需要禁用需要传配置参数
        if (isDisable) {
          return {
            disabledDate(time) {
              return time.getTime() > new Date(value).getTime();
            },
          };
        } else {
          return {};
        }
      };
      this.endTime = function (value, isDisable) {
        //默认不做限制，需要禁用需要传配置参数
        if (!isDisable) {
          return {
            disabledDate(time) {
              return time.getTime() < new Date(value).getTime() - 86400000;
            },
          };
        } else {
          return {};
        }
      };
    },
    methods: {
      endTimeChange() {
        this.startTime = function (value) {
          return {
            disabledDate(time) {
              return time.getTime() > new Date(value).getTime();
            },
          };
        };
      },
      change() {
        this.$emit('change', this.filterGroup);
        // this.$refs.cascader.dropDownVisible = false; //监听值发生变化就关闭它
      },
      search() {
        const params = {};
        this.filterGroup.forEach((item) => {
          if (item.key) {
            params[item.key] = item.value || '';
          }
          if (item.type === 'dateRange') {
            item.options.forEach((dateValue) => {
              if (dateValue.key) {
                params[dateValue.key] = dateValue.value || ''; // 时间戳:new Date(dateValue.value).getTime()
              }
            });
          }
        });
        delete params.undefined;
        this.$emit('search', params);
      },
      reset() {
        const params = {};
        this.filterGroup.forEach((item) => {
          item.value = '';
          params[item.key] = '';
          if (item.type === 'dateRange') {
            item.options.forEach((dateValue) => {
              dateValue.value = '';
            });
          }
        });
        delete params.undefined;
        this.$emit('reset', params);
      },
      exportExcel() {
        this.$emit('exportExcel');
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .table-filter {
    background: #fff;
    height: 56px;
    line-height: 56px;
    border-radius: 8px;
  }
  .filter-item {
    margin-right: 8px;
  }
  .filter {
    display: flex;
    justify-content: space-between;
  }
  .input-label {
    width: 80px;
    display: inline-block;
    // margin-right: 10px;
    text-align: center;
    font-size: 12px;
    color: #121518;
  }
  ::v-deep {
    .el-input,
    .el-select,
    .el-cascader {
      width: 134px !important;
    }
  }
  .left-panel {
    margin-top: 10px;
  }
  .right-panel {
    height: 100%;
  }
  .left-panel:first-child {
    margin-top: 0px;
  }
  .input-date-end {
    margin-left: 8px;
    width: auto;
  }
  .right-btn {
    margin-right: 20px;
  }
  .table-filter {
    width: 100%;
  }
  </style>
  
  <style lang="scss" scoped>
  @media only screen and (max-width: 1400px) {
    ::v-deep {
      .el-input,
      .el-select,
      .el-cascader {
        width: 110px !important;
      }
      .el-input--prefix .el-input__inner {
        padding-left: 26px;
      }
    }
    .filter-item {
      margin-right: 4px;
    }
  }
  </style>
  
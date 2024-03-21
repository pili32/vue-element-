<template>
  <div style="width: 100%; margin-top: 15px">
    <span class="slotTotal" style="float: left">
      总共<span style="color: #d03545">{{ total }}</span
      >条记录
    </span>
    <el-pagination
      style="float: right"
      background
      layout="prev, pager, next,jumper,sizes"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="pageTotal"
      @current-change="handleCurrentChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'EPagenation',
  props: {
    total: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
    };
  },
  computed: {
    ...mapState({
      clickCount: (state) => state.pagination.clickCount,
    }),
  },
  watch: {
    total: {
      handler(val) {
        this.pageTotal = val;
      },
      immediate: true,
    },
    clickCount() {
      this.init();
    },
  },
  methods: {
    ...mapMutations({}),
    init() {
      this.pageNum = 1;
      this.pageSize = 10;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.handlerChange();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.handlerChange();
    },
    handlerChange() {
      this.$emit('currentPageClick', { pageNum: this.pageNum, pageSize: this.pageSize });
    },
  },
};
</script>

<style lang="scss" scoped>
$color1: #d03545;
$color2: rgba(243, 243, 243, 1);
$color3: #fff;
$color4: rgb(244, 244, 244);
$color5: rgba(220, 220, 220, 1);
$color6: #303133;
$radius: 4px;
$color-size: 14px;
.sp-pagination {
  float: right !important;
  ::v-deep .btn-prev,
  ::v-deep .btn-next {
    border: 1px solid $color5 !important;
    background: center center no-repeat $color4 !important;
    padding-left: 0;
    padding-right: 0;
    padding: 0 8px;
    border-radius: $radius;
    font-size: $color-size;
  }
  .slotTotal {
    // display: flex;
    justify-content: flex-start;
    // align-items: center;
    float: left !important;
    span {
      color: $color1;
    }
  }
  ::v-deep .btn-prev:hover,
  ::v-deep .btn-next:hover {
    color: $color1;
  }
  ::v-deep .el-pagination__total {
    margin: 0 10px;
    color: $color6;
    font-size: $color-size;
  }
  ::v-deep .el-pagination__jump {
    margin: 0;
    color: $color6;
    font-size: $color-size;
  }
  ::v-deep .el-pager {
    .number {
      border: 1px solid $color5;
      border-radius: $radius;
      margin: 0 5px;
    }
    .number:hover {
      border: 1px solid $color5;
      color: $color1;
    }
    .active {
      background-color: $color1;
      border: 1px solid $color5;
      color: $color3;
      pointer-events: none;
    }
  }
}
</style>

<template>
  <div class="main">
    <HeaderSearch
      v-model="tableFilter"
      @search="getList"
      @reset="reset"
    ></HeaderSearch>
    <div class="main-container" ref="minRef">
      <el-tabs v-model="activeName" style="margin-top: 15px"  type="border-card"    @tab-click="tabsChange">
        <el-tab-pane
          v-for="item in tabMapOptions"
          :key="item.key"
          :label="item.label"
          :name="item.key"
       
        >
            <WeTable
              ref="roleTable"
              :columns="columns"
              :selection="true"
              :data="tableData"
              
              :order="false"
              :height="tableHeight"
              @selection-change="selectionChange"
              @afterCurrentPageClick="afterCurrentPageClick"
            >
              <el-table-column align="center" label="操作" width="160px">
                <template slot-scope="{ row }">
                  <el-button type="text" @click="pass(row)">通过</el-button>
                  <el-button type="text" @click="noPass(row)">不通过</el-button>
                  <!-- <el-button type="text" @click="rolebtn(row)">角色授权</el-button>
            <el-button type="text" @click="deleteHandler([{ id: row.id }])">删除</el-button> -->
                </template>
              </el-table-column>
            </WeTable>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div></div>
  </div>
</template>

<script>
import utils from "@/utils/utils";
import { visitorPageAuditList  } from '@/api/visitor';

export default {
  name: "",
  components: {
    // addDialog,
    // editDialog,
    // roleDialog,
  },
  data() {
    return {
      tableHeight: '0',
      tableFilter: [
        
        {
          type: "input",
          label: "访客姓名:",
          key: "visitorName",
          value: "",
        },
      ],
      columns: [
        {
          label: "姓名",
          prop: "visitorName",
          align: "center",
        },
        {
          label: "身份证",
          prop: "visitorCard",
          align: "center",
          width:240
        },
        {
          label: "来访单位",
          prop: "visitorCompany",
          align: "center",
          width:100

        },
        {
          label: "来访人手机号",
          prop: "visitorPhone",
          align: "center",
          width:200

        },
        {
          label: "拜访日期",
          prop: "createTime",
          align: "center",
          width:200

        },
        {
          label: "拜访时间",
          prop: "currentTime",
          align: "center",
        },
        {
          label: "拜访事由",
          prop: "visitorCauses",
          align: "center",
        },
        // {
        //   label: '角色ID',
        //   width: '120px',
        //   prop: 'id',
        //   align: 'center',
        // },
        // {
        //   label: '创建时间',
        //   prop: 'createTime',
        //   align: 'center',
        //   render: (h, row) => {
        //     return h('span', utils.dateFtt(row.createTime, 'yyyy-MM-dd hh:mm:ss'));
        //   },
        // },
        // {
        //   label: '备注',
        //   prop: 'remark',
        //   align: 'center',
        // },
      ],
      tableData:[],
      tableLoading: false,
      multipleSelection: [],
      currentData: {},
      // 定义头部input搜索框
      name: "",
      query: {
        current: 1,
        size: 10,
        executorId: "1751805259625705474",
        intervieweePhone: "18986089916",
        isDeal:0
      },

      id: "",
      tabMapOptions: [
        { label: "待审批", key: "0" },
        { label: "已审批", key: "1" },
      ],
      activeName: "0",
      createdTimes: 0,
      roleType:null
    };
  },
  created(){
    const roleJson = this.$storage.get('userInfo').roleJson
    this.roleType= String(JSON.parse(roleJson).visitor)
    console.log(this.roleType);
  },
  mounted(){
    this.$nextTick(()=>{
    const height = this.$refs.minRef.offsetHeight
    this.tableHeight = String(height - 145)
    console.log(this.tableHeight,'heightheight');
    })
    this.getList()


  },
  methods: {
    unlocked(row) {
      this.$confirm("您确认要解锁么？", "确认解锁", {
        distinguishCancelAndClose: true,
        confirmButtonText: "解锁",
        cancelButtonText: "取消",
      }).then(async () => {
        console.log(row);
        let params = {
          id: row.id,
        };
        unlock(params).then((res) => {
          console.log(res);
          if (res.success) {
            this.$message.success("解锁成功");
            this.getList();
          }
        });
      });
    },
    reset() {
      this.query.visitorName = "";

      this.getList();
    },
    //通过
    pass(){

    },
    //不通过
    noPass(){

    },
    tabsChange(tab,event){
      this.activeName = tab._props.name
      console.log( this.activeName);
      this.getList();

    },  
    async getList(params) {
      this.query.isDeal =  Number(  this.activeName )
      Object.assign(this.query, params);
      const that = this
      visitorPageAuditList(this.query).then((res) => {
        const { records, current, total } = res.data;
        
        this.$refs.roleTable[this.activeName].setPageInfo(current, total, records);

      });
    },
    selectionChange(){

    },
    afterCurrentPageClick(){

    },
    
  },
};
</script>
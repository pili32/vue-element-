<template>
  <div class="login_wapper">
   <el-form class="form_wapper" size="mini" :model="formModel">
      <el-form-item label="用户名:">
        <el-input v-model="formModel.user"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="formModel.password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button @click="loadBtn" type="primary" plain> 登录</el-button>
        <br/>
    <span style="color:red">{{formModel.content}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      formModel: {
        user: "admin",
        password: "123456",
        content:'',
      }
    };
  },
  methods:{
    loadBtn(){
      //这里获取到用户名喝密码并进行判断
      if(this.formModel.user ==="admin" && this.formModel.password==='123456'){
        let loginUser = this.formModel.user==='admin'?'admin':'user'
       this.formModel.content  = ''
       localStorage.setItem("loginUser",loginUser)
       this.$router.push({
         path:'./layout'
       })
      }else{
        this.formModel.content ="输入的用户名或密码错误"
      }
    }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.login_wapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/back.jpg');
  background-size: 100%,100%;
}

.form_wapper {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20%;
  transform: translate(-50%, -50%);
  background-color: #1f2d3d !important;
  padding: 10px 30px;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 14px;
}
</style>

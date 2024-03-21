<template>
  <div class="login-container">
    <div class="login-box">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <span class="title">用户登录</span>
        </div>
        <el-form-item
          prop="username"
        >
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
            <template slot="prepend">
              <i class="icon-username iconfont"></i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            name="password"
            show-password
          >
            <template slot="prepend">
              <i class="icon-password iconfont"></i>
            </template>
          </el-input>
          <!-- <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span> -->
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-button"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
    <!-- <div class="login-box">
      <div class="login-box-right">
        <div class="login-box-right-box">

        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import  validate  from '@/utils/validate'

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
        console.log(value);
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        password: "123456",
        username: "guanyu",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      redirect: undefined,
      loading:false

    };
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     console.log(route);
    //     const query = route.query
    //     if (query) {
    //       this.redirect = query.redirect
    //       this.otherQuery = this.getOtherQuery(query)
    //     }
    //   },
    //   immediate: true
    // }
  },
  methods:{
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('login', this.loginForm)
            .then((res) => {
              console.log(res);

              console.log(this.redirect);
              this.$router.push({ path: 'home' || '/', query: this.otherQuery })
              this.$storage.set('userInfo', res.user);
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  },
  mounted() {
    console.log(process,'processprocessprocess');

  },
};
</script>

<style lang="scss"  >
.login-container {
  height: 100%;
  width: 100%;
  //   background-color: #4982fc;
  text-align: center;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.5) url("../../assets/image/login/big.png");
  .login-box {
    border-radius: 6px;
    background: #fff;
    width: 300px;
    padding: 25px 25px 25px 25px;
    color: #000;
    .title {
      text-align: center;
      color: #707070;
    }
  }
}
.title-container {
  text-align: center;
  font-size: 26px;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
.svg-container {
  padding: 6px 5px 6px 15px;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.el-input-group__prepend {
  background: #fff;
  border-right: 0;
  padding: 0 10px;
}
.login-button {
  width: 100%;
  background: #4982fc;
}
</style>

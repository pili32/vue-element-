// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import store from './store'
import utils from '@/utils/utils';
import 'element-ui/lib/theme-chalk/index.css';
// import './styles/theme/index.scss';
// import '../src/assets/styles/theme/element-variables.scss';



// import ('./styles/theme/index.scss') 

Vue.use(utils);

// Vue.use(Loading.directive);
// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;
Vue.prototype.$echarts = echarts
 
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YYUGh7Lm82GbDKXWCbP0QyBap7r4tgfz'
});

Vue.use(ElementUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

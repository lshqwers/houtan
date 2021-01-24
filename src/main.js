import Vue from 'vue'
import App from './App.vue'
// 在main.js文件中按按需导入组件
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// 导入弹框提示组件
// import { Message } from 'element-ui' // 这个比较特殊,要把它挂载到全局中原型中
import 'element-ui/lib/theme-chalk/index.css'
// 公共的样式在main.js中引用
import '@/assets/css/reset.css'
import router from './router/router.js'
import MyServerHttp from '@/plugins/http.js'
import axios from 'axios'
// main.js中导入字体图标
// import './assets/fonts/iconfont.css'

// import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
// Vue.prototype.自定义属性 = 组件
Vue.prototype.$message = Message

// 调用插件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 使用vue插件
// Vue.use(ElementUI)
// Vue.use(axios) // axios不是vue的插件
Vue.use(MyServerHttp) // 在任意的组件中使用
// Vue.use(axios)

// 在入口文件,给原型加成员,每一个组件都通过this.$http
// Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

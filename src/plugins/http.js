// 插件模块
import axios from 'axios'
const myHttpServer = {}
myHttpServer.install = (Vue) => {
// 添加实例方法
  Vue.prototype.$http = axios
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
}
// 一定要导出
export default myHttpServer // 用this.$http.get() 发送侵权

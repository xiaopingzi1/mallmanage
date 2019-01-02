// 将axios变成vue的插件
import axios from 'axios';
const Http = {};
// 给对象增加属性
Http.install = function (Vue) {
  // 添加实例方法
  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
  
  Vue.prototype.$http = axios;
}
// 导出对象
export default Http;
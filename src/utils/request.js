import axios from 'axios';
import Vue from 'vue';
import { Message } from 'element-ui';
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';

const service = axios.create({
  // 当执行 npm run dev  => .evn.development => /api => 跨域代理
  baseURL: '/api', // npm
  timeout: 5000, // 设置超时时间
});

//请求拦截器
service.interceptors.request.use(
  (config) => {
    //config 配置对象 对象有一个属性很重要 headers
    // const token = localStorage.getItem("TOKEN");
    // if(token){
    //   config.headers.token= token;
    // }
    nprogress.start();
    //添加时间戳
    // if (config.method === 'post') {
    //   config.data = {
    //     ...config.data,
    //     _t: Date.parse(new Date()) / 1000
    //   }
    // } else if (config.method ==='get') {
    //   config.params = {
    //     _t: Date.parse(new Date()) / 1000,
    //     ...config.params
    //   }
    // }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// // 请求拦截器
// service.interceptors.request.use(
//   (config) => {
//     // config 是请求的配置信息
//     // 注入token
//     if (store.getters.username) {
//       // 只有在有token的情况下 才有必要去检查时间戳是否超时
//       if (IsCheckTimeOut()) {
//         // 如果它为true表示 过期了
//         // token没用了 因为超时了
//         store.dispatch("user/logout"); // 登出操作
//         // 跳转到登录页
//         router.push("/login");
//         return Promise.reject(new Error("登录时间超过啦,请重新登录"));
//       }
//       // config.headers['Authorization'] = `Bearer ${store.getters.token}`
//     }
//     return config; // 必须要返回的
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    switch (response.data.code) {
    case 50000:
      Vue.prototype.$message({ type: 'error', message: '系统异常' });
    }
    nprogress.done();

    return response.data;
  },
  (error) => {
    Message.error(error.message); // 提示错误信息
    return Promise.reject(error); // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }
);
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
// function IsCheckTimeOut() {
//   var currentTime = Date.now() // 当前时间戳
//   var timeStamp = getTimeStamp() // 缓存时间戳
//   return (currentTime - timeStamp) / 1000 > TimeOut
// }
export default service;

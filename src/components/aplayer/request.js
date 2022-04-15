import axios from 'axios';

import { Message } from 'element-ui';
// 引入进度条

const service = axios.create({
  // 当执行 npm run dev  => .evn.development => /api => 跨域代理
  baseURL: '/music', // npm
  timeout: 5000, // 设置超时时间
});

//请求拦截器
service.interceptors.request.use(
  (config) => {
    // if (config.method === 'post') {
    //   config.data = {
    //     ...config.data,
    //     _t: Date.parse(new Date()) / 1000,
    //   };
    // } else if (config.method === 'get') {
    //   config.params = {
    //     _t: Date.parse(new Date()) / 1000,
    //     ...config.params,
    //   };
    // }
    return config;
  },
  (error) => {
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
    return response.data;
  },
  (error) => {
    console.log(error);
    Message.error(error.message); // 提示错误信息
    return Promise.reject(new Error('faile')); // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }
);

export default service;

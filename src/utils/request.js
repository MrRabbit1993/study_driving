import axios from "axios";
// import qs from "qs";
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// function S4() {
//   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
// }
// const toString = Object.prototype.toString;
// const LogPrefix = "XHR::::";
// axios.defaults.
// 创建axios实例
const service = axios.create({
  // baseURL: `${window.VUE_APP_API_URL || ""}`, // api的base_url
  //baseURL: "http://195.195.9.81:8000",
  baseURL: "http://10.162.12.170:8012",
  timeout: 305000 // 请求超时时间
});
function isJSON(val) {
  if (typeof val !== "string") {
    return false;
  }
  try {
    const obj = JSON.parse(val);
    if (Object.prototype.toString.call(obj) === "[object Object]") {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

service.interceptors.request.use(
  config => {
    // const guid = S4()
    // const cTimeFlag = LogPrefix + guid + ' done -> ' + config.url
    // console.log(LogPrefix, guid, 'start', config.url)
    // console.time(cTimeFlag)
    // config.cTimeFlag = cTimeFlag
    config.headers["Authorization"] = window.accesstoken; // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded' && data && Object.prototype.toString.call(data) === '[object Object]') {
    //   data = qs.stringify(data)
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// respone拦截器 处理数据
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const { data, request } = response;

    const resData = isJSON(data) ? JSON.parse(data) : data;
    const code = (resData && resData.code) || " -- ";
    const info = "Info:" + code + " " + request.responseURL;
    // const cTimeFlag = config.cTimeFlag
    // console.timeEnd(cTimeFlag)
    // console.log(LogPrefix, info);
    if (resData.code > 300) {
      // if (resData.code === 401) {
      return Promise.reject(info);
    } else {
      if (typeof resData === "object") {
        // res.succes 错误处理
        // 检查是否是空数组
        // if (
        //   toString.call(resData) === "[object Array]" &&
        //   resData.length === 0
        // ) {
        //   console.log(LogPrefix, "空数组:")
        // }
        return resData;
      } else {
        // console.log(LogPrefix, "原始请求:")
        // 针对返回 res 是二进制数据流
        return response;
      }
    }
  },
  error => {
    // console.log('err' + error)// for debug
    return Promise.reject(error);
  }
);

export function request(_param) {
  const {
    method = "get",
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType = "json", // 默认的
    headers = {},
    url = "",
    params,
    data,
    ...otherData
  } = _param;

  if (!url) {
    return new Promise((resolve, reject) => {
      reject("url is null");
    });
  }
  const _method = method.toLowerCase();

  if (_method === "get") {
    return axios({
      responseType,
      url,
      headers,
      method,
      params: params || data || otherData
    });
  }

  if (_method === "post") {
    // 处理
    // if (!headers.hasOwnProperty('Content-Type')) {
    //   headers["Content-Type"] = "application/x-www-form-urlencoded"
    // }
    if (params && data) {
      return axios({
        responseType,
        url,
        headers,
        method,
        params,
        data
      });
    } else {
      const { start, limit, ...resetData } = otherData;
      return axios({
        responseType,
        url,
        headers,
        method,
        params: params || { start, limit },
        data: data || resetData
      });
    }
  }
}
export const ajaxMq = axios.create({
  // baseURL: `${window.VUE_APP_MQ_URL || ""}`, // api的base_url
  timeout: 305000 // 请求超时时间
});

ajaxMq.interceptors.request.use(
  config => {
    config.headers["Authorization"] = window.accesstoken; // 让每个请求携带自定义token 请根据实际情况自行修改
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// respone拦截器 处理数据
ajaxMq.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const { data, request } = response;

    const resData = isJSON(data) ? JSON.parse(data) : data;
    const code = (resData && resData.code) || " -- ";
    const info = "Info:" + code + " " + request.responseURL;
    if (resData.code > 300) {
      // if (resData.code === 401) {
      return Promise.reject(info);
    } else {
      if (typeof resData === "object") {
        return resData;
      } else {
        return response;
      }
    }
  },
  error => {
    // console.log('err' + error)// for debug
    return Promise.reject(error);
  }
);
export default service;

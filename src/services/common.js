import request from "@/utils/request.js";

// 根据页面ID获取容器列表
export function getContainersByPageId(params) {
  return request({
    url: "/entrance/container/getContainerList",
    method: "get",
    params
  });
}
// 获取指定面板数据
export function getPanelDataById(url) {
  return request({
    url,
    method: "get"
  });
}

// import request from "@/utils/request.js";
import { ajaxMq } from "@/utils/request.js";

/**
 * 获取单个组件配置
 */
export function getInfoById(id) {
  return ajaxMq({
    url: `/mq/cockpit/ew/data/modelDataInfo/${id}`,
    method: "get"
  });
}
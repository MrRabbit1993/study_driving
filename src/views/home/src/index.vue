<script>
import page from "@/mixins/page"
import Vue from "vue"
import * as containerCmp from "./../components/containerComponents"
export default {
  name:"agriculture",
  mixins: [page],
  data(){
    return{
      tLTitle: "演示案例",
      pageId:39
    }
  },
  methods:{
    silderChange(event,idx){
      this.$refs.cpTextDemo2_8&&this.$refs.cpTextDemo2_8.updateInfo(event)
    },
    // 渲染容器
    renderContainers(h) {
      return this._l(this.containerList, (item, index) => {
        return (
          <Panel
            key={index}
            title={index===2?"":item.containerName}
            minTitle={item.config.minTitle}
            class={this.handleContainerClass(item)}
          >
            {h(item.componentCode, {
              props: {
                config: item.config,
                ...item
              },
              on:{
                'silderChange':(event,idx)=>this.silderChange(event,idx)
              },
              ref:`${item.componentCode}_${item.orderNo}`
            })}
          </Panel>
        );
      });
    },
    renderCustom(h){
      const item = {
        apiContentType: 1,
        apiParams: null,
        apiReqType: null,
        componentCode: "cpTextDemo2",
        containerName: "测试容器数据2",
        containerType: 2,
        createDate: null,
        dataUrl: null,
        dealFunction: "",
        id: 220,
        jsonData: { "code": "200",   "success": true,   "message": "成功",   "data": {     "2845": [{"name":"选项1","id":0},{"name":"选项2","id":1},{"name":"选项3","id":2}],     "2846": [{       "INDEX_SSSJ": "202006",       "INDEX_UNIT": "件",       "INDEX_VALUE": "56",       "INDEX_CLASSIFICATION": "商事登记审批事项",       "INDEX_FULL_NAME": "动物诊疗许可"     }],     "2847": [{       "INDEX_SSSJ": "202006",       "INDEX_UNIT": "件",       "INDEX_VALUE": "15",       "INDEX_CLASSIFICATION": "商事登记审批事项",       "INDEX_FULL_NAME": "农药生产丶经营许可"     }],     "2848": [{       "INDEX_SSSJ": "202006",       "INDEX_UNIT": "件",       "INDEX_VALUE": "12",       "INDEX_CLASSIFICATION": "商事登记审批事项",       "INDEX_FULL_NAME": "兽药生产，经营许可"     }],     "2849": [{       "INDEX_SSSJ": "202006",       "INDEX_UNIT": "件",       "INDEX_VALUE": "5",       "INDEX_CLASSIFICATION": "商事登记审批事项",       "INDEX_FULL_NAME": "陆地野生动物及其制品出售丶购物丶利用许可"     }],     "2850": [{       "INDEX_SSSJ": "202006",       "INDEX_UNIT": "件",       "INDEX_VALUE": "35",       "INDEX_CLASSIFICATION": "商事登记审批事项",       "INDEX_FULL_NAME": "种畜禽生产经营许可"     }]   },   "totals": null },
        note: null,
        orderNo: 8,
        panelId: null,
        paramValue: null,
        status: 1,
        urlType: 1,
        config:{}
      }
      return this._e(0)
      return (
        <Panel
          title="测试容器数据2"
          minTitle="截止上月"
            class="container-cpTextDemo2-8"
          >
            {h("cpTextDemo2", {
              props: {
                config: item.config,
                ...item
              },
              on:{
                'silderChange':(event,idx)=>this.silderChange(event,idx)
              },
              ref:"cpTextDemo2_8"
            })}
          </Panel>
      )
    }
  },
  beforeCreate() {
    Object.keys(containerCmp).forEach((key) => {
      Vue.component(key, Vue.extend(containerCmp[key]));
    });
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss"
</style>
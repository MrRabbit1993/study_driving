<template>
  <div class="agriculture">
    <twoLevelTitle :title="tLTitle" />
      <Panel
        v-for="(item, index) in containerList"
        :key="index"
        :title="index===2?'':item.containerName"
        :minTitle="item.config.minTitle"
        :class="`container-${item.componentCode}-${item.orderNo}`"
      >
      <component
        :is="item.componentCode"
        :config="item.config"
        @silderChange="silderChange"
        :ref="`${item.componentCode}_${item.orderNo}`"
      />
      </Panel>
  </div>
</template>
<script>
import * as containerCmp from "./../components/containerComponents"
import twoLevelTitle from "@/components/twoLevelTitle"
import * as Comp from "@/components/chartsComponents.js";
import Panel from "@/components/basePanel/index.js";
import { getContainersByPageId, getPanelDataById } from "@/services/common.js";
import Vue from "vue"
export default {
  name:"agriculture",
  components:{twoLevelTitle,Panel},
  data(){
    return{
      tLTitle: "演示案例",
      pageId:39,
      containerList:[],
      count: 0
    }
  },
  methods:{
    handleContainerClass(item) {
      return `container-${item.componentCode}-${item.orderNo}`;
    },
    formatData(item, data) {
      if (!item.dataUrl) {
        return;
      } else {
        if (item.dealFunction) {
          item.config = new Function("res", item.dealFunction)(data);
        } else {
          item.config = data;
        }
      }
    },
    isFinished(targetLength, data) {
      this.count++;
      if (this.count === targetLength) {
        this.containerList = data;
      }
    },
    silderChange(event,idx){
      this.$refs.cpTextDemo2_8&&this.$refs.cpTextDemo2_8[0].updateInfo(event)
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
    // 获取容器
    getContainers() {
      getContainersByPageId({
        pageId: this.pageId
      })
        .then(({ success, data }) => {
          if (!success || !data) {
            throw new Error("data error");
          }
          return data;
        })
        .then(data => {
          return data.sort((a, b) => a.orderNo - b.orderNo);
        })
        .then(data => {
          const length = data.length;
          //----------------------------模拟处理---------------------------
          data.forEach(item => {
            if(item.orderNo!==6){item.dataUrl = 1}
            if (!item.dataUrl) {
              item.config = {
                title: item.containerName,
                ...JSON.parse(item.jsonData)
              };
              this.formatData(item, item.jsonData);
              this.isFinished(length, data);
            } else {
              this.formatData(item, JSON.parse(item.jsonData));
              this.isFinished(length, data);
            }
          });
          //----------------------------模拟处理---------------------------
          //----------------------------标准处理---------------------------
          // data.forEach(item => {
          //   if (!item.dataUrl) {
          //     item.config = {
          //       title: item.containerName,
          //       ...JSON.parse(item.jsonData)
          //     };
          //     this.formatData(item, item.jsonData);
          //     this.isFinished(length, data);
          //   } else {
          //     getPanelDataById(item.dataUrl)
          //       .then(res => {
          //         this.formatData(item, res);
          //         this.isFinished(length, data);
          //       })
          //       .catch(() => {
          //         this.isFinished(length, data);
          //       });
          //   }
          // });
          //----------------------------标准处理---------------------------
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  beforeCreate() {
    Object.keys(containerCmp).forEach((key) => {
      Vue.component(key, Vue.extend(containerCmp[key]));
    });
    Object.keys(Comp).forEach((key) => {
      Vue.component(key, Vue.extend(Comp[key]));
    });
  },
  created() {
    this.getContainers();
  },
}
</script>
<style lang="scss" scoped>
@import "./index.scss"
</style>
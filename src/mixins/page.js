import Vue from "vue";
// import * as Comp from "@/containers/index.js";
import * as Comp from "@/components/chartsComponents.js";
import Panel from "@/components/basePanel/index.js";
import twoLevelTitle from "@/components/twoLevelTitle";
import { getContainersByPageId, getPanelDataById } from "@/services/common.js";

export default {
  data() {
    return {
      tLTitle: "",
      pageId: "",
      containerList: [],
      count: 0
    };
  },
  components: {
    twoLevelTitle,
    Panel
  },
  methods: {
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
    },
    // 渲染容器
    renderContainers(h) {
      return this._l(this.containerList, (item, index) => {
        return (
          <Panel
            key={index}
            title={item.containerName}
            minTitle={item.minTitle}
            class={this.handleContainerClass(item)}
          >
            {h(item.componentCode, {
              props: {
                config: item.config,
                ...item
              }
            })}
          </Panel>
        );
      });
    },
    // 注册组件
    registerComponents() {
      Object.keys(Comp).forEach(key => {
        Vue.component(key, Vue.extend(Comp[key]));
      });
    },
    // 使用空白节点占位
    renderCustom() {
      return this._e();
    }
  },
  created() {
    this.registerComponents();
    this.getContainers();
  },
  mounted() {
    // 增加class名
    if (this.$options.name) {
      this.$el.classList.add(this.$options.name || "");
    }
  },
  render(h) {
    return (
      <div class="page">
        <twoLevelTitle title={this.tLTitle} />
        {this.renderContainers(h)}
        {this.renderCustom(h)}
      </div>
    );
  }
};

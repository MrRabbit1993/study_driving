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
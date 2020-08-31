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
      console.log("事件",event,idx)
      console.log(this.$refs)
      // console.log(this.$refs.cpTextDemo)
    },
    // 渲染容器
    renderContainers(h) {
      console.log("参数",this.containerList,this)
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
                'silderChange':(event,idx,ins)=>this.silderChange(event,idx,ins)
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
.agriculture{
  width:100%;
  height:100%;
  position: relative;
  .container-agricultureLeft-1{
    position: absolute;
    width:920px;
    height:460px;
    top: 120px;
    left: 20px;
  }
  .container-agricultureLeft-2{
    position: absolute;
    width:920px;
    height:460px;
    top:600px;
    left:20px;
  }
  .container-infoPanel1_4_2-3{
    position: absolute;
    top: 120px;
    left:50%;
    transform: translateX(-50%);
    width:1920px;
    height:168px;
    ::v-deep{
      .info-panel-1-4-1-content{
        height:100%;
        align-items: center;
        .block{
          .i-p-1-4-content{
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            // line-height:normal;
            .value{
              font-size: 52px;
              font-family: PingFangSC, PingFangSC-Medium;
              font-weight: 500;
            }
            .unit{
              font-size: 28px;
            }
          }
          .i-p-1-4-title{
            font-size: 24px;
            font-family: PingFangSC, PingFangSC-Regular;

          }
        }
      }
    }
  }
  .container-agricultureCenter-4{
    position: absolute;
    left:960px;
    top:308px;
    width:626px;
    height:752px;
  }
  .container-agricultureCenter-5{
    position: absolute;
    left:1606px;
    top:308px;
    width:626px;
    height:752px;
  }
  .container-agricultureGateData-6{
    position: absolute;
    left:2252px;
    top:308px;
    width:626px;
    height:752px;
  }
  .container-cpTextDemo-7{
    position: absolute;
    right: 20px;
    top:120px;
    width:920px;
    height:460px;
  }
  .container-cpTextDemo2-8{
    position: absolute;
    right: 20px;
    top:600px;
    width:920px;
    height:460px;
  }
}
</style>
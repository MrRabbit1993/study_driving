<script>
import Panel from "@/components/basePanel/index.js";
import chartPanel9 from "@/components/chartPanel9/index.js";
export default {
  name:"pie-container",
  props: {
    config: {  //  数据及配置项
      type: Object,
      default:()=>{}
    },
  },
  data(){
    return{
      pieChartData:{}
    }
  },
  created(){
    this.setPieChart(this.config.chartData)
  },
  methods:{
    setPieChart(data) {
      const color = ['#3196fa', '#EF4864FF', '#FACC14FF', '#2FC25BFF', '#B620E0FF','#6236FFFF']
      let config = {
        blockList:data.map((item,index)=>({
            value: item.value,
            unit: item.unit,
            color: color[index],
            name: item.name,
            percent: item.percent
          })),
        option:{
          color,
          series: [
            {
              type: 'pie',
              center: ['50%', '50%'],
              radius: ['65%', '85%'],
              minAngle: 10,
              label: {
                position: 'center',
                formatter: () => {
                  return `{top|${this.config.total}}{total|${this.config.unit}}`;
                },
                rich: {
                  top: {
                    color: '#FFFFFF',
                    fontSize: 38,
                    fontWeight: 400,
                    lineHeight: 38
                  },
                  total: {
                    color: '#FFFFFF',
                    fontSize: 38,
                    fontWeight: 400,
                    lineHeight: 38
                  },
                }
              },
              data
            }]
        }
      }
      this.pieChartData = config
    }
  },
  render(){
    return(
      <div class="agriculture-pie-container">
        <chartPanel9 config={this.pieChartData}  class="pie-chart" id="pie-chart"/>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.agriculture-pie-container{
  width:100%;
  height:100%;
  #pie-chart{
    ::v-deep{
      .block-list{
        margin-left:20px;
        .block{
          margin-bottom: 20px;
          height:28px;
          .block-tip-title{
            display: flex;
            align-items: center;
            .block-crcle{
              width:16px;
              height:16px;
              margin-right:12px;
            }
            .block-value{
              font-size: 20px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: left;
              color: rgba(255,255,255,0.8);
              line-height: 24px;
            }
            .block-tip-precent{
              display: none;
            }
            .block-tip-precent2{
              margin-left:auto;
              font-size: 24px;
              font-family: PingFangSC, PingFangSC-Semibold;
              font-weight: 600;
              text-align: right;
              color: #44caff;
              line-height: 28px;
              .block-tip-unit{
                font-size: 16px;
                margin-left:4px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
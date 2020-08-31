<script>
// 沿江闸机数据
import ScrollBar from '@/components/scrollbar/index.js'
import Chart from '@/components/chart'
import MiddleTitle from '@/components/middleTitle'

export default {
  naem: 'gate-data',
  components: {
    ScrollBar,
    Chart,
    MiddleTitle
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.initChartData()
  },
  methods: {
    initChartData() {
      const { chartData } = this.config
      this.chartBarOption.xAxis.data = chartData.x
      this.chartBarOption.yAxis.name = chartData.unit
      this.chartBarOption.series[0].data = chartData.y
    }
  },
  render() {
    const { list, chartData } = this.config
    const currentDate = list[this.currentIndex]
    return (
      <div class="panel-container">
        <div class="chart-box chart-box-top">
          <ScrollBar class="list">
            {list.map((item, index) => (
              <div
                class={['item', index === this.currentIndex ? 'active' : '']}
                on-click={() => {
                  this.currentIndex = index
                }}
              >
                {item.name}
              </div>
            ))}
          </ScrollBar>
          <div class="details">
            <div class="row">
              <div class="item">
                <div class="value">
                  {currentDate.pumpStation}
                  <span class="unit">座</span>
                </div>
                <div class="label">沿线泵站数</div>
              </div>
              <div class="item">
                <div class="value">
                  {currentDate.sluice}
                  <span class="unit">座</span>
                </div>
                <div class="label">水闸数量</div>
              </div>
            </div>
            <div class="row">
              <div class="item">
                <div class="value">
                  {currentDate.workPump}
                  <span class="unit">台</span>
                </div>
                <div class="label">泵站开启机组数量</div>
              </div>
            </div>
            <div class="row">
              <div class="item">
                <div class="value">
                  {currentDate.waterLevel}
                  <span class="unit">米</span>
                </div>
                <div class="label">水位</div>
              </div>
              <div class="item">
                <div class="value">
                  {currentDate.flow}
                  <span class="unit">立方米/秒</span>
                </div>
                <div class="label">流量</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-box chart-box-bottom">
          <MiddleTitle title={chartData.title} class="middletitle" />
          <Chart option={this.chartBarOption} class="chart-bar" />
        </div>
      </div>
    )
  },
  data() {
    return {
      currentIndex: 0,
      chartBarOption: {
        grid: {
          left: 46
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.5)',
              opacity: 1
            }
          },
          axisLabel: {
            fontFamily: 'PingFangSC, PingFangSC-Regular',
            fontSize: 14,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)'
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '(立方米/秒)',
          nameTextStyle: {
            padding: [0, 80, 0, 0],
            fontFamily: 'PingFangSC, PingFangSC-Regular',
            fontSize: 14,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)'
          },
          axisLabel: {
            fontFamily: 'PingFangSC, PingFangSC-Regular',
            fontSize: 14,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)'
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 50,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(47,194,91,0)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(47,194,91,1)'
                  }
                ]
              }
            },
            data: []
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-container {
  margin-top: 18px;
  width: 100%;
  height: 100%;
  .chart-box {
    width: 100%;
    height: calc((100% - 58px) / 2);
    &:last-child {
      margin-top: 40px;
    }
  }
  .chart-box-top {
    display: flex;
    .list {
      flex: none;
      width: 108px;
      height: 100%;
      border: 2px solid rgba(68, 202, 255, 0.5);
      margin-right: 30px;
      padding: 0 10px;
      padding-bottom: 16px;
      .item {
        width: 100%;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 16px;
        cursor: pointer;
        &.active {
          font-size: 24px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #44caff;
        }
      }
    }
    .details {
      flex: 1;
      display: flex;
      flex-direction: column;
      .row {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item {
          .value {
            font-size: 44px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            text-align: center;
            color: #44caff;
            .unit {
              font-size: 20px;
              font-family: PingFangSC, PingFangSC-Medium;
              font-weight: 500;
              margin-left: 4px;
            }
          }
          .label {
            font-size: 20px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            margin-top: 8px;
          }
        }
      }
    }
  }
  .chart-box-bottom {
    .middletitle {
      margin-top: 40px;
    }
    .chart-bar {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
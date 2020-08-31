<script>
import MiddleTitle from "@/components/middleTitle"
import chart from "@/components/chart"
export default {
  name: "bar-line-container",
  components: {MiddleTitle, chart },
  props: {
    config: {
      //  数据及配置项
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      chartBarOption: null,
      chartLineOption: null
    };
  },
  created() {
    this._initLineOption()
    this._initBarOption()
    const { list } = this.config
    this.chartBarOption.yAxis.name = list[0].unit
    this.chartBarOption.xAxis.data = list[0].chartData.xAxis
    const fieldKeys = Object.keys(list[0].chartData.field)
    fieldKeys.forEach((item, idx) => {
      if(fieldKeys.length===1){
        this.chartBarOption.legend.show = false
        this.chartBarOption.series.splice(1,this.chartBarOption.series.length-1)
        this.chartBarOption.series[idx].barWidth = 50
      }
      this.chartBarOption.series[idx].data = list[0].chartData[item]
      this.chartBarOption.series[idx].name = list[0].chartData.field[item]
    })

    this.chartLineOption.yAxis.name = list[1].unit
    Object.keys(list[1].chartData.field).forEach((item, idx) => {
      this.chartLineOption.series[idx].data = list[1].chartData[item]
      this.chartLineOption.series[idx].name = list[1].chartData.field[item]
    })
    this.chartLineOption.xAxis.data = list[1].chartData.xAxis
  },
  methods: {
    _initLineOption() {
      this.chartLineOption = {
        legend: {
          icon: 'rect',
          itemWidth: 16,
          itemHeight: 2,
          textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12
          },
          top: 25,
          right: 0
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.5)",
              opacity: 1
            }
          },
          axisLabel: {
            fontFamily: "PingFangSC, PingFangSC-Regular",
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)"
          }
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            padding: [0, 40, 0, 0],
            fontFamily: "PingFangSC, PingFangSC-Regular",
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)"
          },
          axisLabel: {
            fontFamily: "PingFangSC, PingFangSC-Regular",
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)"
          }
        },
        series: [
          {
            type: "line",
            symbol: "none",
            areaStyle: {
              opacity: 0.4,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.01,
                    color: "#3196fa" // 0% 处的颜色
                  },
                  {
                    offset: 0.99,
                    color: "rgba(49,150,250,0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          {
            type: "line",
            symbol: "none",
            areaStyle: {
              opacity: 0.4,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.01,
                    color: "#EF4864FF" // 0% 处的颜色
                  },
                  {
                    offset: 0.99,
                    color: "#EF486400" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          {
            type: "line",
            symbol: "none",
            areaStyle: {
              opacity: 0.4,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.01,
                    color: "#FACC14FF" // 0% 处的颜色
                  },
                  {
                    offset: 0.99,
                    color: "#FACC1400" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          {
            type: "line",
            symbol: "none",
            areaStyle: {
              opacity: 0.4,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.01,
                    color: "#2fc25b" // 0% 处的颜色
                  },
                  {
                    offset: 0.99,
                    color: "#2FC25B00" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }
    },
    _initBarOption() {
      this.chartBarOption = {
        legend: {
          icon: 'rect',
          itemWidth: 16,
          itemHeight: 8,
          textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12
          },
          top: 25,
          right: 0
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.5)",
              opacity: 1
            }
          },
          axisLabel: {
            fontFamily: "PingFangSC, PingFangSC-Regular",
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)"
          }
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            padding: [0, 40, 0, 0],
            fontFamily: "PingFangSC, PingFangSC-Regular",
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)"
          },
          axisLabel: {
            fontFamily: "PingFangSC, PingFangSC-Regular",
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)"
          }
        },
        series: [
          {
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(49,150,250,0)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#3196fa"
                  }
                ]
              }
            }
          },
          {
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#EF486400" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#EF4864FF"
                  }
                ]
              }
            }
          },
          {
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FACC1400" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FACC14FF"
                  }
                ]
              }
            }
          },
          {
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#2FC25B00" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#2FC25BFF"
                  }
                ]
              }
            }
          }
        ]
      };
    }
  },
  render() {
    return (
        <div class="chart-container">
          {this.config.list.map((item, idx) => {
            return (
              <div class={["chart-box", `chart-box-${idx}`]}>
                <MiddleTitle title={item.title} class="middletitle" />
                {idx < 1 ? <chart option={this.chartBarOption} /> : <chart option={this.chartLineOption} />}
              </div>
            );
          })}
        </div>
    );
  }
};
</script>
<style lang="scss" scoped>
  .chart-container {
    margin-top: 18px;
    width: 100%;
    height: 100%;

    .chart-box {
      width: 100%;
      height: calc((100% - 58px) / 2);

      &-1 {
        margin-top: 40px;
      }
    }
  }
</style>
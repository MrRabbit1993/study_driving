<template>
  <div
    :class="['comp-chart-panel-9', direction === 'column' ? 'column' : null]"
  >
    <Chart class="block-chart" :option="chartOption" />
    <div class="block-list">
      <div v-for="(block, index) in blockList" :key="index">
        <div class="block">
          <div class="block-tip-title">
            <span
              class="block-crcle mr6"
              :style="{ background: block.color }"
            ></span>
            <span class="block-value">{{ block.name }}</span>
            <span class="block-tip-precent">{{ block.percent }}</span>
            <span class="block-tip-precent2">{{ block.value }}<span class="block-tip-unit">{{ block.unit }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "@/components/chart/index.js";
export default {
  name: "ChartPanelComponent4",
  props: ['config'],
  components: {
    Chart
  },
  computed: {
    blockList() {
      return this.config.blockList || [];
    },
    chartOption() {
      return this.config.option;
    },
    direction() {
      return this.config.direction || "row";
    }
  }
};
</script>
<style lang="scss" scoped>
.comp-chart-panel-9 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  &.column {
    flex-direction: column;
  }
  .block-chart {
    width: 35%;
    height: 100%;
  }
  .block-list {
    flex: 1;
    .block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 10px;
      flex-direction: column;
      height: 20px;
      .block-tip-title {
        text-align: left;
        width: 100%;
        height: 100%;
      }
      .block-tip-precent {
        margin-left: 10px;
        text-align: right;
        width: 50px;
        float: right;
        height: 100%;
        display: inline-block;
        line-height: 20px;
      }
      .block-value{
        display: inline-block;
        height: 100%;
        line-height: 20px;
      }
      .block-tip-precent2 {
        display: inline-block;
        text-align: right;
        /*padding-left: 20px;*/
        height: 100%;
        float: right;
        line-height: 20px;
      }
      .block-crcle {
        width: 9px;
        height: 9px;
        border-radius: 50%;
      }
    }
  }
}
</style>

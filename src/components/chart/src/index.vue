<template>
  <div class="chart"></div>
</template>
<script>
import Vue from "vue";
//引入echart样式模板
import walden from "./walden.js";
// 注册样式
Vue.prototype.$echarts.registerTheme("walden", walden);
export default {
  name: "testComponent",
  props: {
    option: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    option: {
      handler(option) {
        this.chart.setOption(option, true);
      },
      deep: true
    }
  },
  mounted() {
    const _this = this;
    this.chart = this.$echarts.init(this.$el, "walden");
    this.chart.setOption(this.option);
    this.chart.on("click", params => {
      _this.$emit("chartClick", params);
    });
    this.$emit("init", this.chart);
  }
};
</script>
<style lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="info-panel-1_4-1">
    <div
      class="info-panel-1-4-1-content"
      :style="
        direction === 'column' ? 'flex-direction:column;' : 'flex-direction:row'
      "
    >
      <div class="block" v-for="(block, index) in config.option" :key="index">
        <Count
          class="i-p-1-4-content"
          :value="block.value"
          :unit="block.unit"
        />
        <div class="i-p-1-4-title">{{ block.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Count from "@/components/numberCount/index.js";
export default {
  name: "testComponent",
  props: {
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    direction: {
      type: String,
      default: "row"
    }
  },
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    Count
  }
};
</script>
<style lang="scss">
.info-panel-1_4-1 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .i-p-1-4-1-m-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    height: 16px;
    color: rgba(68, 202, 255, 1);
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    span:nth-child(1) {
      font-size: 16px;
    }
    span:nth-child(2) {
      font-weight: 100;
      font-size: 12px;
    }
  }
  .info-panel-1-4-1-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    min-height: calc(100% - 16px);
    .block {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;
      min-height: 45px;
      .count {
        height: 24px;
        line-height: 24px;
      }
      .i-p-1-4-title {
        height: 32px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 400;
        font-size: 14px;
        line-height: 32px;
      }
      .i-p-1-4-content {
        flex: 1;
        box-sizing: border-box;
      }
    }
  }
}
</style>

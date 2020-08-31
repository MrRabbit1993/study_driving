<template>
  <div class="count">
    <span class="value">{{ value }}</span>
    <span class="unit">{{ unit }}</span>
  </div>
</template>

<script>
export default {
  name: "count",
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    unit: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss">
.count {
  .value {
    font-size: 36px;
    color: rgba(68, 202, 255, 1);
  }
  .unit {
    font-size: 16px;
    color: rgba(68, 202, 255, 1);
  }
}
</style>

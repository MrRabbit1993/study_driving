<template>
  <div class="middle-title">
    <div class="line"></div>
    <div class="settitle">{{ title }}</div>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  name: "basePanelComponent",
  props: {
    title: {
      type: String,
      default: ""
    }
  },

  mounted() {}
};
</script>
<style lang="scss">
.middle-title {
  width: 100%;
  height: 16px;
  display: flex;
  // justify-content: flex-start;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .line {
    width: 32px;
    height: 2px;
    border: 1px solid rgba(68, 202, 255, 1);
    /*margin-top: 9px;*/
  }
  .settitle {
    /*height: 16px;*/
    font-size: 16px;
    font-weight: 500;
    color: rgba(68, 202, 255, 1);
    margin: 0 8px;
  }
}
</style>

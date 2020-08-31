<template>
  <div class="base-panel">
    <div class="title" v-if="title || minTitle">
      <span>{{ title }}</span
      ><span>{{ minTitle }}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "basePanelComponent",
  props: {
    title: {
      type: String,
      default: ""
    },
    minTitle: {
      type: String,
      default: ""
    }
  },

  mounted() {}
};
</script>
<style lang="scss">
.base-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px;
  border: 1px solid rgba(7, 95, 255, 1);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(2, 37, 97, 1) 0%,
    rgba(32, 20, 97, 1) 100%
  );
  box-shadow: 0 0 50px 0 rgba(7, 95, 255, 1) inset;
  z-index: 11;
  .title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 0 0 15px 0;
    height: 28px;
    color: rgba(68, 202, 255, 1);
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    span:nth-child(1) {
      font-size: 24px;
    }
    span:nth-child(2) {
      font-size: 16px;
      font-weight: 100;
    }
  }
  .content {
    flex: 1;
    min-height: calc(100% - 43px);
  }
}
</style>

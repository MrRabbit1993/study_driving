<template>
  <div class="text-panel-1 percent">
    <span class="prefix" v-if="prefix">{{ prefix }}</span>
    <img v-if="type == '0'" src="@/assets/img/down.png" alt="下降" />
    <img v-if="type == '1'" src="@/assets/img/up.png" alt="上升" />
    <span class="percent1" :class="color">{{ percent }}</span>
    <span class="unit" :class="color">{{ unit }}</span>
  </div>
</template>
<script>
export default {
  name: "count",
  filters: {},
  props: {
    prefix: {
      type: String,
      default: ""
    },
    percent: {
      type: [Number, String],
      default: ""
    },
    unit: {
      type: String,
      default: ""
    },
    type: {
      type: [Number, String],
      default: ""
    }
  },
  computed: {
    color() {
      return this.type === "" ? "blue" : this.type == 0 ? "red" : "green";
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="scss">
.text-panel-1.percent {
  margin-right: 10px;
  display: flex;
  align-items: baseline;
  .prefix {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
  .percent1 {
    font-size: 14px;
  }
  .unit {
    font-size: 14px;
  }
  .green {
    color: rgba(47, 194, 91, 1);
  }
  .red {
    color: rgba(240, 72, 100, 1);
  }
  .blue {
    color: #44caff;
  }
  img {
    width: 13px;
    height: 13px;
  }
}
</style>

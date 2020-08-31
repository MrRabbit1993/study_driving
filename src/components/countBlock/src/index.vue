<template>
  <div class="count-block">
    <div class="title">{{ title }}</div>
    <Count :value="value.value" :unit="value.unit"></Count>
    <div class="info">
      <Percent
        :prefix="item.prefix"
        :percent="item.percent"
        :unit="item.unit"
        :type="item.type"
        v-for="(item, index) in info"
        :key="index"
      ></Percent>
    </div>
  </div>
</template>

<script>
import Count from "@/components/numberCount/index.js";
import Percent from "@/components/percent/index.js";

export default {
  name: "countBlock",
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: Object,
      default() {
        return {
          value: 0,
          unit: ""
        };
      }
    },
    info: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Count,
    Percent
  }
};
</script>

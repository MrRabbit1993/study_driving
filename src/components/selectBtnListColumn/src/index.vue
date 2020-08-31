<script>
export default {
  name: "testComponent",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currenIndex: 0
    };
  },
  methods: {
    blockClick(index, item) {
      this.currenIndex = index;
      this.$emit("blockClick", item,index);
    }
  },
  mounted() {
    this.currenIndex = this.activeIndex;
  },
  render() {
    return (
      <div class="select-btn-list-column">
        {this._l(this.list, (item, index) => {
          return (
            <div
              class={["block", index == this.currenIndex ? "block-active" : ""]}
              onclick={() => this.blockClick(index, item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }
};
</script>
<style lang="scss" scoped>
.select-btn-list-column {
  width: 100%;
  display: flex;
  flex-direction: column;
  .block {
    height: 40px;
    line-height: 40px;
    padding-left:10px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    border-left: 2px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    &.block-active {
      color: #39a7df;
      border-left: 4px solid #44caff;
    }
  }
}
</style>

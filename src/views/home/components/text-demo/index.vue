<script>
import SelectBtnListColumn from "@/components/selectBtnListColumn/index.js";
export default {
  name: "text-demo",
  components:{
    SelectBtnListColumn
  },
  props: {
    config: {
      //  数据及配置项
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      activeIndex:0
    };
  },
  created() {

  },
  methods: {
    updateIdx(idx){
      this.activeIndex = idx
    },
    _change(item,idx){
      this.activeIndex = idx
      this.$emit("silderChange",item,idx)
    }
  },
  render() {
    return (
        <div class="chart-container">
          <SelectBtnListColumn
            class="btn-lists"
            list={this.config.dataList}
            onBlockClick={(item, idx) => this._change(item, idx)}
            activeIndex={this.activeIndex}
          />
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
  }
</style>
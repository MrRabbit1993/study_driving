<script>
import ScrollBar from "@/components/scrollbar/index.js";
export default {
  name: "accessSystem",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    ScrollBar
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showorhide() {
      let setwidth2 = document.getElementById("jrSystemdetail");
      if (this.show == false) {
        this.show = true;
        setwidth2.style.webkitTransform = "translate(-466px)";
      } else {
        this.show = false;
        setwidth2.style.webkitTransform = "translate(0)";
      }
    },
    jump(item) {
      if (item.systemUrl.includes("http")) {
        this.$router.push({
          path: "/iframe",
          query: {
            url: item.systemUrl,
            width: item.width || 1920
          }
        });
      } else {
        this.$router.push({
          path: item.systemUrl
        });
      }
    }
  },
  render() {
    return (
      <div class="acessSystem">
        <div class="system" onclick={this.showorhide}>
          <img class="system-icon" src={require("./sys.png")} />
          <span v-show={this.show} class="system-title">
            接入系统
          </span>
        </div>
        <div id="jrSystemdetail" class="jrSystem">
          <ScrollBar class="setjrSystem">
            <div class="jrSystemdetail">
              {this._l(this.data, item => {
                return (
                  <div class="detailSystem" onclick={() => this.jump(item)}>
                    <img
                      src={
                        item.systemUrl && item.systemUrl.includes("http")
                          ? require("./outside.png")
                          : require("./inner.png")
                      }
                    />
                    <span class="detailSystemname">{item.systemName}</span>
                  </div>
                );
              })}
            </div>
          </ScrollBar>
        </div>
      </div>
    );
  }
};
</script>
<style lang="scss">
.acessSystem {
  z-index: 9999999;
  .system {
    position: absolute;
    top: 30px;
    right: 20px;
    padding: 0 20px;
    display: flex;
    border-radius: 8px;
    border: 1px solid rgba(7, 95, 255, 1);
    box-shadow: 0px 0px 30px 0px rgba(7, 95, 255, 1) inset;
    &-icon {
      width: 64px;
      height: 64px;
      cursor: pointer;
    }
    &-title {
      height: 24px;
      font-size: 24px;
      font-weight: 500;
      color: rgba(120, 181, 255, 1);
      line-height: 64px;
    }
  }
  .jrSystem {
    position: absolute;
    top: 120px;
    right: -466px;
    width: 466px;
    height: 940px;
    z-index: 1000;
    background: linear-gradient(
      270deg,
      rgba(0, 5, 30, 1) 0%,
      rgba(0, 5, 50, 0.8) 75%,
      rgba(0, 5, 50, 0) 100%
    );
    transition: all 2s;
    .setjrSystem {
      overflow-y: scroll;
      width: 466px;
      height: 940px;
    }
    .detailSystem {
      float: right;
      display: flex;
      align-items: center;
      margin: 10px auto;
      width: 320px;
      height: 88px;
      color: rgba(68, 202, 255, 0.7);
      cursor: pointer;
      img {
        width: 36px;
        height: 36px;
      }
      .detailSystemname {
        margin-left: 10px;
        font-weight: 600;
        font-size: 24px;
      }
    }
  }
}
</style>

<template>
  <div class="twoLevelTitle">
    <div class="twoLevelTitle-left">
      <div
        class="tlgoback"
        @click="goBack"
        v-if="showBack && showBackButton"
      ></div>
      <div class="tltext">{{ title }}</div>
    </div>
    <div class="twoLevelTitle-right">
      <div>欢迎进入</div>
      <div>{{ nowTime }}</div>
    </div>
    <div class="twoLevelTitle-assess-system" v-if="showButton">
      <accessSystem :data="dataList" />
    </div>
  </div>
</template>
<script>
import accessSystem from "@/components/accessSystem";
import { getSCREENMenu } from "@/utils/auth.js";
const hideBtnArr = [
  "/home",
  "/homepage",
  "/pageList",
  "/command",
  "/perspectiveXS"
];
export default {
  name: "twoLevelTitle",
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: true
    }
  },
  components: {
    accessSystem
  },
  computed: {
    routePath() {
      return this.$route && this.$route.path;
    },
    showBackButton() {
      if (process.env.NODE_ENV === "development") {
        return true;
      }
      const allAuth = getSCREENMenu().some(item => {
        return item.url === "/home";
      });
      return allAuth;
    },
    showButton() {
      const currentPath = this.$route && this.$route.path;
      if (hideBtnArr.includes(currentPath) || this.dataList.length < 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  data() {
    return {
      timeId: null,
      nowTime: new Date().toLocaleString(),
      dataList: []
    };
  },
  methods: {
    // 返回
    goBack() {
      if (
        this.title == "管理专题" ||
        this.title == "综合指挥" ||
        this.title == "特色场景" ||
        this.title == "行政部门"
      ) {
        this.$router.push("/homepage");
      } else {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    this.timeId = setInterval(() => {
      this.nowTime = new Date().toLocaleString();
    }, 1000);
  },
  created() {
    getSCREENMenu().map(item => {
      item.systemName = item.text;
      item.systemUrl = item.url;
    });
    this.dataList = getSCREENMenu().filter(item => {
      return item.url !== this.routePath && item.url !== "/home";
    });
  },
  beforeDestroy() {
    if (this.timeId) {
      clearInterval(this.timeId);
    }
  }
};
</script>
<style lang="scss">
.twoLevelTitle {
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  color: rgba(68, 202, 255, 1);
  font-weight: 500;
  line-height: 58px;
  .twoLevelTitle-left {
    display: flex;
    align-items: center;
    position: absolute;
    left: 776px;
    .tlgoback {
      margin-right: 27px;
      width: 160px;
      height: 69px;
      background: url("./l2goback.png") 0 0 no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .tltext {
      padding: 0 30px;
      // width: 278px;
      height: 58px;
      background: url("./h2bgl.png") 0 0 no-repeat;
      background-size: 100% 100%;
      text-align: left;
      font-size: 28px;
      line-height: 58px;
    }
  }
  .twoLevelTitle-right {
    align-self: center;
    position: absolute;
    right: 956px;
    padding: 0 30px;
    width: 278px;
    height: 58px;
    background: url("./h2bgr.png") 0 0 no-repeat;
    background-size: 100% 100%;
    text-align: right;
    font-weight: 600px;
    font-size: 16px;
    line-height: 29px;
  }
  .twoLevelTitle-assess-system {
    z-index: 99999999;
  }
}
</style>

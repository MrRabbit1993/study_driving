<template>
  <div id="app">
    <router-view :key="key" />
    <img
      v-if="$router.currentRoute.name !== 'home'"
      class="pageIcon"
      :class="$router.currentRoute.name === 'iframe' ? 'hidden' : null"
      src="./assets/img/pageHeader.png"
    />
  </div>
</template>
<script>
import control from "@/mixins/control.js";
import request from "./utils/request.js";
import { getToken, removeUserInfo } from "@/utils/auth.js";
export default {
  name: "home",
  provide() {
    return {
      app: this
    };
  },
  mixins: [control],
  data() {
    return {};
  },
  computed: {
    key() {
      // 避免组件复用路由不刷新
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  },
  mounted() {
    this.$root.e =
      (document.body.clientWidth || document.documentElement.clientWidth) /
      3840;
  },
  methods: {
    checkToken() {
      if (this.$route.path === "/notLogin" || this.$route.path === "/404") {
        this.deleteJob();
        return;
      }
      request("/entrance/theme/cityManagement/checkToken", {
        params: {
          token: getToken()
        }
      })
        .then(({ success }) => {
          if (!success) {
            removeUserInfo();
            this.deleteJob();
            this.goNotLogin();
          }
        })
        .catch(() => {
          removeUserInfo();
          this.deleteJob();
          this.goNotLogin();
        });
    },
    deleteJob() {
      this.checkTokenJob && this.checkTokenJob.delete();
    },
    goNotLogin() {
      this.$router.push("/notLogin");
    }
  },
  // created() {
  //   this.initJob();
  // },
  beforeCreate() {
    // this.Scheduler = new Scheduler();
    // this.Scheduler.run();
  },
  beforeDestroy() {
    this.deleteJob();
  }
};
</script>
<style lang="scss">
#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url("~@/assets/img/bg.jpg") 0 0 no-repeat;
  background-size: 100% 100%;
  > div {
    position: relative;
  }
  .pageIcon {
    width: 773px;
    height: 339px;
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 3;
    transform: translateX(-50%);
    pointer-events: none;
    &.hidden {
      display: none;
    }
  }
}
</style>

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import echarts from "echarts";
import {
  getToken,
  setUserInfo,
  removeUserInfo,
  getSCREENMenu
} from "@/utils/auth.js";
import xhr from "./utils/request.js";

import "./assets/css/reset.scss";
import "./assets/css/component.scss";
import "@/icons";
Vue.prototype.$echarts = echarts;
Vue.prototype.$xhr = xhr;

Vue.prototype.bus = new Vue();

Vue.config.productionTip = false;
const init = function() {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
};
const ownMenuPath = getSCREENMenu().map(item => {
  return item.url;
});
const containeHome = ownMenuPath.some(item => {
  return item === "/home";
});
// const homewhiteList = [
//   "/404",
//   "/homepage",
//   "/home",
//   "/pageList",
//   "/command",
//   "/perspectiveXS"
// ]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (process.env.NODE_ENV === "development") {
    next();
    return;
  }
  if (to.path === "/404" || to.path === "/notLogin") {
    next();
    return;
  }
  const match = window.location.href.match(/code=(\S*)#/);
  if (match) {
    removeUserInfo();
    const loginWithCode = function(params) {
      const href = window.location.href;
      const s1 = href.split("?code");
      const s2 = href.split("#");
      let newHref = "";
      if (s1 && s2) {
        newHref = `${s1[0]}#${s2[1]}`;
      }
      xhr({
        url: "/v1/index/loginByCode",
        method: "get",
        params
      })
        .then(({ data, success }) => {
          if (success) {
            setUserInfo(data);
            window.location.href = newHref;
          } else {
            next("/404");
          }
        })
        .catch(() => {
          next("/404");
        });
    };
    loginWithCode({ code: match[1], type: 2 });
  } else {
    if (containeHome) {
      next();
      return;
    }
    if (getToken()) {
      if (ownMenuPath && ownMenuPath.includes(to.path)) {
        next();
      } else {
        if (ownMenuPath.length && ownMenuPath[0]) {
          if (to.path.includes("iframe")) {
            next();
            return;
          }
          if (ownMenuPath[0].includes("http")) {
            next({
              path: "/iframe",
              query: {
                url: ownMenuPath[0],
                width: "3840"
              }
            });
          } else {
            next(ownMenuPath[0]);
          }
        } else {
          next("/404");
        }
      }
    } else {
      next("/404");
    }
  }
});

// const getAuthorizion = () => {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "post",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       url: loginUrl,
//       data: qs.stringify({
//         username: "9FAB40082F564E75AE3C10DDA69715F9",
//         password: "03818B6ADD9D4F648BFB588E7A6BF88E"
//       })
//     })
//       .then(res => {
//         // console.log(res, "res::::::::::: login")
//         if (!res.data) {
//           // reject()
//           window.accesstoken = res;
//           // setUserInfo({
//           //   accesstoken: res
//           // })
//         } else {
//           window.accesstoken = res.data;
//           // setUserInfo({
//           //   accesstoken: res.data
//           // })
//           resolve(res.data);
//         }
//       })
//       .catch(() => {
//         reject();
//       });
//   });
// };

// getAuthorizion().then(() => {
//   init()
// }).catch(() => {
//   init()
// })
init();

const path = require("path");
const pkg = require("./package.json");
const webpack = require("webpack");
const IS_PROD = ["production", "test"].includes(process.env.NODE_ENV);
const { applyMock } = require("./build/mock");
console.log("VUE_APP_BASEURL", process.env.VUE_APP_BASEURL);

module.exports = {
  publicPath: process.env.VUE_APP_BASEURL || "/",
  runtimeCompiler: true,
  outputDir: "dist",
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: chain => {
    if (pkg && pkg.version) {
      chain.plugin("define").tap(([options]) => {
        options["process.env"]["VUE_APP_NAME"] = `"${pkg.name}"`;
        options["process.env"]["VUE_APP_MAP_KEY"] =
          '"712e82c55ebb72e976900890c66680c3"';
        options["process.env"]["VUE_APP_VERSION"] = `"${pkg.version}"`;
        return [options];
      });
    }

    chain.module
      .rule("svg")
      .include.add(path.resolve(__dirname, "./src/icons"));
    chain.module.rule("svg").uses.delete("file-loader");
    chain.module
      .rule("svg")
      .test(/\.(svg)(\?.*)?$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });

    // chain.module
    //   .rule("images")
    //   .use("image-webpack-loader")
    //   .loader("image-webpack-loader")
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end();
  },
  configureWebpack: {
    resolve: {
      // extensions: ['.js', '.json'],
      alias: {
        "@": path.resolve(__dirname, "./src")
        // 'packages': path.resolve(__dirname, './packages')
      }
    },
    externals: {
      AMap: "AMap" // 高德地图配置
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.$": "jquery"
      })
    ]
  },
  // devServer 选项单独配置
  devServer: {
    disableHostCheck: true,
    before(app) {
      applyMock(app);
    },
    proxy: {
      "/entrance": {
        target: "http://195.195.9.81:8000"
      },
      "/api/v1": {
        target: "http://10.32.86.47:8888", // 域名
        changOrigin: true //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      },

      "/mock": {
        target: "http://10.32.86.47:8300", // 域名
        changOrigin: true
      },
      "/mq": {
        target: "http://10.32.86.47:8080", // 域名
        changOrigin: true,
        pathRequiresRewrite: {
          "^/mq": "/"
        }
      },
      ...[
        "/entrance/container/api/11900550",
        "/entrance/container/api/11900552",
        "/entrance/container/api/11900553"
      ].reduce((prev, curr) => {
        prev[curr] = {
          target: "http://195.195.9.81:8012/" // 域名
          // changOrigin: true //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          // pathRequiresRewrite: {
          //   "^/api": "/"
          // }
        };
        return prev;
      }, {}),
      "/api": {
        target: "http://10.32.86.47:8080"
      },
      ...[
        "/entrance/theme/cityManagement/getCounty",
        "/entrance/theme/cityManagement/indexInfo",
        "/entrance/theme/cityManagement/getResultData",
        "/entrance/theme/cityManagement/containerData",
        "/entrance/theme/cityManagement/getStreetConstructionCompany",
        "/entrance/theme/cityManagement/getSysEnumByType",
        "/entrance/theme/cityManagement/getStreetConstructionCompanyStatistic",
        "/entrance/theme/cityManagement/getMonitoredConstructionSiteStatistic",
        "/entrance/theme/cityManagement/getStreetConstructionSite",
        "/entrance/theme/cityManagement/getStreetConstructionSiteStatistic",
        "/entrance/yunti/residentialQuartersList",
        "/entrance/yunti/getStatisticInfo",
        "/entrance/yunti/elevatorInformationList",
        "/entrance/theme/cityManagement/getStreetCompany",
        "/entrance/theme/cityManagement/getStreetCompanyStatistic",
        "/entrance/theme/cityManagement/getCylinderFillingStation",
        "/entrance/theme/cityManagement/getCommunity",
        "/entrance/theme/cityManagement/getCommunityStatistic",
        "/entrance/theme/cityManagement/getHomeBasedPoint",
        "/entrance/theme/cityManagement/getHomeBasedPointStatistic",
        "/entrance/theme/cityManagement/getPensionInstitutions",
        "/entrance/theme/cityManagement/getPensionInstitutionsStatistic",
        "/entrance/theme/cityManagement/generalInterface"
      ].reduce((prev, curr) => {
        prev[curr] = {
          target: "http://195.195.9.116:8082/" // 域名
        };
        return prev;
      }, {}),
      "/zhzhImage": {
        target: "http://10.32.86.47:8910"
      },
      "/v1/index/loginByCode": {
        target: "http://195.195.9.116:8888"
      }
    }
  }
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: IS_PROD,
  //   // 开启 CSS source maps?
  //   sourceMap: false,
  //   // css预设器配置项
  //   loaderOptions: {
  //     sass: {
  //       data: `
  //             @import "@/assets/css/common.scss";
  //       `
  //     },
  //     postcss: {
  //       plugins: [
  //         // require("postcss-px2rem")({
  //         //   remUnit: 108
  //         // }),
  //         require("autoprefixer")
  //       ]
  //     }
  //   },
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // }
};

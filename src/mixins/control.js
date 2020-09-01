function contain(ori, arr) {
  var _a = arr.some(function (item) {
    return ori.toString().indexOf(item) > -1
  })
  return _a
}

export default {
  data() {
    return {};
  },
  methods: {
    // handle(getMsg) {
    //   var that = this
    //   var mesg = getMsg.split("-");
    //   // console.log(mesg);
    //   //跳转到首页
    //   if (mesg[0] == "p1") {
    //     if (mesg[1] == "home") {
    //       this.$router.push({
    //         path: "/homepage"
    //       });
    //     }
    //   }
    //   //跳转到第二页面
    //   if (mesg[0] == "p2") {
    //     if (mesg[1] == "back") {
    //       this.$router.push({
    //         path: "/index",
    //         query: {
    //           fieldCode: mesg[2],
    //           code: mesg[3]
    //         }
    //       });
    //     } else if (mesg[2] == "城管" || mesg[2] == "城市管理" || mesg[2] == "城市管理局") {
    //       this.$router.push({
    //         path: "/cityManagement",
    //       })
    //     } else {
    //       this.$router.push({
    //         path: "/index",
    //         query: {
    //           fieldCode: mesg[1],
    //           code: mesg[2]
    //         }
    //       });
    //     }
    //   }
    //   //跳转到第三页面
    //   if (mesg[0] == "p3") {
    //     if (mesg[1] == "back") {
    //       this.$router.go(-1);
    //     } else if (mesg[1] == "home") {
    //       this.$router.push({
    //         path: "/homepage"
    //       });
    //     } else {
    //       this.$router.push({
    //         path: "/detail",
    //         query: {
    //           codeName: mesg[2],
    //           exponentId: mesg[1]
    //         }
    //       });
    //     }
    //   }
    //   //页面模式切换
    //   if (mesg[0] == 'model1') {
    //     this.$router.push({
    //       path: "/detail",
    //       query: {
    //         codeName: this.$route.query.codeName,
    //         exponentId: this.$route.query.exponentId
    //       }
    //     })
    //   }
    //   //瀑布流模式切换
    //   if (mesg[0] == 'model2') {
    //     this.$router.push({
    //       path: "/select",
    //       query: {
    //         codeName: this.$route.query.codeName,
    //         exponentId: this.$route.query.exponentId
    //       }
    //     })
    //   }
    //   // if (mesg[0] == 'scene') {
    //   //     if(that.$route.path=='/iframe'){
    //   //         if (mesg[1] == 0) {
    //   //             var _id = 'bm'
    //   //         } else if (mesg[1] == 1) {
    //   //             var _id = 'jd'
    //   //         } else if (mesg[1] == 2) {
    //   //             var _id = 'zt'
    //   //         } else if (mesg[1] == 3) {
    //   //             var _id = 'qdly'
    //   //         }
    //   //         this.$router.push({
    //   //             path: "/iframe",
    //   //             query: {
    //   //                 id:_id
    //   //             }
    //   //         })
    //   //     } else{
    //   //         if (mesg[1] == 0) {
    //   //             $('#bm').trigger('click')
    //   //         } else if (mesg[1] == 1) {
    //   //             $('#jd').trigger('click')
    //   //         } else if (mesg[1] == 2) {
    //   //             $('#zt').trigger('click')
    //   //         } else if (mesg[1] == 3) {
    //   //             $('#qdly').trigger('click')
    //   //         }
    //   //     }
    //   // }
    //   if (mesg[0] == 'scene') {
    //     console.log('h' + mesg[1])
    //     if (that.$route.path == '/homepage') {
    //       if (mesg[1] == 0) {
    //         $('#jd').trigger('click')
    //       } else if (mesg[1] == 1) {
    //         $('#tsxs').trigger('click')
    //       } else if (mesg[1] == 2) {
    //         $('#zt').trigger('click')
    //       }
    //     } else {
    //       if (mesg[1] == 0) {
    //         var _id = 'jd'
    //         this.$router.push({
    //           path: "/iframe",
    //           query: {
    //             id: _id
    //           }
    //         })
    //       } else if (mesg[1] == 1) {
    //         var _id = 'tsxs'
    //         this.$router.push({
    //           path: "/perspectiveXS"
    //         })
    //       } else if (mesg[1] == 2) {
    //         var _id = 'zt'
    //         this.$router.push({
    //           path: "/theme"
    //         })
    //       }

    //     }
    //   }
    //   // if (mesg[0] == 'toolshow') {
    //   //     $('.ball-menu .ball').trigger('click')
    //   // }
    //   if (mesg[0] == 'tool') {
    //     if (mesg[1] == 0) {
    //     } else if (mesg[1] == 1) {
    //     } else if (mesg[1] == 2) {
    //     } else if (mesg[1] == 3) {
    //       $('#db').trigger('click')
    //     } else if (mesg[1] == '取消') {
    //       $('.ball-menu .ball').trigger('click')
    //     }
    //   }
    //   if (mesg[0] == 'modelChange' && mesg[1] != '') {
    //     this.$router.push({
    //       path: '/select',
    //       query: {
    //         parentId: mesg[1],
    //         exponentId: null,
    //         codeName: mesg[2]
    //       }
    //     })
    //   }
    //   if (mesg[0] == 'compare') {
    //     let name = mesg[1]
    //     let queryArr = [
    //       {
    //         text: '基准指标',
    //         code: '1',
    //         isBase: true //basecode
    //       },
    //       {
    //         text: '新塘街道',
    //         code: '4',
    //         isBase: false
    //       },
    //       {
    //         text: "宁围街道",
    //         code: 15,
    //         isBase: false
    //       },
    //       {
    //         text: "城厢街道",
    //         code: 1,
    //         isBase: false
    //       }
    //     ]
    //     console.log(name)
    //     if (name == '地区单项') {
    //       console.log(1)
    //       this.$router.push({
    //         path: "/contrastRes/0",
    //         query: {
    //           fieldText: '城管',
    //           // firstText: '宁围街道',
    //           // secondText: '城厢街道',
    //           fieldCode: 13,
    //           // firstCode: 15,
    //           // secondCode: 1,
    //           queryArr: JSON.stringify([queryArr[2], queryArr[3]])
    //         }
    //       })
    //     } else if (name == '地区多项') {
    //       console.log(2)
    //       this.$router.push({
    //         path: "/contrastRes/0",
    //         query: {
    //           fieldText: '城管',
    //           // firstText: '宁围街道',
    //           // secondText: '城厢街道',
    //           fieldCode: 13,
    //           // firstCode: 15,
    //           // secondCode: 1,
    //           queryArr: JSON.stringify([queryArr[1], queryArr[2], queryArr[3]])
    //         }
    //       })
    //     } else if (name == '基准单项') {
    //       console.log(3)
    //       this.$router.push({
    //         path: "/contrastRes/0",
    //         query: {
    //           fieldText: '城管',
    //           // firstText: '宁围街道',
    //           // secondText: '城厢街道',
    //           fieldCode: 13,
    //           // firstCode: 15,
    //           // secondCode: 1,
    //           queryArr: JSON.stringify([queryArr[0], queryArr[2]])
    //         }
    //       })
    //     } else if (name == '基准多项') {
    //       console.log(4)
    //       this.$router.push({
    //         path: "/contrastRes/0",
    //         query: {
    //           fieldText: '城管',
    //           // firstText: '宁围街道',
    //           // secondText: '城厢街道',
    //           fieldCode: 13,
    //           // firstCode: 15,
    //           // secondCode: 1,
    //           queryArr: JSON.stringify([queryArr[0], queryArr[1], queryArr[2]])
    //         }
    //       })
    //     }
    //   }
    // },
    handleText(received, screenId) {
      var msg = ''
      if (received.indexOf('-') > -1) {
        msg = received.split('-')[1]
      } else {
        msg = received
      }
      msg = msg.substring(0, msg.length - 1)
      console.log(msg)
      if (contain(msg, ['返回上一级', '上一级', '返回上一页', '上一页'])) {
        this.$router.go(-1)
      } else if (contain(msg, ['返回首页', '首页'])) {
        this.$router.push({
          path: "/homepage"
        });
      } else if (contain(msg, ['行政部门'])) {
        this.$router.push({
          path: "/pageList?type=1"
        });
      } else if (contain(msg, ['综合指挥'])) {
        this.$router.push({
          path: "/command"
        });
      } else if (contain(msg, ['特色场景'])) {
        this.$router.push({
          path: "/pageList?type=2"
        });
      } else if (contain(msg, ['透视萧山','透视小声','透视笑声'])) {
        this.$router.push({
          path: "/perspectiveXS"
        });
      } else if (contain(msg, ['城市管理局','城管','城管局'])) {
        this.$router.push({
          path: "/cityManagement"
        });
      } else if (contain(msg, ['卫生健康局','卫监局','卫检局','卫健局'])) {
        this.$router.push({
          path: "/health"
        });
      } else if (contain(msg, ['统计局'])) {
        this.$router.push({
          path: "/statistics"
        });
      } else if (contain(msg, ['信访局'])) {
        this.$router.push({
          path: "/lettersAndVisits"
        });
      } else if (contain(msg, ['交通运输局'])) {
        this.$router.push({
          path: "/traffic"
        });
      } else if (contain(msg, ['市场监督管理局','市场监管','市场监督'])) {
        this.$router.push({
          path: "/cityPrison"
        });
      } else if (contain(msg, ['财政局'])) {
        this.$router.push({
          path: "/finance"
        });
      } else if (contain(msg, ['发展和改革局','发改局','发改委','发改'])) {
        this.$router.push({
          path: "/hairReform"
        });
      } else if (contain(msg, ['公安局'])) {
        this.$router.push({
          path: "/pubSecurity"
        });
      } else if (contain(msg, ['一键护航', '一件护航', '意见护航', '护航'])) {
                this.$router.push({
                    path: "/iframe",
                    query: {
                        url:'http://10.32.85.164:8008/#/answer'
                    }
                })
      } else if (contain(msg, ['最多跑一次','跑一次'])) {
        this.$router.push({
          path: "/runAtMostOnce"
        });
      } else if (contain(msg, ['步行萧山','不行，萧山'])) {
        this.$router.push({
          path: "/walkXs"
        });
      } else if (contain(msg, ['垃圾去哪了','垃圾去哪'])) {
        this.$router.push({
          path: "/refuseClassification"
        });
      } else if (contain(msg, ['一键就医','e键就医','一键就有一','一件就有一','不见就一','一件就一','一键就一','一键就医','一件就医'])) {
        this.$router.push({
          path: "/medical"
        });
      } else if (contain(msg, ['一路清新','清新'])) {
        this.$router.push({
          path: "/roadFresh"
        });
      } else if (contain(msg, ['亚运会专题','亚运会'])) {
        this.$router.push({
          path: "/asianTheme"
        });
      }

      // var getMsg = received.message//信息msg
      // var targetArr = received.target//target
      // console.log(screenId)
      // console.log(targetArr)
      // if(targetArr[0]=='all'){
      //     console.log('匹配全部屏幕')
      //     that.handle(getMsg);
      // } else {
      //     targetArr.find(function (value) {
      //         if (value == screenId) {
      //             //包含
      //             console.log('匹配到屏幕')
      //             that.handle(getMsg);
      //         }
      //     })
      // }
    },
    setLocal() {
      localStorage.setItem('alertScreenTime', +new Date())
    },
    getLocal() {
      var alertScreenTimeCri = 48//临界时间 单位小时
      let getAlertScreenTime = localStorage.getItem('alertScreenTime')
      if (!getAlertScreenTime) {
        return false
      } else {
        if (((+new Date() - getAlertScreenTime) / 1000 / 60 / 60) > alertScreenTimeCri) {
          return false
        } else {
          return true
        }
      }
    },
  },
  mounted() {
    // var _href = location.href, _search, canshu = [], canshuObj = {}, screenid = '';
    // if (_href.indexOf('?') > -1) {//截取链接参数
    //     _search = _href.split("?")[1]
    //     if (_search.indexOf('&') > -1) {
    //         canshu = _search.split('&')
    //     } else {
    //         canshu = [_search]
    //     }
    //     canshu.map(function (item) {
    //         canshuObj[item.split('=')[0]] = item.split('=')[1]
    //     })
    // }
    // // console.log(canshuObj.screenId)
    // if (canshuObj.screenId) {//如果链接有屏幕id参数，则用链接参数,并存入缓存
    //     screenid = canshuObj.screenId
    //     localStorage.setItem('screenIdInfo', JSON.stringify({id: screenid, time: +new Date()}))
    //     if(!this.getLocal()){
    //         alert('当前屏幕id为：'+screenid)
    //         this.setLocal()
    //     }
    // } else {
    //     //如果没有先从缓存查找有无
    //     let getScreenIdInfoLocalSrorage = localStorage.getItem('screenIdInfo')
    //     if (!getScreenIdInfoLocalSrorage) {
    //         var inputId = prompt('请输入需要给该屏幕配置的id号(当前仅支持数字1-10)')
    //         console.log(inputId)
    //         screenid = inputId ? inputId : 'NO'
    //         localStorage.setItem('screenIdInfo', JSON.stringify({id: screenid, time: +new Date()}))
    //     } else {
    //         var parseScreenIdInfo = JSON.parse(getScreenIdInfoLocalSrorage)
    //         //对缓存的时间进行判断，以防重复id不同电脑
    //         var storageTime = parseScreenIdInfo.time
    //         var nowTime = +new Date()
    //         var dTime = (nowTime - storageTime) / 1000 / 60 / 60  //转换为小时
    //         if (dTime > 24) {
    //             // screenid = 'NO'
    //             var inputId = prompt('请输入需要给该屏幕配置的id号(当前仅支持数字1-10)')
    //             screenid = inputId ? inputId : 'NO'
    //             localStorage.setItem('screenIdInfo', JSON.stringify({id: screenid, time: +new Date()}))
    //         } else {
    //             screenid = parseScreenIdInfo.id
    //             localStorage.setItem('screenIdInfo', JSON.stringify({id: screenid, time: +new Date()}))
    //             if(!this.getLocal()){
    //                 alert('当前屏幕id为：'+screenid)
    //                 this.setLocal()
    //             }
    //         }
    //     }
    // }
    // console.log('当前屏幕为：'+screenid)
    var that = this;
    window.ws = new WebSocket("ws://10.32.86.47:8901/websocket/forward");
    window.ws.onmessage = function (e) {
      console.log(e)
      that.handleText(JSON.stringify(e.data));
    };
  }
}

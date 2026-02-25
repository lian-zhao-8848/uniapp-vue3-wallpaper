"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const isScore = common_vendor.ref(false);
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(0);
    const currentInfo = common_vendor.ref({
      _id: "",
      nickname: "",
      score: 0,
      description: "",
      tabs: [],
      picurl: "",
      userScore: 0
    });
    const readImgs = common_vendor.ref([]);
    const swpierChange = (e) => {
      currentIndex.value = e.detail.current;
      currentInfo.value = classList.value[currentIndex.value];
      funReadimg();
    };
    const funReadimg = () => {
      readImgs.value.push(
        currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
      readImgs.value = [...new Set(readImgs.value)];
    };
    common_vendor.onLoad(async (e) => {
      currentId.value = e.id;
      if (e.type === "share") {
        let res = await api_apis.apiDetailWall({ id: currentId.value });
        classList.value = res.data.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentIndex.value = classList.value.findIndex((item) => item._id === currentId.value);
      currentInfo.value = classList.value[currentIndex.value];
      funReadimg();
    });
    const maskState = common_vendor.ref(true);
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const infoPopup = common_vendor.ref(null);
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
      userScore.value = 0;
    };
    const userScore = common_vendor.ref(0);
    const scorePopup = common_vendor.ref(null);
    const clickScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      isScore.value = false;
      scorePopup.value.close();
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "正在飞速加载"
      });
      let { classid, _id: wallId } = currentInfo.value;
      let res = await api_apis.apiGetSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storageClassList", classList.value);
        clickScoreClose();
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: (err) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    const classList = common_vendor.ref([]);
    const storageClassList = common_vendor.index.getStorageSync("storageClassList") || [];
    classList.value = storageClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const clickDownLoad = async () => {
      try {
        common_vendor.index.showLoading({
          title: "正在跳转下载....",
          mask: true
        });
        let { classid, _id: wallId } = currentInfo.value;
        let res = await api_apis.apiWriteDloadWall({
          classid,
          wallId
        });
        if (res.errCode !== 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picurl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: (res3) => {
                common_vendor.index.__f__("log", "at pages/preview/preview.vue:259", res3);
              },
              fail: (err) => {
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，需要您重新下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "提示",
                  content: "需要授权保存相册",
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "请重新获取授权",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (err) {
        common_vendor.index.hideLoading();
      }
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "翔翔壁纸",
        path: `/pages/preview/preview?id=${currentId.value}&type=share`
      };
    });
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? common_vendor.e({
        b: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        c: currentIndex.value,
        d: common_vendor.o(swpierChange),
        e: maskState.value
      }, maskState.value ? {
        f: common_vendor.p({
          color: "#fff",
          type: "undo-filled",
          size: "20"
        }),
        g: common_vendor.o(goBack),
        h: common_vendor.unref(utils_system.getstatusBarHeight)() + "px",
        i: common_vendor.t(currentIndex.value + 1),
        j: common_vendor.t(classList.value.length),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        l: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        m: common_vendor.p({
          type: "info",
          size: "28"
        }),
        n: common_vendor.o(clickInfo),
        o: common_vendor.p({
          type: "star",
          size: "28"
        }),
        p: common_vendor.t(((_a = currentInfo.value) == null ? void 0 : _a.score) || 0),
        q: common_vendor.o(clickScore),
        r: common_vendor.p({
          type: "download",
          size: "28"
        }),
        s: common_vendor.o(clickDownLoad)
      } : {}, {
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o(clickInfoClose),
        w: common_vendor.t(currentInfo.value._id),
        x: common_vendor.t(currentInfo.value.nickname),
        y: common_vendor.p({
          readonly: true,
          touchable: true,
          value: currentInfo.value.score,
          size: "16"
        }),
        z: common_vendor.t(currentInfo.value.score),
        A: common_vendor.t(currentInfo.value.description),
        B: common_vendor.f(currentInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        C: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        D: common_vendor.p({
          type: "bottom"
        }),
        E: common_vendor.t(isScore.value ? "评分过了" : "壁纸评分"),
        F: common_vendor.p({
          type: "closeempty",
          color: "#999"
        }),
        G: common_vendor.o(clickScoreClose),
        H: common_vendor.o(($event) => userScore.value = $event),
        I: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          modelValue: userScore.value
        }),
        J: common_vendor.t(userScore.value),
        K: common_vendor.o(submitScore),
        L: !userScore.value || isScore.value,
        M: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        N: common_vendor.p({
          ["is-mask-click"]: false
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map

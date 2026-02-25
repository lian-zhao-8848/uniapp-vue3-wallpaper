"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detail = common_vendor.ref({});
    const getNoticeDetail = async () => {
      let res = api_apis.apiGetNoticeDetail({ id: "653507c6466d417a3718e94b" });
      detail.value = res.data;
    };
    getNoticeDetail();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "置顶",
          inverted: true,
          type: "error"
        }),
        b: common_vendor.p({
          date: Date.now(),
          format: "yyyy/MM/dd hh:mm:ss"
        }),
        c: common_assets._imports_0$1
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/detail.js.map

"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uv_skeletons2 = common_vendor.resolveComponent("uv-skeletons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uv_skeletons2 + _easycom_uni_load_more2)();
}
const _easycom_uv_skeletons = () => "../../uni_modules/uv-skeletons/components/uv-skeletons/uv-skeletons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uv_skeletons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const customText = common_vendor.ref({
      contentrefresh: "冲锋======================",
      contentnomore: "已经被榨干了TT"
    });
    const loading = common_vendor.ref(true);
    const loadStatus = common_vendor.ref("more");
    const skeleton = common_vendor.ref([
      {
        type: "line",
        num: 1,
        // 因为外层已经循环了 12 个 item，所以这里每个 item 只需要 1 个占位块
        style: {
          width: "100%",
          height: "440rpx",
          // 【核心】高度必须和下方 CSS 中 .item 的高度一致，防止切换时页面抖动
          borderRadius: "8rpx"
          // 可选：加一点圆角让骨架屏更好看
        }
      }
    ]);
    const queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    let pageName;
    common_vendor.onLoad((e) => {
      let { id = null, name = null, type = null } = e;
      if (type)
        queryParams.type = type;
      if (id)
        queryParams.classid = id;
      pageName = name;
      common_vendor.index.setNavigationBarTitle({
        title: pageName
      });
      getClassList();
    });
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      if (loadStatus.value === "loading")
        return;
      queryParams.pageNum++;
      getClassList();
    });
    const getClassList = async () => {
      if (!loading.value) {
        loadStatus.value = "loading";
      }
      try {
        let res;
        if (queryParams.classid)
          res = await api_apis.apiGetclassList(queryParams);
        if (queryParams.type)
          res = await api_apis.apiGetHistoryList(queryParams);
        classList.value = [...classList.value, ...res.data];
        common_vendor.index.setStorageSync("storageClassList", classList.value);
        if (queryParams.pageSize > res.data.length) {
          noData.value = true;
          loadStatus.value = "no-more";
        } else {
          loadStatus.value = "more";
        }
      } finally {
        loading.value = false;
      }
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "翔翔壁纸",
        path: `/pages/classlist/classlist?id=${queryParams.classid}&name=${pageName}`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "翔翔壁纸"
      };
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storageClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.f(12, (item, k0, i0) => {
          return {
            a: "bd381383-0-" + i0,
            b: item
          };
        }),
        c: common_vendor.p({
          loading: loading.value,
          skeleton: skeleton.value
        })
      } : {
        d: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: item._id
          };
        })
      }, {
        e: !loading.value
      }, !loading.value ? {
        f: common_vendor.p({
          status: loadStatus.value,
          color: "#007AFF",
          contentText: customText.value
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classlist/classlist.js.map

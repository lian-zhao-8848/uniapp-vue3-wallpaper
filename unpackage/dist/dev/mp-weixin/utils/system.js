"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
const getstatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 20;
const getTitleBarHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let {
      top,
      height
    } = common_vendor.index.getMenuButtonBoundingClientRect();
    return height + (top - getstatusBarHeight()) * 2;
  } else {
    return 40;
  }
};
const getNavBarHeight = () => getTitleBarHeight() + getstatusBarHeight();
exports.getNavBarHeight = getNavBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
exports.getstatusBarHeight = getstatusBarHeight;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map

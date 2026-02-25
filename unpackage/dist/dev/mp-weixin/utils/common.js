"use strict";
require("../common/vendor.js");
function formatRelativeTime(timestamp) {
  const targetTime = new Date(timestamp).getTime();
  const currentTime = Date.now();
  const diff = currentTime - targetTime;
  if (diff < 0) {
    return null;
  }
  const ONE_MINUTE = 60 * 1e3;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_MONTH = 30 * ONE_DAY;
  if (diff <= ONE_MINUTE) {
    return "1分钟内";
  } else if (diff <= ONE_HOUR) {
    const minutes = Math.floor(diff / ONE_MINUTE);
    return `${minutes}分钟前`;
  } else if (diff <= ONE_DAY) {
    const hours = Math.floor(diff / ONE_HOUR);
    return `${hours}小时前`;
  } else if (diff <= ONE_MONTH) {
    const days = Math.floor(diff / ONE_DAY);
    return `${days}天前`;
  } else if (diff <= 3 * ONE_MONTH) {
    const months = Math.floor(diff / ONE_MONTH);
    return `${months}个月前`;
  } else {
    return "从前从前";
  }
}
exports.formatRelativeTime = formatRelativeTime;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map

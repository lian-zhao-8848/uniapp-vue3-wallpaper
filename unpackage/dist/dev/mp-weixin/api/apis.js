"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner"
  });
}
function apiGetDayRandom() {
  return utils_request.request({
    url: "/randomWall"
  });
}
function apiGetNotice(data = {}) {
  return utils_request.request({
    url: "/wallNewsList",
    data
  });
}
function apiGetClassify(data = {}) {
  return utils_request.request({
    url: "/classify",
    data
  });
}
function apiGetclassList(data = {}) {
  return utils_request.request({
    url: "/wallList",
    data
  });
}
function apiGetSetupScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    data
  });
}
function apiWriteDloadWall(data = {}) {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
}
function apiDetailWall(data = {}) {
  return utils_request.request({
    url: "/detailWall",
    data
  });
}
function apiUserInfo(data = {}) {
  return utils_request.request({
    url: "/userInfo",
    data
  });
}
function apiGetHistoryList(data = {}) {
  return utils_request.request({
    url: "/userWallList",
    data
  });
}
function apiGetNoticeDetail(data = {}) {
  return utils_request.request({
    url: "/wallNewsDetail",
    data
  });
}
function apiGetSearchWall(data = {}) {
  return utils_request.request({
    url: "/searchWall",
    data
  });
}
exports.apiDetailWall = apiDetailWall;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassify = apiGetClassify;
exports.apiGetDayRandom = apiGetDayRandom;
exports.apiGetHistoryList = apiGetHistoryList;
exports.apiGetNotice = apiGetNotice;
exports.apiGetNoticeDetail = apiGetNoticeDetail;
exports.apiGetSearchWall = apiGetSearchWall;
exports.apiGetSetupScore = apiGetSetupScore;
exports.apiGetclassList = apiGetclassList;
exports.apiUserInfo = apiUserInfo;
exports.apiWriteDloadWall = apiWriteDloadWall;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/apis.js.map

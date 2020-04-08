// 本地环境
var host = "http://localhost:8011/";
var config = {
  host,
  getOpenId: host + "api/getOpenId",
  addItem: host + "api/addItem",
  getOwnList: host + "api/getOwnList",
  getItem: host + "api/getItem",
  getTypeList: host + "api/getTypeList",
  collectItem: host + "api/collectItem",
  collectCancel: host + "api/collectCancel",
  isCollect: host + "api/isCollect",
  getCollectList: host + "api/getCollectList",
  getItemCollect: host + "api/getItemCollect",
}
module.exports = config;
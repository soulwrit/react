var initial = 999;
var getZIndex = function getZIndex() {
  return initial++;
}; // 参与全局 zIndex 管理的组件
// Dropdown

export { getZIndex as g };

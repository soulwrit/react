/**
 * 获取页面可视宽度
 * 在混杂模式（BackCompat）下，ie10+的浏览器，
 * 三者（`window.innerWidth` `document.documentElement.clientWidth` `document.body.clientWidth`）的值都是相同的
 */

function getViewportWidth() {
  var d = document,
      a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}

export { getViewportWidth as g };

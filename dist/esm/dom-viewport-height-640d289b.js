/**
 * 获取页面可视区的高度
 * 在混杂模式（BackCompat）下，ie10+的浏览器，
 * 三者（`window.innerHeight` `document.documentElement.clientHeight` `document.body.clientHeight`）的值都是相同的
 */

function getViewportHeight() {
  var d = document,
      a = d.compatMode == "BackCompat" ? d.body : d.documentElement; //  innerHeight  可以视为是包含滚动条尺寸的视口，
  //  documentElement.clientHeight  可以视为不包含滚动条尺寸的视口，两者在存在滚动条的方向上相差17px

  return a.clientHeight;
}

export { getViewportHeight as g };

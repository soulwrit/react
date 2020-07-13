function raf(callback) {
  raf = typeof window.requestAnimationFrame === 'function' ? function (callback) {
    if (typeof callback !== 'function') return;
    var rafId = window.requestAnimationFrame(function () {
      callback();
      window.cancelAnimationFrame(rafId);
      rafId = null;
    });
  } : function (callback) {
    if (typeof callback !== 'function') return;
    var timer = setTimeout(function () {
      clearTimeout(timer);
      callback();
      timer = null;
    }, 0);
  };
  return raf(callback);
}

var raf$1 = raf;

export { raf$1 as r };

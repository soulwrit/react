var hasOwn = Object.prototype.hasOwnProperty;

function hasOwnProperty(obj, key) {
  return hasOwn.call(obj, key);
}

var objectHasOwn = hasOwnProperty;

export { objectHasOwn as o };

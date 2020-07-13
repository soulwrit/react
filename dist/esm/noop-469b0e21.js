/**
 * @name noop
 * @version 1.0.0
 * @description Take up function
 * @keyword noop empty-func empty-function
 * @dependencies
 * @example
 *    const noop = require('@writ/utils.noop');
 *
 *    // array.forEach: `break` and `continue`
 *    function forEach (array, callback) {
 *        if (!Array.isArray(array)) {
 *           array = [].concat[array]
 *        }
 *        const cloneArray = [...array];
 *
 *        callback = typeof callback === 'function' ? callback : noop;
 *        cloneArray.forEach((value,index)=>{
 *              switch (callback(value, index, array)) {
 *                  case true:
 *                      // for-i: continue
 *                      cloneArray.splice(index, 1);
 *                      break;
 *                  case false:
 *                      // for-i: break
 *                      cloneArray.splice(index);
 *                      break;
 *                  default: break;
 *              }
 *       });
 *    }
 *
 *    const arr = ['a', 'b','c','d','e','f'];
 *    forEach(arr, (value, index)=>{
 *          if (value === 'c') { return true; }  // skip `d`
 *          if (value === 'e') { return false;}  // stop loop
 *    });
 */

function noop() {}

var noop_1 = noop;

export { noop_1 as n };

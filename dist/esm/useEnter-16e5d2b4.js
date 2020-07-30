import { useEffect } from 'react';

var useGlobalKeyUp = function useGlobalKeyUp(onHandle, mounted, unmount) {
  useEffect(function () {
    var onKeyUp = function onKeyUp(e) {
      onHandle(e);
    };

    typeof mounted === 'function' && mounted();
    typeof onHandle === 'function' && document.addEventListener('keyup', onKeyUp);
    return function () {
      typeof unmount === 'function' && unmount();
      typeof onHandle === 'function' && document.removeEventListener('keyup', onKeyUp);
    };
  }, []);
};

var useEnter = function useEnter(onHandle, depends) {
  useEffect(function () {
    var onKeyUp = function onKeyUp(e) {
      if (e.keyCode === 13) {
        onHandle();
      }
    };

    typeof onHandle === 'function' && document.addEventListener('keyup', onKeyUp);
    return function () {
      typeof onHandle === 'function' && document.removeEventListener('keyup', onKeyUp);
    };
  }, depends);
};

export { useEnter as a, useGlobalKeyUp as u };

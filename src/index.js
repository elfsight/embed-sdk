import {facade} from './facade';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ElfsightEmbedSDK = factory();
  }
}(typeof self !== 'undefined' ? self : this, () => facade));

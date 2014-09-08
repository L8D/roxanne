;(function(root, factory) {
  if (typeof define === 'function') {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Roxanne = factory();
  }
})(this, function() {
  var Roxanne = {};

  return Roxanne;
});

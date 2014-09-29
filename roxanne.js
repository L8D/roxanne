;(function(root, factory) {
  if (typeof define === 'function') {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Roxanne = factory();
  }
})(this, function() {
  var Roxanne = function(value, model/*, sources... */) {
    var sources = Array.prototype.slice.call(arguments, 2);

    return sources.reduce(function(acc, source) {
      return acc.merge(source);
    }).scan(value, model);
  };

  return Roxanne;
});

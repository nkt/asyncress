var Route = require('express/lib/router/route');
var methods = require('methods').concat(['all']);

function isPromise(obj) {
  return obj && typeof obj.catch === 'function';
}

function wrapHandler(handler) {
  return function (req, res, next) {
    var result = handler(req, res, next);
    if (isPromise(result)) {
      return result.catch(next);
    }

    return result;
  };
}

methods.forEach(function (method) {
  var originalMethod = Route.prototype[method];
  Route.prototype[method] = function () {
    var handlers = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      handlers[i] = wrapHandler(arguments[i]);
    }

    return originalMethod.apply(this, handlers);
  };
});

module.exports = require('express');

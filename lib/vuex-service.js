(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vuex-service", [], factory);
	else if(typeof exports === 'object')
		exports["vuex-service"] = factory();
	else
		root["vuex-service"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/EventBus.js":
/*!**************************!*\
  !*** ./core/EventBus.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// reference https://github.com/rubenv/angular-tiny-eventemitter
var key = '$$tinyEventListeners';

var EventBus =
/*#__PURE__*/
function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    this.events = {};
  }

  _createClass(EventBus, [{
    key: "$on",
    value: function $on($scope, event, fn) {
      if (!this[key]) {
        this[key] = {};
      }

      var events = this[key];

      if (!events[event]) {
        events[event] = [];
      }

      events[event].push(fn);

      if ($scope && $scope.$on) {
        var self = this;
        $scope.$on('hook:beforeDestroy', function () {
          self.$off(event, fn);
        });
      }

      return this;
    }
  }, {
    key: "$once",
    value: function $once($scope, event, broadEvent, fn) {
      var self = this;

      var cb = function cb() {
        fn.apply(this, arguments);
        self.$off(event, cb);
        self.$off(broadEvent, cb);
      };

      this.$on($scope, event, cb);
      this.$on($scope, broadEvent, cb);
      return this;
    }
  }, {
    key: "$off",
    value: function $off(event, fn) {
      if (!this[key] || !this[key][event]) {
        return this;
      }

      var events = this[key];

      if (!fn) {
        delete events[event];
      } else {
        var listeners = events[event];
        var index = listeners.indexOf(fn);

        if (index > -1) {
          listeners.splice(index, 1);
        }
      }

      return this;
    }
  }, {
    key: "getListeners",
    value: function getListeners(event) {
      var self = this;
      return Object.keys(self[key]).filter(function (evt) {
        var regex = new RegExp(evt.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
        return regex.test(event);
      }).reduce(function (arr, evt) {
        return arr.concat(self[key][evt]);
      }, []);
    }
  }, {
    key: "$emit",
    value: function $emit(event) {
      if (!this[key]) {
        return undefined;
      } // Making a copy here to allow `off` in listeners.


      var listeners = this.getListeners.call(this, event);
      var params = [].slice.call(arguments, 1);

      for (var i = 0; i < listeners.length; i++) {
        listeners[i].apply(null, params);
      }

      return this;
    }
  }, {
    key: "getInstance",
    value: function getInstance(namespace) {
      var self = this;

      if (this.events[namespace]) {
        return this.events[namespace];
      }

      var instance = {
        $emit: function $emit(event, data) {
          // console.log('$emit', `${namespace}.${event}`)
          self.$emit("".concat(namespace, ".").concat(event), data);
        },
        $broadcast: function $broadcast(event, data) {
          // console.log('$broadcast', `${event}`)
          self.$emit("__All__.".concat(event), data);
        },
        $on: function $on($scope, event, fn) {
          if (typeof $scope === 'string') {
            fn = event;
            event = $scope;
            $scope = null;
          } // console.log('$on', `${namespace}.${event}`)


          self.$on($scope, "".concat(namespace, ".").concat(event), fn);
          self.$on($scope, "__All__.".concat(event), fn);
        },
        $once: function $once($scope, event, fn) {
          if (typeof $scope === 'string') {
            fn = event;
            event = $scope;
            $scope = null;
          } // console.log('$once', `${namespace}.${event}`)


          self.$once($scope, "".concat(namespace, ".").concat(event), "__All__.".concat(event), fn);
        },
        $off: function $off(event, fn) {
          // console.log('$off', `${namespace}.${event}`)
          self.$off("".concat(namespace, ".").concat(event), fn);
          self.$off("__All__.".concat(event), fn);
        }
      };
      this.events[namespace] = instance;
      return instance;
    }
  }]);

  return EventBus;
}();

/* harmony default export */ __webpack_exports__["default"] = (new EventBus());
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./core/addMutation.js":
/*!*****************************!*\
  !*** ./core/addMutation.js ***!
  \*****************************/
/*! exports provided: default, defaultMutations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addMutation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMutations", function() { return defaultMutations; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var defaultMutations = {
  set: function set(state, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        prop = _ref2[0],
        value = _ref2[1];

    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(state, prop, value);
  },
  // reset(state, prop) {
  //   const recursiveReset = function(state, prop) {
  //     const data = _.get(state, prop)
  //     if (_.isArray(data)) {
  //       _.set(state, prop, [])
  //     } else if (_.isString(data)) {
  //       _.set(state, prop, undefined)
  //     } else if (_.isBoolean(data)) {
  //       _.set(state, prop, false)
  //     } else {
  //       Object.keys(data).map(function(key) {
  //         recursiveReset(state, prop + '.' + key)
  //       })
  //     }
  //   }
  //   recursiveReset(state, prop)
  // },
  add: function add(state, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        prop = _ref4[0],
        value = _ref4[1];

    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(state, prop).push(value);
  },
  update: function update(state, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        prop = _ref6[0],
        value = _ref6[1];

    if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(prop)) {
      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(state, prop, value);
    } else {
      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(prop, value);
    }
  },
  remove: function remove(state, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        prop = _ref8[0],
        value = _ref8[1];

    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(state, prop).splice(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(state, prop).indexOf(value), 1);
  }
};
function addMutation(store) {
  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(store, 'mutations', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(store.mutations, defaultMutations));

  if (store.modules) {
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(store.modules, function (module) {
      return addMutation(module);
    });
  }
}


/***/ }),

/***/ "./core/hooks.js":
/*!***********************!*\
  !*** ./core/hooks.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-unused-vars */

/* eslint-disable no-inner-declarations */

/* eslint-disable no-undef */

/* eslint-disable no-use-before-define */

/* eslint-disable consistent-return */
// modified https://github.com/bnoguchi/hooks-js
 // TODO Add in pre and post skipping options

var _pres = {};
var _posts = {};
var _hooks = {};

var HooK =
/*#__PURE__*/
function () {
  function HooK() {
    _classCallCheck(this, HooK);
  }

  _createClass(HooK, [{
    key: "getHook",
    value: function getHook(namespace, name, fn) {
      var hook = _hooks[namespace];
      return hook && hook[name] || fn;
    }
    /**
     *  Declares a new hook to which you can add pres and posts
     *  @param {String} name of the function
     *  @param {Function} the method
     *  @param {Function} the error handler callback
     */

  }, {
    key: "hook",
    value: function hook(namespace, name, fn, errorCb) {
      var proto = _hooks[namespace] = _hooks[namespace] || {},
          $pres = _pres[namespace] = _pres[namespace] || {},
          $posts = _posts[namespace] = _posts[namespace] || {};

      if (arguments.length === 2 && _typeof(name) === 'object') {
        // throw new Error('Specify one hook at a time.')
        var hooked = {};

        for (var k in name) {
          // `name` is a hash of hookName->hookFn
          hooked[k] = this.hook(namespace, k, name[k]);
        }

        return hooked;
      }

      $pres[name] = $pres[name] || [];
      $posts[name] = $posts[name] || [];

      if (proto[name]) {
        return proto[name];
      }

      proto[name] = function () {
        var self = this,
            hookArgs,
            // arguments eventually passed to the hook - are mutable
        lastArg = arguments[arguments.length - 1],
            pres = $pres[name],
            posts = $posts[name],
            _total = pres.length,
            _current = -1,
            _asyncsLeft = proto[name].numAsyncPres,
            _next = function _next() {
          if (arguments[0] instanceof Error) {
            return handleError(arguments[0]);
          }

          var _args = Array.prototype.slice.call(arguments),
              currPre,
              preArgs;

          if (_args.length && !(arguments[0] == null && typeof lastArg === 'function')) {
            hookArgs = _args;
          }

          ;

          if (++_current < _total) {
            currPre = pres[_current];

            if (currPre.isAsync && currPre.length < 2) {
              throw new Error('Your pre must have next and done arguments -- e.g., function (next, done, ...)');
            }

            ;

            if (currPre.length < 1) {
              throw new Error('Your pre must have a next argument -- e.g., function (next, ...)');
            }

            ;
            preArgs = (currPre.isAsync ? [once(_next), once(_asyncsDone)] : [once(_next)]).concat(hookArgs);
            return currPre.apply(self, preArgs);
          } else if (!proto[name].numAsyncPres) {
            return _done.apply(self, hookArgs);
          }
        },
            _done = function _done() {
          var args_ = Array.prototype.slice.call(arguments),
              ret,
              total_,
              current_,
              _next_,
              done_,
              postArgs;

          if (_current === _total) {
            _next_ = function next_() {
              if (arguments[0] instanceof Error) {
                return handleError(arguments[0]);
              }

              var args_ = Array.prototype.slice.call(arguments, 1);
              var currPost;
              var postArgs;
              if (args_.length) hookArgs = args_;

              if (++current_ < total_) {
                currPost = posts[current_];

                if (currPost.length < 1) {
                  throw new Error('Your post must have a next argument -- e.g., function (next, ...)');
                }

                ;
                postArgs = [once(_next_)].concat(hookArgs);
                return currPost.apply(self, postArgs);
              } else if (typeof lastArg === 'function') {
                // All post handlers are done, call original callback function
                return lastArg.apply(self, arguments);
              }
            }; // We are assuming that if the last argument provided to the wrapped function is a function,
            // it was expecting a callback.
            // We trap that callback and wait to call it until all post handlers have finished.


            if (typeof lastArg === 'function') {
              args_[args_.length - 1] = once(_next_);
            }

            total_ = posts.length;
            current_ = -1;
            ret = fn.apply(self, args_); // Execute wrapped function, post handlers come afterward
            // no callback provided, execute next_() manually

            if (total_ && typeof lastArg !== 'function') return _next_();
            return ret;
          }
        };

        if (_asyncsLeft) {
          var _asyncsDone2 = function _asyncsDone2(err) {
            if (err && err instanceof Error) {
              return handleError(err);
            }

            --_asyncsLeft || _done.apply(self, hookArgs);
          };
        }

        function handleError(err) {
          if (typeof lastArg === 'function') return lastArg(err);
          if (errorCb) return errorCb.call(self, err);
          throw err;
        }

        return _next.apply(this, arguments);
      };

      proto[name].numAsyncPres = 0;
      return proto[name];
    }
  }, {
    key: "pre",
    value: function pre(namespace, name, isAsync, fn, errorCb) {
      if (typeof arguments[2] !== 'boolean') {
        errorCb = fn;
        fn = isAsync;
        isAsync = false;
      }

      var proto = _hooks[namespace] = _hooks[namespace] || {};
      var pres = _pres[namespace] = _pres[namespace] || {}; // var proto = this.prototype || this,
      //   pres = (_pres = _pres || {})

      this._lazySetupHooks(namespace, proto, name, errorCb);

      if (fn.isAsync = isAsync) {
        proto[name].numAsyncPres++;
      }

      ;
      (pres[name] = pres[name] || []).push(fn);
      return this;
    }
  }, {
    key: "post",
    value: function post(namespace, name, isAsync, fn) {
      if (arguments.length === 3) {
        fn = isAsync;
        isAsync = false;
      }

      var proto = _hooks[namespace] = _hooks[namespace] || {},
          posts = _posts[namespace] = _posts[namespace] || {};

      this._lazySetupHooks(namespace, proto, name);

      (posts[name] = posts[name] || []).push(fn);
      return this;
    }
  }, {
    key: "removePre",
    value: function removePre(namespace, name, fnToRemove) {
      // let proto = (_hooks[namespace] = _hooks[namespace] || {});
      var pres = _pres[namespace] = _pres[namespace] || {}; // var proto = this.prototype || this,
      //   pres = _pres || (_pres || {})

      if (!pres[name]) return this;

      if (arguments.length === 2) {
        // Remove all pre callbacks for hook `name`
        pres[name].length = 0;
      } else {
        pres[name] = pres[name].filter(function (currFn) {
          return currFn !== fnToRemove;
        });
      }

      return this;
    }
  }, {
    key: "_lazySetupHooks",
    value: function _lazySetupHooks(namespace, proto, methodName, errorCb) {
      if (!proto[methodName]) {
        throw new Error("The hook is not set. ".concat(namespace, ".").concat(methodName));
      }

      if (typeof proto[methodName].numAsyncPres === 'undefined') {
        this.hook(methodName, proto[methodName], errorCb);
      }
    }
  }]);

  return HooK;
}();

function once(fn, scope) {
  return function fnWrapper() {
    if (fnWrapper.hookCalled) return undefined;
    fnWrapper.hookCalled = true;
    return fn.apply(scope, arguments);
  };
}

function props(obj) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.without(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)), 'constructor');
}

var hooks = new HooK();

lodash__WEBPACK_IMPORTED_MODULE_0___default.a.bindAll(hooks, props(hooks));

/* harmony default export */ __webpack_exports__["default"] = (hooks);
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./core/index.js":
/*!***********************!*\
  !*** ./core/index.js ***!
  \***********************/
/*! exports provided: default, Store, defaultMutations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "vuex");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _addMutation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addMutation */ "./core/addMutation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultMutations", function() { return _addMutation__WEBPACK_IMPORTED_MODULE_1__["defaultMutations"]; });

/* harmony import */ var _makeStoreService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./makeStoreService */ "./core/makeStoreService.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
 // import { defaultMutations, default as addMutation } from './addMutation';




var Store;

function plugin(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // const hook = options.hook;
  var store = options.store; // const flgMutation = options.mutation || false
  // if (!store) {
  //   throw new Error('Not defined store')
  // }
  // flgMutation && addMutation(store)

  var key = '$$store';
  Store = store ? Object(lodash__WEBPACK_IMPORTED_MODULE_3__["partialRight"])(Object(_makeStoreService__WEBPACK_IMPORTED_MODULE_2__["default"])(options), store) : Object(_makeStoreService__WEBPACK_IMPORTED_MODULE_2__["default"])(options);

  if (!Vue.prototype.hasOwnProperty(key)) {
    Object.defineProperty(Vue.prototype, key, {
      get: function get() {
        return Store;
      }
    });
    vuex__WEBPACK_IMPORTED_MODULE_0___default.a.Store.prototype[key] = Store;
  }
}

plugin.version = '__VERSION__';
/* harmony default export */ __webpack_exports__["default"] = (plugin);


/***/ }),

/***/ "./core/makeStoreService.js":
/*!**********************************!*\
  !*** ./core/makeStoreService.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventBus */ "./core/EventBus.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks */ "./core/hooks.js");




function setGetter(service, fnName, getters, fieldName) {
  try {
    Object.defineProperty(service, fnName, {
      get: function get() {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(getters, fieldName); // return getters[fieldName]
      } // set: function(newValue) {
      //   getters[fieldName] = newValue
      // }

    });
  } catch (e) {}
}

function getters(service, self, name) {
  var getters = self.$store ? self.$store.getters : self.getters;
  var keys = Object.keys(getters);
  var regex = name ? new RegExp('^' + name + '/') : new RegExp('');

  lodash__WEBPACK_IMPORTED_MODULE_0___default()(keys).filter(function (key) {
    return regex.test(key);
  }).map(function (key) {
    // const property = key
    //   .replace(regex, '')
    //   .split('/')
    //   .join('.');
    // _.set(service, property, getters[key])
    var fnName = key.replace(/[-_\w\d]+\//, '');
    setGetter(service, fnName, getters, key);
  }).value();
}

function checkExistFn(service, prop, property) {
  var isFn;

  if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(property)) {
    isFn = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(service, property);

    if (!isFn) {
      throw new Error('The function does not exist. ' + prop + '.' + property);
    }
  } else {
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(property, function (value, key) {
      isFn = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(service, key);

      if (!isFn) {
        throw new Error('The function does not exist. ' + prop + '.' + key);
      }
    });
  }
}
/**
 *
 * @param {*} service - vuexService 객체
 * @param {*} key - vuex의 모듈 이름
 * @param {*} prop - vuexService 객체에 할당 할 property name
 * @param {*} ref - store reference
 * @param {*} property - 실제 ref에서 참조할 경로
 */


function setStateGetter(service, key, prop, ref, property) {
  var target = key ? lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(service, key) : service;

  try {
    Object.defineProperty(target, prop, {
      get: function get() {
        var state = ref.$store ? ref.$store.state : ref.state;
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(state, property);
      },
      set: function set(newValue) {
        var state = ref.$store ? ref.$store.state : ref.state;

        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(state, property, newValue);
      }
    });
  } catch (e) {}
}
/**
 *
 * @param {*} ref - store reference
 * @param {*} root - vuex의 모듈 이름
 * @param {*} key - 하위 vuex의 모듈 이름
 * @param {*} service - vuexService 객체
 */


function exportState(ref, root, key, service) {
  var state = ref.$store ? ref.$store.state : ref.state;
  var keys = root ? Object.keys(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(state, root)) : Object.keys(state);

  lodash__WEBPACK_IMPORTED_MODULE_0___default()(keys).map(function (_key) {
    if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(service, _key)) {
      var prop = "".concat(root, ".").concat(_key).replace(/^\./, ''); // console.log(key, ',', _key, ',', prop)

      setStateGetter(service, key, _key, ref, prop);
    } else {
      // console.log('module =', property, ',', key, ',', _key)
      var _prop = "".concat(root, ".").concat(_key).replace(/^\./, '');

      exportState(ref, _prop, _key, service);
    }
  }).value();
}

function actions(service, self, name, prop, isUseHook) {
  var actions = self.$store ? self.$store._actions : self._actions;
  var keys = Object.keys(actions);
  var regex = name ? new RegExp('^' + name + '/') : new RegExp('');

  lodash__WEBPACK_IMPORTED_MODULE_0___default()(keys).filter(function (key) {
    return regex.test(key);
  }).map(function (key) {
    var property = key.replace(regex, '').split('/').join('.');

    var isExist = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(service, property);

    if (isExist) throw new Error('duplicate key');
    var that = self.$store ? self.$store : self;

    var fn = function fn(payload, value) {
      var data;
      var args = Array.prototype.slice.call(arguments);

      if (args.length === 1) {
        data = payload;
      } else {
        data = args;
      }

      return that.dispatch(key, data);
    };

    if (isUseHook) {
      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, property, _hooks__WEBPACK_IMPORTED_MODULE_2__["default"].getHook(prop, property, fn));

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, 'hook', function (property) {
        checkExistFn(service, prop, property);

        var hooked = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(_hooks__WEBPACK_IMPORTED_MODULE_2__["default"].hook, prop).apply(this, [].slice.call(arguments));

        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(hooked)) {
          lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(hooked, function (hook, name) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, name, hook);
          });
        } else {
          lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, property, hooked);
        }
      });

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, 'pre', function () {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(_hooks__WEBPACK_IMPORTED_MODULE_2__["default"].pre, prop).apply(this, [].slice.call(arguments));

        return service;
      });

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, 'post', function () {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(_hooks__WEBPACK_IMPORTED_MODULE_2__["default"].post, prop).apply(this, [].slice.call(arguments));

        return service;
      });
    } else {
      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, property, fn);
    }
  }).value();
}

function mutations(service, self, name, prop, isUseHook) {
  var mutations = self.$store ? self.$store._mutations : self._mutations;
  var keys = Object.keys(mutations);
  var regex = name ? new RegExp('^' + name + '/') : new RegExp('');

  lodash__WEBPACK_IMPORTED_MODULE_0___default()(keys).filter(function (key) {
    return regex.test(key);
  }).map(function (key) {
    var props = key.replace(regex, '').split('/');
    props.splice(props.length - 1, 0, 'm');
    var property = props.join('.');
    var that = self.$store ? self.$store : self;

    var fn = function fn(prop, value) {
      var data = {};
      var args = Array.prototype.slice.call(arguments);

      if (args.length === 1) {
        data = prop;
      } else {
        data = args;
      }

      return that.commit(key, data);
    };

    if (isUseHook) {
      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, property, _hooks__WEBPACK_IMPORTED_MODULE_2__["default"].getHook(prop, property, fn));

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, 'hook', function (property) {
        checkExistFn(service, prop, property);

        var hooked = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(_hooks__WEBPACK_IMPORTED_MODULE_2__["default"].hook, prop).apply(this, [].slice.call(arguments));

        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(hooked)) {
          lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(hooked, function (hook, name) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, name, hook);
          });
        } else {
          lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, property, hooked);
        }
      });

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, 'pre', function () {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(_hooks__WEBPACK_IMPORTED_MODULE_2__["default"].pre, prop).apply(this, [].slice.call(arguments));

        return service;
      });

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, 'post', function () {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(_hooks__WEBPACK_IMPORTED_MODULE_2__["default"].post, prop).apply(this, [].slice.call(arguments));

        return service;
      });
    } else {
      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(service, property, fn);
    }
  }).value();
}
/**
 *
 * @param {*} service - vuexService 객체
 * @param {*} self - store reference
 * @param {*} name - vuexService의 요청 이름, Todo, '', Todo/comments
 */


function state(service, self, name) {
  var key = name.split('/').join('.');
  exportState(self, key, '', service);
}

var cache = {};
/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  var isUseHook = options.hook;
  return function Store() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var store = arguments.length > 1 ? arguments[1] : undefined;
    var ref = this;

    if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(name)) {
      store = name;
      name = '';
    }

    if (store) {
      ref = store;
    }

    var names = name.trim().replace(' ', '').split(',');
    var group = {};
    var prop;
    names.forEach(function (name) {
      var regex = /.+\/([-_\w\d]+)$/;
      prop = (regex.test(name) ? regex.exec(name)[1] : name) || 'Root';

      if (cache[prop]) {
        group[prop] = cache[prop];
        return;
      }

      var service = {};
      getters(service, ref, name);
      actions(service, ref, name, prop, isUseHook);
      mutations(service, ref, name, prop, isUseHook);
      state(service, ref, name);

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(service, _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance(name));

      group[prop] = service;
      cache[prop] = service;
    });
    return names.length > 1 ? group : group[prop];
  };
});
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./core/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/prugel/Documents/project/vuex-service/core/index.js */"./core/index.js");


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "vuex":
/*!***********************!*\
  !*** external "vuex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92dWV4LXNlcnZpY2Uvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Z1ZXgtc2VydmljZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92dWV4LXNlcnZpY2UvLi9jb3JlL0V2ZW50QnVzLmpzIiwid2VicGFjazovL3Z1ZXgtc2VydmljZS8uL2NvcmUvYWRkTXV0YXRpb24uanMiLCJ3ZWJwYWNrOi8vdnVleC1zZXJ2aWNlLy4vY29yZS9ob29rcy5qcyIsIndlYnBhY2s6Ly92dWV4LXNlcnZpY2UvLi9jb3JlL2luZGV4LmpzIiwid2VicGFjazovL3Z1ZXgtc2VydmljZS8uL2NvcmUvbWFrZVN0b3JlU2VydmljZS5qcyIsIndlYnBhY2s6Ly92dWV4LXNlcnZpY2UvKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vdnVleC1zZXJ2aWNlL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vdnVleC1zZXJ2aWNlL2V4dGVybmFsIFwidnVleFwiIl0sIm5hbWVzIjpbImtleSIsIkV2ZW50QnVzIiwiZXZlbnRzIiwiJHNjb3BlIiwiZXZlbnQiLCJmbiIsInB1c2giLCIkb24iLCJzZWxmIiwiJG9mZiIsImJyb2FkRXZlbnQiLCJjYiIsImFwcGx5IiwiYXJndW1lbnRzIiwibGlzdGVuZXJzIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImV2dCIsInJlZ2V4IiwiUmVnRXhwIiwicmVwbGFjZSIsInRlc3QiLCJyZWR1Y2UiLCJhcnIiLCJjb25jYXQiLCJ1bmRlZmluZWQiLCJnZXRMaXN0ZW5lcnMiLCJjYWxsIiwicGFyYW1zIiwic2xpY2UiLCJpIiwibGVuZ3RoIiwibmFtZXNwYWNlIiwiaW5zdGFuY2UiLCIkZW1pdCIsImRhdGEiLCIkYnJvYWRjYXN0IiwiJG9uY2UiLCJkZWZhdWx0TXV0YXRpb25zIiwic2V0Iiwic3RhdGUiLCJwcm9wIiwidmFsdWUiLCJfIiwiYWRkIiwiZ2V0IiwidXBkYXRlIiwiaXNTdHJpbmciLCJtZXJnZSIsInJlbW92ZSIsImFkZE11dGF0aW9uIiwic3RvcmUiLCJtdXRhdGlvbnMiLCJtb2R1bGVzIiwiZm9yRWFjaCIsIm1vZHVsZSIsIl9wcmVzIiwiX3Bvc3RzIiwiX2hvb2tzIiwiSG9vSyIsIm5hbWUiLCJob29rIiwiZXJyb3JDYiIsInByb3RvIiwiJHByZXMiLCIkcG9zdHMiLCJob29rZWQiLCJrIiwiaG9va0FyZ3MiLCJsYXN0QXJnIiwicHJlcyIsInBvc3RzIiwiX3RvdGFsIiwiX2N1cnJlbnQiLCJfYXN5bmNzTGVmdCIsIm51bUFzeW5jUHJlcyIsIl9uZXh0IiwiRXJyb3IiLCJoYW5kbGVFcnJvciIsIl9hcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjdXJyUHJlIiwicHJlQXJncyIsImlzQXN5bmMiLCJvbmNlIiwiX2FzeW5jc0RvbmUiLCJfZG9uZSIsImFyZ3NfIiwicmV0IiwidG90YWxfIiwiY3VycmVudF8iLCJuZXh0XyIsImRvbmVfIiwicG9zdEFyZ3MiLCJjdXJyUG9zdCIsImVyciIsIl9sYXp5U2V0dXBIb29rcyIsImZuVG9SZW1vdmUiLCJjdXJyRm4iLCJtZXRob2ROYW1lIiwic2NvcGUiLCJmbldyYXBwZXIiLCJob29rQ2FsbGVkIiwicHJvcHMiLCJvYmoiLCJ3aXRob3V0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImdldFByb3RvdHlwZU9mIiwiaG9va3MiLCJiaW5kQWxsIiwiU3RvcmUiLCJwbHVnaW4iLCJWdWUiLCJvcHRpb25zIiwicGFydGlhbFJpZ2h0IiwiX1N0b3JlIiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsIlZ1ZXgiLCJ2ZXJzaW9uIiwic2V0R2V0dGVyIiwic2VydmljZSIsImZuTmFtZSIsImdldHRlcnMiLCJmaWVsZE5hbWUiLCJlIiwiJHN0b3JlIiwibWFwIiwiY2hlY2tFeGlzdEZuIiwicHJvcGVydHkiLCJpc0ZuIiwic2V0U3RhdGVHZXR0ZXIiLCJyZWYiLCJ0YXJnZXQiLCJuZXdWYWx1ZSIsImV4cG9ydFN0YXRlIiwicm9vdCIsIl9rZXkiLCJhY3Rpb25zIiwiaXNVc2VIb29rIiwiX2FjdGlvbnMiLCJzcGxpdCIsImpvaW4iLCJpc0V4aXN0IiwidGhhdCIsInBheWxvYWQiLCJhcmdzIiwiZGlzcGF0Y2giLCJnZXRIb29rIiwicGFydGlhbCIsImlzT2JqZWN0IiwicHJlIiwicG9zdCIsIl9tdXRhdGlvbnMiLCJjb21taXQiLCJjYWNoZSIsIm5hbWVzIiwidHJpbSIsImdyb3VwIiwiZXhlYyIsImdldEluc3RhbmNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQSxJQUFNQSxHQUFHLEdBQUcsc0JBQVo7O0lBRU1DLFE7OztBQUNKLHNCQUFj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QUEsaUMiLCJmaWxlIjoidnVleC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ2dWV4LXNlcnZpY2VcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widnVleC1zZXJ2aWNlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInZ1ZXgtc2VydmljZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvLyByZWZlcmVuY2UgaHR0cHM6Ly9naXRodWIuY29tL3J1YmVudi9hbmd1bGFyLXRpbnktZXZlbnRlbWl0dGVyXG5jb25zdCBrZXkgPSAnJCR0aW55RXZlbnRMaXN0ZW5lcnMnO1xuXG5jbGFzcyBFdmVudEJ1cyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZXZlbnRzID0ge307XG4gIH1cblxuICAkb24oJHNjb3BlLCBldmVudCwgZm4pIHtcbiAgICBpZiAoIXRoaXNba2V5XSkge1xuICAgICAgdGhpc1trZXldID0ge307XG4gICAgfVxuXG4gICAgbGV0IGV2ZW50cyA9IHRoaXNba2V5XTtcblxuICAgIGlmICghZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgIH1cblxuICAgIGV2ZW50c1tldmVudF0ucHVzaChmbik7XG5cbiAgICBpZiAoJHNjb3BlICYmICRzY29wZS4kb24pIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAkc2NvcGUuJG9uKCdob29rOmJlZm9yZURlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIHNlbGYuJG9mZihldmVudCwgZm4pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAkb25jZSgkc2NvcGUsIGV2ZW50LCBicm9hZEV2ZW50LCBmbikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGNiID0gZnVuY3Rpb24gKCkge1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHNlbGYuJG9mZihldmVudCwgY2IpO1xuICAgICAgc2VsZi4kb2ZmKGJyb2FkRXZlbnQsIGNiKTtcbiAgICB9O1xuXG4gICAgdGhpcy4kb24oJHNjb3BlLCBldmVudCwgY2IpO1xuICAgIHRoaXMuJG9uKCRzY29wZSwgYnJvYWRFdmVudCwgY2IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgJG9mZihldmVudCwgZm4pIHtcbiAgICBpZiAoIXRoaXNba2V5XSB8fCAhdGhpc1trZXldW2V2ZW50XSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGV0IGV2ZW50cyA9IHRoaXNba2V5XTtcblxuICAgIGlmICghZm4pIHtcbiAgICAgIGRlbGV0ZSBldmVudHNbZXZlbnRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbGlzdGVuZXJzID0gZXZlbnRzW2V2ZW50XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoZm4pO1xuXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzZWxmW2tleV0pXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGV2dC5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuJykucmVwbGFjZSgvXFwqL2csICcuKicpICsgJyQnKTtcblxuICAgICAgICByZXR1cm4gcmVnZXgudGVzdChldmVudCk7XG4gICAgICB9KVxuICAgICAgLnJlZHVjZShmdW5jdGlvbiAoYXJyLCBldnQpIHtcbiAgICAgICAgcmV0dXJuIGFyci5jb25jYXQoc2VsZltrZXldW2V2dF0pO1xuICAgICAgfSwgW10pO1xuICB9XG5cbiAgJGVtaXQoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXNba2V5XSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBNYWtpbmcgYSBjb3B5IGhlcmUgdG8gYWxsb3cgYG9mZmAgaW4gbGlzdGVuZXJzLlxuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIGNvbnN0IHBhcmFtcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkobnVsbCwgcGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRJbnN0YW5jZShuYW1lc3BhY2UpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGlmICh0aGlzLmV2ZW50c1tuYW1lc3BhY2VdKSB7XG4gICAgICByZXR1cm4gdGhpcy5ldmVudHNbbmFtZXNwYWNlXTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICAgICRlbWl0KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCckZW1pdCcsIGAke25hbWVzcGFjZX0uJHtldmVudH1gKVxuICAgICAgICBzZWxmLiRlbWl0KGAke25hbWVzcGFjZX0uJHtldmVudH1gLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICAkYnJvYWRjYXN0KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCckYnJvYWRjYXN0JywgYCR7ZXZlbnR9YClcbiAgICAgICAgc2VsZi4kZW1pdChgX19BbGxfXy4ke2V2ZW50fWAsIGRhdGEpO1xuICAgICAgfSxcbiAgICAgICRvbigkc2NvcGUsIGV2ZW50LCBmbikge1xuICAgICAgICBpZiAodHlwZW9mICRzY29wZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBmbiA9IGV2ZW50O1xuICAgICAgICAgIGV2ZW50ID0gJHNjb3BlO1xuICAgICAgICAgICRzY29wZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJyRvbicsIGAke25hbWVzcGFjZX0uJHtldmVudH1gKVxuICAgICAgICBzZWxmLiRvbigkc2NvcGUsIGAke25hbWVzcGFjZX0uJHtldmVudH1gLCBmbik7XG4gICAgICAgIHNlbGYuJG9uKCRzY29wZSwgYF9fQWxsX18uJHtldmVudH1gLCBmbik7XG4gICAgICB9LFxuICAgICAgJG9uY2UoJHNjb3BlLCBldmVudCwgZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZm4gPSBldmVudDtcbiAgICAgICAgICBldmVudCA9ICRzY29wZTtcbiAgICAgICAgICAkc2NvcGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCckb25jZScsIGAke25hbWVzcGFjZX0uJHtldmVudH1gKVxuICAgICAgICBzZWxmLiRvbmNlKCRzY29wZSwgYCR7bmFtZXNwYWNlfS4ke2V2ZW50fWAsIGBfX0FsbF9fLiR7ZXZlbnR9YCwgZm4pO1xuICAgICAgfSxcbiAgICAgICRvZmYoZXZlbnQsIGZuKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCckb2ZmJywgYCR7bmFtZXNwYWNlfS4ke2V2ZW50fWApXG4gICAgICAgIHNlbGYuJG9mZihgJHtuYW1lc3BhY2V9LiR7ZXZlbnR9YCwgZm4pO1xuICAgICAgICBzZWxmLiRvZmYoYF9fQWxsX18uJHtldmVudH1gLCBmbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZXZlbnRzW25hbWVzcGFjZV0gPSBpbnN0YW5jZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEV2ZW50QnVzKCk7XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBkZWZhdWx0TXV0YXRpb25zID0ge1xuICBzZXQoc3RhdGUsIFtwcm9wLCB2YWx1ZV0pIHtcbiAgICBfLnNldChzdGF0ZSwgcHJvcCwgdmFsdWUpO1xuICB9LFxuICAvLyByZXNldChzdGF0ZSwgcHJvcCkge1xuICAvLyAgIGNvbnN0IHJlY3Vyc2l2ZVJlc2V0ID0gZnVuY3Rpb24oc3RhdGUsIHByb3ApIHtcbiAgLy8gICAgIGNvbnN0IGRhdGEgPSBfLmdldChzdGF0ZSwgcHJvcClcbiAgLy8gICAgIGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcbiAgLy8gICAgICAgXy5zZXQoc3RhdGUsIHByb3AsIFtdKVxuICAvLyAgICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKGRhdGEpKSB7XG4gIC8vICAgICAgIF8uc2V0KHN0YXRlLCBwcm9wLCB1bmRlZmluZWQpXG4gIC8vICAgICB9IGVsc2UgaWYgKF8uaXNCb29sZWFuKGRhdGEpKSB7XG4gIC8vICAgICAgIF8uc2V0KHN0YXRlLCBwcm9wLCBmYWxzZSlcbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgLy8gICAgICAgICByZWN1cnNpdmVSZXNldChzdGF0ZSwgcHJvcCArICcuJyArIGtleSlcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vICAgcmVjdXJzaXZlUmVzZXQoc3RhdGUsIHByb3ApXG4gIC8vIH0sXG4gIGFkZChzdGF0ZSwgW3Byb3AsIHZhbHVlXSkge1xuICAgIF8uZ2V0KHN0YXRlLCBwcm9wKS5wdXNoKHZhbHVlKTtcbiAgfSxcbiAgdXBkYXRlKHN0YXRlLCBbcHJvcCwgdmFsdWVdKSB7XG4gICAgaWYgKF8uaXNTdHJpbmcocHJvcCkpIHtcbiAgICAgIF8uc2V0KHN0YXRlLCBwcm9wLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8ubWVyZ2UocHJvcCwgdmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgcmVtb3ZlKHN0YXRlLCBbcHJvcCwgdmFsdWVdKSB7XG4gICAgXy5nZXQoc3RhdGUsIHByb3ApLnNwbGljZShfLmdldChzdGF0ZSwgcHJvcCkuaW5kZXhPZih2YWx1ZSksIDEpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRNdXRhdGlvbihzdG9yZSkge1xuICBfLnNldChzdG9yZSwgJ211dGF0aW9ucycsIF8ubWVyZ2Uoc3RvcmUubXV0YXRpb25zLCBkZWZhdWx0TXV0YXRpb25zKSk7XG4gIGlmIChzdG9yZS5tb2R1bGVzKSB7XG4gICAgXy5mb3JFYWNoKHN0b3JlLm1vZHVsZXMsIG1vZHVsZSA9PiBhZGRNdXRhdGlvbihtb2R1bGUpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBkZWZhdWx0TXV0YXRpb25zIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8taW5uZXItZGVjbGFyYXRpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGNvbnNpc3RlbnQtcmV0dXJuICovXG4vLyBtb2RpZmllZCBodHRwczovL2dpdGh1Yi5jb20vYm5vZ3VjaGkvaG9va3MtanNcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbi8vIFRPRE8gQWRkIGluIHByZSBhbmQgcG9zdCBza2lwcGluZyBvcHRpb25zXG5sZXQgX3ByZXMgPSB7fTtcbmxldCBfcG9zdHMgPSB7fTtcbmxldCBfaG9va3MgPSB7fTtcblxuY2xhc3MgSG9vSyB7XG4gIGdldEhvb2sobmFtZXNwYWNlLCBuYW1lLCBmbikge1xuICAgIHZhciBob29rID0gX2hvb2tzW25hbWVzcGFjZV07XG5cbiAgICByZXR1cm4gKGhvb2sgJiYgaG9va1tuYW1lXSkgfHwgZm47XG4gIH1cbiAgLyoqXG4gICAqICBEZWNsYXJlcyBhIG5ldyBob29rIHRvIHdoaWNoIHlvdSBjYW4gYWRkIHByZXMgYW5kIHBvc3RzXG4gICAqICBAcGFyYW0ge1N0cmluZ30gbmFtZSBvZiB0aGUgZnVuY3Rpb25cbiAgICogIEBwYXJhbSB7RnVuY3Rpb259IHRoZSBtZXRob2RcbiAgICogIEBwYXJhbSB7RnVuY3Rpb259IHRoZSBlcnJvciBoYW5kbGVyIGNhbGxiYWNrXG4gICAqL1xuICBob29rKG5hbWVzcGFjZSwgbmFtZSwgZm4sIGVycm9yQ2IpIHtcbiAgICB2YXIgcHJvdG8gPSAoX2hvb2tzW25hbWVzcGFjZV0gPSBfaG9va3NbbmFtZXNwYWNlXSB8fCB7fSksXG4gICAgICAkcHJlcyA9IChfcHJlc1tuYW1lc3BhY2VdID0gX3ByZXNbbmFtZXNwYWNlXSB8fCB7fSksXG4gICAgICAkcG9zdHMgPSAoX3Bvc3RzW25hbWVzcGFjZV0gPSBfcG9zdHNbbmFtZXNwYWNlXSB8fCB7fSk7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8vIHRocm93IG5ldyBFcnJvcignU3BlY2lmeSBvbmUgaG9vayBhdCBhIHRpbWUuJylcbiAgICAgIGxldCBob29rZWQgPSB7fTtcblxuICAgICAgZm9yIChsZXQgayBpbiBuYW1lKSB7XG4gICAgICAgIC8vIGBuYW1lYCBpcyBhIGhhc2ggb2YgaG9va05hbWUtPmhvb2tGblxuICAgICAgICBob29rZWRba10gPSB0aGlzLmhvb2sobmFtZXNwYWNlLCBrLCBuYW1lW2tdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBob29rZWQ7XG4gICAgfVxuXG4gICAgJHByZXNbbmFtZV0gPSAkcHJlc1tuYW1lXSB8fCBbXTtcbiAgICAkcG9zdHNbbmFtZV0gPSAkcG9zdHNbbmFtZV0gfHwgW107XG5cbiAgICBpZiAocHJvdG9bbmFtZV0pIHtcbiAgICAgIHJldHVybiBwcm90b1tuYW1lXTtcbiAgICB9XG5cbiAgICBwcm90b1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaG9va0FyZ3MsIC8vIGFyZ3VtZW50cyBldmVudHVhbGx5IHBhc3NlZCB0byB0aGUgaG9vayAtIGFyZSBtdXRhYmxlXG4gICAgICAgIGxhc3RBcmcgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLFxuICAgICAgICBwcmVzID0gJHByZXNbbmFtZV0sXG4gICAgICAgIHBvc3RzID0gJHBvc3RzW25hbWVdLFxuICAgICAgICBfdG90YWwgPSBwcmVzLmxlbmd0aCxcbiAgICAgICAgX2N1cnJlbnQgPSAtMSxcbiAgICAgICAgX2FzeW5jc0xlZnQgPSBwcm90b1tuYW1lXS5udW1Bc3luY1ByZXMsXG4gICAgICAgIF9uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbMF0gaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBfYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICBjdXJyUHJlLFxuICAgICAgICAgICAgcHJlQXJncztcblxuICAgICAgICAgIGlmIChfYXJncy5sZW5ndGggJiYgIShhcmd1bWVudHNbMF0gPT0gbnVsbCAmJiB0eXBlb2YgbGFzdEFyZyA9PT0gJ2Z1bmN0aW9uJykpIHsgaG9va0FyZ3MgPSBfYXJnczsgfTtcbiAgICAgICAgICBpZiAoKytfY3VycmVudCA8IF90b3RhbCkge1xuICAgICAgICAgICAgY3VyclByZSA9IHByZXNbX2N1cnJlbnRdO1xuICAgICAgICAgICAgaWYgKGN1cnJQcmUuaXNBc3luYyAmJiBjdXJyUHJlLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICdZb3VyIHByZSBtdXN0IGhhdmUgbmV4dCBhbmQgZG9uZSBhcmd1bWVudHMgLS0gZS5nLiwgZnVuY3Rpb24gKG5leHQsIGRvbmUsIC4uLiknXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGN1cnJQcmUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdXIgcHJlIG11c3QgaGF2ZSBhIG5leHQgYXJndW1lbnQgLS0gZS5nLiwgZnVuY3Rpb24gKG5leHQsIC4uLiknKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwcmVBcmdzID0gKGN1cnJQcmUuaXNBc3luYyA/IFtvbmNlKF9uZXh0KSwgb25jZShfYXN5bmNzRG9uZSldIDogW29uY2UoX25leHQpXSkuY29uY2F0KFxuICAgICAgICAgICAgICBob29rQXJnc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyUHJlLmFwcGx5KHNlbGYsIHByZUFyZ3MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXByb3RvW25hbWVdLm51bUFzeW5jUHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIF9kb25lLmFwcGx5KHNlbGYsIGhvb2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9kb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBhcmdzXyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICByZXQsXG4gICAgICAgICAgICB0b3RhbF8sXG4gICAgICAgICAgICBjdXJyZW50XyxcbiAgICAgICAgICAgIG5leHRfLFxuICAgICAgICAgICAgZG9uZV8sXG4gICAgICAgICAgICBwb3N0QXJncztcblxuICAgICAgICAgIGlmIChfY3VycmVudCA9PT0gX3RvdGFsKSB7XG4gICAgICAgICAgICBuZXh0XyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGV0IGFyZ3NfID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgICAgbGV0IGN1cnJQb3N0O1xuICAgICAgICAgICAgICBsZXQgcG9zdEFyZ3M7XG5cbiAgICAgICAgICAgICAgaWYgKGFyZ3NfLmxlbmd0aCkgaG9va0FyZ3MgPSBhcmdzXztcbiAgICAgICAgICAgICAgaWYgKCsrY3VycmVudF8gPCB0b3RhbF8pIHtcbiAgICAgICAgICAgICAgICBjdXJyUG9zdCA9IHBvc3RzW2N1cnJlbnRfXTtcbiAgICAgICAgICAgICAgICBpZiAoY3VyclBvc3QubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnWW91ciBwb3N0IG11c3QgaGF2ZSBhIG5leHQgYXJndW1lbnQgLS0gZS5nLiwgZnVuY3Rpb24gKG5leHQsIC4uLiknXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcG9zdEFyZ3MgPSBbb25jZShuZXh0XyldLmNvbmNhdChob29rQXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJQb3N0LmFwcGx5KHNlbGYsIHBvc3RBcmdzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGFzdEFyZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vIEFsbCBwb3N0IGhhbmRsZXJzIGFyZSBkb25lLCBjYWxsIG9yaWdpbmFsIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RBcmcuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gV2UgYXJlIGFzc3VtaW5nIHRoYXQgaWYgdGhlIGxhc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb24gaXMgYSBmdW5jdGlvbixcbiAgICAgICAgICAgIC8vIGl0IHdhcyBleHBlY3RpbmcgYSBjYWxsYmFjay5cbiAgICAgICAgICAgIC8vIFdlIHRyYXAgdGhhdCBjYWxsYmFjayBhbmQgd2FpdCB0byBjYWxsIGl0IHVudGlsIGFsbCBwb3N0IGhhbmRsZXJzIGhhdmUgZmluaXNoZWQuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGxhc3RBcmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgYXJnc19bYXJnc18ubGVuZ3RoIC0gMV0gPSBvbmNlKG5leHRfKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG90YWxfID0gcG9zdHMubGVuZ3RoO1xuICAgICAgICAgICAgY3VycmVudF8gPSAtMTtcbiAgICAgICAgICAgIHJldCA9IGZuLmFwcGx5KHNlbGYsIGFyZ3NfKTsgLy8gRXhlY3V0ZSB3cmFwcGVkIGZ1bmN0aW9uLCBwb3N0IGhhbmRsZXJzIGNvbWUgYWZ0ZXJ3YXJkXG5cbiAgICAgICAgICAgIC8vIG5vIGNhbGxiYWNrIHByb3ZpZGVkLCBleGVjdXRlIG5leHRfKCkgbWFudWFsbHlcbiAgICAgICAgICAgIGlmICh0b3RhbF8gJiYgdHlwZW9mIGxhc3RBcmcgIT09ICdmdW5jdGlvbicpIHJldHVybiBuZXh0XygpO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgIGlmIChfYXN5bmNzTGVmdCkge1xuICAgICAgICBmdW5jdGlvbiBfYXN5bmNzRG9uZShlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyICYmIGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLS1fYXN5bmNzTGVmdCB8fCBfZG9uZS5hcHBseShzZWxmLCBob29rQXJncyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycikge1xuICAgICAgICBpZiAodHlwZW9mIGxhc3RBcmcgPT09ICdmdW5jdGlvbicpIHJldHVybiBsYXN0QXJnKGVycik7XG4gICAgICAgIGlmIChlcnJvckNiKSByZXR1cm4gZXJyb3JDYi5jYWxsKHNlbGYsIGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfbmV4dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBwcm90b1tuYW1lXS5udW1Bc3luY1ByZXMgPSAwO1xuXG4gICAgcmV0dXJuIHByb3RvW25hbWVdO1xuICB9XG5cbiAgcHJlKG5hbWVzcGFjZSwgbmFtZSwgaXNBc3luYywgZm4sIGVycm9yQ2IpIHtcbiAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1syXSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBlcnJvckNiID0gZm47XG4gICAgICBmbiA9IGlzQXN5bmM7XG4gICAgICBpc0FzeW5jID0gZmFsc2U7XG4gICAgfVxuICAgIGxldCBwcm90byA9IChfaG9va3NbbmFtZXNwYWNlXSA9IF9ob29rc1tuYW1lc3BhY2VdIHx8IHt9KTtcbiAgICBsZXQgcHJlcyA9IChfcHJlc1tuYW1lc3BhY2VdID0gX3ByZXNbbmFtZXNwYWNlXSB8fCB7fSk7XG5cbiAgICAvLyB2YXIgcHJvdG8gPSB0aGlzLnByb3RvdHlwZSB8fCB0aGlzLFxuICAgIC8vICAgcHJlcyA9IChfcHJlcyA9IF9wcmVzIHx8IHt9KVxuXG4gICAgdGhpcy5fbGF6eVNldHVwSG9va3MobmFtZXNwYWNlLCBwcm90bywgbmFtZSwgZXJyb3JDYik7XG5cbiAgICBpZiAoKGZuLmlzQXN5bmMgPSBpc0FzeW5jKSkge1xuICAgICAgcHJvdG9bbmFtZV0ubnVtQXN5bmNQcmVzKys7XG4gICAgfVxuXG4gICAgOyAocHJlc1tuYW1lXSA9IHByZXNbbmFtZV0gfHwgW10pLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcG9zdChuYW1lc3BhY2UsIG5hbWUsIGlzQXN5bmMsIGZuKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGZuID0gaXNBc3luYztcbiAgICAgIGlzQXN5bmMgPSBmYWxzZTtcbiAgICB9XG4gICAgbGV0IHByb3RvID0gKF9ob29rc1tuYW1lc3BhY2VdID0gX2hvb2tzW25hbWVzcGFjZV0gfHwge30pLFxuICAgICAgcG9zdHMgPSAoX3Bvc3RzW25hbWVzcGFjZV0gPSBfcG9zdHNbbmFtZXNwYWNlXSB8fCB7fSk7XG5cbiAgICB0aGlzLl9sYXp5U2V0dXBIb29rcyhuYW1lc3BhY2UsIHByb3RvLCBuYW1lKTtcbiAgICAocG9zdHNbbmFtZV0gPSBwb3N0c1tuYW1lXSB8fCBbXSkucHVzaChmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZW1vdmVQcmUobmFtZXNwYWNlLCBuYW1lLCBmblRvUmVtb3ZlKSB7XG4gICAgLy8gbGV0IHByb3RvID0gKF9ob29rc1tuYW1lc3BhY2VdID0gX2hvb2tzW25hbWVzcGFjZV0gfHwge30pO1xuICAgIGxldCBwcmVzID0gKF9wcmVzW25hbWVzcGFjZV0gPSBfcHJlc1tuYW1lc3BhY2VdIHx8IHt9KTtcbiAgICAvLyB2YXIgcHJvdG8gPSB0aGlzLnByb3RvdHlwZSB8fCB0aGlzLFxuICAgIC8vICAgcHJlcyA9IF9wcmVzIHx8IChfcHJlcyB8fCB7fSlcblxuICAgIGlmICghcHJlc1tuYW1lXSkgcmV0dXJuIHRoaXM7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIC8vIFJlbW92ZSBhbGwgcHJlIGNhbGxiYWNrcyBmb3IgaG9vayBgbmFtZWBcbiAgICAgIHByZXNbbmFtZV0ubGVuZ3RoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJlc1tuYW1lXSA9IHByZXNbbmFtZV0uZmlsdGVyKGZ1bmN0aW9uIChjdXJyRm4pIHtcbiAgICAgICAgcmV0dXJuIGN1cnJGbiAhPT0gZm5Ub1JlbW92ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9sYXp5U2V0dXBIb29rcyhuYW1lc3BhY2UsIHByb3RvLCBtZXRob2ROYW1lLCBlcnJvckNiKSB7XG4gICAgaWYgKCFwcm90b1ttZXRob2ROYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgaG9vayBpcyBub3Qgc2V0LiAke25hbWVzcGFjZX0uJHttZXRob2ROYW1lfWApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHByb3RvW21ldGhvZE5hbWVdLm51bUFzeW5jUHJlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaG9vayhtZXRob2ROYW1lLCBwcm90b1ttZXRob2ROYW1lXSwgZXJyb3JDYik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uY2UoZm4sIHNjb3BlKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmbldyYXBwZXIoKSB7XG4gICAgaWYgKGZuV3JhcHBlci5ob29rQ2FsbGVkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGZuV3JhcHBlci5ob29rQ2FsbGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gZm4uYXBwbHkoc2NvcGUsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb3BzKG9iaikge1xuICByZXR1cm4gXy53aXRob3V0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSwgJ2NvbnN0cnVjdG9yJyk7XG59XG5jb25zdCBob29rcyA9IG5ldyBIb29LKCk7XG5cbl8uYmluZEFsbChob29rcywgcHJvcHMoaG9va3MpKTtcbmV4cG9ydCBkZWZhdWx0IGhvb2tzO1xuIiwiaW1wb3J0IFZ1ZXggZnJvbSAndnVleCc7XG4vLyBpbXBvcnQgeyBkZWZhdWx0TXV0YXRpb25zLCBkZWZhdWx0IGFzIGFkZE11dGF0aW9uIH0gZnJvbSAnLi9hZGRNdXRhdGlvbic7XG5pbXBvcnQgeyBkZWZhdWx0TXV0YXRpb25zIH0gZnJvbSAnLi9hZGRNdXRhdGlvbic7XG5pbXBvcnQgX1N0b3JlIGZyb20gJy4vbWFrZVN0b3JlU2VydmljZSc7XG5pbXBvcnQgeyBwYXJ0aWFsUmlnaHQgfSBmcm9tICdsb2Rhc2gnO1xuXG5sZXQgU3RvcmU7XG5cbmZ1bmN0aW9uIHBsdWdpbihWdWUsIG9wdGlvbnMgPSB7fSkge1xuICAvLyBjb25zdCBob29rID0gb3B0aW9ucy5ob29rO1xuICBjb25zdCBzdG9yZSA9IG9wdGlvbnMuc3RvcmU7XG4gIC8vIGNvbnN0IGZsZ011dGF0aW9uID0gb3B0aW9ucy5tdXRhdGlvbiB8fCBmYWxzZVxuXG4gIC8vIGlmICghc3RvcmUpIHtcbiAgLy8gICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBkZWZpbmVkIHN0b3JlJylcbiAgLy8gfVxuXG4gIC8vIGZsZ011dGF0aW9uICYmIGFkZE11dGF0aW9uKHN0b3JlKVxuICBjb25zdCBrZXkgPSAnJCRzdG9yZSc7XG5cbiAgU3RvcmUgPSBzdG9yZSA/IHBhcnRpYWxSaWdodChfU3RvcmUob3B0aW9ucyksIHN0b3JlKSA6IF9TdG9yZShvcHRpb25zKTtcbiAgaWYgKCFWdWUucHJvdG90eXBlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwga2V5LCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiBTdG9yZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBWdWV4LlN0b3JlLnByb3RvdHlwZVtrZXldID0gU3RvcmU7XG4gIH1cbn1cblxucGx1Z2luLnZlcnNpb24gPSAnX19WRVJTSU9OX18nO1xuXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG5leHBvcnQgeyBTdG9yZSwgZGVmYXVsdE11dGF0aW9ucyB9O1xuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBFdmVudEJ1cyBmcm9tICcuL0V2ZW50QnVzJztcbmltcG9ydCBob29rcyBmcm9tICcuL2hvb2tzJztcblxuZnVuY3Rpb24gc2V0R2V0dGVyKHNlcnZpY2UsIGZuTmFtZSwgZ2V0dGVycywgZmllbGROYW1lKSB7XG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlcnZpY2UsIGZuTmFtZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfLmdldChnZXR0ZXJzLCBmaWVsZE5hbWUpO1xuICAgICAgICAvLyByZXR1cm4gZ2V0dGVyc1tmaWVsZE5hbWVdXG4gICAgICB9XG4gICAgICAvLyBzZXQ6IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAvLyAgIGdldHRlcnNbZmllbGROYW1lXSA9IG5ld1ZhbHVlXG4gICAgICAvLyB9XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHsgfVxufVxuXG5mdW5jdGlvbiBnZXR0ZXJzKHNlcnZpY2UsIHNlbGYsIG5hbWUpIHtcbiAgY29uc3QgZ2V0dGVycyA9IHNlbGYuJHN0b3JlID8gc2VsZi4kc3RvcmUuZ2V0dGVycyA6IHNlbGYuZ2V0dGVycztcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGdldHRlcnMpO1xuICBjb25zdCByZWdleCA9IG5hbWUgPyBuZXcgUmVnRXhwKCdeJyArIG5hbWUgKyAnLycpIDogbmV3IFJlZ0V4cCgnJyk7XG5cbiAgXyhrZXlzKVxuICAgIC5maWx0ZXIoa2V5ID0+IHJlZ2V4LnRlc3Qoa2V5KSlcbiAgICAubWFwKGtleSA9PiB7XG4gICAgICAvLyBjb25zdCBwcm9wZXJ0eSA9IGtleVxuICAgICAgLy8gICAucmVwbGFjZShyZWdleCwgJycpXG4gICAgICAvLyAgIC5zcGxpdCgnLycpXG4gICAgICAvLyAgIC5qb2luKCcuJyk7XG4gICAgICAvLyBfLnNldChzZXJ2aWNlLCBwcm9wZXJ0eSwgZ2V0dGVyc1trZXldKVxuICAgICAgdmFyIGZuTmFtZSA9IGtleS5yZXBsYWNlKC9bLV9cXHdcXGRdK1xcLy8sICcnKTtcblxuICAgICAgc2V0R2V0dGVyKHNlcnZpY2UsIGZuTmFtZSwgZ2V0dGVycywga2V5KTtcbiAgICB9KVxuICAgIC52YWx1ZSgpO1xufVxuXG5mdW5jdGlvbiBjaGVja0V4aXN0Rm4oc2VydmljZSwgcHJvcCwgcHJvcGVydHkpIHtcbiAgbGV0IGlzRm47XG5cbiAgaWYgKF8uaXNTdHJpbmcocHJvcGVydHkpKSB7XG4gICAgaXNGbiA9IF8uZ2V0KHNlcnZpY2UsIHByb3BlcnR5KTtcblxuICAgIGlmICghaXNGbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZnVuY3Rpb24gZG9lcyBub3QgZXhpc3QuICcgKyBwcm9wICsgJy4nICsgcHJvcGVydHkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBfLmZvckVhY2gocHJvcGVydHksICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBpc0ZuID0gXy5nZXQoc2VydmljZSwga2V5KTtcblxuICAgICAgaWYgKCFpc0ZuKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZ1bmN0aW9uIGRvZXMgbm90IGV4aXN0LiAnICsgcHJvcCArICcuJyArIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHsqfSBzZXJ2aWNlIC0gdnVleFNlcnZpY2Ug6rCd7LK0XG4gKiBAcGFyYW0geyp9IGtleSAtIHZ1ZXjsnZgg66qo65OIIOydtOumhFxuICogQHBhcmFtIHsqfSBwcm9wIC0gdnVleFNlcnZpY2Ug6rCd7LK07JeQIO2VoOuLuSDtlaAgcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHsqfSByZWYgLSBzdG9yZSByZWZlcmVuY2VcbiAqIEBwYXJhbSB7Kn0gcHJvcGVydHkgLSDsi6TsoJwgcmVm7JeQ7IScIOywuOyhsO2VoCDqsr3roZxcbiAqL1xuZnVuY3Rpb24gc2V0U3RhdGVHZXR0ZXIoc2VydmljZSwga2V5LCBwcm9wLCByZWYsIHByb3BlcnR5KSB7XG4gIGNvbnN0IHRhcmdldCA9IGtleSA/IF8uZ2V0KHNlcnZpY2UsIGtleSkgOiBzZXJ2aWNlO1xuXG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcCwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHJlZi4kc3RvcmUgPyByZWYuJHN0b3JlLnN0YXRlIDogcmVmLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiBfLmdldChzdGF0ZSwgcHJvcGVydHkpO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHJlZi4kc3RvcmUgPyByZWYuJHN0b3JlLnN0YXRlIDogcmVmLnN0YXRlO1xuXG4gICAgICAgIF8uc2V0KHN0YXRlLCBwcm9wZXJ0eSwgbmV3VmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7IH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHsqfSByZWYgLSBzdG9yZSByZWZlcmVuY2VcbiAqIEBwYXJhbSB7Kn0gcm9vdCAtIHZ1ZXjsnZgg66qo65OIIOydtOumhFxuICogQHBhcmFtIHsqfSBrZXkgLSDtlZjsnIQgdnVleOydmCDrqqjrk4gg7J2066aEXG4gKiBAcGFyYW0geyp9IHNlcnZpY2UgLSB2dWV4U2VydmljZSDqsJ3ssrRcbiAqL1xuZnVuY3Rpb24gZXhwb3J0U3RhdGUocmVmLCByb290LCBrZXksIHNlcnZpY2UpIHtcbiAgY29uc3Qgc3RhdGUgPSByZWYuJHN0b3JlID8gcmVmLiRzdG9yZS5zdGF0ZSA6IHJlZi5zdGF0ZTtcbiAgY29uc3Qga2V5cyA9IHJvb3QgPyBPYmplY3Qua2V5cyhfLmdldChzdGF0ZSwgcm9vdCkpIDogT2JqZWN0LmtleXMoc3RhdGUpO1xuXG4gIF8oa2V5cylcbiAgICAubWFwKGZ1bmN0aW9uIChfa2V5KSB7XG4gICAgICBpZiAoIV8uZ2V0KHNlcnZpY2UsIF9rZXkpKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBgJHtyb290fS4ke19rZXl9YC5yZXBsYWNlKC9eXFwuLywgJycpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhrZXksICcsJywgX2tleSwgJywnLCBwcm9wKVxuXG4gICAgICAgIHNldFN0YXRlR2V0dGVyKHNlcnZpY2UsIGtleSwgX2tleSwgcmVmLCBwcm9wKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdtb2R1bGUgPScsIHByb3BlcnR5LCAnLCcsIGtleSwgJywnLCBfa2V5KVxuICAgICAgICBjb25zdCBwcm9wID0gYCR7cm9vdH0uJHtfa2V5fWAucmVwbGFjZSgvXlxcLi8sICcnKTtcblxuICAgICAgICBleHBvcnRTdGF0ZShyZWYsIHByb3AsIF9rZXksIHNlcnZpY2UpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLnZhbHVlKCk7XG59XG5cbmZ1bmN0aW9uIGFjdGlvbnMoc2VydmljZSwgc2VsZiwgbmFtZSwgcHJvcCwgaXNVc2VIb29rKSB7XG4gIGNvbnN0IGFjdGlvbnMgPSBzZWxmLiRzdG9yZSA/IHNlbGYuJHN0b3JlLl9hY3Rpb25zIDogc2VsZi5fYWN0aW9ucztcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFjdGlvbnMpO1xuICBjb25zdCByZWdleCA9IG5hbWUgPyBuZXcgUmVnRXhwKCdeJyArIG5hbWUgKyAnLycpIDogbmV3IFJlZ0V4cCgnJyk7XG5cbiAgXyhrZXlzKVxuICAgIC5maWx0ZXIoa2V5ID0+IHJlZ2V4LnRlc3Qoa2V5KSlcbiAgICAubWFwKGtleSA9PiB7XG4gICAgICBjb25zdCBwcm9wZXJ0eSA9IGtleVxuICAgICAgICAucmVwbGFjZShyZWdleCwgJycpXG4gICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgIC5qb2luKCcuJyk7XG4gICAgICBjb25zdCBpc0V4aXN0ID0gXy5nZXQoc2VydmljZSwgcHJvcGVydHkpO1xuXG4gICAgICBpZiAoaXNFeGlzdCkgdGhyb3cgbmV3IEVycm9yKCdkdXBsaWNhdGUga2V5Jyk7XG4gICAgICBjb25zdCB0aGF0ID0gc2VsZi4kc3RvcmUgPyBzZWxmLiRzdG9yZSA6IHNlbGY7XG4gICAgICBjb25zdCBmbiA9IGZ1bmN0aW9uIChwYXlsb2FkLCB2YWx1ZSkge1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZGF0YSA9IHBheWxvYWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YSA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoYXQuZGlzcGF0Y2goa2V5LCBkYXRhKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChpc1VzZUhvb2spIHtcbiAgICAgICAgXy5zZXQoc2VydmljZSwgcHJvcGVydHksIGhvb2tzLmdldEhvb2socHJvcCwgcHJvcGVydHksIGZuKSk7XG4gICAgICAgIF8uc2V0KHNlcnZpY2UsICdob29rJywgZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgY2hlY2tFeGlzdEZuKHNlcnZpY2UsIHByb3AsIHByb3BlcnR5KTtcbiAgICAgICAgICBjb25zdCBob29rZWQgPSBfLnBhcnRpYWwoaG9va3MuaG9vaywgcHJvcCkuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcblxuICAgICAgICAgIGlmIChfLmlzT2JqZWN0KGhvb2tlZCkpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChob29rZWQsIChob29rLCBuYW1lKSA9PiBfLnNldChzZXJ2aWNlLCBuYW1lLCBob29rKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uc2V0KHNlcnZpY2UsIHByb3BlcnR5LCBob29rZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF8uc2V0KHNlcnZpY2UsICdwcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgXy5wYXJ0aWFsKGhvb2tzLnByZSwgcHJvcCkuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgfSk7XG4gICAgICAgIF8uc2V0KHNlcnZpY2UsICdwb3N0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF8ucGFydGlhbChob29rcy5wb3N0LCBwcm9wKS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF8uc2V0KHNlcnZpY2UsIHByb3BlcnR5LCBmbik7XG4gICAgICB9XG4gICAgfSlcbiAgICAudmFsdWUoKTtcbn1cblxuZnVuY3Rpb24gbXV0YXRpb25zKHNlcnZpY2UsIHNlbGYsIG5hbWUsIHByb3AsIGlzVXNlSG9vaykge1xuICBjb25zdCBtdXRhdGlvbnMgPSBzZWxmLiRzdG9yZSA/IHNlbGYuJHN0b3JlLl9tdXRhdGlvbnMgOiBzZWxmLl9tdXRhdGlvbnM7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtdXRhdGlvbnMpO1xuICBjb25zdCByZWdleCA9IG5hbWUgPyBuZXcgUmVnRXhwKCdeJyArIG5hbWUgKyAnLycpIDogbmV3IFJlZ0V4cCgnJyk7XG5cbiAgXyhrZXlzKVxuICAgIC5maWx0ZXIoa2V5ID0+IHJlZ2V4LnRlc3Qoa2V5KSlcbiAgICAubWFwKGtleSA9PiB7XG4gICAgICBjb25zdCBwcm9wcyA9IGtleS5yZXBsYWNlKHJlZ2V4LCAnJykuc3BsaXQoJy8nKTtcblxuICAgICAgcHJvcHMuc3BsaWNlKHByb3BzLmxlbmd0aCAtIDEsIDAsICdtJyk7XG4gICAgICBjb25zdCBwcm9wZXJ0eSA9IHByb3BzLmpvaW4oJy4nKTtcbiAgICAgIGNvbnN0IHRoYXQgPSBzZWxmLiRzdG9yZSA/IHNlbGYuJHN0b3JlIDogc2VsZjtcbiAgICAgIGNvbnN0IGZuID0gZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG4gICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGRhdGEgPSBwcm9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGEgPSBhcmdzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGF0LmNvbW1pdChrZXksIGRhdGEpO1xuICAgICAgfTtcblxuICAgICAgaWYgKGlzVXNlSG9vaykge1xuICAgICAgICBfLnNldChzZXJ2aWNlLCBwcm9wZXJ0eSwgaG9va3MuZ2V0SG9vayhwcm9wLCBwcm9wZXJ0eSwgZm4pKTtcbiAgICAgICAgXy5zZXQoc2VydmljZSwgJ2hvb2snLCBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICBjaGVja0V4aXN0Rm4oc2VydmljZSwgcHJvcCwgcHJvcGVydHkpO1xuICAgICAgICAgIGNvbnN0IGhvb2tlZCA9IF8ucGFydGlhbChob29rcy5ob29rLCBwcm9wKS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXG4gICAgICAgICAgaWYgKF8uaXNPYmplY3QoaG9va2VkKSkge1xuICAgICAgICAgICAgXy5mb3JFYWNoKGhvb2tlZCwgKGhvb2ssIG5hbWUpID0+IF8uc2V0KHNlcnZpY2UsIG5hbWUsIGhvb2spKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zZXQoc2VydmljZSwgcHJvcGVydHksIGhvb2tlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXy5zZXQoc2VydmljZSwgJ3ByZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfLnBhcnRpYWwoaG9va3MucHJlLCBwcm9wKS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICB9KTtcbiAgICAgICAgXy5zZXQoc2VydmljZSwgJ3Bvc3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgXy5wYXJ0aWFsKGhvb2tzLnBvc3QsIHByb3ApLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgXy5zZXQoc2VydmljZSwgcHJvcGVydHksIGZuKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC52YWx1ZSgpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0geyp9IHNlcnZpY2UgLSB2dWV4U2VydmljZSDqsJ3ssrRcbiAqIEBwYXJhbSB7Kn0gc2VsZiAtIHN0b3JlIHJlZmVyZW5jZVxuICogQHBhcmFtIHsqfSBuYW1lIC0gdnVleFNlcnZpY2XsnZgg7JqU7LKtIOydtOumhCwgVG9kbywgJycsIFRvZG8vY29tbWVudHNcbiAqL1xuZnVuY3Rpb24gc3RhdGUoc2VydmljZSwgc2VsZiwgbmFtZSkge1xuICBjb25zdCBrZXkgPSBuYW1lLnNwbGl0KCcvJykuam9pbignLicpO1xuXG4gIGV4cG9ydFN0YXRlKHNlbGYsIGtleSwgJycsIHNlcnZpY2UpO1xufVxuXG5sZXQgY2FjaGUgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgY29uc3QgaXNVc2VIb29rID0gb3B0aW9ucy5ob29rO1xuXG4gIHJldHVybiBmdW5jdGlvbiBTdG9yZShuYW1lID0gJycsIHN0b3JlKSB7XG4gICAgbGV0IHJlZiA9IHRoaXM7XG5cbiAgICBpZiAoIV8uaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgIHN0b3JlID0gbmFtZTtcbiAgICAgIG5hbWUgPSAnJztcbiAgICB9XG4gICAgaWYgKHN0b3JlKSB7XG4gICAgICByZWYgPSBzdG9yZTtcbiAgICB9XG4gICAgY29uc3QgbmFtZXMgPSBuYW1lXG4gICAgICAudHJpbSgpXG4gICAgICAucmVwbGFjZSgnICcsICcnKVxuICAgICAgLnNwbGl0KCcsJyk7XG4gICAgbGV0IGdyb3VwID0ge307XG4gICAgbGV0IHByb3A7XG5cbiAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgY29uc3QgcmVnZXggPSAvLitcXC8oWy1fXFx3XFxkXSspJC87XG5cbiAgICAgIHByb3AgPSAocmVnZXgudGVzdChuYW1lKSA/IHJlZ2V4LmV4ZWMobmFtZSlbMV0gOiBuYW1lKSB8fCAnUm9vdCc7XG5cbiAgICAgIGlmIChjYWNoZVtwcm9wXSkge1xuICAgICAgICBncm91cFtwcm9wXSA9IGNhY2hlW3Byb3BdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBzZXJ2aWNlID0ge307XG5cbiAgICAgIGdldHRlcnMoc2VydmljZSwgcmVmLCBuYW1lKTtcbiAgICAgIGFjdGlvbnMoc2VydmljZSwgcmVmLCBuYW1lLCBwcm9wLCBpc1VzZUhvb2spO1xuICAgICAgbXV0YXRpb25zKHNlcnZpY2UsIHJlZiwgbmFtZSwgcHJvcCwgaXNVc2VIb29rKTtcbiAgICAgIHN0YXRlKHNlcnZpY2UsIHJlZiwgbmFtZSk7XG4gICAgICBfLm1lcmdlKHNlcnZpY2UsIEV2ZW50QnVzLmdldEluc3RhbmNlKG5hbWUpKTtcbiAgICAgIGdyb3VwW3Byb3BdID0gc2VydmljZTtcbiAgICAgIGNhY2hlW3Byb3BdID0gc2VydmljZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuYW1lcy5sZW5ndGggPiAxID8gZ3JvdXAgOiBncm91cFtwcm9wXTtcbiAgfTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidnVleFwiKTsiXSwic291cmNlUm9vdCI6IiJ9
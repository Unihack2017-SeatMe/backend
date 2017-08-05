/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setupServer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_state_dummyState__ = __webpack_require__(10);


let envPort = process.env.PORT || 8080;
Object(__WEBPACK_IMPORTED_MODULE_0__setupServer__["a" /* setupServer */])(__WEBPACK_IMPORTED_MODULE_1__shared_state_dummyState__["a" /* mapState */], envPort);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return setupServer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mobx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mobx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_mobx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_socket_keys__ = __webpack_require__(9);








function createJsonFromMapState(mapState) {
  return mapState.allRoomData.values().map(roomData => {
    return roomData;
  });
}
function setupServer(mapState, port) {

  const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

  const server = __WEBPACK_IMPORTED_MODULE_5_http___default.a.Server(app);

  const io = __WEBPACK_IMPORTED_MODULE_4_socket_io___default()(server);

  server.listen(port, undefined, undefined, () => {
    console.log("Server running on port " + port);
  });
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(__WEBPACK_IMPORTED_MODULE_2_morgan___default()('dev'));
  app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());
  app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: false }));

  app.get('/', (req, res) => {
    res.json({ hello: 'world' });
  });

  app.post('/devices', (req, res) => {
    mapState.addRoomData(req.body);
    console.info(req.body);
    res.status(204);
  });

  Object(__WEBPACK_IMPORTED_MODULE_6_mobx__["autorun"])(() => {
    io.emit(__WEBPACK_IMPORTED_MODULE_7__shared_socket_keys__["allRoomDataKey"], createJsonFromMapState(mapState));
  });

  io.on('connection', socket => {
    console.info("Client connected");
    socket.emit(__WEBPACK_IMPORTED_MODULE_7__shared_socket_keys__["allRoomDataKey"], createJsonFromMapState(mapState));
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}



/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export socketKeys */
const socketKeys = {
  roomDataKey: 'room_data',
  allRoomDataKey: 'all_room_data'
};

/* unused harmony default export */ var _unused_webpack_default_export = (socketKeys);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mapState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_MapState__ = __webpack_require__(11);

let currentId = 0;
const capacity = 100;
let currentCount = 30;
const initial = [];
for (let i = 0; i < 5; i++) {
  initial.push([i, {
    count: currentCount,
    capacity
  }]);
  currentCount += 10;
}
const mapState = new __WEBPACK_IMPORTED_MODULE_0__model_MapState__["a" /* MapState */](new Map(initial));


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mobx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LOCATIONS__ = __webpack_require__(12);
var _desc, _value, _class, _descriptor;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}





let MapState = (_class = class MapState {
  constructor(initialRoomData) {
    _initDefineProp(this, 'allRoomState', _descriptor, this);

    this.allRoomState = initialRoomData;
  }

  addRoomData(roomData) {
    // TODO: Change this? Maybe keep a record of all room data across time.
    this.setRoomData(roomData);
  }

  setRoomData(roomData) {
    this.allRoomState.set(roomData.id, roomData);
  }

  get allRoomData() {
    return this.allRoomState;
  }

  get allRoomGeoData() {
    const result = [];
    for (const [key, { count, capacity }] of this.allRoomData) {
      result.push({
        type: 'Feature',
        properties: {
          name: __WEBPACK_IMPORTED_MODULE_1__LOCATIONS__["a" /* default */][key].name,
          count,
          capacity
        },
        geometry: {
          type: 'Polygon',
          coordinates: [__WEBPACK_IMPORTED_MODULE_1__LOCATIONS__["a" /* default */][key].coordinates.map(([lng, lat]) => [lat, lng])]
        }
      });
    }
    return result;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'allRoomState', [__WEBPACK_IMPORTED_MODULE_0_mobx__["observable"]], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'addRoomData', [__WEBPACK_IMPORTED_MODULE_0_mobx__["action"]], Object.getOwnPropertyDescriptor(_class.prototype, 'addRoomData'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setRoomData', [__WEBPACK_IMPORTED_MODULE_0_mobx__["action"]], Object.getOwnPropertyDescriptor(_class.prototype, 'setRoomData'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'allRoomData', [__WEBPACK_IMPORTED_MODULE_0_mobx__["computed"]], Object.getOwnPropertyDescriptor(_class.prototype, 'allRoomData'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'allRoomGeoData', [__WEBPACK_IMPORTED_MODULE_0_mobx__["computed"]], Object.getOwnPropertyDescriptor(_class.prototype, 'allRoomGeoData'), _class.prototype)), _class);



/* unused harmony default export */ var _unused_webpack_default_export = (MapState);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LOCATIONS = {
  0: {
    name: 'Room 0',
    coordinates: [[-37.8165, 144.9628], [-37.8163, 144.9628], [-37.8163, 144.9627], [-37.8165, 144.9627], [-37.8165, 144.9628]]
  },
  1: {
    name: 'Room 1',
    coordinates: [[-37.8162, 144.9628], [-37.8160, 144.9628], [-37.8160, 144.9627], [-37.8162, 144.9627], [-37.8162, 144.9628]]
  },
  2: {
    name: 'Room 2',
    coordinates: [[-37.8165, 144.9631], [-37.8163, 144.9631], [-37.8163, 144.9630], [-37.8165, 144.9630], [-37.8165, 144.9631]]
  },
  3: {
    name: 'Room 3',
    coordinates: [[-37.8165, 144.9638], [-37.8163, 144.9638], [-37.8163, 144.9637], [-37.8165, 144.9637], [-37.8165, 144.9638]]
  },
  4: {
    name: 'Room 4',
    coordinates: [[-37.8165, 144.9648], [-37.8163, 144.9648], [-37.8163, 144.9647], [-37.8165, 144.9647], [-37.8165, 144.9648]]
  }
};

/* harmony default export */ __webpack_exports__["a"] = (LOCATIONS);

/***/ })
/******/ ]);
//# sourceMappingURL=backend-compiled-debug.js.map
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_state_appState__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_mobx__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_mobx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_mobx__);








const port = process.env.PORT || 8080;

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
  __WEBPACK_IMPORTED_MODULE_6__shared_state_appState__["a" /* mapState */].addRoomData();
  console.info(req.json);
  res.status(204);
});

Object(__WEBPACK_IMPORTED_MODULE_7_mobx__["autorun"])(() => {
  io.emit(__WEBPACK_IMPORTED_MODULE_6__shared_state_appState__["a" /* mapState */].all_room_data.values().map(roomData => {
    return roomData;
  }));
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

io.on('connection', socket => {
  console.info("Client connected");
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mapState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_MapState__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_MapState___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__model_MapState__);

const mapState = new __WEBPACK_IMPORTED_MODULE_0__model_MapState__["MapState"](new Map());


/***/ }),
/* 8 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: C:/Users/eastd/Code/unihack-backend/src/shared/model/MapState.jsx: Unexpected token (3:2)\n\n\u001b[0m \u001b[90m 1 | \u001b[39m\u001b[36mimport\u001b[39m { observable\u001b[33m,\u001b[39m computed\u001b[33m,\u001b[39m action } from \u001b[32m'mobx'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 2 | \u001b[39m\u001b[36mclass\u001b[39m \u001b[33mMapState\u001b[39m {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 3 | \u001b[39m  \u001b[37m\u001b[41m\u001b[1m@\u001b[22m\u001b[49m\u001b[39mobservable\n \u001b[90m   | \u001b[39m  \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 4 | \u001b[39m  all_room_state \u001b[33m=\u001b[39m \u001b[36mnull\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 5 | \u001b[39m  constructor(initial_room_data) {\n \u001b[90m 6 | \u001b[39m    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mall_room_state \u001b[33m=\u001b[39m initial_room_data\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ })
/******/ ]);
//# sourceMappingURL=backend-compiled-debug.js.map
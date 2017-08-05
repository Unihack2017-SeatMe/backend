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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const setupServer_1 = __webpack_require__(2);
const dummyState_1 = __webpack_require__(9);
let envPort = process.env.PORT || 8080;
setupServer_1.setupServer(dummyState_1.mapState, envPort);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(3);
const logger = __webpack_require__(4);
const bodyParser = __webpack_require__(5);
const SocketIo = __webpack_require__(6);
const http = __webpack_require__(7);
const mobx_1 = __webpack_require__(0);
const socket_keys_1 = __webpack_require__(8);
function createJsonFromMapState(mapState) {
    return mapState.allRoomData.values().map(roomData => {
        return roomData;
    });
}
function setupServer(mapState, port) {
    const app = express();
    const server = http.Server(app);
    const io = SocketIo(server);
    server.listen(port, undefined, undefined, () => {
        console.log("Server running on port " + port);
    });
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/', (req, res) => {
        res.json({ hello: 'world' });
    });
    app.post('/devices', (req, res) => {
        mapState.addRoomData(req.body);
        console.info(req.body);
        res.status(200);
        res.json({});
    });
    mobx_1.autorun(() => {
        io.emit(socket_keys_1.allRoomDataKey, createJsonFromMapState(mapState));
    });
    io.on('connection', socket => {
        console.info("Client connected");
        socket.emit(socket_keys_1.allRoomDataKey, createJsonFromMapState(mapState));
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
exports.setupServer = setupServer;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.roomDataKey = 'room_data';
exports.allRoomDataKey = 'all_room_data';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const MapState_1 = __webpack_require__(10);
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
const mapState = new MapState_1.MapState(new Map(initial));
exports.mapState = mapState;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = __webpack_require__(0);
const LOCATIONS_1 = __webpack_require__(11);
let MapState = class MapState {
    constructor(initialRoomData) {
        this.allRoomState = null;
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
                    name: LOCATIONS_1.default[key].name,
                    count,
                    capacity
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [LOCATIONS_1.default[key].coordinates.map(([lng, lat]) => [lat, lng])]
                }
            });
        }
        return result;
    }
};

__decorate([mobx_1.observable, __metadata("design:type", Object)], MapState.prototype, "allRoomState", void 0);
__decorate([mobx_1.action, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], MapState.prototype, "addRoomData", null);
__decorate([mobx_1.action, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], MapState.prototype, "setRoomData", null);
__decorate([mobx_1.computed, __metadata("design:type", Object), __metadata("design:paramtypes", [])], MapState.prototype, "allRoomData", null);
__decorate([mobx_1.computed, __metadata("design:type", Object), __metadata("design:paramtypes", [])], MapState.prototype, "allRoomGeoData", null);
exports.MapState = MapState;
exports.default = MapState;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = LOCATIONS;

/***/ })
/******/ ]);
//# sourceMappingURL=backend-compiled-debug.js.map
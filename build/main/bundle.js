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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main/index.js":
/*!***********************!*\
  !*** ./main/index.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store.js */ \"./main/store.js\");\n\n\nvar store = Object(_store_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nvar mainWindow;\n\nvar createWindow = function createWindow() {\n  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\n    width: 800,\n    height: 600,\n    webPreferences: {\n      nodeIntegration: true\n    }\n  });\n  mainWindow.loadFile('build/render/index.html');\n  mainWindow.webContents.openDevTools();\n  mainWindow.on('closed', function () {\n    return mainWindow = null;\n  });\n  mainWindow.webContents.once('dom-ready', function () {\n    mainWindow.webContents.send('update', store.getState());\n  });\n  store.subscribe(function () {\n    mainWindow.webContents.send('update', store.getState());\n  });\n};\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('ready', createWindow);\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('window-all-closed', function () {\n  if (process.platform !== 'darwin') electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit();\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('activate', function () {\n  if (mainWindow === null) createWindow();\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('UPDATE_PROJECT', function (_, project) {\n  store.dispatch({\n    type: 'PROJECT_ADDED',\n    payload: project\n  });\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('SHOW_FILE_PICKER', function () {\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showOpenDialog({\n    properties: ['openDirectory']\n  }, function (files) {\n    if (!files) return;\n    var path = files[0];\n    var name = path.split('/').pop();\n    store.dispatch({\n      type: 'PROJECT_ADDED',\n      payload: {\n        name: name,\n        path: path\n      }\n    });\n  });\n});\n\n//# sourceURL=webpack:///./main/index.js?");

/***/ }),

/***/ "./main/parser.js":
/*!************************!*\
  !*** ./main/parser.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar ignore = ['node_modules', 'build', '.git', '.DS_Store'];\nvar regex = [{\n  type: 'HTML',\n  comment: /(<!--)(.|\\n)+?(-->)/gm,\n  todo: /(?<=(<!--)((.|\\n)*?)TODO(:|\\s))((?:(?!(-->))(.|\\n)*?))*/gm\n}, {\n  type: 'JS_LINE',\n  comment: /\\/\\/\\s+.*/g,\n  todo: /(?<=(\\/\\/)\\s+TODO(:|\\s)).*/g\n}, {\n  type: 'JS_BLOCK',\n  comment: /(\\/\\*)(.|\\n)+?(\\*\\/)/gm,\n  todo: /(?<=(\\/\\*)((.|\\n)*?)TODO(:|\\s))((?:(?!(\\*\\/))(.|\\n)*?))*/gm\n}];\n\nvar cleanTodos = function cleanTodos(todos) {\n  todos.forEach(function (todo) {\n    todo.text.trim().replace(/\\n|\\r/g, \" \").replace(/\\s{2,}/g, \" \");\n  });\n};\n\nvar parseFile = function parseFile(path, todos) {\n  var text = Object(fs__WEBPACK_IMPORTED_MODULE_0__[\"readFileSync\"])(path, 'utf-8');\n  regex.forEach(function (expression) {\n    var comments = text.match(expression.comment) || [];\n    comments.map(function (comment) {\n      var matches = comment.match(expression.todo) || [];\n      matches.forEach(function (text) {\n        return todos.push({\n          path: path,\n          text: text\n        });\n      });\n    });\n  });\n};\n\nvar collectTodos = function collectTodos(path, todos) {\n  if (Object(fs__WEBPACK_IMPORTED_MODULE_0__[\"statSync\"])(path).isFile()) {\n    parseFile(path, todos);\n  }\n\n  if (Object(fs__WEBPACK_IMPORTED_MODULE_0__[\"statSync\"])(path).isDirectory()) {\n    var files = Object(fs__WEBPACK_IMPORTED_MODULE_0__[\"readdirSync\"])(path);\n    files.forEach(function (file) {\n      if (ignore.includes(file)) return;\n      var filePath = Object(path__WEBPACK_IMPORTED_MODULE_1__[\"join\"])(path, file);\n      collectTodos(filePath, todos);\n    });\n  }\n};\n\nvar parseProject = function parseProject(file) {\n  var todos = [];\n  collectTodos(file.path, todos);\n  cleanTodos(todos);\n  return {\n    name: file.name,\n    path: file.path,\n    todos: todos\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (parseProject);\n\n//# sourceURL=webpack:///./main/parser.js?");

/***/ }),

/***/ "./main/store.js":
/*!***********************!*\
  !*** ./main/store.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parser.js */ \"./main/parser.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar getUserData = function getUserData() {\n  try {\n    var userDataPath = electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].getPath('userData');\n    var dataPath = Object(path__WEBPACK_IMPORTED_MODULE_2__[\"join\"])(userDataPath, \"data.json\");\n    var data = JSON.parse(Object(fs__WEBPACK_IMPORTED_MODULE_1__[\"readFileSync\"])(dataPath));\n    return data;\n  } catch (err) {\n    return {};\n  }\n\n  ;\n};\n\nvar setUserData = function setUserData(data) {\n  var userDataPath = electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].getPath('userData');\n  var dataPath = Object(path__WEBPACK_IMPORTED_MODULE_2__[\"join\"])(userDataPath, \"data.json\");\n  Object(fs__WEBPACK_IMPORTED_MODULE_1__[\"writeFileSync\"])(dataPath, JSON.stringify(data));\n};\n\nvar reducer = function reducer(state, action) {\n  if (action.type === 'PROJECT_ADDED') {\n    var project = Object(_parser_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(action.payload);\n    var prevState = getUserData();\n\n    var nextState = _objectSpread({}, prevState, _defineProperty({}, project.path, project));\n\n    setUserData(nextState);\n    return nextState;\n  }\n\n  return state;\n};\n\nvar createStore = function createStore() {\n  var listeners = [];\n  var state = getUserData();\n\n  var getState = function getState() {\n    return state;\n  };\n\n  var subscribe = function subscribe(listener) {\n    listeners.push(listener);\n  };\n\n  var dispatch = function dispatch(action) {\n    state = reducer(state, action);\n    listeners.forEach(function (listener) {\n      return listener();\n    });\n  };\n\n  return {\n    getState: getState,\n    subscribe: subscribe,\n    dispatch: dispatch\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createStore);\n\n//# sourceURL=webpack:///./main/store.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });
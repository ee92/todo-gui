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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n\nvar mainWindow;\nvar parserProcess;\n\nvar createWindow = function createWindow() {\n  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\n    width: 800,\n    height: 600,\n    backgroundColor: '#272822',\n    webPreferences: {\n      nodeIntegration: true\n    }\n  });\n  mainWindow.loadFile('build/render/index.html'); // mainWindow.webContents.openDevTools();\n\n  mainWindow.on('closed', function () {\n    mainWindow = null;\n    parserProcess.close();\n  });\n};\n\nvar createParserProcess = function createParserProcess() {\n  parserProcess = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\n    show: false,\n    webPreferences: {\n      nodeIntegration: true\n    }\n  });\n  parserProcess.loadFile('build/background/index.html');\n};\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('ready', function () {\n  createWindow();\n  createParserProcess();\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('window-all-closed', function () {\n  if (process.platform !== 'darwin') electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit();\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('activate', function () {\n  if (mainWindow === null) {\n    createWindow();\n    createParserProcess();\n  }\n}); // forward to render\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('background-update', function (_, projects) {\n  mainWindow.webContents.send('update', projects);\n}); // forward to background\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('watch-project', function (_, project) {\n  parserProcess.webContents.send('watch-project', project);\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('show-file-picker', function () {\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showOpenDialog({\n    properties: ['openDirectory']\n  }, function (files) {\n    if (!files) return;\n    var path = files[0];\n    var name = path.split('/').pop();\n    parserProcess.webContents.send('update-project', {\n      name: name,\n      path: path\n    });\n  });\n});\n\n//# sourceURL=webpack:///./main/index.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ })

/******/ });
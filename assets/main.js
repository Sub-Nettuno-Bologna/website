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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_js/app.js":
/*!********************!*\
  !*** ./_js/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nanof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanof */ "./node_modules/nanof/index.js");
/* harmony import */ var nanof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nanof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages-menu */ "./_js/pages-menu.js");
/* harmony import */ var _main_image_random__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main-image-random */ "./_js/main-image-random.js");
/* harmony import */ var _cookie_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cookie-bar */ "./_js/cookie-bar.js");





nanof__WEBPACK_IMPORTED_MODULE_0___default.a.activate("pages-menu", _pages_menu__WEBPACK_IMPORTED_MODULE_1__["default"]);
nanof__WEBPACK_IMPORTED_MODULE_0___default.a.activate("main-image-random", _main_image_random__WEBPACK_IMPORTED_MODULE_2__["default"]);
nanof__WEBPACK_IMPORTED_MODULE_0___default.a.activate("cookie-bar", _cookie_bar__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./_js/cookie-bar.js":
/*!***************************!*\
  !*** ./_js/cookie-bar.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nanof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanof */ "./node_modules/nanof/index.js");
/* harmony import */ var nanof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nanof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./_js/storage.js");



const ACK_KEY = "cookie-acknowledge";

/* harmony default export */ __webpack_exports__["default"] = (function($, element) {
  const ack = _storage__WEBPACK_IMPORTED_MODULE_1__["session"].getItem(ACK_KEY);
  if (ack !== "true") {
    Object(nanof__WEBPACK_IMPORTED_MODULE_0__["addClass"])(element, "active open");
    Object(nanof__WEBPACK_IMPORTED_MODULE_0__["on"])($('[data-js="ack"]'), "click", () => {
      _storage__WEBPACK_IMPORTED_MODULE_1__["session"].setItem(ACK_KEY, "true");
      Object(nanof__WEBPACK_IMPORTED_MODULE_0__["addClass"])(element, "closed");
    });
  }
});


/***/ }),

/***/ "./_js/main-image-random.js":
/*!**********************************!*\
  !*** ./_js/main-image-random.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const random = list => list[Math.floor(Math.random() * list.length)];

/* harmony default export */ __webpack_exports__["default"] = (function($, element) {
  const images = JSON.parse(element.getAttribute("data-images"));
  const image = random(images);
  element.style.backgroundImage = `url(${image})`;
});


/***/ }),

/***/ "./_js/pages-menu.js":
/*!***************************!*\
  !*** ./_js/pages-menu.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nanof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanof */ "./node_modules/nanof/index.js");
/* harmony import */ var nanof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nanof__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function($) {
  Object(nanof__WEBPACK_IMPORTED_MODULE_0__["on"])($(".with-children"), "click", ({ target }) => {
    if (target.classList.contains("open")) {
      target.classList.remove("open");
    } else {
      target.classList.add("open");
    }
  });
});


/***/ }),

/***/ "./_js/storage.js":
/*!************************!*\
  !*** ./_js/storage.js ***!
  \************************/
/*! exports provided: session */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "session", function() { return session; });
/* harmony import */ var storage_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! storage-factory */ "./node_modules/storage-factory/lib/index.js");
/* harmony import */ var storage_factory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(storage_factory__WEBPACK_IMPORTED_MODULE_0__);
// storage.js


const session = Object(storage_factory__WEBPACK_IMPORTED_MODULE_0__["storageFactory"])(sessionStorage);


/***/ }),

/***/ "./node_modules/nanof/index.js":
/*!*************************************!*\
  !*** ./node_modules/nanof/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { $, list, addClass } = __webpack_require__(/*! ./src/dom */ "./node_modules/nanof/src/dom.js");

/*
  Esegue tutti i controller trovati in pagina
*/
const activate = (controller_name, controller) =>
  $(`[controller="${controller_name}"]`).forEach(elem =>
    controller(selector => $(selector, elem), elem)
  );

const on = (nodes, event, fn) => {
  list(nodes).forEach(elem => elem.addEventListener(event, fn, false));
  return list;
};

module.exports = {
  activate,
  on,
  $,
  list,
  addClass
};


/***/ }),

/***/ "./node_modules/nanof/src/dom.js":
/*!***************************************!*\
  !*** ./node_modules/nanof/src/dom.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Dom selector function
 * @param {string} selector
 * @param {DOMNode} scope
 */
function $(selector, scope = document.body) {
  return Array.prototype.slice.call(scope.querySelectorAll(selector));
}

/**
 * Maps a iterable list of DOMNodes to an array
 * @param {*} elems
 */
function list(elems) {
  if (Array.isArray(elems)) {
    // it might be already an array
    return elems;
  } else if (elems.nodeName) {
    // it might be a single element
    return [elems];
  }
  // it might be something else similar to an array, like a NodeList or an HTMLCollection
  return Array.prototype.slice.call(elems);
}

const classes = className => className.trim().split(" ");

function mapElementsClasses(elements, className, fn) {
  const listOfClasses = classes(className);

  list(elements).forEach(element => {
    listOfClasses.forEach(c => fn(element, c));
  });
  return elements;
}

/**
 * Adds one or more class to one or more elements.
 * @param {DOMNode|NodeList|Array} elements
 * @param {string} className
 * @returns {*}
 */
function addClass(elements, className) {
  return mapElementsClasses(elements, className, (elem, c) =>
    elem.classList.add(c)
  );
}

function removeClass(elements, className) {
  return mapElementsClasses(elements, className, (elem, c) =>
    elem.classList.remove(c)
  );
}

module.exports = {
  $,
  list,
  addClass,
  removeClass
};


/***/ }),

/***/ "./node_modules/storage-factory/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/storage-factory/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function storageFactory(storage) {
    var inMemoryStorage = {};
    function isSupported() {
        try {
            var testKey = "__some_random_key_you_are_not_going_to_use__";
            storage.setItem(testKey, testKey);
            storage.removeItem(testKey);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    function clear() {
        if (isSupported()) {
            storage.clear();
        }
        else {
            inMemoryStorage = {};
        }
    }
    function getItem(name) {
        if (isSupported()) {
            return storage.getItem(name);
        }
        if (inMemoryStorage.hasOwnProperty(name)) {
            return inMemoryStorage[name];
        }
        return null;
    }
    function key(index) {
        if (isSupported()) {
            return storage.key(index);
        }
        else {
            return Object.keys(inMemoryStorage)[index] || null;
        }
    }
    function removeItem(name) {
        if (isSupported()) {
            storage.removeItem(name);
        }
        else {
            delete inMemoryStorage[name];
        }
    }
    function setItem(name, value) {
        if (isSupported()) {
            storage.setItem(name, value);
        }
        else {
            inMemoryStorage[name] = String(value);
        }
    }
    function length() {
        if (isSupported()) {
            return storage.length;
        }
        else {
            return Object.keys(inMemoryStorage).length;
        }
    }
    return {
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        key: key,
        get length() {
            return length();
        },
    };
}
exports.storageFactory = storageFactory;


/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./_js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_js/app.js */"./_js/app.js");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map
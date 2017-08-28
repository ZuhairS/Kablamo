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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__kablamo_js__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  let practice = document.getElementById("practice-button");
  let level1 = document.getElementById("level1-button");
  let header = document.getElementById("header");
  let instructions = document.getElementById("instructions");

  practice.addEventListener("click", () => {
    World.clear(engine.world);
    practice.className += " hidden";
    level1.className += " hidden";
    header.className += " hidden";
    instructions.className += " hidden";
    __WEBPACK_IMPORTED_MODULE_0__kablamo_js__["a" /* default */]("practice");
  });

  level1.addEventListener("click", () => {
    World.clear(engine.world);
    practice.className += " hidden";
    level1.className += " hidden";
    header.className += " hidden";
    instructions.className += " hidden";
    __WEBPACK_IMPORTED_MODULE_0__kablamo_js__["a" /* default */]("level1");
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Kablamo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_body_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy_body_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level_js__ = __webpack_require__(4);




function Kablamo(mode) {
  let player = __WEBPACK_IMPORTED_MODULE_0__player_body_js__["a" /* default */](mode);
  let enemy = __WEBPACK_IMPORTED_MODULE_1__enemy_body_js__["a" /* default */](mode);
  let level = __WEBPACK_IMPORTED_MODULE_2__level_js__["a" /* default */](mode);
  let gameState = true;

  let canvas = document.getElementById("canvas");

  let render = Render.create({
    element: document.body,
    canvas: canvas,
    engine: engine,
    options: {
      wireframes: false,
      width: 1440,
      height: 798,
      showShadows: true,
      pixelRatio: "auto",
      hasBounds: true
    }
  });

  Render.run(render);
  // create runner
  let runner = Runner.create();
  Runner.run(runner, engine);

  // add mouse control and make the mouse revolute
  let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0,
        render: {
          visible: false
        }
      }
    });

  World.add(world, mouseConstraint);

  // Variables
  const minForce = 0.3;

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // Allow space to refresh level
  // window.addEventListener("keypress", function (event) {
  //   const SPACEBAR = 32;
  //   if (event.which === SPACEBAR) {
  //     World.clear(engine.world);
  //     Engine.clear(engine);
  //     Runner.stop(runner);
  //     Kablamo("level1");
  //     event.preventDefault();
  //   }
  // });

  Events.on(render, "afterRender", event => {
    if (player.position.x > mouse.position.x) {
      Body.setAngularVelocity(player, -0.1);
    } else if (player.position.x < mouse.position.x) {
      Body.setAngularVelocity(player, 0.1);
    }

    // Reset if a ball falls off
    if (
      (enemy.position.y > 600 ||
      player.position.y > 600) && gameState
    ) {
      gameState = false;
      setTimeout(() => {
        Engine.clear(engine);
        Runner.stop(runner);
        World.clear(engine.world);
        Kablamo("level1");
      }, 2000);
    }
  });

  Events.on(mouseConstraint, "mousedown", event => {
    let diffx;
    let diffy = -Math.abs(mouse.position.y - player.position.y);
    if (player.position.x > mouse.position.x && diffy < -30) {
      diffx = mouse.position.x - player.position.x;
      Body.applyForce(player, player.position, {
        x: Math.max(diffx * 0.002, -minForce),
        y: Math.max(diffy * 0.002, -minForce)
      });
    } else if (player.position.x < mouse.position.x && diffy < -30) {
      diffx = mouse.position.x - player.position.x;
      Body.applyForce(player, player.position, {
        x: Math.min(diffx * 0.002, minForce),
        y: Math.max(diffy * 0.002, -minForce)
      });
    }
  });

  // Enemy AI
  Events.on(render, "afterRender", () => {
    if (enemy.position.x > player.position.x) {
      Body.setAngularVelocity(enemy, -0.1);
    } else if (enemy.position.x < player.position.x) {
      Body.setAngularVelocity(enemy, 0.1);
    }

    // Only allow jumping within bounds
    if (
      enemy.position.y > 550 &&
      enemy.position.x > 80 &&
      enemy.position.x < 1360
    ) {
      let diffx;
      let diffy = -Math.abs(player.position.y - enemy.position.y);
      if (
        enemy.position.x > player.position.x &&
        player.position.y < enemy.position.y - 30
      ) {
        diffx = player.position.x - enemy.position.x;
        Body.applyForce(enemy, enemy.position, {
          x: Math.max(diffx * 0.002, -minForce),
          y: Math.max(diffy * 0.002, -minForce)
        });
      } else if (
        enemy.position.x < player.position.x &&
        player.position.y < enemy.position.y - 30
      ) {
        diffx = player.position.x - enemy.position.x;
        Body.applyForce(enemy, enemy.position, {
          x: Math.min(diffx * 0.002, minForce),
          y: Math.max(diffy * 0.002, -minForce)
        });
      }
    } else if (player.position.y > 560) {
      Body.setAngularVelocity(enemy, 0);
    }
  });
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initializePlayer;
function initializePlayer(mode) {
  if (mode !== "menu") {
    let player = Bodies.circle(470, 200, 50, { restitution: 0.6 });
    World.add(world, player);
    return player;
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initializeEnemy;
function initializeEnemy(mode) {
  if (mode !== "menu") {
    let enemy = Bodies.circle(1000, 200, 50, { restitution: 0.6 });
    console.log(enemy);
    World.add(world, enemy);
    return enemy;
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initializeLevel;
function initializeLevel(name) {
  switch (name) {
    case "menu":
      this.ground = Bodies.rectangle(720, 610, 1200, 20, { isStatic: true });
      this.leftWall = Bodies.rectangle(140, 350, 20, 500, { isStatic: true });
      this.rightWall = Bodies.rectangle(1300, 350, 20, 500, { isStatic: true });
      this.roof = Bodies.rectangle(720, 100, 1200, 20, { isStatic: true });

      World.add(world, [this.ground, this.leftWall, this.rightWall, this.roof]);
      return this;
    case "practice":
      this.ground = Bodies.rectangle(720, 610, 1200, 20, { isStatic: true });
      this.leftWall = Bodies.rectangle(140, 350, 20, 500, { isStatic: true });
      this.rightWall = Bodies.rectangle(1300, 350, 20, 500, { isStatic: true });
      this.roof = Bodies.rectangle(720, 100, 1200, 20, { isStatic: true });

      World.add(world, [this.ground, this.leftWall, this.rightWall, this.roof]);
      return this;

    case "level1":
      this.ground = Bodies.rectangle(720, 610, 1200, 20, { isStatic: true });
      this.leftWall = Bodies.rectangle(140, 350, 20, 150, { isStatic: true });
      this.rightWall = Bodies.rectangle(1300, 350, 20, 150, { isStatic: true });

      World.add(world, [this.ground, this.leftWall, this.rightWall]);
      return this;
  }
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
/***/ (function(module, exports) {

document.addEventListener("DOMContentLoaded", function() {
  var Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector;

  // create an engine
  var engine = Engine.create(),
    world = engine.world;

  var body = Bodies.circle(400, 200, 40);
  var enemy = Bodies.circle(400, 200, 40);
  var ground = Bodies.rectangle(600, 610, 1000, 20, { isStatic: true });
  var leftWall = Bodies.rectangle(120, 350, 20, 500, { isStatic: true });
  var rightWall = Bodies.rectangle(1080, 350, 20, 500, { isStatic: true });
  var roof = Bodies.rectangle(600, 100, 1000, 20, { isStatic: true });

  // add all of the bodies to the world
  World.add(world, [body, enemy, ground, leftWall, rightWall, roof]);

  // run the engine
  Engine.run(engine);

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
      width: 1200,
      height: 700,
      showShadows: true,
      showCollisions: true,
      pixelRatio: "auto",
      showAngleIndicator: true
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add mouse control and make the mouse revolute
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0,
        render: {
          hasBounds: true,
          visible: false
        }
      }
    });

  World.add(world, mouseConstraint);

  console.log(mouseConstraint);
  console.log(body);
  console.log(render);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  Events.on(mouseConstraint, "mousemove", event => {
    if (body.position.x > mouse.position.x) {
      Body.setAngularVelocity(body, -0.1);
    } else if (body.position.x < mouse.position.x) {
      Body.setAngularVelocity(body, 0.1);
    }
  });

  Events.on(mouseConstraint, "mousedown", event => {
    console.log(mouse.position);
    let diffx = mouse.position.x - body.position.x;
    let diffy = -Math.abs(mouse.position.y - body.position.y);

    Body.applyForce(body, body.position, {
      x: diffx * 0.002,
      y: diffy * 0.002
    });
  });
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
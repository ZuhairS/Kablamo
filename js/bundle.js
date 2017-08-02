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
    Bounds = Matter.Bounds,
    Vector = Matter.Vector;

  var canvas = document.getElementById("canvas");

  // create an engine
  var engine = Engine.create(),
    world = engine.world;

  var body = Bodies.circle(500, 200, 50, { restitution: 0.6 });
  var enemy = Bodies.circle(1000, 200, 50, { restitution: 0.6 });
  var ground = Bodies.rectangle(700, 610, 1200, 20, { isStatic: true });
  var leftWall = Bodies.rectangle(120, 350, 20, 500, { isStatic: true });
  var rightWall = Bodies.rectangle(1280, 350, 20, 500, { isStatic: true });
  var roof = Bodies.rectangle(700, 100, 1200, 20, { isStatic: true });

  // add all of the bodies to the world
  World.add(world, [body, enemy, ground, leftWall, rightWall, roof]);

  // run the engine
  Engine.run(engine);

  var render = Render.create({
    element: document.body,
    canvas: canvas,
    engine: engine,
    options: {
      wireframes: false,
      width: window.innerWidth,
      height: window.innerHeight,
      showShadows: true,
      showCollisions: true,
      pixelRatio: "auto",
      hasBounds: true,
      showAngleIndicator: true
    }
  });

  // // Resize canvas view based on screen.
  // window.addEventListener("resize", function() {
  //   console.log(render);
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // });

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
          visible: false
        }
      }
    });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  Events.on(mouseConstraint, "mousemove", event => {
    if (body.position.x > mouse.position.x) {
      Body.setAngularVelocity(body, -0.1);
    } else if (body.position.x < mouse.position.x) {
      Body.setAngularVelocity(body, 0.1);
    }
  });

  Events.on(mouseConstraint, "mouseup", event => {
    let diffx;
    let diffy = -Math.abs(mouse.position.y - body.position.y);
    if (body.position.x > mouse.position.x) {
      diffx = mouse.position.x - body.position.x;
      Body.applyForce(body, body.position, {
        x: Math.max(diffx * 0.002, -0.3),
        y: Math.max(diffy * 0.002, -0.3)
      });
    } else if (body.position.x < mouse.position.x) {
      diffx = mouse.position.x - body.position.x;
      Body.applyForce(body, body.position, {
        x: Math.min(diffx * 0.002, 0.3),
        y: Math.max(diffy * 0.002, -0.3)
      });
    }
  });

  Events.on(render, "afterRender", () => {
    if (enemy.position.x > body.position.x) {
      Body.setAngularVelocity(enemy, -0.1);
    } else if (enemy.position.x < body.position.x) {
      Body.setAngularVelocity(enemy, 0.1);
    }

    if (enemy.position.y > 550) {
      let diffx;
      let diffy = -Math.abs(body.position.y - enemy.position.y);
      if (
        enemy.position.x > body.position.x &&
        body.position.y < enemy.position.y - 30
      ) {
        diffx = body.position.x - enemy.position.x;
        Body.applyForce(enemy, enemy.position, {
          x: Math.max(diffx * 0.002, -0.3),
          y: Math.max(diffy * 0.002, -0.3)
        });
      } else if (
        enemy.position.x < body.position.x &&
        body.position.y < enemy.position.y - 30
      ) {
        diffx = body.position.x - enemy.position.x;
        Body.applyForce(enemy, enemy.position, {
          x: Math.min(diffx * 0.002, 0.3),
          y: Math.max(diffy * 0.002, -0.3)
        });
      }
    }
  });
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
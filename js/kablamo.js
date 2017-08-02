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

  var body = Bodies.circle(500, 200, 50);
  var enemy = Bodies.circle(1000, 200, 50);
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

  Events.on(mouseConstraint, "mousedown", event => {
    let diffx;
    let diffy = -Math.abs(mouse.position.y - body.position.y);
    if (body.position.x > mouse.position.x) {
      diffx = mouse.position.x - body.position.x;
      Body.applyForce(body, body.position, {
        x: Math.max(diffx * 0.002, -0.15),
        y: Math.max(diffy * 0.002, -0.2)
      });
    } else if (body.position.x < mouse.position.x) {
      diffx = mouse.position.x - body.position.x;
      Body.applyForce(body, body.position, {
        x: Math.min(diffx * 0.002, 0.15),
        y: Math.max(diffy * 0.002, -0.2)
      });
    }
  });
});

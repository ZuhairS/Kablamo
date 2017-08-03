document.addEventListener("DOMContentLoaded", function() {
  let Engine = Matter.Engine,
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

  let canvas = document.getElementById("canvas");

  // create an engine
  let engine = Engine.create(),
    world = engine.world;

  let body = Bodies.circle(500, 200, 50, { restitution: 0.6 });
  let enemy = Bodies.circle(1000, 200, 50, { restitution: 0.6 });
  let ground = Bodies.rectangle(700, 610, 1200, 20, { isStatic: true });
  let leftWall = Bodies.rectangle(120, 350, 20, 500, { isStatic: true });
  let rightWall = Bodies.rectangle(1280, 350, 20, 500, { isStatic: true });
  let roof = Bodies.rectangle(700, 100, 1200, 20, { isStatic: true });

  // add all of the bodies to the world
  World.add(world, [body, enemy, ground, leftWall, rightWall, roof]);

  // run the engine
  Engine.run(engine);

  let render = Render.create({
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
  console.log(render.options);

  // // Resize canvas view based on screen.
  // window.addEventListener("resize", function() {
  //   console.log(render);
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // });

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

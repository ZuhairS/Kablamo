import initializePlayer from "./player_body.js";
import initializeEnemy from "./enemy_body.js";
import initializeLevel from "./level.js";

export default function Kablamo(mode) {
  let player = initializePlayer(mode);
  let enemy = initializeEnemy(mode);
  let level = initializeLevel(mode);

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
      // showCollisions: true,
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

  Events.on(render, "afterRender", event => {
    if (player.position.x > mouse.position.x) {
      Body.setAngularVelocity(player, -0.1);
    } else if (player.position.x < mouse.position.x) {
      Body.setAngularVelocity(player, 0.1);
    }
  });

  Events.on(mouseConstraint, "mousedown", event => {
    let diffx;
    let diffy = -Math.abs(mouse.position.y - player.position.y);
    if (player.position.x > mouse.position.x && diffy < -30) {
      diffx = mouse.position.x - player.position.x;
      Body.applyForce(player, player.position, {
        x: Math.max(diffx * 0.002, -0.3),
        y: Math.max(diffy * 0.002, -0.3)
      });
    } else if (player.position.x < mouse.position.x && diffy < -30) {
      diffx = mouse.position.x - player.position.x;
      Body.applyForce(player, player.position, {
        x: Math.min(diffx * 0.002, 0.3),
        y: Math.max(diffy * 0.002, -0.3)
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
          x: Math.max(diffx * 0.002, -0.3),
          y: Math.max(diffy * 0.002, -0.3)
        });
      } else if (
        enemy.position.x < player.position.x &&
        player.position.y < enemy.position.y - 30
      ) {
        diffx = player.position.x - enemy.position.x;
        Body.applyForce(enemy, enemy.position, {
          x: Math.min(diffx * 0.002, 0.3),
          y: Math.max(diffy * 0.002, -0.3)
        });
      }
    }
  });
}

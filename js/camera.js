world.bounds.min.x = -300;
world.bounds.min.y = -300;
world.bounds.max.x = 1920;
world.bounds.max.y = 1080;

var viewportCentre = {
  x: render.options.width * 0.5,
  y: render.options.height * 0.5
};

Events.on(engine, "beforeTick", function() {
  var translate;

  // get vector from mouse relative to centre of viewport
  var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
    centreDist = Vector.magnitude(deltaCentre);

  // translate the view if mouse has moved over 50px from the centre of viewport
  if (centreDist > 50) {
    // create a vector to translate the view, allowing the user to control view speed
    var direction = Vector.normalise(deltaCentre),
      speed = Math.min(10, Math.pow(centreDist - 50, 2) * 0.0002);

    translate = Vector.mult(direction, speed);

    // prevent the view moving outside the world bounds
    if (render.bounds.min.x + translate.x < world.bounds.min.x)
      translate.x = world.bounds.min.x - render.bounds.min.x;

    if (render.bounds.max.x + translate.x > world.bounds.max.x)
      translate.x = world.bounds.max.x - render.bounds.max.x;

    if (render.bounds.min.y + translate.y < world.bounds.min.y)
      translate.y = world.bounds.min.y - render.bounds.min.y;

    if (render.bounds.max.y + translate.y > world.bounds.max.y)
      translate.y = world.bounds.max.y - render.bounds.max.y;

    // move the view
    Bounds.translate(render.bounds, translate);

    // we must update the mouse too
    Mouse.setOffset(mouse, render.bounds.min);
  }
});

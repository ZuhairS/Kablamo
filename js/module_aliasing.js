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

// create an engine
let engine = Engine.create(),
  world = engine.world;

// run the engine
Engine.run(engine);

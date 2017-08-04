export default function initializeLevel(name) {
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

export default function initializeEnemy(mode) {
  if (mode !== "menu") {
    let enemy = Bodies.circle(1000, 200, 50, { restitution: 0.6 });
    console.log(enemy);
    World.add(world, enemy);
    return enemy;
  }
}

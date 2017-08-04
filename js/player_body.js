export default function initializePlayer(mode) {
  if (mode !== "menu") {
    let player = Bodies.circle(470, 200, 50, { restitution: 0.6 });
    World.add(world, player);
    return player;
  }
}

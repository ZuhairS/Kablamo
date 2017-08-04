# Kablamo

## Background

Kablamo is intended to be an simple physics based action game with enjoyable impact based gameplay. The game is going to feature levels in which our ball, henceforth known as Kablamo, is supposed to knock out one or more onscreen enemies using themselves as a projectile. You smash into them and in turn launching them off the level or into other enemies.

## Functionality & MVPs

While playing Kablamo, players will be able to:

- Read basic controls on the menu screen.
- Choose different levels. (Bonus: A few game modes)
- Use mouse to control the force and direction of their character's launch.
- Defeat enemies by hitting them off the level.
- Have enemies launch themselves onto the player to try to knock them off the level.

###### Kablamo will also have a production README.

## Wireframe

Kablamo should be a single screen app with intuitive game controls. The art in the game is supposed to be very simple, just enough to distinguish between different balls.

![Launch](wireframes/KablamoLaunch.png)
![Smash](wireframes/KablamoSmash.png)

## Technologies

Kablamo is intended to be built on the following technologies:

- Vanilla JavaScript for game structure and logic.
- Matter.js for physical reactions to impact.
- HTML5 Canvas along with Matter.js's inbuilt renderer for rendering.

## Implementation Timeline

**Day 1**: Learn the fundamentals of Canvas and Matter.js in order to get a better understanding of future work.

**Day 2**: Create and test player character, basic controls and try to implement controlled physical launching. Have launched player pass on momentum onto hit object.

**Day 3**: Create rudimentary AI logic which uses the same launching ability as the player to hit the player. Add some randomization to their accuracy and force.

**Day 4** Create simple enclosed levels, create menu and spend rest of the time making the game look pretty.

## Bonus Features

- Allow camera to zoom and stick to player in order to allow larger levels.
- Allow enhanced launching on specific occasions.
- Add sound effects and music to game.
- Add Survival mode.
- Add enemy types.

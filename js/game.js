import Kablamo from "./kablamo.js";

document.addEventListener("DOMContentLoaded", () => {
  let practice = document.getElementById("practice-button");
  let level1 = document.getElementById("level1-button");
  let header = document.getElementById("header");
  let instructions = document.getElementById("instructions");

  practice.addEventListener("click", () => {
    World.clear(engine.world);
    practice.className += " hidden";
    level1.className += " hidden";
    header.className += " hidden";
    instructions.className += " hidden";
    Kablamo("practice");
  });

  level1.addEventListener("click", () => {
    World.clear(engine.world);
    practice.className += " hidden";
    level1.className += " hidden";
    header.className += " hidden";
    instructions.className += " hidden";
    Kablamo("level1");
  });
});

import Kablamo from "./kablamo.js";

document.addEventListener("DOMContentLoaded", () => {
  let practice = document.getElementById("practice-button");
  let level1 = document.getElementById("level1-button");
  let header = document.getElementById("header");

  practice.addEventListener("click", () => {
    World.clear(engine.world);
    practice.className += " hidden";
    level1.className += " hidden";
    header.className += " hidden";
    Kablamo("practice");
  });

  level1.addEventListener("click", () => {
    World.clear(engine.world);
    practice.className += " hidden";
    level1.className += " hidden";
    header.className += " hidden";
    Kablamo("level1");
  });
});

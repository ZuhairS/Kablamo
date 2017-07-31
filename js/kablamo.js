document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById('canvas');
  var stage = new createjs.Stage(canvasEl);
  var shape = new createjs.Shape();
  shape.graphics.beginFill('red').drawRect(0, 0, 120, 120);
  stage.addChild(shape);
  stage.update();
});

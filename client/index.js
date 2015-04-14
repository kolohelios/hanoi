'use strict';

$(document).ready(init);

var firstTowerClicked;

function init(){
  $('#start').click(startGame);
  $('#t1').click(moveHandler);
  $('#t2').click(moveHandler);
  $('#t3').click(moveHandler);
}

function startGame(){
  $('.tower').empty();
  console.log('start game');
  drawCylinders();
}

function drawCylinders(){
  var numberOfCylinders = $('#cylinders').val();
  for(var i = 1; i <= numberOfCylinders; i++){
    var $div = $('<div>');
    var width = (i / numberOfCylinders) * 90 + '%';
    $div.text(i);
    $div.addClass('cylinder');
    $div.css('width', width);
    $('#t1').append($div);
  }
}

function moveHandler(){
  firstTowerClicked = $(this);
  var sizeOfCylinderToMove = $(this).children().first().text();
}

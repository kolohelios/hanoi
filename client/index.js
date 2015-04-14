'use strict';

$(document).ready(init);

function init(){
  $('#start').click(startGame);
  $('#t1').click(moveHandler);
  $('#t2').click(moveHandler);
  $('#t3').click(moveHandler);
}

function startGame(){
  console.log('start game');
  drawCylinders();
}

function drawCylinders(){
  var colorArray = ['', 'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'gray', 'tan'];
  $('.cylinderwrapper').empty();
  var numberOfCylinders = $('#cylinders').val();
  for(var i = 1; i <= numberOfCylinders; i++){
    var $div = $('<div>');
    var width = (i / numberOfCylinders) * 90 + '%';
    $div.text(i);
    $div.addClass('cylinder');
    $div.css({'width': width, 'background-color': colorArray[i]});
    $('#t1').find('.cylinderwrapper').append($div);
  }
}

function moveHandler(){
  if($('.selected').length === 0){
    $(this).addClass('selected');
  }
  else{
    var sizeOfCylinderToMove = $('.selected').find('.cylinderwrapper').children().first().text();
    var sizeOfTopCylinderOnTowerToMoveTo = $(this).find('.cylinderwrapper').children().first().text();
    console.log('first cylinder', sizeOfCylinderToMove, 'second cylinder', sizeOfTopCylinderOnTowerToMoveTo);
    if((sizeOfCylinderToMove < sizeOfTopCylinderOnTowerToMoveTo) || (sizeOfTopCylinderOnTowerToMoveTo === '')){
      var detachedTag = $('.selected').find('.cylinderwrapper').children().first().detach();
      $(this).find('.cylinderwrapper').prepend(detachedTag);
    }
    $('.selected').removeClass('selected');
  }
}

'use strict';

$(document).ready(init);

function init(){
  $('#start').click(startGame);
}

function startGame(){
  console.log('start game');
  $('#t1').on('click', null, moveHandler);
  $('#t2').on('click', null, moveHandler);
  $('#t3').on('click', null, moveHandler);
  $('.move').show();
  $('#start').hide();
  $('.cyl').hide();
  $('#moves').find('span').text(0);
  $('#bestmoves').find('span').text(0);
  drawCylinders();
}

function drawCylinders(){
  var colorArray = [];
  for(var i = 0; i <= 9; i++){
    if(i === 0){
      colorArray.push('');
    }
    else if(i%2){
      colorArray.push('rgba(220, 72, 36, 0.6)');
    }
    else{
      colorArray.push('rgba(137, 178, 13, 0.6)');
    }
  }
  $('.cylinderwrapper').empty();
  var numberOfCylinders = $('#cylinders').val();
  ($('#bestmoves').find('span').text(Math.pow(2, numberOfCylinders)-1));
  for(i = 1; i <= numberOfCylinders; i++){
    var $div = $('<div>');
    var width = (i / numberOfCylinders) * 97 + '%';
    $div.text(i);
    $div.addClass('cylinder');
    $div.css({'width': width, 'background-color': colorArray[i]});
    $('#t1').find('.cylinderwrapper').append($div);
  }
}

function moveHandler(){
  if($('.selected').length === 0){
    if($(this).find('.cylinder').length > 0){
      $(this).addClass('selected');
    }
  }
  else{
    var sizeOfCylinderToMove = $('.selected').find('.cylinderwrapper').children().first().text();
    var sizeOfTopCylinderOnTowerToMoveTo = $(this).find('.cylinderwrapper').children().first().text();
    console.log('first cylinder', sizeOfCylinderToMove, 'second cylinder', sizeOfTopCylinderOnTowerToMoveTo);
    if((sizeOfCylinderToMove < sizeOfTopCylinderOnTowerToMoveTo) || (sizeOfTopCylinderOnTowerToMoveTo === '')){
      var detachedTag = $('.selected').find('.cylinderwrapper').children().first().detach();
      $(this).find('.cylinderwrapper').prepend(detachedTag);
      $('#moves').find('span').text(parseInt($('#moves').find('span').text()) + 1);
    }
    $('.selected').removeClass('selected');
    checkForVictoryCondition();
  }
}

function checkForVictoryCondition(){
  if($('#t3').find('.cylinder').length === $('.cylinder').length){
    var winMessage = ((parseInt($('#moves').find('span').text())) === (parseInt($('#bestmoves').find('span').text()))) ? ' with the least possible moves!' : '!';
    $('#winningmessage').text('Congratulations, you won' + winMessage);
    $('#t1').off('click', moveHandler);
    $('#t2').off('click', moveHandler);
    $('#t3').off('click', moveHandler);
    $('#start').show();
  }
}

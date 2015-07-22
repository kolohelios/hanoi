'use strict';

(function(){
  $(document).ready(init);

  function init(){
    $('#start').click(startGame);
  }

  function startGame(){
    $('#t1, #t2, #t3').on('click', null, moveHandler);
    $('#winningmessage').text('');
    $('.move').show();
    $('#start, .cyl').hide();
    $('#moves').find('span').text(0);
    $('#bestmoves').find('span').text(0);
    drawCylinders();
  }

  function drawCylinders(){
    var colorArray = [];
    for(var i = 0; i <= 9; i++){
      if(i % 2){
        colorArray.push('rgba(220, 72, 36, 0.6)');
      }else{
        colorArray.push('rgba(137, 178, 13, 0.6)');
      }
    }
    $('.cylinderwrapper').empty();
    var numberOfCylinders = $('#cylinders').val();
    ($('#bestmoves').find('span').text(Math.pow(2, numberOfCylinders) - 1));
    for(var j = 1; j <= numberOfCylinders; j++){
      var $div = $('<div>');
      var width = (j / numberOfCylinders) * 97 + '%';
      $div.text(j);
      $div.addClass('cylinder');
      $div.css({width: width, 'background-color': colorArray[j]});
      $('#t1').find('.cylinderwrapper').append($div);
    }
  }

  function checkForVictoryCondition(){
    if($('#t3').find('.cylinder').length === $('.cylinder').length){
      var winMessage = parseInt($('#moves').find('span').text(), 10) === parseInt($('#bestmoves').find('span').text(), 10) ? ' with the least possible moves!' : '!';
      $('#winningmessage').text('Congratulations, you won' + winMessage);
      $('#t1, #t2, #t3').off('click', moveHandler);
      $('#start').show();
    }
  }

  function moveHandler(){
    if($('.selected').length === 0){
      if($(this).find('.cylinder').length > 0){
        $(this).addClass('selected');
      }
    }else{
      var sizeOfCylinderToMove = $('.selected').find('.cylinderwrapper').children().first().text();
      var sizeOfTopCylinderOnTowerToMoveTo = $(this).find('.cylinderwrapper').children().first().text();
      if((sizeOfCylinderToMove < sizeOfTopCylinderOnTowerToMoveTo) || (sizeOfTopCylinderOnTowerToMoveTo === '')){
        var detachedTag = $('.selected').find('.cylinderwrapper').children().first().detach();
        $(this).find('.cylinderwrapper').prepend(detachedTag);
        $('#moves').find('span').text(parseInt($('#moves').find('span').text(), 10) + 1);
      }
      $('.selected').removeClass('selected');
      checkForVictoryCondition();
    }
  }
})();

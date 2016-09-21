
var correctCards = 0;
$( init );


function init() {
    
    //scale
    
    var $el = $("#very-specific-design");
var elHeight = $el.outerHeight();
var elWidth = $el.outerWidth();

var $wrapper = $("#content");

$wrapper.resizable({
  resize: doResize
});

function doResize(event, ui) {
  
  var scale, origin;
    
  scale = Math.min(
    ui.size.width / elWidth,    
    ui.size.height / elHeight
  );
  
  $el.css({
    transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
  });
  
}

var starterData = { 
  size: {
    width: $wrapper.width(),
    height: $wrapper.height()
  }
}
doResize(null, starterData);
    
    
    //scale final
    

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  // Create the pile of shuffled cards
  var numbers = [ 1, 2, 3];
  var fotos = [ 'asteroide', 'volcan', 'clima'];
    var numeroRandom = Math.random() - .5;

  numbers.sort( function() { return numeroRandom } );
    fotos.sort( function() { return numeroRandom } );
    

  for ( var i=0; i<3; i++ ) {
      $('<img src' + numbers[i] + '>')
    $('<div>' + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card' +numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'pointer',
      revert: true
    } )
    .append('<img id="theImg" class="photo" src="../images/' + fotos[i] + '.jpg"/>');
  }

  // Create the card slots
  var words = [ 'Impacto de un asteroide 1', 'Erupcion volcanica 2', 'Cambios climaticos 3'];
  for ( var i=1; i<=3; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 3 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '34%',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }

}

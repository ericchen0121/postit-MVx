var Board = function( selector ) {
  // Your board related code goes here
  
  // Use $elem to access the DOM element for this board
  var $elem = $( selector );
  
  function initialize() {
    // What needs to happen when this object is created?

    // $('.post-it').on('click', function(e) {
    //   e.stopPropagation();
    // });

    $elem.click(function(e) {
      console.log("clicked in body");
      postit = new PostIt(); // x-y coordinates
    });

  };

  initialize();
};

var PostIt = function() {
  console.log("creating a post it");
  // Your post-it related code goes here
  var postit_skeleton = "<div class='post-it' contenteditable='true'>\
                           <div class='header' contenteditable='true'><a href='#'>X</a></div>\
                            <div class='content' contenteditable='true'>\
                         </div></div>"

  function render() {
    console.log('inside render');
    $('#board').append(postit_skeleton);
    var $new_postit = $('.post-it:last-child');
    $new_postit.position({
      my: "left top",
      at: "left top",
      of: event
    });
    $new_postit.draggable({ handle: ".header"})
    $new_postit.on('click', function(e) {
      e.stopPropagation();
    });

    var $new_postit_delete = $('.post-it:last-child a');
    $new_postit_delete.on('click', function(e){
      e.stopPropagation();
      $(this).parent().parent().remove();
    });
  };

  render();

};

$(function() {
  // This code will run when the DOM has finished loading
  board = new Board('#board');
});


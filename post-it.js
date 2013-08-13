$(document).ready(function() {
  board = new Board({ selector: '#board'});
});
function StickyView(sticky) {
  this.element = $(this.template());
  this.element.draggable();
  this.element.position({
    my: "top left",
    at: "top left",
    of: sticky.location
  });
  var content = this.element.find('.content');
  content.text(sticky.content);

  this.element.on('click', '.header a', function(e) {
    sticky.remove();
  });

  var element = this.element;
  $(sticky).on('removed', function() {
    element.remove();
  });

  $(sticky).on('changed', function() {
    content.text(sticky.content)
  });
  content.on('click', function(e) {
    sticky.change(window.prompt());
    return false;
  })
}

StickyView.prototype.template = function() {
  return $.trim($('#sticky-template').html());
}

function Sticky(options) {
  this.content = options.content;
  this.location = options.location;
}

Sticky.prototype.remove = function() {
  $(this).trigger('removed');
}
Sticky.prototype.change = function(content) {
  this.content = content;
  $(this).trigger('changed');
}

function Board(options) {
  function initialize(options) {
 
    this.stickies = [];
    this.selector = options.selector
    this.element = $(this.selector);

    var board = this;
    this.element.on('click', function(e) { board.addSticky(e); });
  }
  


  // We use call to coerce javascript to make sure "this" is the new board, instead of Window
  initialize.call(this, options);
}

Board.prototype.addSticky = function(location) {

  var sticky = new Sticky({ content: window.prompt(), location: location });
  this.stickies.push(sticky);
  this.element.append(new StickyView(sticky).element);
  var board = this;
  $(sticky).on('removed', function() {
    board.stickies.delete(sticky);
  });
}

$(document).ready(function () {

  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    
    gutter: 50
  });

  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });







});

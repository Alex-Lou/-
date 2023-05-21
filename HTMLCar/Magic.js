$(document).ready(function () {
    let $surface = $('.surface');
    let $car = $('.car');
    let $img = $('.car img');
    let flag = true;
  
    $(document).on('keypress', function (e) {
      if (e.which == 13) {
        $surface.toggleClass('moveRight');
        $car.toggleClass('suspension');
      }
  
      console.log(e.which);
    });
  
    $(document).on('keypress', function (e) {
      if (e.which == 119) {
        flag = !flag;
      }
    });
  });
  
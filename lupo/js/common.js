$(document).ready(function() {

  
  if ($(window).width() <= 767) {
    
    $(".container").css({
        "background-image" : "url('img/fondo.jpg')",
        "background-size" : "100% 60%"
    });
    $(window).scroll(function() {
      var scrolled = $(this).scrollTop();
      var st = scrolled / 2;

      $(".container").css({
        "background-position" : "0 " + st + "px"
      });
    });
  } else {
    $('.container').parallax({imageSrc: 'img/fondo.jpg'});
  }
  
  

  var item = $('.screenshot-item');
  var img = $('.screenshot-item .screenshot-img');
  var modal = $('#myModal');
  var modalImg = $("#img01");
  var captionText = $(".caption");

  for (var i = 0; i < item.length; i++) {
  	item[i].onclick = function(){
  	  var src = $(this).children().attr("src");
      modal.css({"display" : "block"});
      modalImg.attr('src', src);
  	}
  }

  var closeModal = $(".close-modal");

  closeModal.click(function() {
    modal.css({"display" : "none"});
 })
});

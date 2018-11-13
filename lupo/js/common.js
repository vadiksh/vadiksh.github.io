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
  var modalImg = $(".modal-content");
  var prev = $(".modal-prev");
  var next = $(".modal-next");
  var close = $(".modal-close");

  for (var i = 0; i < item.length; i++) {
  	item[i].onclick = function(){
  	  var src = $(this).children().attr("src");
      modal.css({"display" : "flex"});
      modalImg.attr('src', src);
  	}
  }

  prev.click(function() {
    var modalSrc = modalImg.attr('src');
    for (var j = 0; j < img.length; j++) { 
      if (img[j].id == modalSrc) {
        modalImg.attr('src', img[j - 1].id)
      }
    }
  });

  next.click(function() {
    var modalSrc = modalImg.attr('src');
    for (var k = 0; k < img.length; k++) {
      if (img[k].id == modalSrc) {
        modalImg.attr('src', img[k + 1].id)
      }
    }
  });

  close.click(function() {
    modal.css({"display" : "none"});
  });
});

// <ul class="screenshot">
//   <li class="screenshot-item">
//     <img src="img/ProfessorLupo11.jpg" class="screenshot-img">
//   </li>
//   <li class="screenshot-item">
//     <img src="img/ProfessorLupo05.jpg" class="screenshot-img">
//   </li>
//   <li class="screenshot-item">
//     <img src="img/ProfessorLupo01.jpg" class="screenshot-img">
//   </li>
//   <li class="screenshot-item">
//     <img src="img/ProfessorLupo04.jpg" class="screenshot-img">
//   </li>
//   <li class="screenshot-item">
//     <img src="img/ProfessorLupo03.jpg" class="screenshot-img">
//   </li>
//   <li class="screenshot-item">
//     <img src="img/ProfessorLupo02.jpg" class="screenshot-img">
//   </li>
// </ul>
// <div id="myModal" class="modal">
//   <span class="close-modal">&times;</span>
//   <img class="modal-content" id="img01" src="">
//   <span class="modal-prev">&lt;</span>
//   <span class="modal-next">&gt;</span>
// </div>
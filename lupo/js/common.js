$(document).ready(function() {

  $('.container').parallax({imageSrc: 'img/fondo.jpg'});

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
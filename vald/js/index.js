$(document).ready(function() {
  setTimeout(function() {
    $('.loader').fadeOut(300, function(){
      $('.header__menu-list, .promo').addClass('tdFadeIn');
    });
  }, 300);


  $('.services-types li').click(function() {
    var index = $(this).attr('index');
    var activeElmnts = $('.services-item-' + index);
    var indicatorX = index - 1;

    $('.services-indicator').css({
      "transform": "translate3d(" + indicatorX + "00%, 0, 0"
    })

    $('.services-prices').removeClass('tdFadeIn').addClass('tdFadeOut');

    setTimeout(function(){
      activeElmnts.addClass('active').siblings().removeClass('active');
     $('.services-prices').removeClass('tdFadeOut').addClass('tdFadeIn');
    }, 200);
  });

  $(window).scroll(function() {
    var scrolled = $(this).scrollTop();
    var st = scrolled / 40;

    $(".promo").css({
      "transform" : "translate3d(0, " + "-" + st  + "%, 0)"
    });

    if (scrolled > $(this).height() / 4) {
      var a = scrolled - $(this).height() / 4;

      $(".promo").css({
          "opacity" : 50 / a
      });
    } else {
        $(".promo").css({
            "opacity" : 1
        });
    }
  });
  $("#form").submit(function() {
    $.ajax({
      type: "POST",
      url: "../mail.php",
      data: $(this).serialize()
    }).done(function() {
      alert("доне");
    });
    return false;
  });

  var video = $('#myVideo');
  var pauseBtn = $('.promo__button');

  pauseBtn.mouseenter(function() {
    video[0].pause();
    $('.video-container').addClass("stopfade");
    $('.promo__title span').addClass("shadow");
  });
  pauseBtn.mouseleave(function() {
    video[0].play();
    $('.video-container').removeClass('stopfade');
    $('.promo__title span').removeClass("shadow");
  });
  
  $('.prices').hover(function() {
    
      $(this).find('.prices-description span').text(':');
  },function() {
    $(this).find('.prices-description span').text('.');
  });

  // $('.c-hover').hover(function(){
  //   $(this).text('Hover Text'); //text to be shown on hover state
  // },function(){
  //    $(this).text('Normal Text'); //text to be seen when not in hover state
  // });
});


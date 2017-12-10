$(document).ready(function() { 
  var windowHeight = $(window).height();
  var windowScrollPosTop = $(window).scrollTop();
  var windowScrollPosBottom = windowHeight + windowScrollPosTop;

  $('a[href*="#"]').click(function(e) {
    e.preventDefault();
    var position = $($(this).attr('href')).offset().top;
    $("html, body").animate({scrollTop: position}, 800);
  });

  $('.sticky__share').click(function() {
    $(this).addClass('share-animated').next().show();
    $('.contacts-closed').removeClass('close');
  });

  $('.sticky__close').click(function() {
    $('.contacts-closed').addClass('close');
    $('.sticky__share').removeClass('share-animated').next().slideDown(0).delay(1200).slideUp(0);
  });

  $(window).scroll(function() {
    windowHeight = $(window).height();
    windowScrollPosTop = $(window).scrollTop();
    windowScrollPosBottom = windowHeight + windowScrollPosTop;

    if (windowScrollPosTop !== 0) {
       $('.top-header').css({
        'opacity': 0,
        'transition-duration': '0.3s'
      });
      $('.sticky').slideDown(500);
    } else {
        $('.top-header').css({
        'opacity': 1,
        'transition-duration': '1s'
      });
      $('.sticky').slideUp(400);
    }

    $('.section').navigateOnScroll();
    $('.section-title, .section-text').revealOnScroll('left');
    $('.section-img').revealOnScroll('right');   
  });

  $.fn.navigateOnScroll = function() {
    return this.each(function() {
      var objectOffsetTop = $(this).offset().top;
      var navId = $(this).attr('id');

      if (windowScrollPosBottom - 200 > objectOffsetTop) {
        $('.nav-bar__item[href*="' + navId + '"]').addClass('nav-bar__active').siblings().removeClass('nav-bar__active');
      }
    });
  };

  $.fn.revealOnScroll = function(direction) {
    return this.each(function() {
      var objectOffsetTop = $(this).offset().top;
        
      if (!$(this).hasClass('hidden-' + direction)) {
        $(this).addClass('hidden-' + direction);
      } 
      if (!$(this).hasClass('revealed')) {
        if (windowScrollPosBottom > objectOffsetTop) {
          $(this).addClass('revealed');
        }
      }
    });
  }; 

  $('.access__form').submit(function (event) {
    name = $('.access__name').val();
    email = $('.access__email').val();
    emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  

    if (name.length < 3) {
     event.preventDefault();
     displayError('enter your name');
    } else if (email.length === 0) {
     event.preventDefault();
     displayError('enter your email');
    } else if (!emailRegEx.test(email)) {
     event.preventDefault();
     displayError('make sure you enter a valid email');
    } else {
     alert('VALIDATED!');
   }
  });

  function displayError(errortext) {
    var error = $('.access__error');
  	
    error.slideUp(250, function() {  
      error.html('Please' + ' ' + errortext + '.').slideDown(500);
    });
  }
});
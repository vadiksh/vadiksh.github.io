$(function() {
  var scene = canvallax.Scene({
    className: "bg-canvas"
  }),
  width = window.innerWidth,
  height = window.innerHeight;


  canvallax.TrackScroll({ ease: 5}).add(scene);

  ////////////////////////////////////////

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var i = 0,
    polygons = [],
    width = window.innerWidth,
    height = window.innerHeight,
    count = Math.round(width + height) * .1,
    p,
    distance;

  function postRender(ctx, C) {
    this.x -= this.speed/16;
    this.y -= this.speed;
    
    if (clicked) {
      this.z += this.speed/30;
    } else if (lightspeed) {
      this.z += this.speed/10;
    } else if (slowdown) {
      this.z += this.speed/120;
    }



    if (this.y < window.scrollY - height * 1.5) {
      this.y = randomRange(height * 1.5 + window.scrollY, height * 2.5 + window.scrollY);
    }
    if (this.y > height * 2.5 + window.scrollY) {
      this.y = randomRange(window.scrollY - height * 1.5, window.scrollY - height * 0.5);
    }
    if (this.x < -width) {
      this.x = width * 2;
    }
    if (this.z > 1.5) {
       this.z = randomRange(0, 0.2);
    }
    if (this.x > width/5 && this.x < width/1.25 && this.y > height/5 && this.y < height/1.25) { 

       if (this.z > 0.8) {
          this.z = randomRange(0.3, 0.5);
          this.x = randomRange(-width / 2, width * 2.5);
          this.y = randomRange(-height * 1.5, height * 2.5) + window.scrollY;
       }
    }
 

  }
  var clicked = false,
      lightspeed = false,
      slowdown = false,
      ctaBlock,
      ctaForm;

   if ($('.about-header').length) {
    setTimeout(function () {
      $('.about-header').css({
        'height': $('.about-header')[0].clientHeight + 'px'
      })
    },100)
   } 

  
  $('.cta-btn').click(function(e) {
    ctaBlock = $(this).parent();
    ctaForm = ctaBlock.siblings('.form');
    e.preventDefault();
    clicked = true;

    ctaBlock.parent().css({
      'height': ctaForm[0].clientHeight + 'px',
      'transition': '0.7s ease-in-out' 
    })
    ctaBlock.addClass('hidden');
    ctaForm.css({
      'position': 'relative',
      'visibility': 'visible'
    })
    ctaBlock.css({
      'position': 'absolute'
    })
   
    setTimeout(function() {
      clicked = false;
      lightspeed = true;
     ctaForm.addClass('revealed');

      setTimeout(function() {
       $('body, html').animate({
         scrollTop: ctaForm.parent().offset().top
       },300)
        slowdown = true;
        lightspeed = false;

        setTimeout(function() {
          slowdown = false;
          ctaForm.find('#name').focus();
        }, 500)
      }, 1000)
    }, 300)
  }) 

  $('.form .close').click(function() {
    ctaForm = $(this).closest('.form');
    ctaBlock = ctaForm.siblings('.cta-block');

    ctaBlock.parent().css({
      'height': ctaBlock[0].clientHeight + 'px',
      'transition': '0.7s ease-in-out'
    })
    ctaForm.removeClass('revealed');
    
    setTimeout(function() {
      $('body, html').animate({
        scrollTop: ctaForm.parent().offset().top
      },300)
    }, 700)
    
    setTimeout(function() {

      ctaForm.css({
        'position': 'absolute',
        'visibility': 'hidden'
      })
      ctaBlock.css({
        'position': 'relative'
      })
     ctaBlock.removeClass('hidden');

    }, 700)
  })

  for (; i < count; i++) {
    distance = randomRange(0.3, 1);

    p = canvallax.Rectangle({
      width: 4,
      height: 4,
      x: randomRange(-width / 2, width * 2.5),
      y: randomRange(-height * 1.5, height * 2.5) + window.scrollY,
      z: distance,
      zIndex: 3 + distance * 10,
      opacity: 1,
      fill: "#fff",
      speed: randomRange(.2, .6),
      postRender: postRender
    });

    polygons.push(p);
  }

  scene.add(polygons);


  
  // if ($(window).width() > 767) {
  //   $('.header__banner').paroller({
  //     factor: -0.25,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   // SmoothParallax.init();
  //   $('.advantages').paroller({
  //     factor: 0.3,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });

  //   $('.advantages__list li:nth-of-type(1)').paroller({
  //     factor: -0.3,            // multiplier for scrolling speed and offset
  //     factorSm: -0.35,            // multiplier for scrolling speed and offset
  //     factorMd: -0.35,
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   $('.advantages__list li:nth-of-type(2)').paroller({
  //     factor: -0.25,            // multiplier for scrolling speed and offset
  //     factorSm: -0.2,            // multiplier for scrolling speed and offset
  //     factorMd: -0.2,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   $('.advantages__list li:nth-of-type(3)').paroller({
  //     factor: -0.2,            // multiplier for scrolling speed and offset
  //     factorSm: -0.1,            // multiplier for scrolling speed and offset
  //     factorMd: -0.1,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });

  //   $('.features .section-title').paroller({
  //     factor: 0,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   $('.features__list').paroller({
  //     factor: 0.25,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   $('.features__list li:nth-of-type(1)').paroller({
  //     factor: -0.35,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   $('.features__list li:nth-of-type(2)').paroller({
  //     factor: -0.3,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   $('.features__list li:nth-of-type(3)').paroller({
  //     factor: -0.25,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   $('.features__combination ul').paroller({
  //     factor: -0.25,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });
  //   $('.features__combination-title').paroller({
  //     factor: -0.1,            // multiplier for scrolling speed and offset
  //     type: 'foreground',     // background, foreground
  //     direction: 'vertical'
  //   });

  // }
});
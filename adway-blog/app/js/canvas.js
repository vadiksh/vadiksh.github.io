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

  console.log(count)
  console.log(width)
  console.log(height)

  function postRender(ctx, C) {
    this.x -= this.speed*5;
    this.y -= this.speed;

    if (this.y < window.scrollY - height * 1.5) {
      this.y = randomRange(height * 1.5 + window.scrollY, height * 2.5 + window.scrollY);
    }
    if (this.y > height * 2.5 + window.scrollY) {
      this.y = randomRange(window.scrollY - height * 1.5, window.scrollY - height * 0.5);
    }
    if (this.x < -width) {
      this.x = width*2;
    }
  }

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

  
  if ($(window).width() > 767) {
    $('.header__banner').paroller({
      factor: -0.25,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    // SmoothParallax.init();
    $('.advantages').paroller({
      factor: 0.3,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });

    $('.advantages__list li:nth-of-type(1)').paroller({
      factor: -0.3,            // multiplier for scrolling speed and offset
      factorSm: -0.35,            // multiplier for scrolling speed and offset
      factorMd: -0.35,
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    $('.advantages__list li:nth-of-type(2)').paroller({
      factor: -0.25,            // multiplier for scrolling speed and offset
      factorSm: -0.2,            // multiplier for scrolling speed and offset
      factorMd: -0.2,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    $('.advantages__list li:nth-of-type(3)').paroller({
      factor: -0.2,            // multiplier for scrolling speed and offset
      factorSm: -0.1,            // multiplier for scrolling speed and offset
      factorMd: -0.1,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });

    $('.features .section-title').paroller({
      factor: 0,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    $('.features__list').paroller({
      factor: 0.25,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    $('.features__list li:nth-of-type(1)').paroller({
      factor: -0.35,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    $('.features__list li:nth-of-type(2)').paroller({
      factor: -0.3,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    $('.features__list li:nth-of-type(3)').paroller({
      factor: -0.25,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    $('.features__combination ul').paroller({
      factor: -0.25,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });
    $('.features__combination-title').paroller({
      factor: -0.1,            // multiplier for scrolling speed and offset
      type: 'foreground',     // background, foreground
      direction: 'vertical'
    });

  }
});
$(function() {
	$(window).scroll(function() {
		var scrolled = $(window).scrollTop();
		if (scrolled > 0) {
			$('.header__top').addClass('sticky')
		} else {
			$('.header__top').removeClass('sticky')
		}

		if ($(window).width() > 767) {
			if ($('.products-page__icons').offset().top + $('.products-page__icons').height() > $('.footer').offset().top - 60) {
				$('.products-page__icons').addClass('sticky');
			} else if ($('.products-page__icons').hasClass('sticky') && scrolled + ($(window).height() - $('.products-page__icons').height())/2 < $('.products-page__icons').offset().top) {
				$('.products-page__icons').removeClass('sticky');
			}
			if ($('.products-page__menu').offset().top + $('.products-page__menu').height() > $('.footer').offset().top - 60) {
				$('.products-page__menu').addClass('sticky');
			} else if ($('.products-page__menu').hasClass('sticky') && scrolled + 145 < $('.products-page__menu').offset().top) {
				$('.products-page__menu').removeClass('sticky');
			}
		}
		
	})
	if ($(window).width() > 1023) {
		var mouseEntered;
		$('.header__link.dropdown').mouseenter(function(){
			$(this).addClass('active').siblings().addClass('active');
		})
		$('.header__link.dropdown, .header__dropdown').mouseleave(function(){
			var that = $(this);
			mouseEntered = false;
			setTimeout(function() {
				if (!mouseEntered) {
					that.removeClass('active').siblings().removeClass('active');
				}
			},50)
		})
		$('.header__dropdown').mouseenter(function() {
			mouseEntered = true;
		})
	} else {
		$('.header__link.dropdown').click(function(e){
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active').siblings().removeClass('slided').height(0);
			} else {
				var height = $(this).siblings()[0].scrollHeight;
				console.log(height)
				$(this).addClass('active').siblings().addClass('slided').height(height);
			}
			

		})
	}
	
	if ($(window).width() > 1250) {
		var mouseEntered;
		$('.products__list li').mouseenter(function(){
			$(this).addClass('active').find('.products__tooltip').addClass('active');
		})
		$('.products__list li').mouseleave(function(){
			var that = $(this);
			mouseEntered = false;
			setTimeout(function() {
				if (!mouseEntered) {
					that.find('.products__tooltip').removeClass('active');
				}
			},50)
		})
		$('.products__tooltip').mouseenter(function() {
			mouseEntered = true;
		});
	} else {
		
		$('.products__list li').click(function(){
			$(this).addClass('active').find('.products__tooltip').addClass('active');
			$(this).siblings().find('.products__tooltip').removeClass('active');
		})
		$(window).on('touchstart', function(e) {
			if (!$(e.target).is('.products__list li, .products__list li *')) {
				$('.products__tooltip').removeClass('active');
			}
		})

	}

	if ($(window).width() < 1440) {
		$('.products-page__table-headings .docs').html('Docs')
	}
	$(window).resize(function() {
		if ($(window).width() < 1440) {
			$('.products-page__table-headings .docs').html('Docs')
		}
	})
	

	$('.header__menu-hamburger').click(function() {
		$('.header__menu').addClass('active');
	})
	$('.header__menu-close').click(function() {
		$('.header__menu').removeClass('active');
	})


	window._wq = window._wq || [];
    _wq.push({
        id: "lumhojodre", onReady: function (video) {
            video.bind("play", function() {
              $('.delivery').addClass('played');
              $("#play").fadeOut(300)
            });
        }
    });
	$("#play").click(function () {
		_wq.push({
		    id: "lumhojodre", onReady: function (video) {
    			video.play();
		        
		    }
		});
    })
    $(document).click(function(e) {
    	if ($('.delivery').hasClass('played') && !$(e.target).is('.w-vulcan--background')) {
    		$('.delivery').removeClass('played');
    		$("#play").fadeIn(300)
			_wq.push({
			    id: "lumhojodre", onReady: function (video) {
	    			video.pause();
			    }
			});
    	}
    })
     
    if ($('.clients-carousel').length) {
    	$('.clients-carousel').owlCarousel({
    		loop:true,
    		items: 1,
    		nav: true
    	});
    }
   

  	$('.contact__form input').change(function() {
  		if ($(this).val().length !== 0) {
			$(this).addClass('input-active');
  		} else {
  			$(this).removeClass('input-active');
  		}
  	})
  	
    fetch('js/as-website-products.json').then(response => {
        return response.json();
    }).then(data => {
    	for (var i = 0; i < data.length; i++) {
    		$('.products-page__menu-list li:last-child').before(
    			'<li class="products-page__data-group"><a href="../products.html#' + 
    			data[i].product_listing_name + '">' + 
    			data[i].menu_name + '</a></li>'
    		)
    	}

    	

    	$('.products-page__data-group').click(function(e) {
    		// e.preventDefault();
    		$(this).siblings().find('a').removeClass('active');
    		$(this).find('a').addClass('active');

    		$('.products-page__item').addClass('active').siblings().removeClass('active');

   			if ($(window).width() < 768) {
   				$('.products-page__menu').removeClass('active');
   			}
   			$('.products-page__icons').removeClass('hidden');

    		var index = $(this).index('.products-page__data-group');
    		$('body, html').animate({
    			scrollTop: 0
    		}, 400)

    		$('.products-page__main').addClass('hidden');
    		setTimeout(function() {
    			$('.products-page__item h3').html(data[index].display_name);
    			$('.products-page__item-descr').html(data[index].description);
    			$('.products-page__item-info span').html(data[index].menu_name);
    			$('.products-page__table ul').html('');
	    		for (var i = 0; i < data[index].datasets.length; i++) {
	    			$('.products-page__table ul').append(
	    				'<li class="flex">' +
	    					'<h5 class="products-page__table-name">' + data[index].datasets[i].menu_name + '</h5>' + 
							'<p class="products-page__table-descr">' + data[index].datasets[i].long_description + '</p>' + 
							'<a class="products-page__table-doc"></a>' + 
							'<a class="products-page__table-sample"></a>' + 
						'</li>'
	    			)
	    		}
	    		$('.products-page__main').removeClass('hidden');
    		}, 200);
    	})
    	if (window.location.hash !== 0) {
    		$('a[href*="' + window.location.hash + '"]').parent().trigger('click');
    	}
    });
    
    
    $('.products-page__menu-list a').click(function (e) {
    	$(this).addClass('active');
    	$(this).parent().siblings().find('a').removeClass('active');
    	$('body, html').animate({
    		scrollTop: 0
    	}, 400)
    	if ($(window).width() < 768) {
    		$('.products-page__menu').removeClass('active');
    	}

    	$('.products-page__icons').addClass('hidden');
    })


    if (window.location.hash !== 0) {
    	$('a[href*="' + window.location.hash + '"]').trigger('click');
    }
    if (window.location.hash == '#featured') {
    	$('.products-page__featured').addClass('active').siblings().removeClass('active');
    } else if (window.location.hash == '#qa') {
    	$('.products-page__qa').addClass('active').siblings().removeClass('active');

    }

    $(window).on('hashchange', function() {
    	if (window.location.hash == '#featured') {
    		$('.products-page__featured').addClass('active').siblings().removeClass('active');
    	} else if (window.location.hash == '#qa') {
    		$('.products-page__qa').addClass('active').siblings().removeClass('active');

    	}
    });

    $(".products-page__icons-mob a").click(function(e) {
    	e.preventDefault();
    	$('.products-page__menu').addClass('active');
    })

    $('.products-page__qa .question').click(function() {
    	$(this).siblings().slideToggle(300);
    	if ($(this).hasClass('active')) {
    		$(this).removeClass('active')
    	} else {
    		$(this).addClass('active');
    	}
    })

    
});

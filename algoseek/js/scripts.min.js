$(function() {
	$(window).scroll(function() {
		var scrolled = $(window).scrollTop();
		if (scrolled > 0) {
			$('.header__top').addClass('sticky')
		} else {
			$('.header__top').removeClass('sticky')
		}

		if ($(window).width() > 767) {
			if ($('#products-page').length && $('.products-page__icons').offset().top + $('.products-page__icons').height() > $('.footer').offset().top - 60) {
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
		$('.products__list li, .products-page__table-headings').mouseenter(function(){
			$(this).addClass('active').find('.products__tooltip').addClass('active');
		})
		$('.products__list li, .products-page__table-headings').mouseleave(function(){
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
        $('.products__toolip').mouseleave(function(){
            var that = $(this);
            mouseEntered = false;

            setTimeout(function() {
                if (!mouseEntered) {
                    that.removeClass('active');
                }
            },50)
       })

	} else {
		
		$('.products__list li, .products-page__table-headings').click(function(){
			$(this).addClass('active').find('.products__tooltip').addClass('active');
			$(this).siblings().find('.products__tooltip').removeClass('active');
		})
		$(window).on('touchstart', function(e) {
			if (!$(e.target).is('.products__list li, .products__list li *') || !$(e.target).is('.products-page__table-headings, .products-page__table-headings *')) {
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
    		nav: true,
    		navSpeed: 1000 
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
    		$('#products__menu li:last-child').before(
    			'<li class="products-page__data-group"><a href="./products.html#' + 
    			data[i].product_listing_name + '">' + 
    			data[i].menu_name + '</a></li>'
    		)
    		$('.order__datagroups').append(
    			'<label class="order-radio"><input type="radio" name="datagroup" value="' + 
    			data[i].menu_name + '">' + data[i].menu_name + '</label>'
    		)
    	}
    	$('.products-page__data-group').click(function(e) {
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

    	$('.order__datagroups').change(function() {
    		var index = $(this).find('input:checked').parent().index();
    		var table = $(this).parents('.order__table');
    		table.find('.order__datasets').addClass('hidden');
    		setTimeout(function() {
    			table.find('.order__datasets label:not(.arrow)').remove();
    			
	    		for (var i = 0; i < data[index].datasets.length; i++) {
		    		table.find('.order__datasets .arrow').before(
		    			'<label class="order-check">' + 
							'<input type="checkbox" name="dataset" value="' + 
							data[index].datasets[i].menu_name + '"><span class="order-check-mark"></span>' +
							data[index].datasets[i].menu_name +
						'</label>'
		    		)
	    		}
	    		table.find('.order__datasets').removeClass('hidden');

	    		setTableHeight(table);
    		},200)
    	})
    	setTableHeight($(this).parents('.order__table'));

    	if (window.location.hash !== 0) {
    		$('a[href*="' + window.location.hash + '"]').parent().trigger('click');
    	}
    });


    $('.order__table').change(function() {
    	setTableHeight($(this));
    })
    function setTableHeight(table){
    	if ($(window).width() > 1249) {
    		var height = 0;
    		setTimeout(function() {
    			for (var i = 0; i < table.find('li').length; i++) {
    				if ($(table.find('li')[i]).find('div:last-child').height() + 86 > height) {
    					height = $(table.find('li')[i]).find('div:last-child').height() + 86;
    				}
    			}
    			table.css({"height": height});
    		},300)
    	}
    }

    $('.order__symbol').change(function() {
    	if ($(this).find('.arrow input[type="radio"]').prop('checked')) {
    		$(this).find('.arrow').addClass('active').find('.arrow-sliding').addClass('active').css({"height": "45px"});
    	} else {
    		$(this).find('.arrow').removeClass('active').find('.arrow-sliding').removeClass('active').css({"height": "0"});

    	}
    });
    $('.order-check.arrow').change(function() {
    	if ($(this).find('input[type="checkbox"]').prop('checked')) {
    		$(this).addClass('active').find('.arrow-sliding').addClass('active').css({"height": $(this).find('.arrow-sliding > div').height() + 20});
    	} else {
    		$(this).removeClass('active').find('.arrow-sliding').removeClass('active').css({"height": "0"});

    	}
    });
    $('.order-upload-mark').click(function(e) {
    	e.preventDefault();
    	$(this).siblings('.order-upload').trigger('click');
    })
    $('.order-upload').change(function() {
    	$(this).siblings('.order-upload-mark').html(this.files[0].name);
    })
    $('.arrow-sliding h6, .arrow-sliding input, .arrow-sliding textarea').click(function (e) {
    	e.preventDefault();
    });
    var period = 1;
    $('.order-period-add').click(function (e) {
    	e.preventDefault();
    	var table = $(this).parents('.order__table');
    	if (period < 5) {
    		period++;
    		table.find('.order-period h6').removeClass('hide-close'); 
    		table.find('.order-period-add').before(
    				'<div class="order-period-added"><label>From<input type="date" name="period-from" min="2013-01-01">' + 
    				'</label><label>To<input type="date" name="period-to" min="2013-01-01"></label></div>'
    		);
    		table.find('.order-period:first-of-type h6').clone(true).html('Period ' + period).prependTo(table.find('.order-period-added'));
    		
    		table.find('.order-period-added').addClass('order-period')
    		// setTimeout(function() {
    			table.find('.order-period-added').removeClass('order-period-added');
    		// },100)

    		if (period == 5) {
    			$(this).fadeOut(300);
    		}
    		table.find('.order-historical .arrow-sliding.active').css({"height": $('.order-historical .arrow-sliding > div').height()});
    		setTableHeight($(this).parents('.order__table'));
    	}
    	
    })
    $('.order-period h6').click(function () {
    	var table = $(this).parents('.order__table');
    	if (period > 1) {
    		$(this).parent().remove();  
    		 		
    		period--;
    		if (period < 5) {
    			table.find('.order-period-add').fadeIn(200);
    		}
    		if (period == 1) {
    			table.find('.order-period h6').addClass('hide-close');
    		}
    	} 

    	for (var i = 0; i < table.find('.order-period').length; i++) {
    		var index = i + 1;
    		$(table.find('.order-period')[i]).find('h6').html('Period ' + index);
    	}

    	table.find('.order-historical .arrow-sliding.active').css({"height": table.find('.order-historical .arrow-sliding > div').height()});
    	setTableHeight(table);
    	
    });
    $('.order__table-add-row').click(function() {
    	var newTable = $('.order__table:first-of-type').clone(true);
    	
    	
    	newTable.find('input[name="datagroup"]').attr('name', 'datagroup' + $('.order__table').length);
    	newTable.find('input[name="purchase-option"]').attr('name', 'purchase-option' + $('.order__table').length);
    	newTable.find('input[name="datagroup"]').attr('name', 'datagroup' + $('order__table').length);
    	newTable.find('input[name="symbol"]').attr('name', 'symbol' + $('order__table').length);
    	newTable.find('.order__datasets .order-check:not(.arrow)').remove();
    	newTable.find('.arrow').removeClass('active').find('.arrow-sliding').removeClass('active').css({"height": "0"});
    	newTable.find('input:checked').prop('checked', false);

    	newTable.insertBefore('.order__table-add-row');

    	$('.order__table:last-of-type').after(
    		'<span class="order__table-button order__table-remove">Remove Order Row</span>'
    	)
    	if ($('.order__table').length == 5) {
    		$(this).fadeOut(500);
    	} 
    	for (var i = 0; i < $('.order__table:last-of-type input[type="file"]').length; i++) {
    		$($('.order__table:last-of-type input[type="file"]')[i]).val('').next('.order-upload-mark').html('No file selected');
    	}
    	
    	setTableHeight($('.order__table:last-of-type'));

    	$('.order__table-remove').click(function() {
    		$(this).prev('.order__table').remove();
    		$(this).remove();
    		if ($('.order__table').length < 5) {
    			$('.order__table-add-row').fadeIn(500);
    		} 
    	})
    })

    $('.products-page__menu-list a').click(function (e) {
    	
    	if ($('.order').length) {
    		var href = $(this).attr('href');
    		setTimeout(function () {
    			if (href == '#contact') {
    				$('body,html').animate({
    					scrollTop: $('[data-id="' + href + '"]').offset().top - 160
    				}, 500)
    			} else {
    				$('body,html').animate({
    					scrollTop: $('[data-id="' + href + '"]').offset().top - 95
    				}, 500)
    			}
    		},200)
    	} else {
    		console.log('da')
    		$(this).addClass('active');
    		$(this).parent().siblings().find('a').removeClass('active');

    		$('body, html').animate({
    			scrollTop: 0
    		}, 400)
    		$('.products-page__icons').addClass('hidden');
    	}
    	if ($(window).width() < 768) {
    		$('.products-page__menu').removeClass('active');
    	}
    })
    if (window.location.hash !== '') {
    	$('a[href*="' + window.location.hash + '"]').trigger('click');
    } else {
    	$('.products-page__menu-list li:first-child a').trigger('click');
    }
    if (window.location.hash == '#featured' || window.location.hash == '') {
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

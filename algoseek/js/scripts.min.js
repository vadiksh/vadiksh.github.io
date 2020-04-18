$(function() {
    
// ACTIVE LINK
    if (window.location.pathname.indexOf('products') > 0) {
        $('.header__menu-wrapper li:first-child a').addClass('active-link');
    } else if (window.location.pathname.indexOf('delivery') > 0) {
        $('.header__menu-wrapper li:nth-child(2) a').addClass('active-link');
    } else if (window.location.pathname.indexOf('company') > 0) {
        $('.header__menu-wrapper li:nth-child(4) a').addClass('active-link');
    } else if (window.location.pathname.indexOf('support') > 0) {
        $('.header__menu-wrapper li:nth-child(5) a').addClass('active-link');
    } else if (window.location.pathname.indexOf('partners') > 0) {
        $('.header__menu-wrapper li:nth-child(6) a').addClass('active-link');
    }
// 

// HEADER
	$(window).scroll(function() {
		var scrolled = $(window).scrollTop();
		if (scrolled > 0) {
			$('.header__top').addClass('sticky')
		} else {
			$('.header__top').removeClass('sticky')
		}
	})

    $('.header__menu a:not(.dropdown)').click(function() {
        $('.header__menu').removeClass('active');
    })

    if ($(window).width() < 1024) {
        $('.header__link.dropdown').click(function(e){
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').siblings().removeClass('slided').height(0);
            } else {
                var height = $(this).siblings()[0].scrollHeight;
                $(this).addClass('active').siblings().addClass('slided').height(height);
            }
        })
        $('.header__menu-hamburger').click(function() {
            $('.header__menu').addClass('active');
        })
        $('.header__menu-close').click(function() {
            $('.header__menu').removeClass('active');
        })
    }
// 

// COMING
    var interval;
    var comingText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    $('.overflow-wrap').append('<div class="coming no-trans"><img class="coming__logo" src="img/logo.svg" alt=""><div class="coming__intro"><h2>Coming <b>in May</b></h2><p>' + 
        comingText + 
        '</p></div><ul class="coming__timer flex"><li><span class="days"></span><p>Days</p></li><li><span class="hours"></span><p>Hours</p></li><li><span class="mins"></span><p>Minutes</p></li><li><span class="secs"></span><p>Seconds</p></li></ul><form action="" class="coming__form"> <input type="email" name="email" placeholder="Email" required=""><button class="button">NOTIFY ME!</button></form><div class="close"><span></span></div></div>');
    
    $('.coming-soon').click(function (e) {
        e.preventDefault();
        $('.coming').addClass('active');
        $('body').css({'height': '100vh', 'overflow-y': 'hidden'})

        var releaseDate = $(this).attr('data-date');

        var countDownDate = new Date(releaseDate).getTime();
        var distance,
            now;
            // console.log(countDownDate);

        tick();
        interval = setInterval(function() {
          tick();
        }, 1000);

        function tick(){
            now = new Date().getTime();
            distance = countDownDate - now;

            var days = ("0" + Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2);
            var hours = ("0" + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
            var minutes = ("0" + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
            var seconds = ("0" + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2); 

            $('.days').html(days);
            $('.hours').html(hours);
            $('.mins').html(minutes);
            $('.secs').html(seconds);

            if (distance < 0) {
              clearInterval(interval);
              document.getElementById("demo").innerHTML = "EXPIRED";
            }
        }
    })
    $('.coming .close').click(function () {
        clearInterval(interval);
        $('.coming').removeClass('active');
        $('body').css({'height': '100%', 'overflow-y': 'auto'})
    })

    
// 
    $('.no-trans').removeClass('no-trans');
    $('.header').addClass('revealed');
// PRODUCTS/ORDER
    $('.products-page__menu .close').click(function() {
         $('.products-page__menu').removeClass('active');
     })

// CONTACT FORM
  	$('.contact__form input').change(function() {
  		if ($(this).val().length !== 0) {
			$(this).addClass('input-active');
  		} else {
  			$(this).removeClass('input-active');
  		}
  	})
// 
  	

    fetch('js/as-website-products.json').then(response => {
        return response.json();
    }).then(data => {
        var data = data;
    	for (var i = 0; i < data.length; i++) {
    		$('#products__menu li:last-child').before(
    			'<li class="products-page__data-group"><a href="#' + 
    			data[i].product_listing_name + '">' + 
    			data[i].menu_name + '</a></li>'
    		)
    		$('.order__datagroups').append(
    			'<label class="order-radio"><input type="radio" data-id="' +
                data[i].id + '" name="datagroup" value="' + 
    			data[i].menu_name + '">' + data[i].menu_name + '</label>'
    		)

            if (window.location.hash == '#' + $($('.order__datagroups input')[i]).attr('data-id')) {
                $($('.order__datagroups input')[i]).prop('checked', true);
            } else if (!$('.order__datagroups input:checked').length) {
                $($('.order__datagroups input')[0]).prop('checked', true);
            }

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
                $('.products-page__table-order, .products-page__icons .icon-cart').attr('href', './order.html#' + data[index].id)
                $('.products-page__table-pricing, .products-page__icons .icon-tag').attr('href', './pricing.html#' + data[index].id)

    			$('.products-page__table ul').html('');

	    		for (var i = 0; i < data[index].datasets.length; i++) {
                    var docs = data[index].datasets[i].documentation;
                    var file = data[index].datasets[i].sample_file;
                    if (docs !== null) {
                        docs_item = '<a class="products-page__table-doc ' + docs.file_ext + '" href="https://'+ docs.bucket_name +'.s3.amazonaws.com/' + docs.object_name + '">';
                    } else {
                        docs_item = '<a class="products-page__table-doc doc-null">';
                    }
                    if (file !== null) {
                        file_item = '<a class="products-page__table-sample ' + file.file_ext + '" href="https://'+ file.bucket_name +'.s3.amazonaws.com/' + file.object_name + '">';
                    } else {
                        file_item = '<a class="products-page__table-sample item-null">';
                    }

	    			$('.products-page__table ul').append(
	    				'<li class="flex">' +
	    					'<h5 class="products-page__table-name">' + data[index].datasets[i].menu_name + '</h5>' + 
							'<p class="products-page__table-descr">' + data[index].datasets[i].long_description + '</p>' + 
							docs_item + 
							file_item + 
						'</li>'
	    			)
	    		}

	    		$('.products-page__main').removeClass('hidden');
    		}, 200);

            var sizeHref = window.location.origin + window.location.pathname + '?showsize' + window.location.hash;
            $('.icon-ruler').attr('href', sizeHref);

            if (window.location.search == '?showsize') {
                setTimeout(function() {
                    showSizes();
                },200)
            }
    	})

        
        $('.icon-ruler').click(function(e) {
            e.preventDefault();
            if (!$(this).hasClass('back-to-files')) {
                showSizes();
            } else {
                backToFiles();
            }            
        })
        function showSizes() {
            var sizeHref = window.location.origin + window.location.pathname + '?showsize' + window.location.hash;
            history.pushState('', 'Products', sizeHref);

            var indexItem = $('.products-page__menu').find('a[href="' + window.location.hash + '"]').parent();
            var index = indexItem.index('.products-page__data-group');
            for (var i = 0; i < data[index].datasets.length; i++) {
                var dailySize = data[index].datasets[i].daily_size || ' — ';
                var annualSize = data[index].datasets[i].annual_size || ' — ';

                $('.products-page__table-headings h5:nth-of-type(3)').html('Daily Size')
                $('.products-page__table-headings h5:nth-of-type(4)').html('Annual Size')

                $('.products-page__table ul li').eq(i).find('.products-page__table-doc').replaceWith('<span>' + dailySize + '</span>');
                $('.products-page__table ul li').eq(i).find('.products-page__table-sample').replaceWith('<span>' + annualSize + '</span>');
                 
            }
            $('.icon-ruler').addClass('back-to-files active').next('.tooltip').html('Docs & Sample');
            setTimeout(function () {
                $('.icon-ruler').removeClass('active');
            },3000)
        }
        function backToFiles() {
            var sizeHref = window.location.origin + window.location.pathname + window.location.hash;
            history.pushState('', 'Products', sizeHref);

            var indexItem = $('.products-page__menu').find('a[href="' + window.location.hash + '"]').parent();
            var index = indexItem.index('.products-page__data-group');
            for (var i = 0; i < data[index].datasets.length; i++) {
                var docs = data[index].datasets[i].documentation;
                var file = data[index].datasets[i].sample_file;

                if (docs !== null) {
                    docs_item = '<a class="products-page__table-doc ' + docs.file_ext + '" href="https://'+ docs.bucket_name +'.s3.amazonaws.com/' + docs.object_name + '">';
                } else {
                    docs_item = '<a class="products-page__table-doc doc-null">';
                }
                if (file !== null) {
                    file_item = '<a class="products-page__table-sample ' + file.file_ext + '" href="https://'+ file.bucket_name +'.s3.amazonaws.com/' + file.object_name + '">';
                } else {
                    file_item = '<a class="products-page__table-sample item-null">';
                }

                $('.products-page__table ul li').eq(i).find('span:first-of-type').replaceWith(docs_item);
                $('.products-page__table ul li').eq(i).find('span:last-of-type').replaceWith(file_item);

                $('.products-page__table-headings h5:nth-of-type(3)').html('Docs');
                $('.products-page__table-headings h5:nth-of-type(4)').html('Sample Data');
            }
            $('.icon-ruler').removeClass('back-to-files').next('.tooltip').html('Dataset Sizes');
        }

        if (window.location.hash !== 0) {
            $('a[href*="' + window.location.hash + '"]').parent().trigger('click');
        }

        // ORDER

    	$('.order__datagroups').change(function() {
    		var index = $(this).find('input:checked').parent().index();
    		var table = $(this).parents('.order__table'),
                tableIndex = table.index('.order__table');

    		table.find('.order__datasets, .order__symbol').addClass('hidden');
    		setTimeout(function() {
                table.find('.order__symbol').html('');

                for (var i = 0; i < data[index].tickers.length; i++) {
                    if (data[index].tickers[i] == 'Upload File') {
                        table.find('.order__symbol').append(
                            '<label class="arrow order-radio">' +
                                '<input type="radio" name="symbol' + tableIndex + '" value="Upload">Upload' +
                                '<input class="order-upload" name="input-upload-file' + tableIndex + '" type="file">' +
                                '<span class="order-upload-mark arrow-sliding">Select file</span>' +
                            '</label>'
                        )
                    } else if (data[index].tickers[i] == 'Input List') {
                        table.find('.order__symbol').append(
                            '<label class="arrow order-radio">' + 
                                '<input type="radio" name="symbol' + tableIndex + '" value="Input">Input' + 
                                '<textarea name="symbol-input' + tableIndex + '" class="arrow-sliding symbol-text" cols="30" rows="4"></textarea>' + 
                            '</label>'
                        )
                    } else {
                        table.find('.order__symbol').append(
                            '<label class="order-radio">' + 
                                '<input type="radio" name="symbol' + tableIndex + '" value="' + data[index].tickers[i] + '">' + data[index].tickers[i] +
                            '</label>'
                        )
                    }
                }
                table.find('.order__symbol label:first-child input[type=radio]').prop('checked', true);

    			table.find('.order__datasets label:not(.arrow)').remove();
    			
	    		for (var i = 0; i < data[index].datasets.length; i++) {
		    		table.find('.order__datasets .arrow').before(
		    			'<label class="order-check">' + 
							'<input type="checkbox" name="dataset' + tableIndex + '" value="' + 
							data[index].datasets[i].menu_name + '"><span class="order-check-mark"></span>' +
							data[index].datasets[i].menu_name +
						'</label>'
		    		)
	    		}
	    		table.find('.order__datasets, .order__symbol').removeClass('hidden');

	    		setTableHeight(table);
    		},200)

    	})

        $('.order__datagroups').trigger('change');

        $(document).on('change', '.order__datasets', function(){
            var table = $(this).parents('.order__table');
            var groupIndex = table.find('.order__datagroups input:checked').parent().index();
            setTimeout(function() {
                if (table.find('.order__datasets input:checked').length) {
                    var firstIndex = $(table.find('.order__datasets input:checked')[0]).parent('label:not(.arrow)').index();
                    var earliest = data[groupIndex].datasets[firstIndex].start_date;
                    var earliestDate = new Date(earliest);

                    var d = new Date();
                    var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
                    var latest = data[groupIndex].datasets[firstIndex].end_date || datestring;
                    var latestDate = new Date(latest);

                    for (var i = 0; i < table.find('.order__datasets label:not(.arrow) input:checked').length; i++) {
                        var datasetIndex = $(table.find('.order__datasets input:checked')[i]).parent('label:not(.arrow)').index();
                        var start = data[groupIndex].datasets[datasetIndex].start_date;
                        var end = data[groupIndex].datasets[datasetIndex].end_date || datestring;

                        if (new Date(start) < earliestDate) {
                            var earliest = start;
                            var earliestDate = new Date(earliest);
                        }
                        if (new Date(end) > latestDate) {
                            var latest = end;
                            var latestDate = new Date(latest);
                        }
                    }
                    table.find('.period-from').val(earliest);
                    table.find('.period-to').val(latest);
                } else {
                    table.find('.period-from').val('');
                    table.find('.period-to').val('');
                }
            }, 200)
        })


    });

    
    // ORDER 

    $(document).on('change', '.order__table', function() {
        var table = $(this);
    	setTableHeight($(this));
        setTimeout(function() {
            if (table.find('.order__datasets input:checked').length) {
                table.find('.disabling-block').removeClass('active');
                table.find('.order-check.disabling').removeClass('disabled').find('input').prop('disabled', false);

            } else {
                table.find('.disabling-block').addClass('active');
                table.find('.order-check.disabling').addClass('disabled').find('input').prop('disabled', true);
            }
        }, 200)
        
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
        $(this).find('input:checked').siblings('.arrow-sliding').addClass('active');
        $(this).find('input:checked').parent().siblings().find('.arrow-sliding').removeClass('active').css({"height": "0"});

    	if ($(this).find('input:checked').val() == 'Upload') {
    		$(this).find('input:checked').siblings('.arrow-sliding').css({"height": "55px"});
    	} else if ($(this).find('input:checked').val() == 'Input') {
            $(this).find('input:checked').siblings('.arrow-sliding').css({"height": "110px"});
    	} 
    });

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            $(mutations[0].target).parents('.arrow-sliding').css({"height": $(mutations[0].target).parents('.arrow-sliding > div').height() + 20});

           setTableHeight($($(mutations[0].target).parents('.order__table')[0]));
        });    
    });

    var target = document.getElementsByClassName('symbol-text');
    for (var i = 0; i < target.length; i++) {
         observer.observe(target[i], { attributes : true, attributeFilter : ['style'] });

    }

    

    $('.order-check.arrow').change(function() {
    	if ($(this).find('input[type="checkbox"]').prop('checked')) {
    		$(this).addClass('active').find('.arrow-sliding').addClass('active').css({"height": $(this).find('.arrow-sliding > div').height() + 20});
    	} else {
    		$(this).removeClass('active').find('.arrow-sliding').removeClass('active').css({"height": "0"});

    	}
    });
    if (window.location.hash == '#historical') {
        $('.historical-data').prop('checked', true).trigger('change');

    }
    if (window.location.hash == '#updates') {
        $('.daily-updates').prop('checked', true)
    }   

    $(document).on('click', '.order-upload-mark', function(e) {
        e.preventDefault();
        $(this).siblings('.order-upload').trigger('click');
    })

    $(document).on('change', '.order-upload', function() {
        if(this.files[0].size > 15000000){
           alert("File size should be less than 15MB");
           this.value = "";
           $(this).siblings('.order-upload-mark').html('Select file');
        } else {
            $(this).siblings('.order-upload-mark').html(this.files[0].name);
        }
    });

    $('.arrow-sliding h6').click(function (e) {
    	e.preventDefault();
    });
    if ($(window).width() < 1024) {
        $(document).on('click', '.arrow-sliding input[type="date"], .arrow-sliding textarea', function(e) {
            e.preventDefault();
        });
    }
    $('.order-period-add').click(function (e) {
    	e.preventDefault();
    	var table = $(this).parents('.order__table');
    	if (table.find('.order-period').length < 5) {
    		table.find('.order-period h6').removeClass('hide-close'); 
    		table.find('.order-period-add').before(
    				'<div class="order-period-added"><label>From<input type="date" name="period-from" min="2013-01-01">' + 
    				'</label><label>To<input type="date" name="period-to" min="2013-01-01"></label></div>'
    		);
    		table.find('.order-period:first-of-type h6').clone(true).addClass('new-period').html('Period ' + parseInt(table.find('.order-period').length + 1)).prependTo(table.find('.order-period-added'));
    		table.find('.order-period:first-of-type h6').html('Period 1');
    		table.find('.order-period-added').addClass('order-period')
    		table.find('.order-period-added').removeClass('order-period-added');

    		if (table.find('.order-period').length == 5) {
    			$(this).fadeOut(300);
    		}
    		table.find('.order-historical .arrow-sliding.active').css({"height": table.find('.order-historical .arrow-sliding > div').height()});
    		setTableHeight($(this).parents('.order__table'));
    	}
    })
    $(document).on('click', '.order-period h6.new-period', function() {
        var table = $(this).parents('.order__table');
       
        if (table.find('.order-period').length > 1) {
            $(this).parent().remove();  
                    
            if (table.find('.order-period').length < 5) {
                table.find('.order-period-add').fadeIn(200);
            }
            if (table.find('.order-period').length == 1) {
                table.find('.order-period h6').addClass('hide-close');
            }
        } 

        for (var i = 0; i < table.find('.order-period').length; i++) {
            var index = i + 1;
            $(table.find('.order-period')[i]).find('h6').html('Period ' + index);
            if (table.find('.order-period').length == 1) {
                table.find('.order-period:first-of-type h6').html('Period');
            }
        }

        table.find('.order-historical .arrow-sliding.active').css({"height": table.find('.order-historical .arrow-sliding > div').height()});
        setTableHeight(table);
    })

    $('.order__table-add-row').click(function() {
    	var newTable = $('.order__table:first-of-type').clone(true);
    	
    	
    	newTable.find('input[name="datagroup"]').attr('name', 'datagroup' + $('.order__table').length);
    	newTable.find('input[name="purchase-option"]').attr('name', 'purchase-option' + $('.order__table').length);
    	newTable.find('input[name="dataset"]').attr('name', 'dataset' + $('.order__table').length);
        newTable.find('.order__symbol').html('');
        newTable.find('input[id="custom-check"]').attr('id', 'custom-check' + $('.order__table').length);
        newTable.find('label[for="custom-check"]').attr('for', 'custom-check' + $('.order__table').length);
    	newTable.find('.order__datasets .order-check:not(.arrow)').remove();
    	newTable.find('.arrow').removeClass('active').find('.arrow-sliding').removeClass('active').css({"height": "0"});
    	newTable.find('input:checked').prop('checked', false);
        newTable.find('textarea').val('');
        newTable.find('.order__datagroups label:first-child input,.order__symbol label:first-child input').prop('checked', true);
        newTable.find('.order-period:not(:first-of-type)').remove();
        newTable.find('.order-period-add').fadeIn();
    	newTable.insertBefore('.order__table-add-row');

        newTable.find('.order__datagroups').trigger('change'); 

    	$('.order__table:last-of-type').append(
    		'<span class="order__table-remove"></span>'
    	)
    	if ($('.order__table').length == 5) {
    		$(this).fadeOut(500);
    	} 
    	for (var i = 0; i < $('.order__table:last-of-type input[type="file"]').length; i++) {
            var input = $('.order__table:last-of-type input[type="file"]');
    		$(input[i]).val('').next('.order-upload-mark').html('Select file');
            if($(input[i]).parents('.order__datasets').length) {
                $(input[i]).val('').next('.order-upload-mark').html('Select file (optional)');
            }
    	}
    	
    	setTableHeight($('.order__table:last-of-type'));

    	$('.order__table-remove').click(function() {
    		$(this).parent('.order__table').remove();
    		$(this).remove();
    		if ($('.order__table').length < 5) {
    			$('.order__table-add-row').fadeIn(500);
    		} 
    	})

        var target = document.getElementsByClassName('symbol-text');
        for (var i = 0; i < target.length; i++) {
             observer.observe(target[i], { attributes : true, attributeFilter : ['style'] });
        }
    })


    // PRODUCTS/order
    $(document).on('click', '.products-page__menu-list a', function() {
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
    		},500)
    	} else {
    		$(this).addClass('active');
    		$(this).parent().siblings().find('a').removeClass('active');

    		$('body, html').animate({
    			scrollTop: 0
    		}, 400)
    	}
    	if ($(window).width() < 768) {
    		$('.products-page__menu').removeClass('active');
    	}
    })
    onHashChange();
    

    // PRODUCTS
    $(window).on('hashchange', function() {
    	if (window.location.hash == '#featured') {
    		$('.products-page__featured').addClass('active').siblings().removeClass('active');
    	} else if (window.location.hash == '#qa') {
    		$('.products-page__qa').addClass('active').siblings().removeClass('active');
    	}
        onHashChange();

    });
    function onHashChange() {
        if (window.location.hash !== '') {
            $('a[href*="' + window.location.hash + '"]').trigger('click');
        } else {
            $('.products-page__menu-list li:first-child a').trigger('click');
        }
        if (window.location.hash == '#featured' || window.location.hash == '') {
            $('.products-page__featured').addClass('active').siblings().removeClass('active');
            $('.products-page__icons').addClass('hidden');
        } else if (window.location.hash == '#qa') {
            $('.products-page__qa').addClass('active').siblings().removeClass('active');
            $('.products-page__icons').addClass('hidden');
        }
    }

    $(".products-page__icons-mob").click(function(e) {
    	e.preventDefault();
    	$('.products-page__menu').addClass('active');
    })

    $('.products-page__qa .question').click(function() {
    	$(this).next().slideToggle(450);
		$(this).toggleClass('active');
    })

    $(window).trigger('scroll');
    
    
        
});

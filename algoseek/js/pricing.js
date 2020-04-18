$(function() {
    fetch('js/as-website-products.json').then(response => {
        return response.json();
    }).then(data => {
        var data = data;
        for (var i = 0; i < data.length; i++) {
            $('#data-group').append(
                '<option data-id="' + data[i].id + '" value="' + data[i].menu_name + '">' + 
                data[i].menu_name + '</option>'
            )
            if (window.location.hash == '#' + data[i].id) {
                $($('#data-group option')[i]).prop('selected', true);
                $('a[href="#pricing"]').trigger('click');
            }
        }

        $('#data-group').change(function() {
        	$('#full-uni').prop('checked', true);
        	if ($(window).width() < 768) {
        		updateDatasets();
        	}
        })

        $('#client-type').change(function() {
        	if($(this).val() == 'Individual') {
        		$('.sample__company').addClass('hidden');
        	} else {
        		$('.sample__company').removeClass('hidden');
        		if ($(this).val() == 'Buy side') {
        			$('#company-size').addClass('active');
        			$('#company-size option:first-child').prop('selected', true);
        		} else {
        			$('#company-size').removeClass('active');
        			$($('#company-size .non-buy-option')[0]).prop('selected', true);
        		}
        	}
        	updateTable();
        })

        $('#tickers-num').change(function() {
	        if ($(this).val() < 1 || !$(this).val()) {
	        	$(this).val(1);
	        	updateTable();
	        }
	    })
	    $('#to-year').on('input', function() {
    		$('#to-m').html('');
    		var d = new Date();

    		if ($('#to-year').find(':selected').val() == d.getFullYear() || !$('#to-year option').length) {
    			for (var i = 0; i <= d.getMonth(); i++) {
		    		$('#to-m').append(
						'<option value="' + $($('#from-m option')[i]).val() + '">' + $($('#from-m option')[i]).val() + '</option>'
		    		)
		    	}
    		} else {
    			for (var i = 0; i < $('#from-m option').length; i++) {
		    		$('#to-m').append(
						'<option value="' + $($('#from-m option')[i]).val() + '">' + $($('#from-m option')[i]).val() + '</option>'
		    		)
		    	}
    		}
    	})

        $('.sample input, .sample select').on('input', updateTable);


        function updateDatasets() {
        	$('#data-set').html('');
        	var index = $('#data-group').find(':selected').index();
        	for (var i = 0; i < data[index].datasets.length; i++) {
    			$('#data-set').append(
    		        '<option value="' + data[index].datasets[i].menu_name + '">' + 
    		        data[index].datasets[i].menu_name + '</option>'
    		    )
        	}


        }

        function updateTable() {
        	$('.sample__pricing').html('');
        	
	        var index = $('#data-group').find(':selected').index(),
		        num_years = 1,
		        buy_prod_upd_factor = data[index].pricing.buy_prod_upd_factor,
		        buy_research_upd_factor = data[index].pricing.buy_research_upd_factor,
		        buy_factor = $('#update-type').val() == 'Production Update' ? buy_prod_upd_factor : buy_research_upd_factor;
		        lease_hist_factor = data[index].pricing.lease_hist_factor,
		        lease_upd_factor = data[index].pricing.lease_upd_factor,
		        dataset_max_symbols = 0,
		        symbols = 0,
		        buy_annual_decrease_factor = data[index].pricing.buy_annual_decrease_factor,
		        client_factor = 1,
		        dataset_max_symbols = data[index].pricing.total_symbols;
			

			if (data[index].tickers[0] == 'All') {
				$('.tickers-regular').show().siblings().hide();

		        if ($('#full-uni').prop('checked')) {
		        	$('#tickers-num').prop('disabled', true);
		        	$('#tickers-num').val(dataset_max_symbols);
		        } else {
		        	$('#tickers-num').prop('disabled', false);
		        }

			    if ($('#tickers-num').val() > dataset_max_symbols) {
			    	$('#tickers-num').val(dataset_max_symbols);
			    	$('.tickers-err span').html(dataset_max_symbols);
			    	$('.tickers-err').slideDown(400);
			    } else {
			    	$('.tickers-err').slideUp(400);
			    }
			    symbols = $('#tickers-num').val();
			} else {
				$('.tickers-regular').hide().siblings().show();
				if(!$('.tickers-indexes option').length) for (var i = 0; i < data[index].tickers.length; i++) {
					$('.tickers-indexes select').append(
						'<option value="' + data[index].tickers[i] + '">' + 
						data[index].tickers[i] + '</option>'
					)
				}
				var tickerIndex = $('.tickers-indexes select').find(':selected').index();
				symbols = data[index].pricing.symbols_per_component[tickerIndex];
			}

	        

		    if ($('#company-size option:selected').attr('data-factor')) {
		    	client_factor = $('#company-size option:selected').attr('data-factor');
		    } else {
		    	client_factor = 1;
		    }
		    if($('#client-type').val() == 'Individual') {
		    	client_factor = 1;
		    }
		    
		    var earliest = data[index].datasets[0].start_date,
		    	earliestDate = new Date(earliest),
		    	d = new Date();
		    for (var i = 1; i < data[index].datasets.length; i++) {
		    	var start = data[index].datasets[i].start_date;
		    	if (new Date(start) < earliestDate) {
		    	    earliest = start;
		    	    earliestDate = new Date(earliest);
		    	}
		    }
		    var max_years = d.getFullYear() - earliestDate.getFullYear();
        	
        	if (max_years !== $('#from-year option').length) {
    			$('#from-year').html('');
    			for (var i = 1; i <= max_years; i++) {
    		    	$('#from-year').append(
    		    		'<option value="' + (d.getFullYear() - i) + '">' + (d.getFullYear() - i) + '</option>'
    		    	)
    		    }
        	}

        	if ($('#to-year option').length !== d.getFullYear() - $('#from-year option:selected').val()) {
        		$('#to-year').html('');
        		for (var i = 0; i <= $('#from-year').find(':selected').index(); i++) {
        			$('#to-year').append(
        				'<option value="' + (d.getFullYear() - i) + '">' + (d.getFullYear() - i) + '</option>'
        			)
        		}
        	}
    		
    		var from_m = $('#from-m').find(':selected').index();
    		var to_m = $('#to-m').find(':selected').index();
    		var month_dif = Math.round((to_m - from_m) / 12 * 100) / 100;
	    	num_years = $('#to-year').val() - $('#from-year').val() + month_dif;
	    	if (num_years < 1) {
    			$('.years-err').slideDown(400);
    			num_years = 1;
    		} else {
    			$('.years-err').slideUp(400);
	    	}


	        for (var i = 0; i < data[index].datasets.length; i++) {
			    var dataset_annual_price = data[index].datasets[i].price_per_year,
			        single_symbol_annual_price = data[index].datasets[i].price_per_symbol,
			        buy_hist_base_price = product_price(dataset_annual_price, buy_annual_decrease_factor, single_symbol_annual_price, dataset_max_symbols, symbols, 1) || 1,
			        buy_hist_price = product_price(dataset_annual_price, buy_annual_decrease_factor, single_symbol_annual_price, dataset_max_symbols, symbols, num_years) || 1,
		        	lease_hist_price = (buy_hist_base_price / 12 * lease_hist_factor) || 1,
		        	buy_upd_price = (buy_hist_base_price / 12 * buy_factor) || 1,
		        	lease_upd_price = (buy_upd_price * lease_upd_factor) || 1;

	            if ($(window).width() > 767) {
	            	$('.sample__pricing').append(
	            		'<li class="flex">' + 
	            			'<span>' + data[index].datasets[i].menu_name + '</span>' +
	            			'<p>' + round(buy_hist_price * client_factor).toLocaleString() + '</p>' +
	            			'<p>' + (data[index].datasets[i].end_date ? '–' : round(buy_upd_price * client_factor).toLocaleString()) + '</p>' +
	            			'<p>' + round(lease_hist_price * client_factor).toLocaleString() + '</p>' +
	            			'<p>' + (data[index].datasets[i].end_date ? '–' : round(lease_upd_price * client_factor).toLocaleString()) + '</p>' +
	            		'</li>'
	            	)
	            } else {
	            	if ($('#data-set').find(':selected').index() == i) {
		            	$('.sample__pricing').append(
	            			'<ul class="sample__mob">' +
	            				'<li>' +
	            					'<span></span>' +
	            					'<h4>Historical</h4>' +
	            					'<h4>Updates</h4>' +
	            				'</li>' +
	            				'<li>' +
	            					'<span>Buy</span>' +
	            					'<p>' + round(buy_hist_price * client_factor).toLocaleString() + '</p>' +
	            					'<p>' + (data[index].datasets[i].end_date ? '–' : round(buy_upd_price * client_factor).toLocaleString()) + '</p>' +
	            				'</li>' +
	            				'<li>' +
	            					'<span>Lease</span>' +
	            					'<p>' + round(lease_hist_price * client_factor).toLocaleString() + '</p>' +
	            					'<p>' + (data[index].datasets[i].end_date ? '–' : round(lease_upd_price * client_factor).toLocaleString()) + '</p>' +
	            				'</li>' +
	            			'</ul>'
		            	)
	            	}
	            	
	            }
	        }
        }
        $(document).on('click', '.sample__mob-title', function(e) {
        	$(e.target).toggleClass('active');
        	$(e.target).next().slideToggle(400);
        })
        function round(num) {
        	return Math.pow(10, Math.floor(Math.log10(num) / 2)) * Math.round(num / Math.pow(10, Math.floor(Math.log10(num) / 2)));
        }
        function product_price(base_price, decrease_factor, symbol_price, max_symbols, num_symbols, num_years) {
        	var whole_years = Math.floor(num_years),
        		frac_years = num_years - whole_years,
        		price_factor = (1 - Math.pow(1 - decrease_factor, whole_years)) / decrease_factor + frac_years * Math.pow(1 - decrease_factor, whole_years + 1),
        		avg_symbol_price = price_factor * base_price / max_symbols,
	        	a = (1/avg_symbol_price - 1/(num_years * symbol_price))/(max_symbols - 1),
	        	b = 1/(num_years * symbol_price) - a,
	        	y = 1 / (a*num_symbols + b);
        	return Math.round(y * num_symbols);
        }
        if ($(window).width() < 768) updateDatasets();
        $('#to-year').trigger('input');
        updateTable();
        
        
    });
	$('.sample-nav a').click(function (e) {
	    e.preventDefault();
	    var href = $(this).attr('href');
	    $('body,html').animate({
	        scrollTop: $(href).offset().top - 80
	    }, 500)
	})

});





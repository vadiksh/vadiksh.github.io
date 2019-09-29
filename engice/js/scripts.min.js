document.addEventListener("DOMContentLoaded", function() {

	var mobMenu = document.getElementById('mob-menu');
	document.getElementById('menu').addEventListener('click', function () {
		mobMenu.classList.add('active');
	})
	document.getElementById('mob-close').addEventListener('click', function () {
		mobMenu.classList.remove('active');
	})

	if(document.getElementsByClassName('services__menu').length) {
		var serviceMenu = document.getElementById('services-menu');
		document.getElementById('services-more').addEventListener('click', function () {
			serviceMenu.classList.add('active');
		})
		document.getElementById('services-close').addEventListener('click', function () {
			serviceMenu.classList.remove('active');
		})
		var serviceMenuItems = Array.from(document.querySelectorAll(".services__menu li"));
		for (let item of serviceMenuItems) {
			item.addEventListener('click', function () {
				serviceMenu.classList.remove('active');	
			})
		}
	}
	
	
	// var inputs = Array.from(document.querySelectorAll('.contact__form-inputs input, textarea'));

	// for (let input of inputs) {
	// 	input.addEventListener('focus', function() {
	// 		for (let input of inputs) {
	// 			input.classList.add('active');
	// 		}
	// 	})
	// }
	// for (let input of inputs) {
	// 	input.addEventListener('focusout', function() {
	// 		for (let input of inputs) {
	// 			input.classList.remove('active');
	// 		}
	// 	})
	// }

	if (document.getElementsByClassName('rellax').length) {
		var rellax = new Rellax('.rellax', {
			center: true
		});
	}

	var contactButtons = document.getElementsByClassName("contact-button"),
		contactBar = document.getElementById("contact-sidebar"),
		languageButtons = document.getElementsByClassName("language-button"),
		languageBar = document.getElementById("language-sidebar"),
		closeLanguage = document.querySelector(".languages .close"),
		contactSubmit = document.getElementsByClassName("submit-btn"),
		contactForms = document.getElementsByClassName("contact__form"),
		footerForm = document.querySelector('.footer__right-newsletter'),
		footerSubmit = document.querySelector('.newsletter-btn');
	for (let button of contactButtons) {
		button.addEventListener('click', function() {
			contactBar.classList.toggle('active'); 
		})
	}
	for (let button of languageButtons) {
		button.addEventListener('click', function() {
			languageBar.classList.add('active'); 
		})
	}
	closeLanguage.addEventListener('click', function() {
		languageBar.classList.remove('active'); 
	})

	for (let button of contactSubmit) {
		button.addEventListener('click', function(e) {
			console.log(e)
			e.preventDefault();
			for (let form of contactForms) {
				form.classList.add('submitted');
				setTimeout(function() {
					form.classList.add('sent');
				},1000)
			}
		})
	}
	footerSubmit.addEventListener('click', function(e) {
		e.preventDefault();
		footerForm.classList.add('submitted');
		setTimeout(function() {
			footerForm.classList.add('sent');
		},1000)
	});

	var menuItemsNodes = document.querySelectorAll(".services__menu li"),
	 	menuItems = Array.from(menuItemsNodes),
	 	bannerItemsNodes = document.querySelectorAll(".services__banner li"),
	 	bannerItems = Array.from(bannerItemsNodes),
	 	textBlocksNodes = document.querySelectorAll(".services__text-blocks li"),
	 	textBlocks = Array.from(textBlocksNodes),
	 	expertisesNodes = document.querySelectorAll(".services__expertises > li"),
	 	expertises = Array.from(expertisesNodes),
		menuIndex = 0;

	for (let menuItem of menuItems) {
		menuItem.addEventListener('mouseenter', function(){
			index = menuItems.indexOf(this);

			for(let menuItem of menuItems) {
				menuItem.classList.remove('active');
			}
			menuItems[index].classList.add('active');

			for(let bannerSlide of bannerItems) {
				bannerSlide.classList.remove('active');
			}
			bannerItems[index].classList.add('active');

			for(let textBlock of textBlocks) {
				textBlock.classList.remove('active');
			}
			textBlocks[index].classList.add('active');

			for(let expertise of expertises) {
				expertise.classList.remove('active');
			}
			expertises[index].classList.add('active');
		})
	}

	 function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 46.519276, lng: 6.638339},
          zoom: 12,
          styles: [
			{
			    "featureType": "administrative",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "administrative",
			    "elementType": "labels",
			    "stylers": [
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "administrative",
			    "elementType": "labels.text",
			    "stylers": [
			        {
			            "color": "#0b00ea"
			        },
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "administrative",
			    "elementType": "labels.text.fill",
			    "stylers": [
			        {
			            "color": "#0b00ea"
			        }
			    ]
			},
			{
			    "featureType": "administrative",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			        {
			            "color": "#ffffff"
			        },
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "administrative.country",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "administrative.province",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "administrative.neighborhood",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "administrative.land_parcel",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "administrative.land_parcel",
			    "elementType": "labels.text",
			    "stylers": [
			        {
			            "color": "#ff0000"
			        },
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "landscape",
			    "elementType": "all",
			    "stylers": [
			        {
			            "color": "#f2f2f2"
			        }
			    ]
			},
			{
			    "featureType": "landscape",
			    "elementType": "geometry",
			    "stylers": [
			        {
			            "color": "#ffffff"
			        }
			    ]
			},
			{
			    "featureType": "landscape.natural",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "landscape.natural.terrain",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "poi",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "road",
			    "elementType": "all",
			    "stylers": [
			        {
			            "saturation": -100
			        },
			        {
			            "lightness": 45
			        },
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "road",
			    "elementType": "geometry",
			    "stylers": [
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "road",
			    "elementType": "labels",
			    "stylers": [
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "road.highway",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "on"
			        },
			        {
			            "color": "#0b00ea"
			        }
			    ]
			},
			{
			    "featureType": "road.highway",
			    "elementType": "geometry",
			    "stylers": [
			        {
			            "weight": "0.70"
			        }
			    ]
			},
			{
			    "featureType": "road.highway",
			    "elementType": "geometry.fill",
			    "stylers": [
			        {
			            "weight": "0.10"
			        }
			    ]
			},
			{
			    "featureType": "road.highway",
			    "elementType": "geometry.stroke",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "road.highway",
			    "elementType": "labels",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "road.highway",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "road.highway.controlled_access",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "on"
			        },
			        {
			            "color": "#0b00ea"
			        }
			    ]
			},
			{
			    "featureType": "road.highway.controlled_access",
			    "elementType": "labels",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "road.arterial",
			    "elementType": "all",
			    "stylers": [
			        {
			            "color": "#0b00ea"
			        }
			    ]
			},
			{
			    "featureType": "road.arterial",
			    "elementType": "geometry",
			    "stylers": [
			        {
			            "weight": "0.50"
			        }
			    ]
			},
			{
			    "featureType": "road.arterial",
			    "elementType": "labels",
			    "stylers": [
			        {
			            "visibility": "on"
			        },
			        {
			            "color": "#0b00ea"
			        }
			    ]
			},
			{
			    "featureType": "road.arterial",
			    "elementType": "labels.text",
			    "stylers": [
			        {
			            "weight": "0.41"
			        },
			        {
			            "visibility": "on"
			        },
			        {
			            "color": "#ff0000"
			        }
			    ]
			},
			{
			    "featureType": "road.arterial",
			    "elementType": "labels.text.fill",
			    "stylers": [
			        {
			            "color": "#0b00ea"
			        }
			    ]
			},
			{
			    "featureType": "road.arterial",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			        {
			            "color": "#ffffff"
			        },
			        {
			            "weight": "10.00"
			        },
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "road.arterial",
			    "elementType": "labels.icon",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "road.local",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "road.local",
			    "elementType": "geometry",
			    "stylers": [
			        {
			            "color": "#0b00ea"
			        },
			        {
			            "visibility": "on"
			        },
			        {
			            "weight": ".2"
			        }
			    ]
			},
			{
			    "featureType": "road.local",
			    "elementType": "labels.text",
			    "stylers": [
			        {
			            "color": "#0b00ea"
			        },
			        {
			            "weight": "0.20"
			        },
			        {
			            "visibility": "on"
			        }
			    ]
			},
			{
			    "featureType": "road.local",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			        {
			            "color": "#ffffff"
			        },
			        {
			            "weight": "5"
			        }
			    ]
			},
			{
			    "featureType": "transit",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "transit.line",
			    "elementType": "all",
			    "stylers": [
			        {
			            "visibility": "off"
			        }
			    ]
			},
			{
			    "featureType": "water",
			    "elementType": "all",
			    "stylers": [
			        {
			            "color": "#0b00ea"
			        },
			        {
			            "visibility": "on"
			        }
			    ]
			}
			]

        });

		// var marker = new google.maps.Marker({
		//   position: {lat: 46.519276, lng: 6.638339},
		//   icon: 'https://i.imgur.com/PyeQvAW.png',
		//   map: map
		// });
        var marker = new google.maps.Marker({
          position: {lat: 46.519276, lng: 6.638339},
          icon: {
          	url: 'https://i.imgur.com/PyeQvAW.png',
			scaledSize: new google.maps.Size(85,100)
          },
          map: map
        });

		var locations = [
			{lat: 46.519276, lng: 6.638339},
			{lat: 49.405209, lng: 31.926336},
			{lat: 31.926336, lng: 49.434992}
		];
		var pins = Array.from(document.querySelectorAll('.map__list .link'));
		for (pin of pins) {
			google.maps.event.addDomListener(pin, 'click', function() {
			  var index = this.dataset.index;
			  map.setCenter(locations[index]);

	          var marker = new google.maps.Marker({
	            position: locations[index],
	            icon: {
	            	url: 'https://i.imgur.com/PyeQvAW.png',
	  				scaledSize: new google.maps.Size(85,100)
	            },
	            map: map
	          });
	        });


	       

		}
		

      };
      if (document.getElementsByClassName('map').length) {
		initMap();
	  }
      
	
});
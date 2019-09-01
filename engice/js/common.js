document.addEventListener("DOMContentLoaded", function() {

	var contactButtons = document.getElementsByClassName("contact-button"),
		contactBar = document.getElementById("contact-sidebar"),
		languageButtons = document.getElementsByClassName("language-button"),
		languageBar = document.getElementById("language-sidebar"),
		closeLanguage = document.querySelector(".languages .close"),
		contactSubmit = document.getElementsByClassName("submit-btn"),
		contactForms = document.getElementsByClassName("contact__form");
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
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8,
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
      }
	
});
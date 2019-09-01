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
	
});
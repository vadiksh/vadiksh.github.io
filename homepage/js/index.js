var error = $('.access__error');

$('.access__form').submit(function (event) {
  var name = $('.access__name').val();
  var email = $('.access__email').val();
  var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  

  if (name.length < 3) {
  	displayError('enter your name');
  } else if (email.length === 0) {
  	displayError('enter your email');
  } else if (!emailRegEx.test(email)) {
  	displayError('make sure you enter a valid email');
  } else {
  	alert('VALIDATED!');
  }
});

function displayError(errortext) {
  event.preventDefault();
  	error.slideUp(250, function() {
  	  error.html('Please' + ' ' + errortext + '.').slideDown(500);
  	});
}
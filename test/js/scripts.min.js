$(function() {
	var value;
	$('.form__options li').click(function() {
		value = $(this).attr('data-option');
		$('form select').find('option[value="' + value + '"]').attr('selected', '').siblings().removeAttr('selected');
		$('.custom-select .value').addClass('changed');
		setTimeout(function() {
			$('.custom-select .value').html(value).removeClass('changed')
		},400)
	})

});

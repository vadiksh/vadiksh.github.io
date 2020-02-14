$(function() {
    grecaptcha.ready(function() {
        $(".contact__form").submit(function(e) {
            e.preventDefault();
            grecaptcha.execute("6Ld-TNMUAAAAAOXOkYdmjDQNLuBYtiLS6nS6rEVS", {action:"validate_captcha"})
                  .then(function(token) {
                $("#recaptcha").val(token);
                var data = $(".contact__form").serialize();
                $.ajax({
                    type: "POST",
                    url: "/backend/contacts",
                    data: data,
                    // dataType: "json",
                    success: function(data) {
                        msg = 'Thank you for contacting agloseek and a Team member will respond within 24 hours.\n' +
                            '\n\n' +
                            'Thanks,\n' +
                            'Algoseek Team';
                        alert(msg);
                        $(".contact__form").trigger("reset");
                    },
                    error: function(data) {
                        alert(data.statusText);
                    }
                });
            });
        });
    });
});

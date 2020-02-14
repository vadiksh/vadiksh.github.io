$(function() {
    grecaptcha.ready(function() {
        $("#order-form").submit(function(e) {
            e.preventDefault();
            grecaptcha.execute("6Ld-TNMUAAAAAOXOkYdmjDQNLuBYtiLS6nS6rEVS", {action:"validate_captcha"})
                  .then(function(token) {
                $("#recaptcha").val(token);
                var data = $("#order-form").serialize();
                var formData = new FormData($("#order-form")[0]);
                $.ajax({
                    type: "POST",
                    url: "/backend/order",
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData:false,
                    // data: data,
                    // dataType: "json",
                    success: function(data) {
                        msg = 'Thank you for contacting agloseek and a Team member will respond within 24 hours.\n' +
                            '\n\n' +
                            'Thanks,\n' +
                            'Algoseek Team';
                        alert(msg);
                        $("#order-form").trigger("reset");
                    },
                    error: function(data) {
                        alert(data.statusText);
                    }
                });
            });
        });
    });
});

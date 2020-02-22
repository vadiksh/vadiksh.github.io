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
                        $('.submitted').addClass('active');
                        $(".contact__form").trigger("reset");
                        $(document).on('click', function(){
                            $('.submitted').removeClass('active');
                        })
                    },
                    error: function(data) {
                        alert(data.statusText);
                    }
                });
            });
        });
    });
});

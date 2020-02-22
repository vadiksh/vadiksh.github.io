$(function() {
    grecaptcha.ready(function() {
        $(".support__form").submit(function(e) {
            e.preventDefault();
            grecaptcha.execute("6Ld-TNMUAAAAAOXOkYdmjDQNLuBYtiLS6nS6rEVS", {action:"validate_captcha"})
                  .then(function(token) {
                $("#recaptcha").val(token);
                var dataset = "";
                $("#custom-select-datasets > li[class='active']").each(function() {
                    dataset = dataset + " | " + $(this).text();
                });
                // var data = $(".support__form").serializeArray();
                var formData = new FormData($(".support__form")[0]);
                formData.append('datasets', dataset);
                $.ajax({
                    type: "POST",
                    url: "/backend/support",
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData:false,
                    // dataType: "json",
                    success: function(data) {
                        $('.submitted').addClass('active');
                        $(".contact__form").trigger("reset");
                        $(document).click(function(){
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

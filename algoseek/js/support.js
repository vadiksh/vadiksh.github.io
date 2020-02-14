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
                        msg = 'Thank you for contacting agloseek and a Team member will respond within 24 hours.\n' +
                            '\n\n' +
                            'Thanks,\n' +
                            'Algoseek Team';
                        alert(msg);
                        $(".support__form").trigger("reset");
                    },
                    error: function(data) {
                        alert(data.statusText);
                    }
                });
            });
        });
    });
});

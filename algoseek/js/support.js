$(function() {
    fetch('js/as-website-products.json').then(response => {
        return response.json();
    }).then(data => {
        var data = data;
        for (var i = 0; i < data.length; i++) {
            $('#data-group').append(
                '<option value="' + data[i].menu_name + '">' + 
                data[i].menu_name + '</option>'
            )
        }

        $('#data-group').change(function() {
            var index = $(this).find(':selected').index() - 2;
            if (index >= 0) {
                $('.select').addClass('active');
                $('.select-list, .select-checkboxes').html('');
                for (var i = 0; i < data[index].datasets.length; i++) {
                    $('.select-list').append(
                        '<li>' + data[index].datasets[i].menu_name + '</li>'
                    )
                    $('.select-checkboxes').append(
                        '<input type="checkbox" name="selected-dataset" value="' + data[index].datasets[i].menu_name + '">'
                    )
                }
                
            } else {
                $('.select').removeClass('active');
            }
        })
        $(document).on('click', function(e) {
            if (!$(e.target).is('.select, .select *')) {
                $('.select-list').removeClass('active');
            }
        })
        $('.select').click(function(e) {
            e.preventDefault();
            if (!$('.select-list').hasClass('active')) {
                console.log('gg')
                $('.select-list').addClass('active');
            } else if (!$(e.target).is('.select-list li')) {
                console.log('bb')

                $('.select-list').removeClass('active');
            }
        });
        $(document).on('click', '.select-list li', function() {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $('.select-checkboxes input').eq($(this).index()).prop('checked', true);
            } else {
                $(this).removeClass('active');
                $('.select-checkboxes input').eq($(this).index()).prop('checked', false);
            }
        })
        
    });

    
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

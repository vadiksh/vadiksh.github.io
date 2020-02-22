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
                    url: "/backend/partners",
                    data: data,
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
    $('.owl-carousel').owlCarousel({
        items: 5,
        margin: 30,
       nav: false,
       responsiveClass:true,
       responsive:{
         0:{
           items:3,
           loop: true
         },
         600:{
            loop:true,
           items:4,
         },
         1000: {
            items: 5,
            loop:false
         }
       }
     });
});

$(document).ready(function() {

    $("#form").submit(function() {
        $.ajax({
            type: "POST",
            url: "../mail.php",
            data: $(this).serialize()
        }).done(function() {
            alert("доне");
        });
        return false;
    });

    var video = $('#myVideo');
    var pauseBtn = $('.promo__right');

    pauseBtn.mouseenter(function() {
        video[0].pause();
        $('.video-container').addClass("stopfade");
    });
    pauseBtn.mouseleave(function() {
        video[0].play();
        $('.video-container').removeClass('stopfade');
    });
    
});


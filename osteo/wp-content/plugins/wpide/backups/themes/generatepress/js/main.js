jQuery(document).ready(function($) {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    // services bottom border animation
    $(".parent-div").hover(function() {
        $(this).children('.service-bottom-border').animate({width: ($(this).width() - 10)}, 500);
    }, function() {
        $(this).children('.service-bottom-border').animate({width: ($(this).width()*0.3)}, 500);
    });
    // services bottom border animation

    // scroll Top button functionality
    $(window).scroll(function() {
        if ($(window).scrollTop() > 450) {
            $('.scroll-up-holder').fadeIn('300', function() {
            });
        } else {
            $('.scroll-up-holder').fadeOut('300', function() {
            });
        }
    });
    $('.scroll-up-holder').click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
    });
    // scroll Top button functionality
    // Accordion
    var acc_open_close_btn = $('.accordion-open-close-button-holder');
    var acc_each_item = $('.accordion-body-holder')
    acc_open_close_btn.each(function() {
        $(this).css("height", $(this).parent('.each-accordion-row').children('.accordion-body-holder').css("height"));
    });
    acc_each_item.click(function(event) {
        /* Act on the event */
        if ($(this).parent('.each-accordion-row').children('.accordion-body-holder').children('.accordion-item-desicription').css("display") == "none") {
            acc_each_item.children('.accordion-item-desicription').css("display", "none");
            $('.open-close-icon').attr('src', 'assets/images/icons/plus_icon.svg');;
            $(this).parent('.each-accordion-row').children('.accordion-open-close-button-holder').children('.helper').children('.open-close-icon').attr('src', 'assets/images/icons/minus-icon.png');;
                $(this).parent('.each-accordion-row').children('.accordion-body-holder').children('.accordion-item-desicription').fadeIn('400', function() {

                });
            $(this).parent('.each-accordion-row').children('.accordion-body-holder').animate({
                height: '100%'
                },
                400, function() {
                /* stuff to do after animation is complete */
            });
        } else{
            $(this).parent('.each-accordion-row').children('.accordion-body-holder').children('.accordion-item-desicription').css("display", "none");
            $(this).parent('.each-accordion-row').children('.accordion-open-close-button-holder').children('.helper').children('.open-close-icon').attr('src', 'assets/images/icons/plus_icon.svg');;

        }
    });

    acc_open_close_btn.click(function(event) {
        if ($(this).parent('.each-accordion-row').children('.accordion-body-holder').children('.accordion-item-desicription').css("display") == "none") {
            acc_each_item.children('.accordion-item-desicription').css("display", "none");
            $('.open-close-icon').attr('src', 'assets/images/icons/plus_icon.svg');;
            $(this).parent('.each-accordion-row').children('.accordion-open-close-button-holder').children('.helper').children('.open-close-icon').attr('src', 'assets/images/icons/minus-icon.png');;
                $(this).parent('.each-accordion-row').children('.accordion-body-holder').children('.accordion-item-desicription').fadeIn('400', function() {

                });
            $(this).parent('.each-accordion-row').children('.accordion-body-holder').animate({
                height: '100%'
                },
                400, function() {
                /* stuff to do after animation is complete */
            });
        } else{
            $(this).parent('.each-accordion-row').children('.accordion-body-holder').children('.accordion-item-desicription').css("display", "none");
            $(this).parent('.each-accordion-row').children('.accordion-open-close-button-holder').children('.helper').children('.open-close-icon').attr('src', 'assets/images/icons/plus_icon.svg');;

        }
    });
    // Accordion

    // Left part menu
    var lMCB = $(".left-part-menu-collaps-button")
    lMCB.click(function() {
        if ($('.left-part-menu').css('margin-left') == '0px') {
            $('.left-part-menu').animate({
                marginLeft: '-=300px'
                },
                500, function() {
                /* stuff to do after animation is complete */
            });
        } else{
            $('.left-part-menu').animate({
                marginLeft: '0px'
                },
                500, function() {
                /* stuff to do after animation is complete */
            });

        }
    });

    // Left part menu

    $('.about-action-button-production-video').click(function(event) {
        window.location = 'production-video';
    });
    $('.about-action-button-transfert-video').click(function(event) {
        window.location = 'transfert-video';
    });
    $('.about-action-button-confidental').click(function(event) {
        window.location = 'confidental';
    });
    $('.video-production-service').click(function(event) {
        window.location = 'production-video';
    });
    $('.post-production-service').click(function(event) {
        window.location = 'production-video#post-production';
    });
    $('.transfert-service').click(function(event) {
        window.location = 'transfert-video';
    });
    $('.autres-partner').click(function(event) {
        window.location = 'projects';
    });
    $('.trasnfert-leftTab').click(function(event) {
        window.location = 'production-video#post-production';
    });
    $('.transfert-rightTab').click(function(event) {
        window.location = 'confidental';
    });

    $('.production-leftTab').click(function(event) {
        window.location = 'transfert-video';
    });
    $('.production-rightTab').click(function(event) {
        // console.log($(location).attr('href'))
        if ($(location).attr('href') === 'http://danickvideo.ezyro.com/production-video#post-production') {
            window.location = 'transfert-video';
        } else{

        }
        window.location = 'production-video#post-production';
    });

    $('.confidental-leftTab').click(function(event) {
        window.location = 'transfert-video';
    });
    $('.confidental-rightTab').click(function(event) {
        window.location = 'production-video';
    });

    $('.home-page-services-link').click(function(event) {
        $('.dropdownMenuParent').delay(510).animate({'margin-bottom': '170px'}, 500);
        // console.log("need to push down");
        $('.dropDownMenu').delay(500).fadeIn('500', function() {

        });
    });







    // var collapseClicks = 0;
    // $('.panel-heading').click(function(event) {
    //     collapseClicks++;
    //     $('.accordionCollapseIcon').attr('src');
    //     // console.log($('.accordionCollapseIcon').attr('src'));
    //     var src = $(this).parents('.collapseClickHolder').children('.accordionCollapseIcon').attr('src')
    //     // console.log("src", src);
    // });
    $('.subaru-partner').click(function(event) {
        /* Act on the event */
        var subaruPartner = $('.current-video').attr('src');
        // console.log("video", video);
    });

    function changeVideo(object, url){
        $(object).click(function(event) {
            var videoId = $('.current-video').attr('src', url);
            /* Act on the event */
        });
        $('.videoCloseButton').click(function(event) {
            var videoId = $('.current-video').attr('src', "");
        });
    }
    // home page videos
    changeVideo('.subaru-partner', 'https://www.youtube.com/embed/8vjhkGr5UUo');
    changeVideo('.auvents-partner', 'https://www.youtube.com/embed/LpePy0lNMp0');
    changeVideo('.cidrerie-partner', 'https://www.youtube.com/embed/f8kKktWEINM');
    // changeVideo('.autres-partner', ' ');
    // home page videos


    // projects videos
    changeVideo('.projects-1-btn', 'https://www.youtube.com/embed/S-cVJbbaBts');
    changeVideo('.projects-2-btn', 'https://www.youtube.com/embed/LpePy0lNMp0');
    changeVideo('.projects-3-btn', 'https://www.youtube.com/embed/V2wk5YabsZU');
    changeVideo('.projects-4-btn', 'https://www.youtube.com/embed/jfYjEjNAcxE');
    changeVideo('.projects-5-btn', 'https://www.youtube.com/embed/8vjhkGr5UUo');
    changeVideo('.projects-6-btn', 'https://www.youtube.com/embed/Gv8-7S4pUIs');
    changeVideo('.projects-7-btn', 'https://www.youtube.com/embed/f8kKktWEINM');
    changeVideo('.projects-8-btn', 'https://www.youtube.com/embed/cK1LVB1O4sI');
    changeVideo('.projects-9-btn', 'https://www.youtube.com/embed/p9fiyJb4_Io');
    changeVideo('.projects-10-btn', 'https://www.youtube.com/embed/VDnrdkXF3cg');
    changeVideo('.projects-11-btn', 'https://www.youtube.com/embed/A6vFHdpSPVg');
    // changeVideo('.projects-12-btn', 'https://www.youtube.com/embed/f8kKktWEINM');
    // changeVideo('.projects-13-btn', 'https://www.youtube.com/embed/f8kKktWEINM');
    // projects videos

    // dropdown menu
    $('.dropDownMenuHolder').click(function(event) {
        if ($('.dropDownMenu').css('display') === "none") {
            $('.dropdownMenuParent').animate({'margin-bottom': '170px'}, 500);
            // $('.dropDownMenu').css('display', 'block');
            $('.dropDownMenu').fadeIn('500', function() {

            });;
        } else{
            $('.dropdownMenuParent').animate({'margin-bottom': '5px'}, 500);
            $('.dropDownMenu').fadeOut('500', function() {

            });;
        }
    });
    $('.showMoreGalleryItems').click(function(event) {
        $('.hidden-gallery-items').css('display', 'block');
        /* Act on the event */
    });
    // dropdown menu

    // FAQ page

    $('.myAccordCollapse').click(function() {
        $('.accordionCollapseIcon').attr('src', 'assets/images/icons/plus_icon.svg');
        $(this).find('.accordionCollapseIcon').attr('src', 'assets/images/icons/minus-icon.png')
    });
    // FAQ page




});


   jQuery(document).ready(function($) {
        $(".modalOpener").animatedModal({
            animatedIn: 'slideInDown',
            animatedOut: 'slideOutDown',
            animationDuration: '0.5s',
            color: 'rgba(0, 0, 0, 0.85)',
        });
    });


   jQuery(document).ready(function($) {
        $(".each-partner-holder-link").animatedModal({
            modalTarget: 'videoModal',
            animatedIn: 'fadeIn',
            animatedOut: 'fadeOut',
            animationDuration: '0.5s',
            color: 'rgba(0, 0, 0, 0.85)',
        });
    });

     jQuery(document).ready(function($) {
        $("#menuBtn").animatedModal({
            animatedIn: 'slideInDown',
            animatedOut: 'slideOutDown',
            animationDuration: '0.5s',
            color: 'rgba(0, 0, 0, 0.85)'
        });
    });

     jQuery(document).ready(function() {

    function formResponse(status, response) {
        jQuery('.form-response').hide().html(response).fadeIn('slow');
    }

    jQuery('#katun-contact-form').click(function(e) {
        console.log("test");
        e.preventDefault();
        var userName = jQuery('#name').val();
        var userSecondName = jQuery('#secondname').val();
        var userEmail = jQuery('#email').val();
        var userPhone = jQuery('#phone').val();
        var userMsg = jQuery('#message').val();
        if (!userName || !userEmail) {
            formResponse("", "Validation errors occurred. Please confirm the fields and submit it again.");
            return;
        }
        // var pattern = new RegExp(/^((([a-z]|\d|[!#\jQuery%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\jQuery%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?jQuery/i);
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        if (!pattern.test(userEmail)) {
            formResponse("", "Email address seems invalid. Please confirm the fields and submit it again.");
            return;
        }
        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: ({
                action: 'send_email_action',
                usersecondname: userSecondName,
                userphone: userPhone,
                username: userName,
                useremail: userEmail,
                usermsg: userMsg
            }),
            success: function(html) {
                if (html == "0") {
                    formResponse("", "Sorry, can't send your mail. Try later.");
                    return;
                } else {
                    formResponse("success", "Your message was sent successfully. Thanks.");
                    return;
                }
            }
        });
    });
});
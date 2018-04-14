(function($) {

    $.fn.menumaker = function(options) {

        var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function() {
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function(){
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.stop().slideUp().removeClass('open');
                }
                else {
                    mainmenu.stop().slideDown().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').stop().slideDown();
                    }
                }
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function() {
                cssmenu.find(".has-sub").children('a').append('<span class="submenu-button"></span>');
                cssmenu.find(".has-sub").on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).children('ul').hasClass('open')) {
                        $(this).children('ul').removeClass('open').stop().slideUp();
                    }
                    else {
                        $(this).children('ul').addClass('open').stop().slideDown();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            resizeFix = function() {
                /*if ($( window ).width() > 768) {
                 cssmenu.find('ul').slideDown();
                 }

                 if ($(window).width() <= 768) {
                 cssmenu.find('ul').stop().slideUp().removeClass('open');
                 }*/
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

(function($){
    $(document).ready(function(){
        $("#mobile_menu").menumaker({
            title: 'Menu',
            format: "multitoggle"
        });

    });
})(jQuery);
$(document).ready(function() {
    // This command is used to initialize some elements and make them work properly
    //$.material.init();

    $(window).on("scroll", function() {

        var height = $(window).scrollTop();

        if(height  > 50) {
            $(".header-container").css("height", "0px");
            $("#navbar-main").addClass("navbar-fixed-top");
        } else if(height < 100) {
            $("#navbar-main").removeClass("navbar-fixed-top");
            $(".header-container").css("height", "100px");
        }
    });

    document.body[window.addEventListener ? 'addEventListener' : 'attachEvent'](
        window.addEventListener ? "load" : "onload", remoAttr, false);

    document.body[window.addEventListener ? 'addEventListener' : 'attachEvent'](
        window.addEventListener ? "load" : "onload", getAttr, false)

    document.body[window.addEventListener ? 'addEventListener' : 'attachEvent'](
        window.addEventListener ? "load" : "onload", getAttrBack, false)

    document.body[window.addEventListener ? 'addEventListener' : 'attachEvent'](
        window.addEventListener ? "resize" : "onresize", remoAttr, false);

    document.body[window.addEventListener ? 'addEventListener' : 'attachEvent'](
        window.addEventListener ? "resize" : "onresize", getAttr, false)

    document.body[window.addEventListener ? 'addEventListener' : 'attachEvent'](
        window.addEventListener ? "resize" : "onresize", getAttrBack, false)
});

function validateRegEx (regex, input, helpText, helpMessage) {
    if (!regex.test(input)) {
        if (helpText != null)
            helpText.innerHTML = helpMessage;
        return false;
    } else {
        if (helpText != null)
            helpText.innerHTML = "";
        return true;
    }
}

function validateNonEmpty (inputField, helpText) {
    if (inputField.value.length == 0) {
        if (helpText != null)
            helpText.innerHTML = /*"Please enter a value."*/"Будь ласка, введіть значення.";
        return false;
    } else {
        if (helpText != null)
            helpText.innerHTML = "";
        return true;
    }
}

function validateLength(minLength, maxLength, inputField, helpText) {
    if (inputField.value.length < minLength || inputField.value.length > maxLength) {
        if (helpText != null)
            helpText.innerHTML = /*"Please enter a value " + minLength + " to " + maxLength + " charakters in length."*/"Будь ласка, введіть текст від " + minLength + " до " + maxLength + " символів.";
        return false;
    } else {
        if (helpText != null)
            helpText.innerHTML = "";
        return true;
    }
}

function validateEmail(inputField, helpText) {
    if (!validateNonEmpty(inputField, helpText))
        return false;
    return validateRegEx(/^[\w\.-_\+]+@[\w-]+(\.\w{2,3})+$/, inputField.value, helpText, /*"Please enter an email adress."*/"Будь ласка введіть правильно адрес пошти.");
}

function placeOrder(form) {
    if (validateLength(1, 32, form["message"], form["message_help"]) &&
        validateNonEmpty(form["name"], form["name_help"]) &&
        validateNonEmpty(form["theme"], form["theme_help"]) &&
        validateNonEmpty(form["email"], form["email_help"])) {
        form.submit();
    } else {
        alert(/*"I'm sorry but there is something wrong with the order information."*/"Перепрошуємо, але деякі дані форми введено неправильно.");
    }
}

function remoAttr() {
    if (document.body.clientWidth < 480) {
        var tag = document.getElementById('message-input');
        tag.removeAttribute('rows');
    }
}


function getAttr() {
    if (document.body.clientWidth < 480) {
        var tag = document.getElementById('id-col');
        tag.removeAttribute('class');
        var att = document.createAttribute('class');
        att.value = 'col-xs-10 col-xs-offset-1';
        tag.setAttributeNode(att);
    }
}

function getAttrBack() {
    if (document.body.clientWidth > 480) {
        var tag = document.getElementById('id-col');
        tag.removeAttribute('class');
        var att = document.createAttribute('class');
        att.value = 'col-sm-5 col-sm-offset-6  col-xs-8 col-xs-offset-2';
        tag.setAttributeNode(att);

        var tag2 = document.getElementById('message-input');
        var att2 = document.createAttribute('rows');
        att2.value = '6';
        tag2.setAttributeNode(att2);
    }
}


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


    $('#myNavbar, .footer-left').on('click', 'a', function(event) {

      event.preventDefault();

      var headHeight = $(".header-container").css('height'),
          elemId = $(this).attr('href'),
          elemTop = $(elemId).offset().top;

      if(headHeight == 0 + 'px'){
          $('body,html').animate({scrollTop: elemTop-45}, 1500);
      } else {
            $('body,html').animate({scrollTop: elemTop-95}, 1500);
        }
      
    });


  /*  $('.container-photo').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        touchMove: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    $('.container-video').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        touchMove: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });*/

   // $.material.init();

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









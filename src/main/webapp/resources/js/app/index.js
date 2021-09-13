$(document).ready(function () {

    $("#owl-demo").owlCarousel({

        navigation: false, // Show next and prev buttons
        slideSpeed: 500,
        autoPlay: 3000,
        paginationSpeed: 400,
        singleItem: true

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

});

/*$('.timer').each(count);*/
jQuery(function ($) {
    // custom formatting example
    $('.timer').data('countToOptions', {
        formatter: function (value, options) {
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });

    // start all the timers
    $('#testimonials').waypoint(function () {
        $('.timer').each(count);
    });

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }
});

$(document).ready(function () {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a:not(.smooth-scroll-off), footer a[href='#myPage']").on('click', function (event) {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
})

$(document).ready(function () {
    const contactSubmitBtn = $('.contact-button');
    const nameInput = $('.contact-name');
    const emailInput = $('.contact-email');
    const textInput = $('.contact-textarea');

    function validateContactMessage() {
        const USERNAME_REGEX = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,13}[a-zA-Z0-9]$/;
        const EMAIL_REGEX = /^(?=.{5,60}$)([a-z0-9-_]*\.)*[a-z0-9-_]*@[a-z0-9]*\.[a-z]{2,3}$/;
        const TEXT_REGEX = /^[a-zA-Z0-9!?/@#$%&*+\-=()_:;,. \[\]]{10,255}$/;

        const nameErrorLabel = $('.error-name');
        const emailErrorLabel = $('.error-email');
        const textErrorLabel = $('.error-text');

        if (nameInput.prop('readonly') === false && USERNAME_REGEX.test(nameInput.val()) && EMAIL_REGEX.test(emailInput.val()) && TEXT_REGEX.test(textInput.val())) {
            contactSubmitBtn.removeClass('hidden');
        } else {
            contactSubmitBtn.addClass('hidden');
        }
        if (USERNAME_REGEX.test(nameInput.val())) {
            nameErrorLabel.addClass('hidden');
        } else {
            nameErrorLabel.removeClass('hidden');
        }
        if (EMAIL_REGEX.test(emailInput.val())) {
            emailErrorLabel.addClass('hidden');
        } else {
            emailErrorLabel.removeClass('hidden');
        }
        if (TEXT_REGEX.test(textInput.val())) {
            textErrorLabel.addClass('hidden');
        } else {
            textErrorLabel.removeClass('hidden');
        }
        if (nameInput.val().length === 0 && emailInput.val().length === 0 && textInput.val().length === 0){
            nameErrorLabel.addClass('hidden');
            emailErrorLabel.addClass('hidden');
            textErrorLabel.addClass('hidden');
        }
    }

    function saveContactMessage(event) {
        event.preventDefault();
        nameInput.prop('readonly', true);
        emailInput.prop('readonly', true);
        textInput.prop('readonly', true);
        contactSubmitBtn.addClass('hidden');
        $.post(`http://localhost:8080/contact-message/save`,
            {
                name: nameInput.val(),
                email: emailInput.val(),
                text: textInput.val(),
            },
            function (response) {
                if (response) {
                    window.alert(`
                        Dear ${nameInput.val()}, we have received your message.\n
                        We will try to write back as soon as possible.
                    `);
                } else {
                    window.alert(`
                        Dear ${nameInput.val()}, something went wrong and\n 
                        we haven't been able to send your message.\n
                        Please, try again later.
                    `);
                }
            });
    }

    $('.contact-name, .contact-email, .contact-textarea').on('change keyup blur', validateContactMessage);
    contactSubmitBtn.click(saveContactMessage);
});

const emailInput = $('.password-reset-email');
emailInput.on('change keyup blur', validateEmail);

function checkIsEmailFmtCorrect() {
    const EMAIL_REGEX = /^(?=.{5,60}$)([a-z0-9-_]*\.)*[a-z0-9-_]*@[a-z0-9]*\.[a-z]{2,3}$/;
    const errEmailFmtDiv = $('.error-email-fmt');
    if (!EMAIL_REGEX.test(emailInput.val())) {
        if (errEmailFmtDiv.hasClass('hidden')) {
            errEmailFmtDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errEmailFmtDiv.fadeIn(500);
        }
        return false;
    }
    if (EMAIL_REGEX.test(emailInput.val())) {
        errEmailFmtDiv.fadeOut(500);
        return true;
    }
}

function checkIfEmailExistsInDatabase() {
    const errEmailTknDiv = $('.error-email-dne');
    return $.get(`http://localhost:8080/api/validation/is-email-available?email=${emailInput.val()}`, function (data) {
        if (data === true) {
            if (errEmailTknDiv.hasClass('hidden')) {
                errEmailTknDiv.removeClass('hidden').toggle().fadeIn(500);
            } else {
                errEmailTknDiv.fadeIn(500);
            }
        }
        if (data === false) {
            errEmailTknDiv.fadeOut(500);
        }
    });
}

function validateEmail() {
    const emailCheckmarkDiv = $('.email-checkmark');
    const submitButton = $('.password-reset-submit-btn');
    if (checkIsEmailFmtCorrect()) {
        $.when(checkIfEmailExistsInDatabase()).done(function (response) {
            if (!response) {
                emailCheckmarkDiv.removeClass('hidden').toggle().fadeIn(500);
                submitButton.removeClass('hidden');
            } else {
                emailCheckmarkDiv.fadeOut(500);
                submitButton.addClass('hidden');
            }
        });
    } else {
        emailCheckmarkDiv.fadeOut(500);
        submitButton.addClass('hidden');
    }
}


const recaptchaContainer = $('.recaptcha-wrapper');
const reCaptcha = $('.g-recaptcha');
const registerBtn = $("#registration-submit-btn");
const regInputs = $.makeArray($('.registration-form input'));

const tooltipUsername = $('.t-username');
const tooltipEmail = $('.t-email');
const tooltipPassword = $('.t-password');
const tooltipCOnfPass = $('.t-confpass');

const usernameInput = $('.username-input');
const emailInput = $('.email-input');
const passwordInput = $('.password-input');
const confPassInput = $('.confpass-input');

const errUsernameFmtDiv = $('.error-username-fmt');
const errUsernameTknDiv = $('.error-username-tkn');
const errEmailFmtDiv = $('.error-email-fmt');
const errEmailTknDiv = $('.error-email-tkn');
const errPasswordDiv = $('.error-password');
const errConfPassDiv = $('.error-password-conf');
const usernameCheckmarkDiv = $('.username-checkmark');
const emailCheckmarkDiv = $('.email-checkmark');
const passwordCheckmarkDiv = $('.password-checkmark');
const confPassCheckmarkDiv = $('.confpass-checkmark');

let isUsernameFmtCorrect = false;
let isUsernameAvailable = false;
let isEmailFmtCorrect = false;
let isEmailAvailable = false;
let isPasswordFmtCorrect = false;
let isConfPasswordCorrect = false;


// USERNAME VALIDATION -------------------------------------------------------------------------------------------------

function checkIsUsernameFmtCorrect() {
    const USERNAME_REGEX = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,13}[a-zA-Z0-9]$/;
    const username = usernameInput.val();
    if (!USERNAME_REGEX.test(username)) {
        isUsernameFmtCorrect = false;
        if (errUsernameFmtDiv.hasClass('hidden')) {
            errUsernameFmtDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errUsernameFmtDiv.fadeIn(500);
        }
    }
    if (USERNAME_REGEX.test(username)) {
        errUsernameFmtDiv.fadeOut(500);
        isUsernameFmtCorrect = true;
    }
}

function checkIsUsernameAvailable() {
    const username = usernameInput.val();
    return $.get(`http://localhost:8080/reg/is-username-available?username=${username}`, function (data) {
        if (data === true) {
            isUsernameAvailable = true;
            errUsernameTknDiv.fadeOut(500);
        }
        if (data === false) {
            isUsernameAvailable = false;
            if (errUsernameTknDiv.hasClass('hidden')) {
                errUsernameTknDiv.removeClass('hidden').toggle().fadeIn(500);
            } else {
                errUsernameTknDiv.fadeIn(500);
            }
        }
    });
}

function validateUsername() {
    checkIsUsernameFmtCorrect();
    if (isUsernameFmtCorrect) {
        $.when(checkIsUsernameAvailable()).done(function () {
            if (isUsernameFmtCorrect && isUsernameAvailable) {
                if (usernameCheckmarkDiv.hasClass('hidden')) {
                    usernameCheckmarkDiv.removeClass('hidden').toggle().fadeIn(500);
                } else {
                    usernameCheckmarkDiv.fadeIn(500);
                }
            } else {
                usernameCheckmarkDiv.fadeOut(500);
            }
        });
    } else {
        usernameCheckmarkDiv.fadeOut(500);
    }
    validateForm();
}


// EMAIL VALIDATION ----------------------------------------------------------------------------------------------------

function checkIsEmailFmtCorrect() {
    const EMAIL_REGEX = /^(?=.{5,60}$)([a-z0-9-_]*\.)*[a-z0-9-_]*@[a-z0-9]*\.[a-z]{2,3}$/;
    const email = emailInput.val();
    if (!EMAIL_REGEX.test(email)) {
        isEmailFmtCorrect = false;
        if (errEmailFmtDiv.hasClass('hidden')) {
            errEmailFmtDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errEmailFmtDiv.fadeIn(500);
        }
    }
    if (EMAIL_REGEX.test(email)) {
        errEmailFmtDiv.fadeOut(500);
        isEmailFmtCorrect = true;
    }
}

function checkIsEmailAvailable() {
    const email = emailInput.val();
    return $.get(`http://localhost:8080/reg/is-email-available?email=${email}`, function (data) {
        if (data === true) {
            isEmailAvailable = true;
            errEmailTknDiv.fadeOut(500);
        }
        if (data === false) {
            isEmailAvailable = false;
            if (errEmailTknDiv.hasClass('hidden')) {
                errEmailTknDiv.removeClass('hidden').toggle().fadeIn(500);
            } else {
                errEmailTknDiv.fadeIn(500);
            }
        }
    });
}

function validateEmail() {
    checkIsEmailFmtCorrect();
    if (isEmailFmtCorrect) {
        $.when(checkIsEmailAvailable()).done(function () {
            if (isEmailFmtCorrect && isEmailAvailable) {
                if (emailCheckmarkDiv.hasClass('hidden')) {
                    emailCheckmarkDiv.removeClass('hidden').toggle().fadeIn(500);
                } else {
                    emailCheckmarkDiv.fadeIn(500);
                }
            } else {
                emailCheckmarkDiv.fadeOut(500);
            }
        });
    } else {
        emailCheckmarkDiv.fadeOut(500);
    }
    validateForm();
}


// PASSWORD VALIDATION -------------------------------------------------------------------------------------------------

function validatePassword() {
    const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\S+$).{8,50}$/;
    const password = passwordInput.val();
    if (!PASSWORD_REGEX.test(password)) {
        isPasswordFmtCorrect = false;
        if (errPasswordDiv.hasClass('hidden')) {
            errPasswordDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errPasswordDiv.fadeIn(500);
        }
        passwordCheckmarkDiv.fadeOut(500);
    }
    if (PASSWORD_REGEX.test(password)) {
        isPasswordFmtCorrect = true;
        errPasswordDiv.fadeOut(500);
        if (passwordCheckmarkDiv.hasClass('hidden')) {
            passwordCheckmarkDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            passwordCheckmarkDiv.fadeIn(500);
        }
    }
    validateConfirmPassword();
    validateForm();
}

function validateConfirmPassword() {
    if (passwordInput.val() !== confPassInput.val()) {
        isConfPasswordCorrect = false;
        if (errConfPassDiv.hasClass('hidden')) {
            errConfPassDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errConfPassDiv.fadeIn(500);
        }
        confPassCheckmarkDiv.fadeOut(500);
    } else if (passwordInput.val() === confPassInput.val() && confPassInput.val().length > 7) {
        isConfPasswordCorrect = true;
        errConfPassDiv.fadeOut(500);
        if (confPassCheckmarkDiv.hasClass('hidden')) {
            confPassCheckmarkDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            confPassCheckmarkDiv.fadeIn(500);
        }
    }
    validateForm();
}

// REGISTRATION FORM VALIDATION & RECAPTCHA VISIBILITY------------------------------------------------------------------

function recaptchaCallback() {
    $('#registration-submit-btn').removeClass('hidden');
}

function validateForm() {
    if (isUsernameFmtCorrect && isUsernameAvailable && isEmailFmtCorrect && isEmailAvailable
        && isPasswordFmtCorrect && isConfPasswordCorrect
    ) {
        if (recaptchaContainer.hasClass('hidden')) {
            recaptchaContainer.removeClass('hidden').toggle().fadeIn(500);
        } else {
            recaptchaContainer.fadeIn(500);
        }
    } else {
        recaptchaContainer.fadeOut(500);
        registerBtn.addClass('hidden')
    }
}

// TOOLTIPS ------------------------------------------------------------------------------------------------------------

function showTooltip() {
    if ($(this).hasClass('username-input')) {
        tooltipUsername.removeClass('hidden');
    }
    if ($(this).hasClass('email-input')) {
        tooltipEmail.removeClass('hidden');
    }
    if ($(this).hasClass('password-input')) {
        tooltipPassword.removeClass('hidden');
    }
    if ($(this).hasClass('confpass-input')) {
        tooltipCOnfPass.removeClass('hidden');
    }
}

function hideTooltip() {
    if ($(this).hasClass('username-input')) {
        tooltipUsername.addClass('hidden');
    }
    if ($(this).hasClass('email-input')) {
        tooltipEmail.addClass('hidden');
    }
    if ($(this).hasClass('password-input')) {
        tooltipPassword.addClass('hidden');
    }
    if ($(this).hasClass('confpass-input')) {
        tooltipCOnfPass.addClass('hidden');
    }
}


usernameInput.on('keyup change blur', validateUsername).on('mouseover focus', showTooltip).on('mouseleave blur', hideTooltip);;
emailInput.on('keyup change blur', validateEmail).on('mouseover focus', showTooltip).on('mouseleave blur', hideTooltip);
passwordInput.on('keyup change blur', validatePassword).on('mouseover focus', showTooltip).on('mouseleave blur', hideTooltip);
confPassInput.on('keyup change blur', validateConfirmPassword).on('mouseover focus', showTooltip).on('mouseleave blur', hideTooltip);




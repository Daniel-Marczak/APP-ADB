const usernameInput = $('.username-input');
const emailInput = $('.email-input');
const contactNumberInput  = $('.contact-number-input');
const passwordInput = $('.password-input');
const confPassInput = $('.confpass-input');

let isUsernameFmtCorrect = false;
let isUsernameAvailable = false;
let isEmailFmtCorrect = false;
let isEmailAvailable = false;
let isContactNrFmtCorrect = false;
let isPasswordFmtCorrect = false;
let isConfPasswordCorrect = false;
let isAccountModified = false;

// USERNAME VALIDATION -------------------------------------------------------------------------------------------------

function checkIsUsernameFmtCorrect() {
    const USERNAME_REGEX = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,13}[a-zA-Z0-9]$/;
    const username = usernameInput.val();
    const errUsernameFmtDiv = $('.error-username-fmt');
    if (!USERNAME_REGEX.test(username)) {
        isUsernameFmtCorrect = false;
        if (errUsernameFmtDiv.hasClass('hidden')) {
            errUsernameFmtDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errUsernameFmtDiv.fadeIn(500);
        }
        return false;
    }
    if (USERNAME_REGEX.test(username)) {
        errUsernameFmtDiv.fadeOut(500);
        isUsernameFmtCorrect = true;
        return true;
    }
}

function checkIsUsernameAvailable() {
    const username = usernameInput.val();
    const currentUsername = $('input.update-current-username').val();
    const errUsernameTknDiv = $('.error-username-tkn');
    return $.get(`http://localhost:8080/api/validation/is-username-available?username=${username}`, function (data) {
        if (data === true || currentUsername === username) {
            isUsernameAvailable = true;
            errUsernameTknDiv.fadeOut(500);
        } else if (data === false) {
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
    const usernameCheckmarkDiv = $('.username-checkmark');
    if (checkIsUsernameFmtCorrect()) {
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
    const errEmailFmtDiv = $('.error-email-fmt');
    if (!EMAIL_REGEX.test(email)) {
        isEmailFmtCorrect = false;
        if (errEmailFmtDiv.hasClass('hidden')) {
            errEmailFmtDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errEmailFmtDiv.fadeIn(500);
        }
        return false;
    }
    if (EMAIL_REGEX.test(email)) {
        errEmailFmtDiv.fadeOut(500);
        isEmailFmtCorrect = true;
        return true;
    }
}

function checkIsEmailAvailable() {
    const email = emailInput.val();
    const currentEmail = $('input.update-current-email').val()
    const errEmailTknDiv = $('.error-email-tkn');
    return $.get(`http://localhost:8080/api/validation/is-email-available?email=${email}`, function (data) {
        if (data === true || email === currentEmail) {
            isEmailAvailable = true;
            errEmailTknDiv.fadeOut(500);
        } else if (data === false) {
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
    const emailCheckmarkDiv = $('.email-checkmark');
    if (checkIsEmailFmtCorrect()) {
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

// CONTACT NUMBER VALIDATION -------------------------------------------------------------------------------------------

function validateContactNumber(){
    const CONTACT_NUMBER_REGEX = /^([(][0-9]{1,3}[)]|^\+[0-9]{1,3})[ ]([0-9]([._\- ](?![._\- ]))?){7,15}$/;
    const contactNumber = contactNumberInput.val();
    const errContactNrFmtDiv = $('.error-contact-number');
    const contactNrCheckmarkDiv = $('.contact-number-checkmark');

    if (!CONTACT_NUMBER_REGEX.test(contactNumber)) {
        isContactNrFmtCorrect = false;
        if (errContactNrFmtDiv.hasClass('hidden')) {
            errContactNrFmtDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errContactNrFmtDiv.fadeIn(500);
        }
        contactNrCheckmarkDiv.fadeOut(500);
    }
    if (CONTACT_NUMBER_REGEX.test(contactNumber)) {
        isContactNrFmtCorrect = true;
        errContactNrFmtDiv.fadeOut(500);
        if (contactNrCheckmarkDiv.hasClass('hidden')) {
            contactNrCheckmarkDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            contactNrCheckmarkDiv.fadeIn(500);
        }
    }
    validateForm();
}

// PASSWORD VALIDATION -------------------------------------------------------------------------------------------------

function validatePassword() {
    const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\S+$).{8,50}$/;
    const password = passwordInput.val();
    const errPasswordDiv = $('.error-password');
    const passwordCheckmarkDiv = $('.password-checkmark');

    if (!PASSWORD_REGEX.test(password)) {
        if (password){
            isPasswordFmtCorrect = false;
            if (errPasswordDiv.hasClass('hidden')) {
                errPasswordDiv.removeClass('hidden').toggle().fadeIn(500);
            } else {
                errPasswordDiv.fadeIn(500);
            }
            passwordCheckmarkDiv.fadeOut(500);
        } else {
            isPasswordFmtCorrect = true;
            errPasswordDiv.fadeOut(500);
            if (passwordCheckmarkDiv.hasClass('hidden')) {
                passwordCheckmarkDiv.removeClass('hidden').toggle().fadeIn(500);
            } else {
                passwordCheckmarkDiv.fadeIn(500);
            }
        }
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
    const errConfPassDiv = $('.error-password-conf');
    const confPassCheckmarkDiv = $('.confpass-checkmark');

    if (passwordInput.val() !== confPassInput.val()) {
        isConfPasswordCorrect = false;
        if (errConfPassDiv.hasClass('hidden')) {
            errConfPassDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            errConfPassDiv.fadeIn(500);
        }
        confPassCheckmarkDiv.fadeOut(500);
    }
    if (passwordInput.val() === confPassInput.val()) {
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

// UPDATE USER FORM VALIDATION -----------------------------------------------------------------------------------------

function validateForm() {
    if (checkIfUserChangedAccountDetails()){
        isAccountModified = true;
        if (isUsernameFmtCorrect && isUsernameAvailable && isEmailFmtCorrect && isEmailAvailable && isContactNrFmtCorrect
            && isPasswordFmtCorrect && isConfPasswordCorrect
        ) {
            $('#update-user-submit-btn').removeClass('hidden');
        } else {
            $('#update-user-submit-btn').addClass('hidden');
        }
    } else {
        isAccountModified = false;
        $('#update-user-submit-btn').addClass('hidden');
    }
}

function checkIfUserChangedAccountDetails(){
    const isChangedUsername = $('.update-current-username').val() !== usernameInput.val();
    const isChangedEmail = $('.update-current-email').val() !== emailInput.val();
    const isChangedNumber = $('.update-current-number').val() !== contactNumberInput.val();
    const isPasswordChanged = !passwordInput.val();
    return isChangedUsername || isChangedEmail || isChangedNumber || !isPasswordChanged;
}

function preValidateForm(){
    validateUsername();
    validateEmail();
    validateContactNumber();
    validatePassword();
    validateConfirmPassword();
}

// TOOLTIPS ------------------------------------------------------------------------------------------------------------

function showTooltip() {
    if ($(this).hasClass('username-input')) {
        $('.t-username').removeClass('hidden');
    }
    if ($(this).hasClass('email-input')) {
        $('.t-email')
            .removeClass('hidden')
            .css('color', 'red')
            .css('font-weight', '500')
        ;
    }
    if ($(this).hasClass('contact-number-input')) {
        $('.t-contact-number').removeClass('hidden');
    }
    if ($(this).hasClass('password-input')) {
        $('.t-password').removeClass('hidden');
    }
    if ($(this).hasClass('confpass-input')) {
        $('.t-confpass').removeClass('hidden');
    }
}

function hideTooltip() {
    if ($(this).hasClass('username-input')) {
        $('.t-username').addClass('hidden');
    }
    if ($(this).hasClass('email-input')) {
        $('.t-email').addClass('hidden');
    }
    if ($(this).hasClass('contact-number-input')) {
        $('.t-contact-number').addClass('hidden');
    }
    if ($(this).hasClass('password-input')) {
        $('.t-password').addClass('hidden');
    }
    if ($(this).hasClass('confpass-input')) {
        $('.t-confpass').addClass('hidden');
    }
}

preValidateForm();

usernameInput.on('keyup change', validateUsername).on('focus', showTooltip).on('blur', hideTooltip);
emailInput.on('keyup change', validateEmail).on('focus', showTooltip).on('blur', hideTooltip);
contactNumberInput.on('keyup change', validateContactNumber).on('focus', showTooltip).on('blur', hideTooltip);
passwordInput.on('keyup change', validatePassword).on('focus', showTooltip).on('blur', hideTooltip);
confPassInput.on('keyup change', validateConfirmPassword).on('focus', showTooltip).on('blur', hideTooltip);

$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode === 13) {
            if (
                !isUsernameFmtCorrect|| !isUsernameAvailable || !isEmailFmtCorrect || !isEmailAvailable ||
                !isContactNrFmtCorrect || !isPasswordFmtCorrect || !isConfPasswordCorrect || !isAccountModified
            ){
                event.preventDefault();
                return false;
            }
        }
    });
});

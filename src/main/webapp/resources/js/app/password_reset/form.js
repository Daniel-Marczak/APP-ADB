const passwordInput = $('.password-input');
const confPassInput = $('.confpass-input');

let isPasswordFmtCorrect = false;
let isConfPasswordCorrect = false;

function validatePassword() {
    const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\S+$).{8,50}$/;
    const password = passwordInput.val();
    const errPasswordDiv = $('.error-password');
    const passwordCheckmarkDiv = $('.password-checkmark');

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
    toggleSubmitBtnDisplay();
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
    } else if (passwordInput.val() === confPassInput.val() && confPassInput.val().length > 0) {
        isConfPasswordCorrect = true;
        errConfPassDiv.fadeOut(500);
        if (confPassCheckmarkDiv.hasClass('hidden')) {
            confPassCheckmarkDiv.removeClass('hidden').toggle().fadeIn(500);
        } else {
            confPassCheckmarkDiv.fadeIn(500);
        }
    }
    toggleSubmitBtnDisplay();
}

function toggleSubmitBtnDisplay(){
    const submitBtn = $('.password-reset-submit-btn');
    if (isPasswordFmtCorrect && isConfPasswordCorrect){
        submitBtn.removeClass('hidden');
    } else {
        submitBtn.addClass('hidden');
    }
}

function showTooltip() {
    if ($(this).hasClass('password-input')) {
        $('.t-password').removeClass('hidden');
    }
    if ($(this).hasClass('confpass-input')) {
        $('.t-confpass').removeClass('hidden');
    }
}

function hideTooltip() {
    if ($(this).hasClass('password-input')) {
        $('.t-password').addClass('hidden');
    }
    if ($(this).hasClass('confpass-input')) {
        $('.t-confpass').addClass('hidden');
    }
}

passwordInput.on('change keyup blur', validatePassword).focus(showTooltip).blur(hideTooltip);
confPassInput.on('change keyup blur', validateConfirmPassword).focus(showTooltip).blur(hideTooltip);

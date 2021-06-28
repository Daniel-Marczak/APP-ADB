const loginUsername = $(".username-input");
const loginPassword = $(".password-input");
const loginBtn = $(".sign-in-btn");

let isLoginUsernameCorrect = false;
let isLoginPasswordCorrect = false;

function checkUsernameFormat() {
    const USERNAME_REGEX = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,13}[a-zA-Z0-9]$/;
    const username = loginUsername.val();
    if (USERNAME_REGEX.test(username)) {
        isLoginUsernameCorrect = true;
        if (loginPassword.hasClass('hidden')) {
            loginPassword.removeClass('hidden').toggle().fadeIn(500);
        } else {
            loginPassword.fadeIn(500);
        }
    }
    if (!USERNAME_REGEX.test(username)) {
        isLoginUsernameCorrect = false;
        loginPassword.fadeOut(500);
    }
}

function checkPasswordFormat() {
    const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\S+$).{8,50}$/;
    const password = loginPassword.val();
    if (!PASSWORD_REGEX.test(password)) {
        isLoginPasswordCorrect = false;
        loginBtn.fadeOut(500);
    }
    if (PASSWORD_REGEX.test(password)) {
        isLoginPasswordCorrect = true;
        if (loginBtn.hasClass('hidden')) {
            loginBtn.removeClass('hidden').toggle().fadeIn(500);
        } else {
            loginBtn.fadeIn(500);
        }
    }
}

$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode === 13 && !isLoginUsernameCorrect || event.keyCode === 13 && !isLoginPasswordCorrect ) {
            event.preventDefault();
            return false;
        }
    });
});


loginUsername.on('keyup change blur', checkUsernameFormat);
loginPassword.on('keyup change blur', checkPasswordFormat);
function recaptchaCallback() {
    $('#registration-submit-btn').removeClass('hidden');
}

// $(document).on('keyup', checkRegistrationFields);
// function checkRegistrationFields() {
//     console.log('yes');
// }

const reCaptcha = $('.g-recaptcha');
const registerBtn = $("#registration-submit-btn");
const regInputs = $.makeArray($('.registration-form input'));


const usernameInput = $('.username-input');
const errUsernameFmtDiv = $('.error-username-fmt');
const errUsernameTknDiv = $('.error-username-tkn');
const errEmailFmtDiv = $('.error-email-fmt');
const errEmailTknDiv = $('.error-email-tkn');
const errPasswordDiv = $('.error-password');
const errPassConfDiv = $('.error-password-conf');

let isUsernameFmtCorrect = false;
let isUsernameAvailable = false;
let isEmailFmtCorrect = false;
let isEmailAvailable = false;
let isPasswordFmtCorrect = false;
let isConfPasswordCorrect = false;

function hideAllErrorDivs(){
    errUsernameFmtDiv.hide();
    errUsernameTknDiv.hide();
    errEmailFmtDiv.hide();
    errEmailTknDiv.hide();
    errPasswordDiv.hide();
    errPassConfDiv.hide();
}
hideAllErrorDivs();



function checkIsUsernameFmtCorrect(){
    const USERNAME_REGEX = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,13}[a-zA-Z0-9]$/;
    const username = String(usernameInput.val());
    if (!USERNAME_REGEX.test(username)){
        errUsernameFmtDiv.fadeIn(500);
    }
    if (USERNAME_REGEX.test(username)){
        errUsernameFmtDiv.fadeOut(500)
    }
}

function checkIsUsernameAvailable(){
    const username = String(usernameInput.val());
    $.get(`http://localhost:8080/reg/is-username-available?username=${username}`, function (data) {
       if (data === true){
           isUsernameAvailable = true
       }
       if (data === false){
           isUsernameAvailable = false;
       }
    });
}

usernameInput.on('change', checkIsUsernameFmtCorrect)
usernameInput.on('change', checkIsUsernameAvailable)


function validateEmail(){
    const EMAIL_REGEX = /^(?=.{5,60}$)([a-z0-9-_]*\.)*[a-z0-9-_]*@[a-z0-9]*\.[a-z]{2,3}$/;
}

function validatePassword(){
    const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\S+$).{8,50}$/;
}

const test = document.querySelector(".error-username-fmt");
console.log(test);








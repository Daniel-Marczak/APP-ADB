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
const errUsernameFmt = $('.error-username-fmt');
const errUsernameTkn = $('.error-username-tkn');
const errEmailFmt = $('.error-email-fmt');
const errPassword = $('.error-password');
const errPassConf = $('.error-password-conf');



function validateUsername(){
    const USERNAME_REGEX = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,13}[a-zA-Z0-9]$/;
    if (USERNAME_REGEX.test(String(usernameInput.val()))){
        console.log("ok");
    }
}

usernameInput.on("change", validateUsername)


function validateEmail(){
    const EMAIL_REGEX = /^(?=.{5,60}$)([a-z0-9-_]*\.)*[a-z0-9-_]*@[a-z0-9]*\.[a-z]{2,3}$/;
}

function validatePassword(){
    const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\S+$).{8,50}$/;
}

const test = document.querySelector(".error-username-fmt");
console.log(test);








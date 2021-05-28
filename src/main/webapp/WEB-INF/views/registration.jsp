<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Accommodation Cloud</title>
    <script src="<c:url value="https://www.google.com/recaptcha/api.js"/>" async defer></script>
    <%@include file="/WEB-INF/views/jspf/header.jspf" %>
</head>

<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">

<%@include file="/WEB-INF/views/jspf/navbar.jspf" %>

<div class="banner" id="banner" style="min-height: 100%">
    <div class="bg-overlay" style="min-height: content-box">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text">
                        <h2 style="margin-bottom: 50px">Registration</h2>
                        <form:form class="registration-form" modelAttribute="newUser" action="/registration">

                            <div class="tooltip-container">
                                <div class="tooltip-wrapper t-username hidden">
                                    <span>Your username can contain:</span>
                                    <ul style="padding-left: 20px">
                                        <li>lower case letters</li>
                                        <li>upper case letter<br></li>
                                        <li>digits</li>
                                        <li>dot</li>
                                        <li>hyphen</li>
                                        <li>underscore</li>
                                    </ul>
                                    <span>A username must be between 3 and 15 characters.</span>
                                </div>
                                <div class="tooltip-wrapper t-email hidden">
                                    <span>Valid email is required to complete registration process.</span>
                                    <span>We will send you an email with a registration confirmation link.</span>
                                </div>
                                <div class="tooltip-wrapper t-password hidden">
                                    <span>Your password must follow these rules:</span>
                                    <ul style="padding-left: 20px">
                                        <li>must contain at least 8 characters</li>
                                        <li>must contain at least one lower case letter</li>
                                        <li>must contain at least one upper case letter<br></li>
                                        <li>must contain at least one special character (!,&nbsp;@, #, $, %, &, *)</li>
                                        <li>must contain at least one digit<br></li>
                                    </ul>
                                </div>
                                <div class="tooltip-wrapper t-confpass hidden">
                                    <span>Please make sure passwords match.</span>
                                </div>
                            </div>

                            <form:input path="username" type="text" placeholder="username" cssClass="username-input"/>
                            <div class="username-checkmark hidden">&check;</div>
                            <br>
                            <form:errors path="username" cssClass="form-error-box error-username-fmt-form"/>
                            <div class="form-error-box error-username-fmt hidden">
                                Incorrect username format.
                            </div>
                            <div class="form-error-box error-username-tkn hidden">
                                This username has already been taken.
                            </div>

                            <form:input path="email" type="email" placeholder="email" cssClass="email-input"/>
                            <div class="email-checkmark hidden">&check;</div>
                            <br>
                            <form:errors path="email"/>
                            <div class="form-error-box error-email-fmt hidden">
                                Incorrect email format.
                            </div>
                            <div class="form-error-box error-email-tkn hidden">
                                This email has already been taken.
                            </div>

                            <form:input path="password" type="password" placeholder="password"
                                        cssClass="password-input"/>
                            <div class="password-checkmark hidden">&check;</div>
                            <br>
                            <form:errors path="password"/>
                            <div class="form-error-box error-password hidden">
                                Password does not meet requirements.
                            </div>

                            <div>
                                <label style="margin: 0">
                                    <input type="password" name="confirmPassword" placeholder="confirm password"
                                           class="confpass-input">
                                </label>
                                <div class="confpass-checkmark hidden">&check;</div>
                            </div>

                            <div class="form-error-box error-password-conf hidden">
                                The passwords do not match.
                            </div>

                            <div class="recaptcha-wrapper hidden">
                                <div class="g-recaptcha" data-theme="dark" data-callback="recaptchaCallback"
                                     data-sitekey="6LeK3OkaAAAAAHMJXvPWVGX13y8hPugCQLbYAtwe"></div>
                            </div>
                            <div>
                                <button class="hidden" type="submit" id="registration-submit-btn">Register</button>
                            </div>
                        </form:form>
                        <div class="link-box">
                            <a href="<c:url value="/login"/>" class="registration-link">Sign in</a>
                            <a href="<c:url value="/reset-password"/>" class="reset-password-link">Reset password</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-4"><span class="copyright">Copyright &copy; Ethereal 2018</span></div>
            <div class="col-md-4">
                <ul class="list-inline social-buttons">
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <ul class="list-inline quicklinks">
                    <li>Designed by <a href="<c:url value="http://w3template.com"/>">W3 Template</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>
<%@include file="/WEB-INF/views/jspf/footer.jspf" %>
<script src="<c:url value="/resources/js/registration.js"/>" async defer></script>


</body>
</html>

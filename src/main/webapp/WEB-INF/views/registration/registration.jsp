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

<div class="banner" id="banner">
    <div class="bg-overlay" style="min-height: content-box">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text" style="height: 75%">
                        <h2 style="margin-bottom: 50px">Registration</h2>
                        <c:if test="${param.reg == 'success'}">
                            <div class="registration-confirmation-success-box">
                                The registration email with your account activation link has been sent. Please, check your email.
                            </div>
                        </c:if>
                        <c:if test="${param.reg == 'failure'}">
                            <div class="registration-confirmation-failure-box">
                                Your account has not been created due to a registration error.
                            </div>
                        </c:if>

                        <c:if test="${empty param.reg || param.reg != 'success'}">
                            <form:form class="registration-form" modelAttribute="user" action="/registration">
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
                                    <div class="tooltip-wrapper t-contact-number hidden">
                                        <span>A valid contact number must begin with a country code.</span>
                                        <span>The country code number must be either preceded by a plus sign or placed inside parenthesis.</span>
                                        <br>
                                        <span>Examples of desired formats:</span>
                                        <ul style="padding-left: 20px">
                                            <li>(48) 42 681 46 96 / +48 42 681-46-96</li>
                                            <li>(48) 555 555 555 / +48 555-555-555<br></li>
                                        </ul>
                                    </div>
                                    <div class="tooltip-wrapper t-password hidden">
                                        <span>Your password must follow these rules:</span>
                                        <ul style="padding-left: 20px">
                                            <li>must contain at least 8 characters</li>
                                            <li>must contain at least one lower case letter</li>
                                            <li>must contain at least one upper case letter</li>
                                            <li>must contain at least one digit</li>
                                            <li>must contain at least one special character (!,&nbsp;@, #, $, %, &, *)</li>
                                        </ul>
                                    </div>
                                    <div class="tooltip-wrapper t-confpass hidden">
                                        <span>Please make sure passwords match.</span>
                                    </div>
                                </div>

                                <form:input path="username" placeholder="username" cssClass="username-input"/>
                                <div class="username-checkmark hidden">&check;</div>
                                <br>
                                <form:errors path="username" cssClass="form-error-box"/>
                                <div class="form-error-box error-username-fmt hidden">
                                    Incorrect username format.
                                </div>
                                <div class="form-error-box error-username-tkn hidden">
                                    This username has already been taken.
                                </div>

                                <form:input path="email" placeholder="email" cssClass="email-input"/>
                                <div class="email-checkmark hidden">&check;</div>
                                <br>
                                <form:errors path="email" cssClass="form-error-box"/>
                                <div class="form-error-box error-email-fmt hidden">
                                    Incorrect email format.
                                </div>
                                <div class="form-error-box error-email-tkn hidden">
                                    This email has already been taken.
                                </div>

                                <form:input path="contactNumber" placeholder="contact number" cssClass="contact-number-input"/>
                                <div class="contact-number-checkmark hidden">&check;</div>
                                <br>
                                <form:errors path="contactNumber" cssClass="form-error-box"/>
                                <div class="form-error-box error-contact-number hidden">
                                    Incorrect contact number format.
                                </div>

                                <form:password path="password" placeholder="password" cssClass="password-input"/>
                                <div class="password-checkmark hidden">&check;</div>
                                <br>
                                <form:errors path="password" cssClass="form-error-box"/>
                                <div class="form-error-box error-password hidden">
                                    Password does not meet requirements.
                                </div>

                                <form:password path="confPassword" placeholder="confirm password" cssClass="confpass-input"/>
                                <div class="confpass-checkmark hidden">&check;</div>
                                <br>
                                <form:errors path="password" cssClass="form-error-box"/>
                                <div class="form-error-box error-password-conf hidden">
                                    The passwords do not match.
                                </div>

                                <div class="recaptcha-wrapper hidden">
                                    <div class="g-recaptcha" data-theme="dark" data-callback="recaptchaCallback"
                                         data-sitekey="6LeK3OkaAAAAAHMJXvPWVGX13y8hPugCQLbYAtwe">
                                    </div>
                                </div>
                                <div>
                                    <button class="hidden" type="submit" id="registration-submit-btn">Register</button>
                                </div>
                            </form:form>
                        </c:if>

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
                    <li>Designed by <a href="<c:url value="https://w3template.com"/>">W3 Template</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>
<%@include file="/WEB-INF/views/jspf/footer.jspf" %>
<script src="<c:url value="/resources/js/app/app-registration.js"/>"></script>


</body>
</html>

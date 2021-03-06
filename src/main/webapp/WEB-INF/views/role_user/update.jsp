<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Accommodation Cloud</title>
    <%@include file="/WEB-INF/views/jspf/header.jspf" %>
</head>

<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">

<%@include file="/WEB-INF/views/jspf/user-navbar.jspf" %>

<div class="banner" id="banner">
    <div class="bg-overlay" style="min-height: content-box">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text" style="height: 75%">
                        <h2 style="margin-bottom: 50px">Account details</h2>
                        <c:if test="${param.update == 'success'}">
                            <h3>
                                Your account has been updated.
                            </h3>
                        </c:if>
                        <c:if test="${empty param.update || param.update != 'success'}">
                            <form:form class="update-user-form" modelAttribute="user" action="/user/update">
                                <div class="hidden current-username-and-email-box">
                                    <input type="hidden" name="currentUsername" class="update-current-username" value="${requestScope.currentUsername}"/>
                                    <input type="hidden" name="currentEmail" class="update-current-email" value="${requestScope.currentEmail}"/>
                                    <input type="hidden" name="currentNumber" class="update-current-number" value="${requestScope.currentNumber}"/>
                                </div>
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
                                        <span>Changing your email address will automatically log you out and you will
                                            not be able to log in until the new email address is confirmed.
                                        </span>
                                        <span></span>
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
                                <form:errors path="username" cssClass="form-error-box error-username-fmt-form"/>
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
                                <c:if test="${requestScope.error =='password'}">
                                    <form:errors path="password" cssClass="form-error-box"/>
                                </c:if>
                                <div class="form-error-box error-password hidden">
                                    Password does not meet requirements.
                                </div>

                                <form:password path="confPassword" placeholder="confirm password" cssClass="confpass-input"/>
                                <div class="confpass-checkmark hidden">&check;</div>
                                <br>
                                <form:errors path="confPassword" cssClass="form-error-box"/>
                                <div class="form-error-box error-password-conf hidden">
                                    Passwords do not match.
                                </div>

                                <div>
                                    <button class="" type="submit" id="update-user-submit-btn">Save changes</button>
                                </div>
                            </form:form>
                        </c:if>
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
<script src="<c:url value="/resources/js/app/role_user/update.js"/>"></script>
</body>
</html>

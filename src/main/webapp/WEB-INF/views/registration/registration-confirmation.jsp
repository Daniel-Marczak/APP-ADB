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
    <div class="bg-overlay" style="min-height: 100%">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text">
                        <h2 style="margin-bottom: 50px">Registration</h2>

                        <c:if test="${requestScope.registration == 'successful'}">
                            <div class="registration-confirmation-success-box">
                                Your account has been activated. You can now sign in.
                            </div>
                        </c:if>
                        <c:if test="${requestScope.registration == 'alreadyConfirmed'}">
                            <div class="registration-confirmation-success-box">
                                The account associated with this email address has already been activated.
                            </div>
                        </c:if>
                        <c:if test="${requestScope.registration == 'tokenExpired'}">
                            <div class="registration-confirmation-failure-box">
                                Your registration token has expired.
                            </div>
                        </c:if>
                        <c:if test="${requestScope.registration == 'emptyToken'}">
                            <div class="registration-confirmation-failure-box">
                                You cannot activation your account without a valid registration token.<br>
                            </div>
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

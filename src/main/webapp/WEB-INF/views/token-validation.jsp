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

                        <c:if test="${requestScope.validation == 'registrationSuccess'}">
                            <h2 style="margin-bottom: 50px">Registration completed!</h2>
                            <h3>
                                Your registration has been successfully completed. You can now sign in.
                            </h3>
                        </c:if>
                        <c:if test="${requestScope.validation == 'updateSuccess'}">
                            <h2 style="margin-bottom: 50px">Update completed!</h2>
                            <h3>
                                Your email address has been successfully updated. You can now sign in.
                            </h3>
                        </c:if>
                        <c:if test="${requestScope.token == 'expired' || requestScope.token == 'confirmed' || requestScope.token == 'empty'}">
                            <h2 style="margin-bottom: 50px">Oops!</h2>
                            <c:if test="${requestScope.token == 'confirmed'}">
                                <h3 class="text-error">
                                    The account associated with this token has already been activated.
                                </h3>
                            </c:if>
                            <c:if test="${requestScope.token == 'expired'}">
                                <h3 class="text-error">
                                    Your token has expired.
                                </h3>
                            </c:if>
                            <c:if test="${requestScope.token == 'empty'}">
                                <h3 class="text-error">
                                    You cannot activation your account without a valid token.<br>
                                </h3>
                            </c:if>
                        </c:if>

                        <div class="link-box">
                            <a href="<c:url value="/login"/>" class="registration-link">Sign in</a>
                            <a href="<c:url value="/password-reset"/>" class="password-reset-link">Reset password</a>
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

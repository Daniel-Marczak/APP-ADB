<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Accommodation Cloud</title>
    <%@include file="/WEB-INF/views/jspf/header.jspf"%>
</head>

<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
<%@include file="/WEB-INF/views/jspf/navbar.jspf"%>
<div class="banner" id="banner" style="min-height: 100%">
    <div class="bg-overlay" style="height: 100%">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text">
                        <h2 style="margin-bottom: 50px">Password reset</h2>
                        <c:if test="${empty requestScope.success}">
                            <div class="reg-validation-success-box">
                                Enter your email and we'll send you a link with instructions how to get back into your account.
                            </div>
                        </c:if>
                        <c:if test="${requestScope.success.equals('sent')}">
                            <div class="reg-validation-success-box">
                                We have successfully processed your request. Please, check your inbox.
                            </div>
                        </c:if>
                        <form class="password-reset-form" action="<c:url value="/password-reset"/>" method="post">
                            <label style="display: block;">
                                <input type="text" name="email" placeholder="email">
                            </label>
                            <c:if test="${requestScope.error.equals('format')}">
                                <div class="form-error-box">
                                    Incorrect email format.
                                </div>
                            </c:if>
                            <c:if test="${requestScope.error.equals('empty')}">
                                <div class="form-error-box">
                                    Incorrect email address.
                                </div>
                            </c:if>
                            <div>
                                <button name="password-reset-submit-btn">Reset my password</button>
                            </div>
                        </form>
                    </div>
                    <div class="link-box">
                        <a href="<c:url value="/login"/>" class="sign-in-link">Sign in</a>
                        <a href="<c:url value="/registration"/>" class="reset-password-link">Registration</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-4"> <span class="copyright">Copyright &copy; Ethereal 2018</span> </div>
            <div class="col-md-4">
                <ul class="list-inline social-buttons">
                    <li><a href="#"><i class="fa fa-twitter"></i></a> </li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a> </li>
                    <li><a href="#"><i class="fa fa-linkedin"></i></a> </li>
                </ul>
            </div>
            <div class="col-md-4">
                <ul class="list-inline quicklinks">
                    <li>Designed by <a href="<c:url value="https://w3template.com"/>">W3 Template</a> </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
<%@include file="/WEB-INF/views/jspf/footer.jspf"%>

</body>
</html>

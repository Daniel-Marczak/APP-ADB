<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
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
                        <h2 style="margin-bottom: 50px">Sign in</h2>
                        <form class="login-form" action="<c:url value="/login"/>" method="post">
                            <sec:csrfInput />
                            <label>
                                <input type="text" class="username-input" name="username" placeholder="username">
                            </label>
                            <label>
                                <input type="password" class="password-input hidden" name="password" placeholder="password">
                            </label>
                            <div>
                                <button type="submit" class="sign-in-btn hidden" style="display: none">Sign in</button>
                            </div>
                        </form>
                        <c:if test="${param.error.equals('credentials')}">
                            <div class="form-error-box">
                                Incorrect username or password.
                            </div>
                        </c:if>
                    </div>
                    <div class="link-box">
                        <a href="<c:url value="/registration"/>" class="registration-link">Register</a>
                        <a href="<c:url value="/reset-password"/>" class="reset-password-link">Reset my password</a>
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
<script src="<c:url value="/resources/js/app/app-login.js"/>"></script>

</body>
</html>

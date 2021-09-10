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
                        <c:if test="${requestScope.update.equals('success')}">
                            <h3>
                                Your password has been changed.
                            </h3>
                            <div class="link-box">
                                <a href="<c:url value="/login"/>" class="sign-in-link">Sign in</a>
                                <a href="<c:url value="/"/>" class="password-reset-link">Home</a>
                            </div>
                        </c:if>
                        <c:if test="${requestScope.error.equals('t/c/f')}">
                            <h3 class="text-danger">
                                Oops! Something went wrong.
                            </h3>
                        </c:if>
                        <c:if test="${empty requestScope.update}">
                            <form class="password-reset-form" action="<c:url value="/password-reset/form"/>" method="post">
                                <input type="hidden" name="userId" value="${requestScope.userId}">
                                <input type="hidden" name="tokenId" value="${requestScope.tokenId}">
                                <div class="tooltip-container">
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
                                <div class="d-inline-block">
                                    <label>
                                        <input class="password-input" type="password" name="password" placeholder="password">
                                    </label>
                                </div>
                                <div class="password-checkmark hidden">&check;</div>
                                <div class="form-error-box error-password hidden">
                                    Password does not meet requirements.
                                </div>
                                <c:if test="${requestScope.error.equals('format')}">
                                    <div class="form-error-box error-password">
                                        Password does not meet requirements.
                                    </div>
                                </c:if>
                                <br>
                                <div class="d-inline-block">
                                    <label>
                                        <input class="confpass-input" type="password" name="confirmPassword" placeholder="confirm password">
                                    </label>
                                </div>
                                <div class="confpass-checkmark hidden">&check;</div>
                                <div class="form-error-box error-password-conf hidden">
                                    Passwords do not match.
                                </div>
                                <c:if test="${requestScope.error.equals('confirmation')}">
                                    <div class="form-error-box error-password-conf">
                                        Passwords do not match.
                                    </div>
                                </c:if>
                                <div>
                                    <button type="submit" class="password-reset-submit-btn hidden">Reset my password</button>
                                </div>
                            </form>
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
<script src="<c:url value="/resources/js/app/password-reset-form.js"/>"></script>

</body>
</html>

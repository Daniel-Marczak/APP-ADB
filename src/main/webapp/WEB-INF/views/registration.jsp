<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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
    <div class="bg-overlay" style="min-height: content-box">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text">
                        <h2 style="margin-bottom: 50px">Registration</h2>
                        <form:form cssClass="registration-form" modelAttribute="newUser">
                            <form:input path="username" type="text" placeholder="username"/>
                            <c:if test="${!empty param.test.equals('test')}">
                                <div class="form-error-box">
                                    Incorrect username format.
                                </div>
                            </c:if>
                            <c:if test="${!empty param.test.equals('test')}">
                                <div class="form-error-box">
                                    This username has already been taken.
                                </div>
                            </c:if>
                            <form:input path="email" type="email" placeholder="email"/>
                            <c:if test="${!empty param.test.equals('test')}">
                                <div class="form-error-box">
                                    Incorrect email format.
                                </div>
                            </c:if>
                            <c:if test="${!empty param.test.equals('test')}">
                                <div class="form-error-box">
                                    This email has already been taken.
                                </div>
                            </c:if>
                            <form:input path="password" type="password" placeholder="password"/>
                            <c:if test="${!empty param.test.equals('test')}">
                                <div class="form-error-box">
                                    Password does not meet requirements.
                                </div>
                            </c:if>
                            <label style="margin: 0">
                                <input type="password" name="confirmPassword" placeholder="confirm password">
                            </label>
                            <c:if test="${!empty param.test.equals('test')}">
                                <div class="form-error-box">
                                    The passwords do not match.
                                </div>
                            </c:if>
                            <div>
                                <button type="submit" name="login-submit-btn">Register</button>
                            </div>
                        </form:form>
                        <div class="link-box">
                            <a href="<c:url value="/registration"/>" class="registration-link">Sign in</a>
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
                    <li>Designed by <a href="<c:url value="http://w3template.com"/>">W3 Template</a> </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
<%@include file="/WEB-INF/views/jspf/footer.jspf"%>

</body>
</html>

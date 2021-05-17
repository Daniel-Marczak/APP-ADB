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
<div class="banner" id="banner" style="height: 90%">
    <div class="bg-overlay" style="height: 100%">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text">
                        <h2>Sign in</h2>
                        <form:form id="registration-form" modelAttribute="">
                            <form:input path="username" type="text" cssClass="register-input"/>
                            <form:input path="email" type="email" cssClass="register-input"/>
                            <form:input path="password" type="password" cssClass="register-input"/>
                            <label>
                                <input type="password" name="confirmPassword">
                            </label>
                        </form:form>
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

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Accommodation Cloud</title>
    <%@include file="/WEB-INF/views/jspf/header.jspf" %>
</head>

<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
<%@include file="/WEB-INF/views/jspf/user-navbar.jspf" %>


<!-- Banner -->
<div class="banner" id="banner">
    <div class="bg-overlay" style="padding: 70px 250px 100px 250px">
        <div class="container-xl" style="height: 80%; margin-top: 60px">
            <input type="hidden" name="userId" value="${requestScope.userId}">
<%--            <h3 style="padding-bottom: 20px">Properties</h3>--%>
            <div class="properties-container">
                <div class="property-name-tab-container">
                </div>
                <div class="property-card-container">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- FOOTER -->
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

<!-- LOGOUT MODAL -->
<div tabindex="-1" class="modal bs-example-modal-sm" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header"><h4>Logout <i class="fa fa-lock"></i></h4></div>
            <div class="modal-body"><i class="fa fa-question-circle"></i> Are you sure you want to log-off?</div>
            <div class="modal-footer">
                <form action="<c:url value="/logout"/> " method="post">
                    <button type="submit" class="btn btn-primary btn-block">Logout</button>
                </form>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/jspf/footer.jspf" %>
<script src="<c:url value="/resources/js/app-role-user-properties.js"/> "></script>
</body>
</html>

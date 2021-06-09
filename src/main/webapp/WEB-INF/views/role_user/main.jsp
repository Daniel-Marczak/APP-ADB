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
<%@include file="/WEB-INF/views/jspf/user-navbar.jspf"%>


<!-- Portfolio -->
<div id="a" class="portfolio">
    <div class="contact" id="contact">
        <div class="container" style="">
            <div class="row" style="background-color: gray; height: 800px">
                <div class="col-md-12">
                    <div class="text-center">
                        <h3>Contact Us</h3>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- FOOTER -->
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

    <!-- LOGOUT MODAL -->
    <div tabindex="-1" class="modal bs-example-modal-sm" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header"><h4>Logout <i class="fa fa-lock"></i></h4></div>
                <div class="modal-body"><i class="fa fa-question-circle"></i> Are you sure you want to log-off?</div>
                <div class="modal-footer">
                    <form action="<c:url value="/logout"/> " method="post">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                        <button type="submit" class="btn btn-primary btn-block">Logout</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <%@include file="/WEB-INF/views/jspf/footer.jspf"%>
</body>
</html>

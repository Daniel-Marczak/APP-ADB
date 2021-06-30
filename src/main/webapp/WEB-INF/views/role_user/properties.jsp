<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Accommodation Cloud</title>
    <link href='<c:url value="/resources/css/fullcalendar/main.css"/>' rel='stylesheet'/>
    <%@include file="/WEB-INF/views/jspf/header.jspf" %>
</head>

<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
<%@include file="/WEB-INF/views/jspf/user-navbar.jspf" %>


<!-- BANNER -->
<div class="banner" id="banner">
    <div class="bg-overlay" style="padding: 70px 250px 100px 250px">
        <div class="container-xl" style="height: 80%; margin-top: 60px">
            <input type="hidden" name="userId" value="${requestScope.userId}">
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

<!-- ADD EVENT MODAL -->
<div tabindex="-1" class="modal add-booking-modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h4>Please specify booking details
<%--                    <i class="fa fa-info-circle"></i>--%>
                </h4>
            </div>
            <div class="modal-body">
                <label>Booking tittle:
                    <input type="text" class="add-event-booking-tittle"/>
                </label>
                <label>Customer name:
                    <input type="text" class="add-event-customer-name"/>
                </label>
                <label>Customer surname
                    <input type="text" class="add-event-customer-surname"/>
                </label>
                <label>Customer phone:
                    <input type="text" class="add-event-customer-phone"/>
                </label>
                <label>Additional info:
                    <textarea  class="add-event-additional-info"></textarea>
                </label>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary btn-block add-booking-btn">Add booking</button>
            </div>
        </div>
    </div>
</div>

<%@include file="/WEB-INF/views/jspf/user-footer.jspf" %>
<script src="<c:url value="/resources/js/fullcalendar/main.js"/> "></script>
<script src="<c:url value="/resources/js/app/app-role-user-properties.js"/>" type="module"></script>
</body>
</html>

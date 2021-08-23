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
            <input type="hidden" class="user-id" name="userId" value="${requestScope.userId}">
            <div class="add-property-btn-container">
                <button class="add-property-btn">Add property</button>
            </div>
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

<!-- SAVE OR UPDATE PROPERTY MODAL -->
<div tabindex="-1" class="modal save-or-update-property-modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="add-new-property-header-txt">Please specify the property details</h4>
                <button type="submit" class="btn btn-danger btn-block delete-property-btn delete-btn hidden">Delete property</button>
                <button type="button" class="btn btn-danger property yes-btn hidden">Yes</button>
                <button type="button" class="btn btn-success no-btn hidden">No</button>
            </div>
            <div class="modal-body">
                <form method="post" id="save-or-update-property-form">
                    <input type="hidden" name="propertyId" class="su-property-id" value="">
                    <input type="hidden" name="userId" class="su-property-user-id" value="${requestScope.userId}"/>
                    <label>Property name:
                        <input type="text" name="propertyName" class="su-property-name"/>
                    </label>
                    <label>Is property available:<br>
                        <input id="isAvailableYes" type="radio" name="isAvailable" class="su-is-available true" value="true" checked="checked"/>
                        <label for="isAvailableYes">Yes</label>
                        <input id="isAvailableNo" type="radio" name="isAvailable" class="su-is-available false" value="false"/>
                        <label for="isAvailableNo">No</label>
                    </label>
                    <br>
                    <label>Property type:<br>
                        <select name="propertyType" class="su-property-type">
                            <option value="0" selected>Please select a type</option>
                        </select>
                    </label>
                    <br>
                    <label>Country:<br>
                        <select name="propertyCountry" class="su-property-country">
                            <option value="0" selected>Please select a country</option>
                        </select>
                    </label>
                    <br>
                    <label>City:<br>
                        <input type="text" name="propertyCity" class="su-property-city"/>
                    </label>
                    <label>Street:<br>
                        <input type="text" name="propertyStreet" class="su-property-street"/>
                    </label>
                    <label>Postal code:<br>
                        <input type="text" name="propertyPostalCode" class="su-property-postal-code"/>
                    </label>
                    <label>Province:<br>
                        <input type="text" name="propertyProvince" class="su-property-province"/>
                    </label>
                    <label>Region:<br>
                        <input type="text" name="propertyRegion" class="su-property-region"/>
                    </label>
                    <label>Description:<br>
                        <textarea name="propertyDescription" class="su-property-description"></textarea>
                    </label>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary btn-block su-save-property-btn">Save property</button>
                        <button type="submit" class="btn btn-primary btn-block su-save-changes-btn">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- ADD OR EDIT EVENT MODAL -->
<div tabindex="-1" class="modal add-or-edit-event-modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-header">
                    <h4 class="add-event-header-text">Please specify the booking details</h4>
                    <button type="submit" class="btn btn-danger btn-block delete-booking-btn delete-btn hidden">Cancel booking</button>
                    <button type="button" class="btn btn-danger booking yes-btn hidden">Yes</button>
                    <button type="button" class="btn btn-success no-btn hidden">No</button>
                </div>
            </div>
            <div class="modal-body">
                <form method="post" id="add-or-edit-event-form" >
                    <label>Booking title:
                        <input type="text" name="title" class="ae-event-title"/>
                    </label>
                    <label>Customer name:
                        <input type="text" name="customerName" class="ae-event-customer-name"/>
                    </label>
                    <label>Customer surname:
                        <input type="text" name="customerSurname" class="ae-event-customer-surname"/>
                    </label>
                    <label>Customer phone:
                        <input type="text" name="customerPhone" class="ae-event-customer-phone"/>
                    </label>
                    <label>Additional info:
                        <textarea name="additionalInfo" class="ae-event-additional-info"></textarea>
                    </label>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary btn-block ae-add-event-btn">Add booking</button>
                        <button type="submit" class="btn btn-primary btn-block ae-save-changes-btn hidden">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<%@include file="/WEB-INF/views/jspf/user-footer.jspf" %>
<script src="<c:url value="/resources/js/fullcalendar/main.js"/> "></script>
<script src="<c:url value="/resources/js/app/app-role-user-properties.js"/>" type="module"></script>
</body>
</html>

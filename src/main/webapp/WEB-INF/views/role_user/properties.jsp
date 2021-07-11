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

<!-- SAVE NEW PROPERTY MODAL -->
<div tabindex="-1" class="modal save-new-property-modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h4>Please specify the property details</h4>
            </div>
            <div class="modal-body">
                <form method="post" id="save-new-property-form">
                    <label>Property name:
                        <input type="text" name="propertyName" class="save-property-name"/>
                    </label>
                    <label>Is property available:<br>
                        <input id="isAvailableYes" type="radio" name="isAvailable" value="true" checked="checked"/>
                        <label for="isAvailableYes">Yes</label>
                        <input id="isAvailableNo" type="radio" name="isAvailable" value="false"/>
                        <label for="isAvailableNo">No</label>
                    </label>
                    <br>
                    <label>Property type:<br>
                        <select name="propertyType" class="save-property-type">
                            <option value="0" selected>Please select a type</option>
                        </select>
                    </label>
                    <br>
                    <label>Country:<br>
                        <select name="propertyCountry" class="save-property-country">
                            <option value="0" selected>Please select a country</option>
                        </select>
                    </label>
                    <br>
                    <label>City:<br>
                        <input type="text" name="propertyCity" class="save-property-city"/>
                    </label>
                    <label>Street:<br>
                        <input type="text" name="propertyStreet" class="save-property-street"/>
                    </label>
                    <label>Postal code:<br>
                        <input type="text" name="propertyPostalCode" class="save-property-postal-code"/>
                    </label>
                    <label>Province:<br>
                        <input type="text" name="propertyProvince" class="save-property-province"/>
                    </label>
                    <label>Region:<br>
                        <input type="text" name="propertyRegion" class="save-property-region"/>
                    </label>
                    <label>Description:<br>
                        <textarea name="propertyDescription" class="save-property-description"></textarea>
                    </label>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary btn-block save-property-btn">Save property</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- ADD EVENT MODAL -->
<div tabindex="-1" class="modal add-event-modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h4>Please specify the booking details</h4>
            </div>
            <div class="modal-body">
                <form method="post" id="add-event-form">
                    <label>Booking tittle:
                        <input type="text" name="title" class="add-event-title"/>
                    </label>
                    <label>Customer name:
                        <input type="text" name="customerName" class="add-event-customer-name"/>
                    </label>
                    <label>Customer surname:
                        <input type="text" name="customerSurname" class="add-event-customer-surname"/>
                    </label>
                    <label>Customer phone:
                        <input type="text" name="customerPhone" class="add-event-customer-phone"/>
                    </label>
                    <label>Additional info:
                        <textarea name="additionalInfo" class="add-event-additional-info"></textarea>
                    </label>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary btn-block add-event-btn">Add booking</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- EDIT EVENT MODAL -->
<div tabindex="-1" class="modal edit-event-modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-header">
                    <button type="submit" class="btn btn-danger btn-block cancel-booking-btn">Cancel booking</button>
                </div>
            </div>
            <div class="modal-body">
                <form method="post" id="edit-event-form" >
                    <label>Booking tittle:
                        <input type="text" name="tittle" class="event-title-edit"/>
                    </label>
                    <label>Customer name:
                        <input type="text" name="customerName" class="event-customer-name-edit"/>
                    </label>
                    <label>Customer surname:
                        <input type="text" name="customerSurname" class="event-customer-surname-edit"/>
                    </label>
                    <label>Customer phone:
                        <input type="text" name="customerPhone" class="event-customer-phone-edit"/>
                    </label>
                    <label>Additional info:
                        <textarea name="additionalInfo" class="event-additional-info-edit"></textarea>
                    </label>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary btn-block save-event-changes-btn">Save changes</button>
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

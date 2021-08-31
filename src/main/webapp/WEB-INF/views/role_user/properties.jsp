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

<!-- CREATE OR UPDATE PROPERTY MODAL -->
<div tabindex="-1" class="modal create-or-update-property-modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header cup-modal-header">
            </div>
            <div class="modal-body">
                <form method="post" id="create-or-update-property-form">
                    <input type="hidden" name="propertyId" class="cup-property-id" value="">
                    <input type="hidden" name="userId" class="cup-property-user-id" value="${requestScope.userId}"/>
                    <label>Property name:
                        <input type="text" name="propertyName" class="cup-property-name"/>
                    </label>
                    <br>
                    <label>Property type:<br>
                        <select name="propertyType" class="cup-property-type">
                            <option value="0" selected>Please select a type</option>
                        </select>
                    </label>
                    <br>
                    <label>Country:<br>
                        <select name="propertyCountry" class="cup-property-country">
                            <option value="0" selected>Please select a country</option>
                        </select>
                    </label>
                    <br>
                    <label>City:<br>
                        <input type="text" name="propertyCity" class="cup-property-city"/>
                    </label>
                    <label>Street:<br>
                        <input type="text" name="propertyStreet" class="cup-property-street"/>
                    </label>
                    <label>Postal code:<br>
                        <input type="text" name="propertyPostalCode" class="cup-property-postal-code"/>
                    </label>
                    <label>Province:<br>
                        <input type="text" name="propertyProvince" class="cup-property-province"/>
                    </label>
                    <label>Region:<br>
                        <input type="text" name="propertyRegion" class="cup-property-region"/>
                    </label>
                    <label>Description:<br>
                        <textarea name="propertyDescription" class="cup-property-description"></textarea>
                    </label>
                    <br>
                    <label>Price:<br>
                        <input type="number" min="1" step="0.01" name="amount" class="cup-price-amount"/>
                        <input type="text" name="currency" class="cup-price-currency" readonly/>
                    </label>
                    <label>Rate type:<br>
                        <select name="rateType" class="cup-rate-type">
                            <option value="0" selected>Please select a rate type</option>
                        </select>
                    </label>
                    <label>Is property available:<br>
                        <input id="isAvailableYes" type="radio" name="isAvailable" class="cup-is-available true" value="true" checked="checked"/>
                        <label for="isAvailableYes">Yes</label>
                        <input id="isAvailableNo" type="radio" name="isAvailable" class="cup-is-available false" value="false"/>
                        <label for="isAvailableNo">No</label>
                    </label>
                    <div class="modal-footer cup-modal-footer">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- CREATE OR UPDATE EVENT MODAL -->
<div tabindex="-1" class="modal create-or-update-event-modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-header cue-modal-header">
                </div>
            </div>
            <div class="modal-body">
                <form method="post" id="create-or-update-event-form" >
                    <div class="event-details-box">
                        <div class="event-info-box">
                            <label>Event title:
                                <input type="text" name="title" class="cue-event-title"/>
                            </label>
                            <label>Customer name:
                                <input type="text" name="customerName" class="cue-event-customer-name"/>
                            </label>
                            <label>Customer surname:
                                <input type="text" name="customerSurname" class="cue-event-customer-surname"/>
                            </label>
                            <label>Customer phone:
                                <input type="text" name="customerPhone" class="cue-event-customer-phone"/>
                            </label>
                            <label>Additional info:
                                <textarea name="additionalInfo" class="cue-event-additional-info"></textarea>
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer cue-modal-footer">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<%@include file="/WEB-INF/views/jspf/footer.jspf" %>
<script src="<c:url value="/resources/js/fullcalendar/main.js"/> "></script>
<script src="<c:url value="/resources/js/app/app-role-user-properties.js"/>" type="module"></script>
</body>
</html>

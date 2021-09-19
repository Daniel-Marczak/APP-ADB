<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Accommodation Cloud</title>
    <%@include file="/WEB-INF/views/jspf/header.jspf" %>
</head>

<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
<%@include file="/WEB-INF/views/jspf/reservation-navbar.jspf" %>
<div class="search-banner" id="banner">
    <div class="search-bg-overlay">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text">
                        <h2>Accommodations available in <span>${requestScope.location}</span></h2>
                    </div>
                    <div class="search-banner-search-bar">
                        <form class="search-form" method="get" action="<c:url value="/reservation/search-result"/>">
                            <input type="hidden" class="days-input" name="days" value="1">
                            <input type="hidden" class="search-page" name="page" value="0">
                            <input type="hidden" class="search-event-start" name="eventStart">
                            <input type="hidden" class="search-event-end" name="eventEnd">
                            <div class="location-input-box">
                                <label class="location-input-label">
                                    <input type="text" name="location" value="${requestScope.location}" class="location-name-input" autoComplete="off" placeholder="location" required>
                                </label>
                                <div class="location-item-span-box">
                                </div>
                            </div>
                            <div class="date-guest-selection-box">
                                <label class="event-start-input-label">
                                    <input type="date" class="event-start-input" required value='${requestScope.eventStart}'>
                                </label>
                                <label class="event-end-input-label">
                                    <input type="date" class="event-end-input" required value='${requestScope.eventEnd}'>
                                </label>
                                <label class="guest-input-label">
                                    <button type="button" class="guests-spin-btn" onclick="this.parentNode.querySelector('.guests-input').stepDown();"> - </button>
                                    <input class="guests-input" type="number" value="${requestScope.guests}" name="guests" step="1" placeholder="guests" min="1" required>
                                    <button type="button" class="guests-spin-btn" onclick="this.parentNode.querySelector('.guests-input').stepUp();"> + </button>
                                </label>
                                <button type="submit" class="search-bar-form-submit-btn">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="features">
    <div class="container">
            <c:if test="${!empty requestScope.availableProperties}">
                <c:forEach var="property" items="${requestScope.availableProperties}">
                    <div class="row">
                        <div class="search-property-row">
                            <div class="search-property-photo-box">
                                <img class="search-property-img" src="data:image/jpg;base64,${property.propertyPhoto.imgSrc}" alt="${property.propertyPhoto.fileName}">
                            </div>
                            <div class="search-property-details-box">
                                <div class="search-property-name-box">
                                    <h3 class="search-property-name">
                                        <c:out value="${property.propertyName}"/>
                                    </h3>
                                    <span class="search-property-type">
                                    <c:out value="${property.propertyType.propertyTypeName}"/>
                                </span>

                                </div>
                                <div class="search-property-address-box">
                                <span>
                                    <c:out value="${property.propertyAddress.country.countryName}"/>,&nbsp;
                                </span>
                                    <span>
                                    <c:out value="${property.propertyAddress.location}"/>,&nbsp;
                                </span>
                                    <span>
                                    <c:out value="${property.propertyAddress.province}"/>,&nbsp;
                                </span>
                                    <span>
                                    <c:out value="${property.propertyAddress.region}"/>
                                </span>
                                </div>
                                <div class="search-property-description-box">
                                    <h4 class="search-description-header">
                                        <c:out value="${property.propertyDescription.descriptionHeader}"/>
                                    </h4>
                                    <p class="search-description-text">
                                        <c:out value="${property.propertyDescription.descriptionText}"/>
                                    </p>
                                </div>

                                <div class="search-stay-price-box">
                                <span class="search-stay-price-currency">
                                    &nbsp;<c:out value="${property.stayPrice.currency}"/>
                                </span>
                                    <span class="search-stay-price-amount">
                                    <fmt:formatNumber type="number" maxFractionDigits="2" value="${property.stayPrice.amount}" />
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </c:if>
        <c:if test="${requestScope.totalPages > 1}">
            <div class="row page-request-container">
                <c:forEach begin="1" end="${requestScope.totalPages}" varStatus="pageNumber">
                    <div class="page-request-box">
                        <form class="page-request-form" action="<c:url value="/reservation/search-result"/>">
                            <input type="hidden" name="location" value="${requestScope.location}">
                            <input type="hidden" name="guests" value="${requestScope.guests}">
                            <input type="hidden" name="days" value="${requestScope.days}">
                            <input type="hidden" name="page" value="${pageNumber.index - 1}">
                            <input type="hidden" name="eventStart" value="${requestScope.eventStart}">
                            <input type="hidden" name="eventEnd" value="${requestScope.eventEnd}">
                            <c:choose>
                                <c:when test="${pageNumber.index - 1 != requestScope.currentPage}">
                                    <button type="submit" class="page-request-btn">${pageNumber.index}</button>
                                </c:when>
                                <c:when test="${pageNumber.index - 1 == requestScope.currentPage}">
                                    <button type="submit" class="page-request-btn-current" disabled>${pageNumber.index}</button>
                                </c:when>
                            </c:choose>
                        </form>
                    </div>
                </c:forEach>
            </div>
        </c:if>

    </div>
</div>

<!-- Portfolio -->
<div id="work" class="portfolio">
    <div class="contact" id="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <h3>Contact Us</h3>
                    </div>
                </div>
                <div class="col-md-7 col-sm-offset-0 col-sm-6 col-xs-offset-1 col-xs-10">
                    <div class="contact-form-div">
                        <form role="form" class="contact-form">
                            <div class="col-md-6">
                                <input type="text" class="form-control contact-input contact-name" id="name"
                                       placeholder="Name">
                                <label class="text-error error-name hidden">Valid name is required.</label>
                            </div>
                            <div class="col-md-6">
                                <input type="email" class="form-control contact-input contact-email" id="email"
                                       placeholder="Email">
                                <label class="text-error error-email hidden">Valid email is required.</label>
                            </div>
                            <div class="col-md-12">
                                <textarea class="form-control contact-textarea" placeholder="Message" rows="6"
                                          minlength="10" maxlength="255"></textarea>
                                <label class="text-error error-text hidden">The message must be 10 to 255 characters
                                    long.</label>
                            </div>
                            <div class="col-md-12 text-center">
                                <button type="submit" class="contact-button hidden">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-offset-1 col-md-4 col-sm-offset-1 col-sm-5 col-xs-offset-1 col-xs-10">
                    <div class="address">
                        <h4>Address</h4>
                        <p>Accommodation Cloud<br>
                            My Street 15<br>
                            93-008, Lodz<br>
                        <div class="email"><i class="fa fa-at"></i>office@acloud.com<br>
                            <i class="fa fa-mobile"></i>+48 777 777 777
                        </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
    <%@include file="/WEB-INF/views/jspf/footer.jspf" %>
    <script src="<c:url value="/resources/js/app/index.js"/>"></script>
    <script src="<c:url value="/resources/js/app/property-search.js"/>"></script>
</body>
</html>

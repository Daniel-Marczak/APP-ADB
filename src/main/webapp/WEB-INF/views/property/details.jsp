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
                </div>
            </div>
        </div>
    </div>
</div>
<div class="features">
    <div class="container">
        <div class="row">
            <div>
                <c:out value="${requestScope.property.propertyName}"/>
            </div>
        </div>
        <div class="row">
            <div>
                <c:out value="${requestScope.property.propertyDescription}"/>
            </div>
        </div>
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
    <script src="<c:url value="/resources/js/app/property/search.js"/>"></script>
</body>
</html>

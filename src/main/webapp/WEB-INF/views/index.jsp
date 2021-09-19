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
<%@include file="/WEB-INF/views/jspf/navbar.jspf" %>
<div class="banner" id="banner">
    <div class="bg-overlay">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner-text">
                        <h2>Welcome to <span>Accommodation Cloud</span></h2>
                        <p>This text has to be changed</p>
                    </div>
                    <div class="index-banner-search-bar">
                        <form class="search-form" method="get" action="<c:url value="/reservation/search-result"/>">
                            <input type="hidden" class="days-input" name="days">
                            <input type="hidden" class="search-page" name="page" value="0">
                            <input type="hidden" class="search-event-start" name="eventStart">
                            <input type="hidden" class="search-event-end" name="eventEnd">
                            <div class="location-input-box">
                                <label class="location-input-label">
                                    <input type="text" name="location" class="location-name-input" autoComplete="off" placeholder="location" required>
                                </label>
                                <div class="location-item-span-box">
                                </div>
                            </div>
                            <div class="date-guest-selection-box">
                                <label class="event-start-input-label">
                                    <input type="date" class="event-start-input" required>
                                </label>
                                <label class="event-end-input-label">
                                    <input type="date" class="event-end-input" required>
                                </label>
                                <label class="guest-input-label">
                                    <button type="button" class="guests-spin-btn" onclick="this.parentNode.querySelector('.guests-input').stepDown();"> - </button>
                                    <input class="guests-input" type="number" name="guests" step="1" placeholder="guests" min="1" required>
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
        <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="feature-box media">
                    <div class="icon-box text-center pull-left media-object"><i class="icon-user-following"></i></div>
                    <div class="feature-text media-body">
                        <h4>You ...</h4>
                        <p class="feature-detail">
                            register your accommodation business.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="feature-box media pull-left">
                    <div class="icon-box text-center pull-left media-object"><i class="icon-user"></i></div>
                    <div class="feature-text media-body">
                        <h4>We ...</h4>
                        <p class="feature-detail">
                            provide a business managing tool.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="feature-box media pull-left">
                    <div class="icon-box text-center pull-left media-object"><i class="icon-people"></i></div>
                    <div class="feature-text media-body">
                        <h4>Together ...</h4>
                        <p class="feature-detail">
                            we can achieve more.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Portfolio -->
<div id="work" class="portfolio">
    <div class="container">
        <div class="row">
            <div class="col-lg-10 col-lg-offset-1 text-center text">
                <h3>Properties</h3>
                <p>Photographs of a fraction of properties whose owners run their business using Accommodation
                    Cloud.</p><br>
                <div class="row">
                    <div class="col-md-6 col-sm-6">
                        <div class="portfolio-item"><img alt="cottage_house" class="img-portfolio img-responsive"
                                                         src="<c:url value="/resources/img/cottage_house.jpg"/>"></div>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <div class="portfolio-item"><img alt="loft" class="img-portfolio img-responsive"
                                                         src="<c:url value="/resources/img/loft.jpg"/>"></div>
                    </div>
                    <div class="col-md-6 col-sm-6">

                        <div class="portfolio-item"><img alt="log_house" class="img-portfolio img-responsive"
                                                         src="<c:url value="/resources/img/log_house.jpg"/>"></div>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <div class="portfolio-item"><img alt="tenement" class="img-portfolio img-responsive"
                                                         src="<c:url value="/resources/img/tenement.jpg"/>"></div>
                    </div>
                </div>
                <!-- /.row (nested) -->
                <%--                <a href="#" class="view-more">View More Items</a> </div>--%>
                <!-- /.col-lg-10 -->
            </div>
        </div>
    </div>

    <div class="call-to-action">
        <div class="call-overlay">
            <div class="container">
                <div class="testimonials" id="testimonials">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="text-center">
                                    <h3>Testimonials</h3>
                                </div>
                            </div>
                            <div class="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
                                <div id="owl-demo" class="owl-carousel owl-theme test">
                                    <div class="item">
                                        <p><sup><i class="fa fa-quote-left"></i></sup>...this tool really made managing
                                            my business simple.<sup><i class="fa fa-quote-right"></i></sup></p>
                                        <div class="test-img"><img src="<c:url value="/resources/img/user_icon.jpg"/>"/>
                                            <p><strong>Arthur, Stockport</strong></p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <p><sup><i class="fa fa-quote-left"></i></sup>I am so happy that my friend
                                            recommended me this website.<sup><i class="fa fa-quote-right"></i></sup></p>
                                        <div class="test-img"><img src="<c:url value="/resources/img/user_icon.jpg"/>"/>
                                            <p><strong>John, Warsaw</strong></p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <p><sup><i class="fa fa-quote-left"></i></sup>... and I wish I discovered this
                                            platform sooner.<sup><i class="fa fa-quote-right"></i></sup></p>
                                        <div class="test-img"><img src="<c:url value="/resources/img/user_icon.jpg"/>"/>
                                            <p><strong>Julia, Kungsbacka</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="about" id="about">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h3>About Us</h3>
                </div>
                <div class="col-md-6">
                    <div class="about-text">
                        <p>
                            Accommodation Cloud is a platform for managing accommodation business.
                            Not only does it simplify running your business, but also makes reaching it
                            more likely as we share your location, number of rooms available etc. with
                            booking websites we cooperate with.
                        </p>
                        <p>
                            We offer a user-friendly, online scheduler and booking software with an eye-
                            pleasing, intuitive interface and we are sure that once you start using it, you'll
                            never want to change it for anything else.
                        </p>
                        <p>
                            Our tool was designed to suit the needs of all the types of accommodation
                            businesses so it does not really matter if your business is a small, single-story
                            lodge cabin in the middle of the so-called nowhere, or a multiple-story
                            tenement in the centre of a big city.
                        </p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-6 col-sm-6 col-xs-6 block">
                        <div class="counter-item text-center">
                            <h5>Our Users</h5>
                            <div class="timer" data-from="0" data-to="55" data-speed="5000"
                                 data-refresh-interval="50"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="counter-item text-center">
                            <h5>Cooperating Websites</h5>
                            <div class="timer" data-from="0" data-to="88" data-speed="5000"
                                 data-refresh-interval="50"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

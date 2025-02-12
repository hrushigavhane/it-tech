/*
    Template Name    : Inform - IT Solutions & Business Services Web Template
    Author           : AvailableCoder
    Version          : 1.0
    Created          : 2021
    File Description : Main javascript file of the template
*/

$(document).ready(function () {

    // Scroll button && Preloader
    $(".scroll-top").click(function() {
        $("body , html").animate({scrollTop : 0} , 0 ,1500);
    });
    $(".preloader").delay(750).fadeOut(500);
    // $(".preloader").fadeOut();

    // ---------------

    // Function on scrolling
    $(window).scroll(function(){
        // Activating header links on scrolling
        $("section").each(function(){
            if ($(window).scrollTop() > $(this).offset().top - 1) {
                var sectionID = $(this).attr('id');
                $("nav li a[data-scroll='" + sectionID +"']")
                .addClass('active').parent()
                .siblings().find('a').removeClass('active');
            }
        });
        // ---
        // Header animation 
        if ($(this).scrollTop() > 80) {
            $("header").addClass("slide-header");
            $("header nav .navbar-brand img").attr("src" , "images/logos/logo_color.png")
        } else {
            $("header").removeClass("slide-header");
            $("header nav .navbar-brand img").attr("src" , "images/logos/logo_white.png")
        }
        // ---
        // ScrollTop show
        if ($(this).scrollTop() > 200) {
            $(".scroll-top").addClass("shown");
        } else {
            $(".scroll-top").removeClass("shown");
        }
        // ---
    });
    // ---------------


    // ---------------

    // Header
    $("header nav.navbar-responsive .menu-toggle-button").click(function (){
        $(this).toggleClass("nav-activated");
        $("header nav ul.navbar-nav").slideToggle();
    });
    $("header nav.navbar-responsive ul li.drop-cont > button.nav-link").click(function (){
        $(this).toggleClass("header-list-active").parent("li.drop-cont").siblings().children("button.nav-link").removeClass("header-list-active");
        $(this).next("ul").slideToggle().parent("li.drop-cont").siblings().children(".dropdown-items").slideUp();
    });

    // ---------------


    // Home Slider 
    var swiper = new Swiper('.home-slider', {
        speed: 1500,
        parallax: true,
        autoplay: true,
        loop: true,
        effect: 'creative',
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ['-100%', 0, 1],
            },
                next: {
                translate: ['25%', 0, -1]
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    // ---------------

    // About Progress
    $(".about .about-field .about-content .about-prog .about-bar").each(function(){
        $(this).appear(function() {
            var liquid_load = $(this).children(".ab-load").find("span.liq-load");
            var circle_load = $(this).children(".ab-load").find("span.liq-load");
            liquid_load.css({
                width: liquid_load.data("progress")
            });
        });
    });
    // ---------------

    // Counter
    $(".odometer").each(function(){
        $(this).appear(function() {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });
    // ---------------

    // Projects section
    // shuffiling images
    var mixer = mixitup('.projects-shuffle' , {
        "animation": {
            "duration": 1000,
            "nudge": true,
            "reverseOut": true,
            "effects": "fade scale(0.97) rotateY(90deg) stagger(30ms)"
        }
    });
    $("section.projects .prog-filter ul").on('click' , 'li' , function(){
        $(this).addClass("active").siblings().removeClass("active")
    });
    // ---------------

    // Review Slider 
    var swiper = new Swiper('.review-slider', {
        speed: 1200,
        effect: 'coverflow',
        grabCursor: true,
        loop: true,
        autoplay: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
    });
    // ---------------

    // Partners Slider 
    var swiper = new Swiper('.partner-slider', {
        speed: 600,
        loop: true,
        slidesPerView: 1,
        autoplay: true,
        grabCursor: true,
        breakpoints:{
            576:{
                 slidesPerView: 2, 
                },
            768:{
                slidesPerView: 3, 
                },
            992:{
            slidesPerView: 4, 
            }
        }
    });
    // ---------------

    // F.A.Q. Accordion
    $(".faq .accordion-field .faq-ques .ques-title").click(function(){
        $(this).next("p.answer").slideToggle(250);
        $(this).parent(".faq-ques").siblings().find("p.answer").slideUp(250);
        $(this).toggleClass("faq-rotating")
        .parent(".faq-ques").siblings().find(".ques-title").removeClass("faq-rotating");
    });
    // ---------------

    // Form Validation & Activation
    $(".form-contact").submit(function (e) { 
        e.preventDefault(e);
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize()
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $('.respond-message').fadeIn();
                $('.respond-message').text(response);
                $(".form-contact").find("input:not(input[type='submit'])").val('');
                $(".form-contact").find("textarea").val('');
                $('.respond-message').delay(3000).fadeOut()
            })
            .fail(function(data) {
                // Set the message text.
                if (data.responseText !== '') {
                    $('.respond-message').fadeIn();
                    $('.respond-message').text(data.responseText);
                    $(".form-contact").find("input:not(input[type='submit'])").val('');
                    $(".form-contact").find("textarea").val('');
                    $('.respond-message').delay(3000).fadeOut()
                } else {
                    $('.respond-message').fadeIn();
                    $('.respond-message').text('An error occurred while sending.');
                    $(".form-contact").find("input:not(input[type='submit'])").val('');
                    $(".form-contact").find("textarea").val('');
                    $('.respond-message').delay(3000).fadeOut()
                }
         });
    });
    // ---------------

    // Coming Soon Countdown
    function comingTimer() {
        var endTime = new Date("November 14, 2022 17:00:00 PDT");			
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");
    }
    setInterval(function() { comingTimer(); }, 1000);
    // ---------------


});
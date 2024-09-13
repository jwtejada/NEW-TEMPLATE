$(function () {
    $('header nav').meanmenu({
        meanMenuContainer: 'header .place-nav',
        meanMenuOpen: "<i class='icon-menu'></i>",
        meanMenuClose: "<i class='icon-plus'></i>",
        meanScreenWidth: 1024,
        meanDisplay: "block"
    });
    // this will get the full URL at the address bar
    var url = window.location.href; 
    // passes on every "a" tag 
    $("#main-nav a").each(function() {
        // checks if its the same on the address bar
        if(url == (this.href)) { 
            $(this).closest("li").addClass("active").attr("aria-current", "Page");
        }
    });

    $("nav a[href^='https']").attr({target:"_blank", rel:"noopener noreferrer" });
    /// Revised anchors for page divider 2.0 - 2024 @ Jose
    $("p:has(a[name]) + h2").prev().addClass("has_anchor");
    $("p:has(a[name]) + h3").prev().addClass("h3_anchor");
    $(".has_anchor").each(function() {
        $(this).next().addBack().wrapAll('<div class="dividerLead" />');
    })
    $(".h3_anchor").each(function() {
        $(this).next().addBack().wrapAll('<div class="miniLead" />');
    })
    /// end anchor setup.
    $("#page h1, h2#append").appendTo("#page-title");
    $("#page .page-divider").parent("#page").addClass('has_divider');
    $(".internal .more-to-explore").appendTo(".internal");

    $("#main-link").click(function() { $('main').focus(); });
    $("#nav-link").click(function() { $('#main-nav').focus(); });
    $("#bn-play").click(function() { $('#bn-vid').focus(); });
    $("#popup").click(function() { $('.modal-content').focus(); });
    
    ///////////// global variables
    var theWindow = $(window),
        body = $("body"),
        header = $("header"),
        headerBottom = $("header").outerHeight(),
        stickyBottom = $("header #hd-top").outerHeight(); 

    /////////////// resize options
    $(window).on('resize', function () {
        $("body").css('padding-top', $("header").outerHeight());
        $(".mean-container .mean-nav").css('bottom', $("#fixed-tabs").outerHeight());
        if ($(window).width() <= 1024) {
            //$("body").css('padding-top', $("header").outerHeight());
            $("footer").css('padding-bottom', $("#fixed-tabs").outerHeight());
        }
    }).trigger('resize');

    /////////////// fixed header with animated in on desktop and attach on mobile
    theWindow.on("scroll", function () {
        if (theWindow.width() > 1024) {
            if (theWindow.scrollTop() >= headerBottom) {
                body.addClass("fix-nav");
                header.addClass("animated slideInDown");
            } else if (theWindow.scrollTop() <= headerBottom) {
                body.removeClass("fix-nav");
                header.removeClass("animated slideInDown");
            }
        }
    });

    // add haspopup to submenus
    $('nav ul li').each(function() {
        if ($(this).find('ul').length) {
            ($(this).addClass('has-submenu').attr('aria-haspopup', 'true'))
        }
    });
    if (theWindow.width() > 1024) {
       $('nav > ul > .has-submenu > a').append("<button aria-label='Toggle submenu'><i class='icon-angle-down'></i></button>")
       $('nav ul ul > .has-submenu > a').append("<button aria-label='Toggle submenu'><i class='icon-angle-right'></i></button>")
    }

    /// Scroll nav up on mobile
    if ($(window).width() <= 1024) {
        var didScroll,
            lastScrollTop=0,
            delta=5,
            navbarHeight=$("header").outerHeight();
            function hasScrolled(){
                var l=$(this).scrollTop();
                Math.abs(lastScrollTop-l)<=delta||(l>lastScrollTop&&l>navbarHeight?$("header").removeClass("nav-down").addClass("nav-up"):l+$(window).height()<$(document).height()&&$("header").removeClass("nav-up").addClass("nav-down"),lastScrollTop=l)
            }
            $(window).scroll(function(l){
                didScroll=!0}),
                setInterval(function(){
                    didScroll&&(hasScrolled(),didScroll=!1)
                },250);   
        $("footer .social").clone().prependTo(".mean-container .mean-nav");
        $("footer .hours").clone().appendTo(".mean-container .mean-nav");
    }


    //// Prepends + appends Close button to popups modals - gives keyboard focus easier access to close button.
    $(".modal-content").prepend('<button class="modal-close" aria-label="close popup"><svg xmlns="http://www.w3.org/2000/svg" width="18.385" height="18.385" viewBox="0 0 18.385 18.385"><g id="Group_2628" data-name="Group 2628" transform="translate(-1055.307 -6754.308)"><line id="Line_259" data-name="Line 259" x2="24" transform="translate(1056.015 6771.985) rotate(-45)" fill="none" stroke="#1b322c" stroke-linecap="round" stroke-width="1"/><line id="Line_260" data-name="Line 260" x2="24" transform="translate(1056.015 6755.015) rotate(45)" fill="none" stroke="#1b322c" stroke-linecap="round" stroke-width="1"/></g></svg><span>Close Popup</span></button>');
    $(".modal-content").append('<button class="modal-close" aria-label="close popup"><svg xmlns="http://www.w3.org/2000/svg" width="18.385" height="18.385" viewBox="0 0 18.385 18.385"><g id="Group_2628" data-name="Group 2628" transform="translate(-1055.307 -6754.308)"><line id="Line_259" data-name="Line 259" x2="24" transform="translate(1056.015 6771.985) rotate(-45)" fill="none" stroke="#1b322c" stroke-linecap="round" stroke-width="1"/><line id="Line_260" data-name="Line 260" x2="24" transform="translate(1056.015 6755.015) rotate(45)" fill="none" stroke="#1b322c" stroke-linecap="round" stroke-width="1"/></g></svg><span>Close Popup</span></button>');

    //// Clicking popup moves keyboard focus into modal 
    $("a[rel*=leanModal]").on("click", function(){
        let href = $(this).attr('href');
        let trimmed = href.substring(1);
        // console.log(trimmed)
        document.getElementById(trimmed).focus();
    });

     // In Firefox and Safari plays modal popup videos automatically
    $("#openVid").on("click", function() {
        $("#bio-modal .youtube:not('.active')").trigger("click");
    });
    // Closing popup modal turns off video
    $(".modal-close").on("click", function(){
        for (var i = 0; i < $('.modal-content iframe').length; i++) {
          var video = $('.modal-content iframe').attr("src");
          var video = video.replace("autoplay=1", "autoplay=0") ;
          $('.modal-content iframe').attr("src","");
          $('.modal-content iframe').attr("src",video);
        }
    });

    // var menuItemsBut = document.querySelectorAll('li.has-submenu');
    // Array.prototype.forEach.call(menuItemsBut, function(el, i){
    //     el.querySelector('button').addEventListener("click",  function(event){
    //         if (this.parentNode.parentNode.className == "has-submenu") {
    //             this.parentNode.parentNode.className = "has-submenu open";
    //             this.setAttribute('aria-expanded', "true");
    //         } else {
    //             this.parentNode.parentNode.className = "has-submenu";
    //             this.setAttribute('aria-expanded', "false");
    //             this.parentNode.parentNode.className = "has-submenu";
    //         }
    //         event.preventDefault();
    //         return false;
    //     });
    // });
});   // end of top function

$(function () {
    var theWindow = $(window);
    // INTERIOR PAGES SCRIPTS
    // page title + intro - interior banner
    $("#page > p:first-of-type").each(function() {
        $(this).nextUntil("div, h1, h2, h3, form").addBack().wrapAll("<article id='intro'>")
    });
    // Attach Intro to banner
    $("#intro").appendTo("#interior-banner .contain")

    ///// Takes main banner image on page and flexes with page title
    $("#main-img").appendTo("#interior-banner .contain")
    $("#main-img").appendTo("#interior-banner")
    $('#interior-banner').each(function() {
        if ($(this).find('#main-img').length) {
            $("#interior-banner").addClass('has-main');
            //$("#interior-banner #page-title").next('#intro').addBack().wrapAll('<div>')
            $("#interior-banner .contain").next('#main-img').addBack().wrapAll('<div>').parent().addClass('flex-title');
        }
    });

    ////////////////////////////// Randomized Banner Background
     var selectBG = Math.floor(Math.random() * 10) + 1;
     if ($("#interior-banner").hasClass("random") ) {
         $('#interior-banner').css({
             'background-image': 'url(assets/images/banner-' + selectBG + '.jpg)',
             'background-size': 'cover',
             'background-repeat': 'no-repeat',
             'background-position': 'center center'
         })
     }

     $("#static-banner").each(function() {
        var staticBn = $(this).find("img").attr("src");
        $('#interior-banner').css({
            'background-image': 'url(' + staticBn + ')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center center'
        })
    })
    // Why Section
    $( ".why ul li" ).wrapInner( "<span></span>");

    ////////////////////////////// FAQ / Accordion
    $(".accordion > h3, .accordion > h2").each(function () {
        $(this).wrap('<button></button>').parent().addClass('toggle');
    });
    $(".toggle").each(function () {
        $(this).nextUntil('.toggle')
            .add()
            .wrapAll('<div>');
        $(this).nextUntil('.toggle').addBack() //wrap all
            .wrapAll("<div class='faq' />");
    });
    $(".toggle").on("click", function () {
        if ($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active").find("div").slideUp();
        } else {
            $(".toggle").parent().removeClass("active").find("div").slideUp();
            $(this).parent().addClass("active").find("div").slideDown();
        }
        for (var i = 0; i < $('.accordion iframe').length; i++) {
            var video = $('.accordion iframe').attr("src");
            var video = video.replace("autoplay=1", "autoplay=0") ;
            $('.accordion iframe').attr("src","");
            $('.accordion iframe').attr("src",video);
          }
    });

    ////////////////////////////// page divider v2.0 - 2024@Jose
    var dividerStart = "> h2, .dividerLead, .page-divider .wrap",
    mobileWidth = 1025;
    $.when(setupServices()).done(function () {});
    function setupServices() {
    $(".page-divider " + dividerStart)
        .addClass("dividerLead").each(function () { //auto wrap
            $(this)
                .nextUntil('.dividerLead')
                .addBack()
                .wrapAll('<div class="block">');
    });
    ///////////// move anchors to top of blocks
    $(".block").each(function (index) {
        $(this)
            .find('.dividerLead')
            .next(".elem")
            .addClass('wow fadeIn')
            .addClass(index % 2 ? 'elem-right' : 'elem-left')
        // move .elem above H2
        if ($(window).width() >= mobileWidth) {
            $(this).children(".elem").insertBefore($(this).children(".dividerLead"));
        }
    })
    
    }
    $(".block [class^='btn']").parent("p").addClass('has_btn');
    /////////  mini-blocks for h3 inside divider blocks
    var miniStart = "> h3, .miniLead";
    $(".block " + miniStart)
    .addClass("miniLead").each(function () { //auto wrap
    $(this)
        .nextUntil('.miniLead')
        .addBack()
        .wrapAll('<div class="mini-block">');
    });
    // mini-blocks elem align
    $(".mini-block").each(function (index) {
    if ($(this).closest('.block').find('.elem.elem-right').length) {
        $(this)
        .find('.miniLead')
        .next(".elem-sm")
        .addClass(index % 2 ? 'elem-right' : 'elem-left')
    } else if ($(this).closest('.block').find('.elem.elem-left').length) {
        $(this)
        .find('.miniLead')
        .next(".elem-sm")
        .addClass(index % 2 ? 'elem-left' : 'elem-right')
    } else {
        $(this)
        .find('.miniLead')
        .next(".elem-sm")
        .addClass('elem-left')
    }
    if ($(window).width() >= mobileWidth) {
        $(this).children(".elem-sm").insertBefore($(this).children(".miniLead"));
    }
    })
    ///////////// wraps text & .btn in article after .block .elem
    $(".block .elem + *, .block .wrap, .mini-block .miniLead").each(function () { //auto wrap
    $(this).nextUntil('.block, .mini-block').addBack().wrapAll('<article>');
    });

    /// for flexing inside .blocks
    $(".block .elem").each(function () { //auto wrap
    $(this).nextUntil('.block, .mini-block').addBack().wrapAll('<div>').parent().addClass('contain');
    });
    ////////  If no image insided block to change styles
    $('.block').each(function() {
    if (!$(this).find('.elem').length) {
        ($(this).addClass('no_img'))
    }
    });
    $(".block.no_img .dividerLead").each(function () { //auto wrap
    $(this).nextUntil('.block').addBack().wrapAll('<article>');
    });
    /// end revised divider

    //MORE TOGGLE
    $(".block").each(function() {
        if ( $(this).find('.more-toggle').length ) {
            $(this).addClass("has-toggle").each(function() {
                $(this).find(".mini-block").wrapAll('<div class="mini-wrapper" />');
                $(".mini-wrapper").slideUp();
            });
        }
    });
    $(".more-toggle").click(function(){ //use button class more-toggle before H3
        $(this).parents(".has-toggle").find(".mini-wrapper").slideToggle();
    });

    /////////// If needed to change explore section if page divider ends with odds
    //$(".page-divider .block:nth-of-type(odd):last-child").parent(".page-divider").addClass('has_oddlast');
    //if ($(".page-divider").hasClass("has_oddlast")) {
    //  $('.more-to-explore').addClass("bkgrd");
    //}

    // COVER IMAGES TO BACKGROUND
    // if (theWindow.width() > 1024) {
    //  $(".bkg-img").each(function() {
    //     var bkgImg = $(this).find("figure img").attr("src");
    //         $(this).css({
    //             'background-image': 'url(' + bkgImg + ')',
    //             'background-size': 'cover',
    //             'background-repeat': 'no-repeat',
    //             'background-position': 'center center',
    //             'background-attachment': 'fixed'
    //         })
    //     })
    // }

    //////// Banner and testimonial video with different top offsets
    var theWindow = $(window);
    $("#banner[data-player]").tntvideos({
        playButton: '.play',
        closeButton: '.close',
        bodyPlaying: null,
        mobileWidth: 1000,
        animate: true,
        closeButtonString: '<button class="close" aria-label="close video"><i class="icon-plus"></i> Close Video</button>'
    });
    if (theWindow.width() < 1001) {
        $('#banner .play').appendTo('#banner [data-embed]')
    }

    $(".modal-content[data-player]").tntvideos({
        playButton: '.yt-play',
        closeButton: '.close',
        animate: true,
        mobileWidth: 1000
    });    
    $("#testimonials[data-player]").tntvideos({
        playButton: '.play',
        closeButton: '.close',
        animate: true,
        mobileWidth: 1000
    });
    //Basic youtube embed with close button/for internal pages
    $(".internal [data-player]").tntvideos({
        closeButton: '.close',
        playButton: '.yt-play',
        animate: false,
        mobileWidth: 1000,
        offset:0,
        closeButtonString: '<span><i class="icon-plus"></i></span>'
    });
    $('.video-grid > div iframe').wrap('<div class="videoWrapper"></div>')

    ////////////// ALL SLIDERS 
    $(".slick-reviews").slick({   
        dots:true,   
        arrows:true,  
        appendDots:"#reviews .slick-controls",
        draggable:false,
        autoplay:true,
        cssEase: 'linear',
        autoplaySpeed:10000,
        slidesToScroll:1,
        slidesToShow:1,
        prevArrow:'<button class="arrow" id="prev" aria-label="Previous Slide"><i class="icon-angle-left"></i></button>',
        nextArrow:'<button class="arrow" id="next" aria-label="Next Slide"><i class="icon-angle-right"></i></button>',
        speed:300,
        customPaging:function(slider,index) {         
            return '<button><span></span></button>' 
        },
        responsive: 
        [{
            breakpoint: 1000,
            settings: {     
                appendArrows:"#reviews .slick-controls",
                fade: true,
            } 
        }]       
    });   

    //Slider Form
    $(".slick-form").slick({      
        dots:true,     
        infinite:false,
        draggable: false,
        prevArrow:'',
        nextArrow:'.input .next', 
        arrows:true,
        customPaging:function(slider,index) {         
            return '<div><span></span></div>' 
        },
    }); 
    //prevent validator on slider form
    $('.slick-form input').on('invalid', function(e) { e.preventDefault(); });

    // GALLERY SLIDER COUNT
    // var $status = $('.gallery .pagingInfo');
    // var $gallery = $('.gallery .slick-gallery');
    // $gallery.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    //     //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    //     var i = (currentSlide ? currentSlide : 0) + 1;
    //     $status.html(`<span> ${i} </span>/<span> ${slick.slideCount} </span> `)
    // });
    $(".slick-gallery").slick({
        dots:true,
        arrows:true, 
        fade: true,
        autoplay:false,
        adaptiveHeight: true,
        appendDots:".slick-controls",
        prevArrow:'<button class="arrow" id="prev" aria-label="Previous Slide"><i class="icon-angle-left"></i></button>',
        nextArrow:'<button class="arrow" id="next" aria-label="Next Slide"><i class="icon-angle-right"></i></button>',     
        customPaging:function(slider,index) {         
            return '<button><span></span></button>' 
        },
        responsive: 
        [{
            breakpoint: 700,
            settings: {  
                appendArrows:".slick-controls",
                dots:true
            } 
        }]     
    }); 
});   /*end of videos & slider function */

//// anchors function
$(document).ready(function() {
    if(window.location.hash) {
	var tag = $('a[name=' + window.location.hash.substring(1) +']')
	$(tag)[0].scrollIntoView();
    }
});

/* cool form */
if(!String.prototype.trim){(function(){var rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;String.prototype.trim=function(){return this.replace(rtrim,'')}})()}[].slice.call(document.querySelectorAll('.input__field')).forEach(function(inputEl){if(inputEl.value.trim()!==''){classie.add(inputEl.parentNode,'input--filled')}
inputEl.addEventListener('focus',onInputFocus);inputEl.addEventListener('blur',onInputBlur)});function onInputFocus(ev){classie.add(ev.target.parentNode,'input--filled')}
function onInputBlur(ev){if(ev.target.value.trim()===''){classie.remove(ev.target.parentNode,'input--filled')}}
'use strict';function classReg(className){return new RegExp("(^|\\s+)"+className+"(\\s+|$)")}
var hasClass,addClass,removeClass;if('classList' in document.documentElement){hasClass=function(elem,c){return elem.classList.contains(c)};addClass=function(elem,c){elem.classList.add(c)};removeClass=function(elem,c){elem.classList.remove(c)}}else{hasClass=function(elem,c){return classReg(c).test(elem.className)};addClass=function(elem,c){if(!hasClass(elem,c)){elem.className=elem.className+' '+c}};removeClass=function(elem,c){elem.className=elem.className.replace(classReg(c),' ')}}
function toggleClass(elem,c){var fn=hasClass(elem,c)?removeClass:addClass;fn(elem,c)}
var classie={hasClass:hasClass,addClass:addClass,removeClass:removeClass,toggleClass:toggleClass,has:hasClass,add:addClass,remove:removeClass,toggle:toggleClass};if(typeof define==='function'&&define.amd){define(classie)}else{window.classie=classie}

$(document).ready(function () {
	setMaxheight('.is-same-height .ab-items .ab-item img', getMaxHeight('.is-same-height .ab-items .ab-item img'));
	setMaxheight('.is-same-height .ab-items .ab-item h2', getMaxHeight('.is-same-height .ab-items .ab-item h2'));
	setMaxheight('.is-same-height .ab-items .ab-item p', getMaxHeight('.is-same-height .ab-items .ab-item p'));
	setMaxheight('.is-same-height .ab-items .ab-item a', getMaxHeight('.is-same-height .ab-items .ab-item a'));
	function getMaxHeight(el) {
		var maxHeightEL = 0;
		$(el).each(function () {
			var he = $(this).height();
			if (he > maxHeightEL) {
				maxHeightEL = he;
			}
		});
		return maxHeightEL;
	}

	function setMaxheight(el, h) {
		$(el).height(h);
	}

	$(".mobile-btn .open-btn").click(function (event) {
		document.getElementById("menu").style.display = "block";
		document.getElementById("page").style.transform = "translate3d(240px ,0 ,0)";
		document.getElementById("page").style.position = "fixed";
		$(this).css('display', "none");
		$('#page').addClass('main');
	});
	$("#page").click(function (event) {
		// Act on the event 
		$(".main").toggleClass('active');
		if ($('.main').hasClass('active')) {

		} else {
			//for mobile menu
			document.getElementById("menu").style.display = "none";
			document.getElementById("page").style.transform = "translate3d(0 ,0 ,0)";
			document.getElementById("page").style.position = "inherit";
			$(".mobile-btn .open-btn").css('display', "block");
			$('#page').removeClass('main');
		}
	});
	//js for show and hide mobile menu
	$('#menu ul.main-menu li i.it1').click(function () {
		$('ul.sub-menu.sub1').toggle('active');
		if ($('ul.sub-menu.sub1').hasClass('active')) {
			$('ul.sub-menu.sub1').style.display = "block";
		}
	});
	$('#menu ul.main-menu li i.it2').click(function () {
		$('ul.sub-menu.sub2').toggle('active');
		if ($('ul.sub-menu.sub2').hasClass('active')) {
			$('ul.sub-menu.sub2').style.display = "block";
		}
	});
	$('#menu ul.main-menu li i.it3').click(function () {
		$('ul.sub-menu.sub3').toggle('active');
		if ($('ul.sub-menu.sub3').hasClass('active')) {
			$('ul.sub-menu.sub3').style.display = "block";
		}
	});
	$('#menu ul.main-menu li i.it4').click(function () {
		$('ul.sub-menu.sub4').toggle('active');
		if ($('ul.sub-menu.sub4').hasClass('active')) {
			$('ul.sub-menu.sub4').style.display = "block";
		}
	});
	$('#menu ul.main-menu li i.it5').click(function () {
		$('ul.sub-menu.sub5').toggle('active');
		if ($('ul.sub-menu.sub5').hasClass('active')) {
			$('ul.sub-menu.sub5').style.display = "block";
		}
	});
	$('#menu ul.main-menu li i.it6').click(function () {
		$('ul.sub-menu.sub6').toggle('active');
		if ($('ul.sub-menu.sub6').hasClass('active')) {
			$('ul.sub-menu.sub6').style.display = "block";
		}
	});
	$('#menu ul.main-menu li i.it7').click(function () {
		$('ul.sub-menu.sub7').toggle('active');
		if ($('ul.sub-menu.sub7').hasClass('active')) {
			$('ul.sub-menu.sub7').style.display = "block";
		}
	});
	$('#menu ul.main-menu li i.it8').click(function () {
		$('ul.sub-menu.sub8').toggle('active');
		if ($('ul.sub-menu.sub8').hasClass('active')) {
			$('ul.sub-menu.sub8').style.display = "block";
		}
	});
	// js for dropdown menu
	$('.dropdown.first').hover(
		function () {
			$(this).children('.dropdown-menu').slideDown(300);
		},
		function () {
			$(this).children('.dropdown-menu').slideUp(300);
		}
	);

	$('a.search-top-bt').click(function () {
		showorhideSearch();
	});
	$(".dropdown-toggle").dropdown();
	function showorhideSearch(el) {
		if ($('.topsearch').hasClass('show')) {
			$('.topsearch').removeClass('show');
		} else {
			$('.topsearch').addClass('show');
			$('.topsearch input').focus();
		}
	}


	$("#homeslider").owlCarousel({
		navigation: true,
		navigationText: [
			"<i class='fa fa-angle-left' aria-hidden='true'></i>",
			"<i class='fa fa-angle-right' aria-hidden='true'></i>"
		],
		pagination: false,
		// autoPlay: 3000, //Set AutoPlay to 3 seconds
		slideSpeed: 500,
		items: 1,
		singleItem: true,
	});
	//js for testimonial
	$("#owl-testimonial").owlCarousel({
		navigation: true, // Show next and prev buttons
		navigationText: [
			"<i class='fa fa-angle-left' aria-hidden='true'></i>",
			"<i class='fa fa-angle-right' aria-hidden='true'></i>"
		],
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		items: 1,
		itemsCustom: false,
		itemsDesktop: [1199, 1],
		itemsDesktopSmall: [980, 1],
		itemsTablet: [768, 1],
		itemsTabletSmall: false,
		itemsMobile: [479, 1],
		singleItem: false,
		itemsScaleUp: false,
	});
	$("#owl-plant").owlCarousel({
		navigation: true, // Show next and prev buttons
		navigationText: [
			"<i class='fa fa-angle-left' aria-hidden='true'></i>",
			"<i class='fa fa-angle-right' aria-hidden='true'></i>"
		],
		// autoPlay: 3000, //Set AutoPlay to 3 seconds
		items: 2,
		itemsCustom: false,
		itemsDesktop: [1199, 2],
		itemsDesktopSmall: [980, 1],
		itemsTablet: [768, 1],
		itemsTabletSmall: false,
		itemsMobile: [479, 1],
		singleItem: false,
		itemsScaleUp: false,
	});
	$("#owl-arrival, #owl-arrival2").owlCarousel({
		navigation: true, // Show next and prev buttons
		navigationText: [
			"<i class='fa fa-angle-left' aria-hidden='true'></i>",
			"<i class='fa fa-angle-right' aria-hidden='true'></i>"
		],
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		items: 3,
		itemsCustom: false,
		itemsDesktop: [1199, 1],
		itemsDesktopSmall: [980, 1],
		itemsTablet: [768, 1],
		itemsTabletSmall: false,
		itemsMobile: [479, 1],
		singleItem: false,
		itemsScaleUp: false,
	});
	$("#owl-rate,#owl-seller, #owl-recent, #owl-clients").owlCarousel({
		navigation: true, // Show next and prev buttons
		navigationText: [
			"<i class='fa fa-angle-left' aria-hidden='true'></i>",
			"<i class='fa fa-angle-right' aria-hidden='true'></i>"
		],
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		items: 1,
		itemsCustom: false,
		itemsDesktop: [1199, 1],
		itemsDesktopSmall: [980, 1],
		itemsTablet: [768, 1],
		itemsTabletSmall: false,
		itemsMobile: [479, 1],
		singleItem: false,
		itemsScaleUp: false,
	});
	$("#owl-products").owlCarousel({
		navigation: true, // Show next and prev buttons
		navigationText: [
			"<i class='fa fa-angle-left' aria-hidden='true'></i>",
			"<i class='fa fa-angle-right' aria-hidden='true'></i>"
		],
		// autoPlay: 3000, //Set AutoPlay to 3 seconds
		items: 5,
		itemsCustom: false,
		itemsDesktop: [1199, 3],
		itemsDesktopSmall: [980, 4],
		itemsTablet: [768, 3],
		itemsTabletSmall: false,
		itemsMobile: [479, 1],
		singleItem: false,
		itemsScaleUp: false,
	});

	// js for isotope
	$(".grid").isotope({
		itemSelector: '.pro-it',
		layoutMode: 'fitRows',
	});
	$('ul.menu-filter li').click(function () {
		$('ul.menu-filter li').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		$(".grid").isotope({
			filter: selector,
			animationOption: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		return false;
	});
	// masonry layout
	$('.grid-man').masonry({
		// options...
		itemSelector: '.grid-item-man',
		// columnWidth: 200
	});
	//js for quantiity input
	$(".numbers-row").append('<div class="inc button">+</div><div class="dec button">-</div>');
	$(".button").on("click", function () {
		var $button = $(this);
		var oldValue = $button.parent().find("input").val();
		if ($button.text() == "+") {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find("input").val(newVal);
	});
	//js for search box
	$('button.search-top-bt').click(function () {
		$('.topsearch').toggleClass('show');
	});
	//js for popup
	var id = '#dialog';
	//Get the screen height and width
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	//Set heigth and width to mask to fill up the whole screen
	$('#mask').css({ 'width': maskWidth, 'height': maskHeight });

	//transition effect
	$('#mask').fadeIn(500).css('position', 'fixed');
	$('#mask').fadeTo("slow", 0.8);

	//Get the window height and width
	var winH = $(window).height();
	var winW = $(window).width();

	//Set the popup window to center
	$(id).css('top', winH / 2 - $(id).height() / 2);
	$(id).css('left', winW / 2 - $(id).width() / 2);

	//transition effect
	$(id).fadeIn(2000);

	//if close button is clicked
	$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('#mask').hide();
		$('.window').hide();
	});

	//if mask is clicked
	$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});

	// js for time count down
	function getTimeRemaining(endtime) {
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		var days = Math.floor(t / (1000 * 60 * 60 * 24));
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
	function initializeClock(id, endtime) {
		var clock = document.getElementById(id);
		if (clock != null) {
			var daysSpan = clock.querySelector('.days');
			var hoursSpan = clock.querySelector('.hours');
			var minutesSpan = clock.querySelector('.minutes');
			var secondsSpan = clock.querySelector('.seconds');
			function updateClock() {
				var t = getTimeRemaining(endtime);

				daysSpan.innerHTML = t.days;
				hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
				minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
				secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

				if (t.total <= 0) {
					clearInterval(timeinterval);
				}
			}
			updateClock();
			var timeinterval = setInterval(updateClock, 1000);
		}
	}
	var deadline = new Date(Date.parse(new Date()) + 100 * 24 * 60 * 60 * 1000);
	initializeClock('clockdiv', deadline);

	//js for tooltip
	$('[data-toggle="tooltip"]').tooltip();

	//js for range select
	$("#slider-range").slider({
		range: true,
		min: 0,
		max: 500,
		values: [75, 300],
		slide: function (event, ui) {
			$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
		}
	});
	$("#amount").val("$" + $("#slider-range").slider("values", 0) +
		" - $" + $("#slider-range").slider("values", 1));

	//js for tabs
	$('.tabs .tab-links a').on('click', function (e) {
		var currentAttrValue = $(this).attr('href');
		// Show/Hide Tabs
		$('.tabs ' + currentAttrValue).show().siblings().hide();
		// Change/remove current tab to active
		$(this).parent('li').addClass('active').siblings().removeClass('active');
		e.preventDefault();
	});

	$(window).scroll(function (event) {
		/* Act on the event */
		var scrollPos = $(window).scrollTop(),
			nav1 = $('.ht-header');
		nav3 = $('.ht-headerv3');
		nav4 = $('.ht-headerv4');
		if (scrollPos > 1300) {
			nav1.addClass('fixed-nav1');
			nav3.addClass('fixed-nav3');
			nav4.addClass('fixed-nav4');

		} else {
			nav1.removeClass('fixed-nav1');
			nav3.removeClass('fixed-nav3');
			nav4.removeClass('fixed-nav4');
		}
	});
	$('.count').each(function () {
		$(this).prop('Counter', 0).animate({
			Counter: $(this).text()
		}, {
				duration: 20000,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
	});

	//js for map
	var geocoder;
	var map;
	var address = "";
	var map_canvas = document.getElementById("map_canvas");
	if (map_canvas != null) {
		function initialize() {
			geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(48.8566140, 2.1000000);
			var myOptions = {
				zoom: 14,
				center: latlng,
				mapTypeControl: true,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
				},
				navigationControl: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			if (geocoder) {
				geocoder.geocode({
					'location': latlng
				}, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
							map.setCenter(results[0].geometry.location);

							var infowindow = new google.maps.InfoWindow({
								content: '<div class="map-style">' + address + '<div>',
							});

							var marker = new google.maps.Marker({
								position: results[0].geometry.location,
								map: map,
								icon: 'frontend/frontend/images/uploadslocation.png',
								title: address
							});
							google.maps.event.addListener(marker, 'click', function () {
								infowindow.open(map, marker);
							});

						} else {
							alert("No results found");
						}
					} else {
						alert("Geocode was not successful for the following reason: " + status);
					}
				});
			}
		}
	}
	google.maps.event.addDomListener(window, 'load', initialize);

	document.addEventListener('lazybeforeunveil', function (e) {
		var bg = e.target.getAttribute('data-bg');
		if (bg) {
			e.target.style.backgroundImage = 'url(' + bg + ')';
		}
	});

	var youtube = document.querySelectorAll(".youtube");

	for (var i = 0; i < youtube.length; i++) {

		var source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/sddefault.jpg";

		var image = new Image();
		image.src = source;
		image.addEventListener("load", function () {
			youtube[i].appendChild(image);
		}(i));

		youtube[i].addEventListener("click", function () {

			var iframe = document.createElement("iframe");

			iframe.setAttribute("frameborder", "0");
			iframe.setAttribute("allowfullscreen", "");
			iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");

			this.innerHTML = "";
			this.appendChild(iframe);
		});
	};

}); // end ready

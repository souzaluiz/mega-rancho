'use strict';

(function ($) {
	/*------------------
			Preloader
	--------------------*/
	$(window).on('load', function () {
		$(".loader").fadeOut();
		$("#preloder").delay(200).fadeOut("slow");

		// Load cart info
		getInfoCart()
	});

	/*------------------
			Background Set
	--------------------*/
	$('.set-bg').each(function () {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});

	//Humberger Menu
	$(".humberger__open").on('click', function () {
		$(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
		$(".humberger__menu__overlay").addClass("active");
		$("body").addClass("over_hid");
	});

	$(".humberger__menu__overlay").on('click', function () {
		$(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
		$(".humberger__menu__overlay").removeClass("active");
		$("body").removeClass("over_hid");
	});

	/* ------------------
	Navigation
	-------------------- */
	$(".mobile-menu").slicknav({
		prependTo: '#mobile-menu-wrap',
		allowParentLinks: true
	});

	// Load quantity card
	function getInfoCart() {
		const productsCart = JSON.parse(localStorage.getItem('cart')) || []
		const quantityProducts = productsCart.length
		let totalProducts = 0

		productsCart.forEach(function (item) {
			totalProducts += Number((item.price * item.quantity).toFixed(2))
		})

		$('#cart-quantity').text(quantityProducts)
		$('#cart-total-price').text((totalProducts).toFixed(2))
		$('#checkout_total').text((totalProducts).toFixed(2))
	}

})(jQuery);
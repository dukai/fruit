define(function(require, exports, module){
	require('lib/jquery-scrollspy');

	$('.goods .item-box').each(function(){
		var position = $(this).position();
		// console.log(position);
		// console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
		$(this).scrollspy({
			container: $('.goods'),
			min: position.top,
			max: position.top + $(this).height(),
			onEnter: function(element, position) {
				// console.log(position);
				$('.main nav').find('li').removeClass('active');
				$('.main nav').find('.' + element.dataset.target).addClass('active');
			},
			onLeave: function(element, position) {
			}
		})
	});


	$('.main nav li a').click(function(e){
		e.preventDefault();
		var targetSelector = this.hash.substr(1);
		var pos = $('.goods header a[name="' + targetSelector + '"]').position();
		pos.top += $('.goods').scrollTop();

		$('.goods').animate({'scrollTop': pos.top});
	});

	var cart = {};

	var total = 0;
	$('.goods').on('click', '.btn-add', function(){
		this.dataset.pid in cart ? (cart[this.dataset.pid] += 1) : (cart[this.dataset.pid] = 1);
		total += 1;
		$('.tab-bar .badge').html(total);
		console.log(cart);

		localStorage.cart = JSON.stringify(cart);
	});

});
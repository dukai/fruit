define(function(require, exports, module){
	require('lib/jquery-scrollspy');

	$('.goods .item-box').each(function(){
		var position = $(this).position();
		console.log(position);
		console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
		$(this).scrollspy({
			container: $('.goods'),
			min: position.top,
			max: position.top + $(this).height(),
			onEnter: function(element, position) {
				console.log(position);
				$('.main nav').find('li').removeClass('active');
				$('.main nav').find('.' + element.dataset.target).addClass('active');
			},
			onLeave: function(element, position) {
			}
		})
	})

});
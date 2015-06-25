(function($){
	var $appLoad = window.safari || window.chrome ? $('body'): $('html');

	$appLoad.ready(function(){
		
		// Main Slider owl-carousel
			$(".b-carousel").owlCarousel({
				 singleItem:true,
				 navigation: true,
				 navigationText: ['',''],
				 slideSpeed : 300
			});
		// News Slider owl-carousel
		
			$(".b-news").owlCarousel({
				 items : 4,
				 slideSpeed : 300,
				 autoPlay : 3000,
				 responsive: false
			});

		// Header

		var scrollTop, $header = $('.b-header');



		$(window).scroll(function() {
			scrollTop = $(this).scrollTop();

			if(scrollTop > 150){
				$header.addClass('hide');
			} else{
				$header.removeClass('hide');
			}
		});		


		$('a[href^="#"]').click(function(){
	        var el = $(this).attr('href');
	        $('body').animate({
	            scrollTop: $(el).offset().top}, 500);
	        return false; 
		});
	});

})(jQuery);
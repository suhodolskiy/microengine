(function ($) {
	var Private = {
		init: function() {
			Private.documentReady();
			Private.header();
			Private.login();
			Private.tableDefault();
	    },
	    documentReady: function () {
	    	console.log("Document ready!");
	    },
	    header: function() {
    		var header = $('header.navbar-default'),
    			navbarToggle = header.find('.navbar-toggle'),
    			navbarCollapse = header.find('.navbar-collapse'),
    			profileToggle = header.find('.profile-toggle');

    		// clicks
	    		navbarToggle.click(function(event){
					event.preventDefault();
					navbarCollapse.toggleClass('is-visible');
	    		});

	    		profileToggle.click(function(event){
					event.preventDefault();
					$(this).next('.dropdown-menu-profile').toggleClass('is-visible');
	    		});

	    	// scroll
				$(window).scroll(function() {
					var scrollTop = $(this).scrollTop();

					if(scrollTop > 230){
						header.addClass('navbar-fixed fadeInDown');
					} else{
						if(scrollTop == 0){
							header.removeClass('navbar-fixed fadeInDown');
						}
					}
				});

	    },
	    login: function(){
	    	var signin = $('form.form-signin'),
	    		btnLogout = $('.btn-logout');

	    	signin.submit(function(event) {
	    		event.preventDefault();

	    		$.ajax({
	    			url: '/micro/login/signin',
					data: signin.serialize(),
					method: "POST",
					complete: function() {
						signin[0].reset();
                    },
					statusCode: {
						200 : function(){
							window.location.href = "/micro";
						},
                        403: function(jqXHR) {
                            var error = JSON.parse(jqXHR.responseText);
                            console.log(error);
                            Public.statusOutput(signin,'warning', error.status, error.message)
                        }
					}
	    		});
	    	});
	    	btnLogout.click(function(event) {
	    		event.preventDefault();

                $.ajax({
                    url: "/micro/login/logout",
                    method: "POST",
                    statusCode: {
						200 : function(){
							window.location.href = "/micro/login";
						}
					}
                });
	    	});
	    },
	    tableDefault: function(){
	    	var tableDefault = $('.app-table');

	    	tableDefault.dataTable();

var chart = new Chartist.Line('.ct-chart', {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  series: [
    [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
    [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
    [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
    [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
  ]
}, {
  low: 0
});

// Let's put a sequence number aside so we can use it in the event callbacks
var seq = 0,
  delays = 50,
  durations = 200;

// Once the chart is fully created we reset the sequence
chart.on('created', function() {
  seq = 0;
});

// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
chart.on('draw', function(data) {
  seq++;

  if(data.type === 'line') {
    // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
    data.element.animate({
      opacity: {
        // The delay when we like to start the animation
        begin: seq * delays + 1000,
        // Duration of the animation
        dur: durations,
        // The value where the animation should start
        from: 0,
        // The value where it should end
        to: 1
      }
    });
  } else if(data.type === 'label' && data.axis === 'x') {
    data.element.animate({
      y: {
        begin: seq * delays,
        dur: durations,
        from: data.y + 100,
        to: data.y,
        // We can specify an easing function from Chartist.Svg.Easing
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'label' && data.axis === 'y') {
    data.element.animate({
      x: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 100,
        to: data.x,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'point') {
    data.element.animate({
      x1: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      x2: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      opacity: {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'grid') {
    // Using data.axis we get x or y which we can use to construct our animation definition objects
    var pos1Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis + '1'] - 30,
      to: data[data.axis + '1'],
      easing: 'easeOutQuart'
    };

    var pos2Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis + '2'] - 100,
      to: data[data.axis + '2'],
      easing: 'easeOutQuart'
    };

    var animations = {};
    animations[data.axis + '1'] = pos1Animation;
    animations[data.axis + '2'] = pos2Animation;
    animations['opacity'] = {
      begin: seq * delays,
      dur: durations,
      from: 0,
      to: 1,
      easing: 'easeOutQuart'
    };

    data.element.animate(animations);
  }
});

// For the sake of the example we update the chart every time it's created with a delay of 10 seconds
chart.on('created', function() {
  if(window.__exampleAnimateTimeout) {
    clearTimeout(window.__exampleAnimateTimeout);
    window.__exampleAnimateTimeout = null;
  }
  window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
});



// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
new Chartist.Line('.ct-chart', data, options);
	    }
	}
	Public = {
		statusOutput: function(id, view, status, message){
	    	$(id).append('<div class="status-output ss-'+view+' amtn fadeInUp"><strong>'+status+': </strong>'+message+'<a class="ss-close"><span class="spr spr-ss-close"></span></a></div>');

	    	setTimeout(function(){
	    		$(id).find('.status-output:first').slideUp(300, function(){
	    			$(this).remove();
	    		});
	    	}, 7000);

	    	$('.ss-close').on('click', function(){
	    		$(this).parent('.status-output')
	    			   .slideUp(300, function(){
	    					$(this).remove();
	    				});
	    	});
	    }
	}
	$(document).ready(Private.init);
})(jQuery);
/**
 * BarLoading
 * 
 * Easy but useful loading plugin
 * https://github.com/yhz61010/jquery.barloading.js
 * 
 * &copy; 2012 Michael Leo <http://yhz61010.github.com/>
 * Web Site: <http://www.ho1ho.com>
 */

(function($){

	var methods = {
		init : function(options) {
			return this.each(function() {
				initialise(this, options);
			});
		},
		destroy : function() {
			return this.each(function(){
				$(this).find("#bl_self_container").remove();
			});
		}
	};

	function initialise(el, options){
		// Current selected element
		$this = $(el);
		// Merge options
		var params = $.extend({}, $.fn.barLoading.defaultOptions, options);

		// Create bar loading container
		var $loader = $("<div/>", {id:"bl_self_container"}).css('display', 'none');
		// Create a bar and set css
		var $barSpan = $('<span></span>').css({
			'opacity' : params.initBarOpacity,
			'display' : "block",
			'width' : "6px",
			'float' : "left",
			'margin-right' : "3px",
			'border' : "1px solid #363",
			'position' : "relative",
			'background-color' : "#cfc"
		});

		// Create all bars using clone method and append bars to created container
		for (var i = 0; i < params.number; i++) {
			$barSpan.clone().css({
				height : 15 + i * 10,
				bottom : -30 + i * 10
			}).appendTo($loader);
		}

		// Append loading container to current selected element
		$this.append($loader);

		// Animate each bar recursively
		function animateBar($bar){
			if ($bar.length === 0){
				var $firstBar = $loader.find('span:first');
				animateBar($firstBar);
			}
			$bar.fadeTo(params.interval, params.finalBarOpacity).fadeTo(params.interval, params.initBarOpacity, function(){
				animateBar($bar.next());
			});
		}

		// Loading animation method
		function runLoader() {
			var $firstBar = $loader.find('span:first');
			if (animateBar($firstBar)){
				runLoader();
			}
		}

		// Show bar loading container
		$loader.show();
		// Start loading animation
		runLoader();
	}

	$.fn.barLoading = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.barLoading' );
		}
	};

	$.fn.barLoading.defaultOptions = {
		"number": 5,
		"interval": 100, // Unit: ms
		"initBarOpacity": 0.2,
		"finalBarOpacity": 1
	};
})(jQuery);
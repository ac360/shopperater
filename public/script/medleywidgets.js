
(function(window, document, version, callback) {
    var j, d;
    var loaded = false;
    if (!(j = window.jQuery) || version > j.fn.jquery || callback(j, loaded)) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
        script.onload = script.onreadystatechange = function() {
            if (!loaded && (!(d = this.readyState) || d == "loaded" || d == "complete")) {
                callback((j = window.jQuery).noConflict(1), loaded = true);
                j(script).remove();
            }
        };
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script);
    }
})(window, document, "1.3", function($, jquery_loaded) {
    $(function() {
    	if(!window.mdlywidgets) { 
    		window.mdlywidgets = {};
		  	var MW = window.mdlywidgets;
		  	// Add the style tag into the head
	        $('head').append('<'+'link rel="stylesheet" href="http://mdly.co/script/medleywidgets.css" type="text/css"/'+'>'); 
		  	// Check to See if is a mobile device
		  	var pw = $( ".MDLYa1" ).parent().width();
		  	if (pw < 420) {	
		  	} else {
		  			// Go Through Each Medley On The Page
			    	$( ".MDLYa1" ).each(function(i,e) {
			    		var self = e;
			    		// Append Containers
			    		$(self).append('<div class="MDLYa1-title-box"></div>');
			    		$(self).append('<div class="MDLYa1-items-box"></div>');
			    		// Call Medley API
			    		var id = $(self).attr('data-id');
			    		var mAPI = "http://api.mdly.co/v1/medley/" + id
			    		$.getJSON( mAPI, function( m ) {

						  	// Remove Null Items from results
						  	var itemArray = []
						  	$.grep(m.items, function(i, index){ if (i.id) {itemArray.push(i)} });
						  	console.log(itemArray);

						  	// Define Functions
						  	var addItem = function(item) {
						  		// Define width classes for item size (85x85)
							  	if (item.x == 1) { var width  = 'width1x'    };
							  	if (item.x == 2) { var width  = 'width2x'    };
							  	if (item.y == 1) { var height = 'height1x'   };
							  	if (item.y == 2) { var height = 'height2x'   };
								// Calculate Image Padding Based On Container Size
								if (item.y == 1) { var imagePadding = 9 }
								if (item.y == 2) { var imagePadding = 15 }
								var image    = '<img src="' + item.img_small + '" draggable="false" />'
								var itemHtml = "<div class='MDLYa1-item " + width + " " + height + " " + "row" + item.r + " " + "col" + item.c + "'>" + image + "</div>"
								$(self).find('.MDLYa1-items-box').append(itemHtml);
						  	};

						  	// Set Array to keep row numbers and determine highest row value
						  	var rowNumbers = [];
						  	// Append each item to the parent div and collect the row numbers
						  	$(itemArray).each(function(index, item) {
								addItem(item);
								rowNumbers.push(item.r);
							});
							// Setting Height Of Container.  Start by finding the largest row number.  We use this to find total height.
							var maxRowNumber = Math.max.apply(Math, rowNumbers);
							$(self).addClass('height' + maxRowNumber);
							$(self).children('.MDLYa1-items-box').addClass('height' + maxRowNumber);
							// Set Title
							$(self).find('.MDLYa1-title-box').append('<h1>' + m.title + '</h1>');
							// Fade In Animation Effect
						  	$(self).fadeIn('slow');
						}); // /getJSON
					}) // /.each for each Medley on the page
		  	}; // / Mobile Device Check
		}; // / window.mdlywidgets Check
	}); //jQuery End Document Ready
});
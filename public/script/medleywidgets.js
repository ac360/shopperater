
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
		  	// Check to See if is a mobile device
		  	var pw = $( ".MDLYa1" ).parent().width();
		  	if (pw < 420) {	
		  	} else {
		  			// Get Each Medley Element
			    	$( ".MDLYa1" ).each(function(i,e) {
			    		var self = e;
			    		// Append Containers
			    		$(self).append('<div class="MDLYa1-title-box" style="display:block;height:30px;width:100%;"></div>');
			    		$(self).append('<div class="MDLYa1-items-box" style="display:block;position:relative;min-height:200px;"></div>');
			    		// Call Medley API
			    		var id = $(self).attr('data-id');
			    		var mAPI = "http://api.mdly.co/v1/medley/" + id
			    		$.getJSON( mAPI, function( m ) {
							$(self).css({
						  		"display": 					"none",
						  		"position":             	"relative",
						  		"min-height": 				"200px",
						  		"height":               	"auto",
						  		"width":                	"390px",
						  		"background-color": 		"#444444", 
						  		"-webkit-box-shadow": 		"inset 0px 0px 8px 0px #252525",
								"box-shadow": 				"inset 0px 0px 8px 0px #252525"
						  	});

						  	// Remove Null Items from results
						  	var itemArray = []
						  	$.grep(m.items, function(i, index){ if (i.id) {itemArray.push(i)} });
						  	console.log(itemArray);

						  	// Define Functions
						  	var addItem = function(item) {
							  	// if items are 85px x 85px in size
							  	if (item.c == 1) { var left = 'left:10px;'   };
							  	if (item.c == 2) { var left = 'left:105px;'  };
							  	if (item.c == 3) { var left = 'left:200px;'  };
							  	if (item.c == 4) { var left = 'left:295px;'  };

							  	if (item.r == 1) {  var top = 'top:10px;'    };
							  	if (item.r == 2) {  var top = 'top:105px;'   };
							  	if (item.r == 3) {  var top = 'top:200px;'   };
							  	if (item.r == 4) {  var top = 'top:295px;'   };
							  	if (item.r == 5) {  var top = 'top:390px;'   };
							  	if (item.r == 6) {  var top = 'top:485px;'   };
							  	if (item.r == 7) {  var top = 'top:580px;'   };
							  	if (item.r == 8) {  var top = 'top:675px;'   };
							  	if (item.r == 9) {  var top = 'top:770px;'   };
							  	if (item.r == 10) { var top = 'top:865px;'   };
							  	if (item.r == 11) { var top = 'top:960px;'   };
							  	if (item.r == 12) { var top = 'top:1055px;'  };
							  	if (item.r == 13) { var top = 'top:1150px;'  };
							  	if (item.r == 14) { var top = 'top:1245px;'  };
							  	if (item.r == 15) { var top = 'top:1340px;'  };
							  	if (item.r == 16) { var top = 'top:1435px;'  };
							  	if (item.r == 17) { var top = 'top:1530px;'  };
							  	if (item.r == 18) { var top = 'top:1625px;'  };
							  	if (item.r == 19) { var top = 'top:1720px;'  };
							  	if (item.r == 20) { var top = 'top:1815px;'  };
							  	if (item.r == 21) { var top = 'top:1910px;'  };
							  	if (item.r == 22) { var top = 'top:2005px;'  };
							  	if (item.r == 23) { var top = 'top:2100px;'  };
							  	if (item.r == 24) { var top = 'top:2195px;'  };

							  	if (item.x == 1) { var width  = 'width:85px;'    };
							  	if (item.x == 2) { var width  = 'width:180px;'   };
							  	if (item.y == 1) { var height = 'height:85px;'   };
							  	if (item.y == 2) { var height = 'height:180px;'  };
								// Calculate Image Padding Based On Container Size
								if (item.y == 1) { var imagePadding = 9 }
								if (item.y == 2) { var imagePadding = 15 }
								var image    = '<img src="' + item.img_small + '" style="max-width:80%;height:auto;max-height:80%;padding-top:' + imagePadding + 'px;" draggable="false" />'
								var itemHtml = "<div class='MDLYa1-item' style='position:absolute;display:block;text-align:center;" + left + top + height + width + "background:#ffffff;'>" + image + "</div>"
								$(self).find('.MDLYa1-items-box').append(itemHtml);
						  	};

						  	var calculateHeight = function(maxRowNumber, maxHeightNumber) {
						  		if (maxHeightNumber == 1) {
						  			var height = 95;
						  		} else if (maxHeightNumber == 2) {
						  			var height = 180;
						  		};
						  		// Add Extra Padding and Room for Title Box
						  		totalHeight = maxRowNumber * 95 + 40
							  	// Subtract 10 because it is 10px too much
							  	return totalHeight;	
						  	};
						  	// Set Array to keep row numbers and determine highest row value
						  	var rowNumbers = [];
						  	// Append each item to the parent div and collect the row numbers
						  	$(itemArray).each(function(index, item) {
								addItem(item);
								rowNumbers.push(item.r);
							});
							// Setting Height Of Container.  Start by finding the largest row number
							var maxRowNumber = Math.max.apply(Math, rowNumbers);
							// Find the largest height in that row
							var rowHeights = [];
							$.grep(m.items, function(i, index){ if (i.r == maxRowNumber) {rowHeights.push(i.y)} });
							var maxHeightNumber = Math.max.apply(Math, rowHeights);
							var totalHeight = calculateHeight(maxRowNumber, maxHeightNumber);
							$(self).height(totalHeight);
							// Set Title
							$(self).find('.MDLYa1-title-box').append('<h1 style="font-size:16px;color:#fff;text-align:center;padding-top:6px;margin:0px;">' + m.title + '</h1>');
							// Fade In Animation Effect
						  	$(self).fadeIn('slow');
						}); // /getJSON
					}) // /.each for each Medley on the page
		  	}; // / Mobile Device Check
		}; // / window.mdlywidgets Check
	}); //jQuery End Document Ready
});
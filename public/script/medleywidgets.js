
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
			    		// Call Medley API
			    		var id = $(self).attr('data-id');
			    		var mAPI = "http://api.mdly.co/v1/medley/" + id
			    		$.getJSON( mAPI, function( m ) {
			    			// Attach Medley to Global Namespace
			    			if (!MW[m.id]) { MW[m.id] = m };
			    			console.log(MW)
			    			// Append Containers
			    			$(self).append('<div class="MDLYa1-title-box"></div>');
			    			$(self).append('<div class="MDLYa1-items-box" data-medleyid="' + m.id + '""></div>');
						  	// Remove Null Items from results
						  	var itemArray = []
						  	$.grep(m.items, function(i, index){ if (i.id) {itemArray.push(i)} });
						  	console.log(itemArray);

						  	// Define Functions
						  	var addItem = function(item) {
								var image    = '<img src="' + item.img_small + '" draggable="false" />'
								var itemHtml = "<div class='MDLYa1-item widthx" + item.x + " heighty" + item.y + " row" + item.r + " " + "col" + item.c + "' data-itemid='" + item.id + "'>" + image + "</div>"
								$(self).find('.MDLYa1-items-box').append(itemHtml)
						  	};

						  	var setEvents = function() {
						  			$('.MDLYa1-items-box').on('click', '.MDLYa1-item', function (e) {
									    var MW = window.mdlywidgets
									    var itemsContainer = $(e.currentTarget).parent()
									    var medleyId = $(itemsContainer).attr('data-medleyid');
									    var itemId   = $(e.currentTarget).attr('data-itemid');
									    // Hide All Items
									    $(itemsContainer).find('.MDLYa1-item').attr('style', 'display: none !important');
									    // Find Item in Global Variable
									    console.log(MW[medleyId].items)
									    var itemObject = $.grep(MW[medleyId].items, function(m){ return m.id == itemId });
									    // If There Are Duplicate Items In Medley, Grab Just One
									    if (itemObject.length > 0) { itemObject = itemObject[0]}
									    // Build Item Info View Based Off of itemObject
										var closingDiv = '</div>'
										var infoContainer = '<div class="MDLYa1-item-info-container" style="display: block !important;height:250px !important;width:370px !important;text-align: center !important;margin:10px auto 0px auto !important;">'
										var infoImageContainer = '<div class="MDLYa1-item-info-image-container" style="display: block !important;float:left !important;position: relative !important;height:150px !important;width:150px !important;margin:10px !important;padding 10px !important;border-radius: 3px !important;border-bottom: 1px solid #aaa !important;background:#ffffff !important;">'
										var infoImage    = '<img src="' + itemObject.img_small + '" draggable="false" />'
										var infoTitle = '<h2 style="float: left !important;">' + itemObject.title + '</h2>' 
										$(itemsContainer).append( infoContainer + infoImage + closingDiv );
									});
									console.log("events set");
						  	};

						  	// Set Array to keep row numbers and determine highest row value
						  	var rowNumbers = [];
						  	var itemLength = itemArray.length
						  	// Append each item to the parent div and collect the row numbers
						  	$(itemArray).each(function(index, item) {
								addItem(item);
								rowNumbers.push(item.r);
								itemLength = itemLength - 1
								if (itemLength == 0) { setEvents() }
							});
							// Setting Height Of Container.  Start by finding the largest row number.  We use this to find total height.
							var maxRowNumber = Math.max.apply(Math, rowNumbers);
							$(self).addClass('height' + maxRowNumber);
							$(self).children('.MDLYa1-items-box').addClass('height' + maxRowNumber);
							// Set Title
							$(self).find('.MDLYa1-title-box').append('<h1>' + m.title + '</h1>');
						}); // /getJSON
					}) // /.each for each Medley on the page
					// Event Listener for Clicking A Medley Item
		  	}; // / Mobile Device Check
		}; // / window.mdlywidgets Check
	}); //jQuery End Document Ready
});
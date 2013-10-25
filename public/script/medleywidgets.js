
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
						}); // /getJSON
					}) // /.each for each Medley on the page

					// Set Event Listener for Clicking A Medley Item
		  			$('.MDLYa1').on('click', '.MDLYa1-item', function (e) {
						    var MW = window.mdlywidgets
						    var itemsContainer = $(e.currentTarget).parent()
						    var medleyId = $(itemsContainer).attr('data-medleyid');
						    var itemId   = $(e.currentTarget).attr('data-itemid');
						    // Hide All Items
						    $(itemsContainer).find('.MDLYa1-item').attr('style', 'display: none !important');
						    // Find Item in Global Variable
						    var itemObject = $.grep(MW[medleyId].items, function(m){ return m.id == itemId });
						    // If There Are Duplicate Items In Medley, Grab Just One
						    if (itemObject.length > 0) { itemObject = itemObject[0]}
						    // Build Item Info View Based Off of itemObject
							var closingDiv = '</div>'
							var infoContainer = '<div class="MDLYa1-item-info-container" style="display: block !important;height:250px !important;width:370px !important;text-align: center !important;margin:10px auto 0px auto !important;">'
							var infoLeftContainer = '<div class="MDLYa1-item-info-container-left" style="display: block !important;float:left !important;height:250px !important;width:45% !important;">'
							var infoRightContainer = '<div class="MDLYa1-item-info-container-right" style="display: block !important;float:left !important;height:250px !important;width:55% !important;">'
							var infoImage    = '<img src="' + itemObject.img_small + '" draggable="false" />'
							var infoTitle = '<h2 style="text-align:left !important;font-size:14px !important;line-height: 20px !important;font-family: nexa_boldregular, sans-serif !important;text-transform:uppercase !important;color:#333 !important;">' + itemObject.title + '</h2>'
							var infoCategory = '<p style="text-align:left !important;font-size:12px !important;line-height:16px !important;font-family: sans-serif !important;color:#555 !important;">Category: ' + itemObject.category + '</p>'
							var infoPrice = '<p style="text-align:left !important;font-size:12px !important;line-height:16px !important;font-family: sans-serif !important;color:#555 !important;">Best Price: $' + itemObject.price + '</p>'
							var infoSource   = '<p style="text-align:left !important;font-size:12px !important;line-height:16px !important;font-family: sans-serif !important;color:#555 !important;text-transform:capitalize !important;">Best Price Found On: ' + itemObject.source + '</p>'
							var buyButton = '<div style="display:block !important;padding: 15px !important;background: #333 !important;cursor:pointer !important;color:#fff !important;font-size:12px !important;letter-spacing: 2px !important;font-weight:normal !important;margin: 5px 0px 5px 0px !important;font-family: nexa_boldregular, sans-serif !important;-webkit-border-radius: 3px !important;border-radius: 3px !important;">VIEW</div>' 
							var backButton = '<div class="MDLYa1-back-button" style="display:block !important;padding: 10px !important;background: #ccc !important;cursor:pointer !important;color:#fff !important;font-size:10px !important;letter-spacing: 2px !important;font-family: nexa_boldregular, sans-serif !important;-webkit-border-radius: 3px !important;border-radius: 3px !important;">BACK</div>' 
							$(itemsContainer).append( infoContainer + infoLeftContainer + infoImage + closingDiv + infoRightContainer + infoTitle + infoCategory + infoPrice + infoSource + buyButton + backButton + closingDiv + closingDiv );
					});
					$('.MDLYa1').on('click', '.MDLYa1-back-button', function (e) {
						console.log("hi");
						var parent = $(e.currentTarget).parent().parent().parent();
						console.log(parent)
						$(parent).find('.MDLYa1-item-info-container').attr('style', 'display: none !important');
						$(parent).find('.MDLYa1-item').attr('style', 'display: block !important');
					});

	}; // / Mobile Device Check
		}; // / window.mdlywidgets Check
	}); //jQuery End Document Ready
});
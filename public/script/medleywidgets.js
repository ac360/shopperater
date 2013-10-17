
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
			    		var id = $(e).attr('data-id');
			    		var mAPI = "http://api.mdly.co/v1/medley/" + id
			    		$.getJSON( mAPI, function( m ) {
			    			console.log(m);
							$(e).css({
						  		"display": 				"none",
						  		"position":             "relative",
						  		"min-height": 			"200px",
						  		"height":               "auto",
						  		"width":                "400px",
						  		"background-color": 	"#444444", 
						  		"-webkit-box-shadow": 	"inset 0px 0px 8px 0px #252525",
								"box-shadow": 			"inset 0px 0px 8px 0px #252525",
								"padding":          	"5px"
						  	});
						  	// Animation Effects
						  	$(e).fadeIn('slow');
						  	// Go Through Medley Items And Add Widgets
						  	$(m.items).each(function(index, item) {
						  		if (item.id) {
						  			var image = '<img src="' + item.img_small + '" style="max-width:100%;max-height:100%;" />'
						  			$(self).append('<div style="float:left;display:block;position:relative;height:50px;width:100px;background:#fff;margin:5px;">' + image + '</div>');
								};
							}); // /m.items
						}); // /getJSON
					}) // /.each for each Medley on the page
		  	}; // / Mobile Device Check
		}; // / window.mdlywidgets Check
	}); //jQuery End Document Ready
});
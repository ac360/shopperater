
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
    		// Get Each Medley Element
	    	$( ".MDLYa1" ).each(function(i,e) {
			  	$(e).css({
			  		"display": 				"none",
			  		"min-height": 			"200px",
			  		"width": 				"400px",
			  		"background-color": 	"#444444", 
			  		"-webkit-box-shadow": 	"inset 0px 0px 8px 0px #252525",
					"box-shadow": 			"inset 0px 0px 8px 0px #252525",
					"border": 				"1px solid #111111"
			  	})
			  	$(e).fadeIn('slow')
			});
		};
	}); //jQuery End Document Ready
});
(function(global) {

	// Wrap Everything In A Global Option
	if(!global.mdlywidgets) { 

	  	global.mdlywidgets = {};
	  	var MW = global.mdlywidgets;

	  	var el = Document.getElementById('mdlya1');
	  	console.log(el);
	  	el.style["background"] = "#000000";
	  	el.style["height"] = "100px";
	  	el.style["width"] = "200px";

	  	console.log("hello from the Medley Widgets Script");
	 	
	};
 
}(this));
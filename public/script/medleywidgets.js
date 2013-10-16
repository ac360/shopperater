(function(global) {

	// Wrap Everything In A Global Option
	if(!global.mdlywidgets) { 

	  	global.mdlywidgets = {};
	  	var MW = global.mdlywidgets;

	  	var MW.el = Document.getElementById('mdlya1');
	  	console.log(MW.el);
	  	MW.el.style["background"] = "#000000";
	  	MW.el.style["height"] = "100px";
	  	MW.el.style["width"] = "200px";

	  	console.log("hello from the Medley Widgets Script");
	 	
	};
 
}(this));
Medley.Views.ScreenEditor = Backbone.View.extend({
	
	el: "#dashboard-container",

	initialize: function() {
		_.bindAll(this);

	    // CHECK IF REFERRAL OR REMIX
	    
			// Fetch Parameters, if any...
			var query = location.search.substr(1);
			// Check if REFERRAL
			if(query){
					var data = query.split("&");
			    	var params = {};
					for(var i=0; i<data.length; i++) {
					    var item = data[i].split("=");
					    params[item[0]] = item[1];
					}

					// You removed this until you do the Local Storage for Remixes - 
					// var itemCollection = this.parseUrlParams(params);

					// Load Views and pass in the params option
					var editorSearch = new Medley.Views.EditorSearch({ params: params });
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({ params: params });
					$('#module-medley-editor').html(editorMedleyPreview.render().$el); 
			// Check if REMIX
			} else if (remix) {
					// Load Views and pass in the params option
					var editorSearch = new Medley.Views.EditorSearch({});
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({});
					$('#module-medley-editor').html(editorMedleyPreview.render().$el);
			// Plain CREATE MODE
			} else {
					// Load Views and pass in the params option
					var editorSearch = new Medley.Views.EditorSearch({});
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({});
					$('#module-medley-editor').html(editorMedleyPreview.render().$el);
			};
	},

	events: {},

	// parseUrlParams: function(params) {

	// 	if(params.i1_id){ 
	// 			var itemOne = {}
	// 			itemOne.i1_id = params.id
	// 			if(params.i1_source){ itemOne.source = params.i1_source }
	// 			if(params.i1_title){ itemOne.title = params.i1_title }
	// 			if(params.i1_custom_title){ itemOne.custom_title = params.i1_custom_title }
	// 			if(params.i1_price){ itemOne.price = params.i1_price }
	// 			if(params.i1_img_small){ itemOne.img_small = params.i1_img_small }
	// 			if(params.i1_img_big){ itemOne.img_big = params.i1_img_big }
	// 			if(params.i1_category){ itemOne.category = params.i1_category }
	// 			if(params.i1_link){ itemOne.link = params.i1_link }
	// 			if(params.i1_x){ itemOne.sizex = params.i1_x }
	// 			if(params.i1_y){ itemOne.sizey = params.i1_y }
	// 			if(params.i1_c){ itemOne.columns = params.i1_c }
	// 			if(params.i1_r){ itemOne.rows = params.i1_r }
	// 		}
		
	// 	var itemCollection = []
	// 	if(itemOne){itemCollection.push(itemOne)}

	// 	return itemCollection;	

	// },

	render: function () {
		return this;
	}

});
Medley.Views.ScreenEditor = Backbone.View.extend({
	
	el: "#dashboard-container",

	initialize: function() {
		_.bindAll(this);

	    // CHECK IF REFERRAL OR REMIX
	    
			// Fetch Parameters, if any...
			var query = location.search.substr(1);
			if(query){
				var data = query.split("&");
		    	var params = {};
				for(var i=0; i<data.length; i++) {
				    var item = data[i].split("=");
				    params[item[0]] = item[1];
				}
			};
			// Check if SEARCH
			if ( params !== undefined && params.search !== undefined ){
					// Load Views and pass in the params option
					var editorSearch = new Medley.Views.EditorSearch({ params: params });
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({ params: params });
					$('#module-medley-editor').html(editorMedleyPreview.render().$el); 
			}
			// Check if REFERRAL
			if ( params !== undefined && params.referral !== undefined ){
					// Load Views and pass in the params option
					var editorSearch = new Medley.Views.EditorSearch({ params: params });
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({ params: params });
					$('#module-medley-editor').html(editorMedleyPreview.render().$el); 

			// Check if REMIX
			} else if (  params !== undefined && params.remix !== undefined ) {
					// Load Views and pass in the params option
					var editorSearch = new Medley.Views.EditorSearch({});
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({});
					$('#module-medley-editor').html(editorMedleyPreview.render().$el);
			
			// Check if PLAIN CREATE MODE
			} else {
					// Load Views and pass in the params option
					var editorSearch = new Medley.Views.EditorSearch({});
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({});
					$('#module-medley-editor').html(editorMedleyPreview.render().$el);
			};
	},

	events: {
		"dragstart .item-result-row"                :   "gridSetDataTransferObject"
	},

	gridSetDataTransferObject: function(e) {
	    e.originalEvent.dataTransfer.setData("productID", $(e.currentTarget).attr('data-id'));
	    e.originalEvent.dataTransfer.setData("productTitle", $(e.currentTarget).attr('data-title'));
	    e.originalEvent.dataTransfer.setData("productPrice", $(e.currentTarget).attr('data-price'));
	    e.originalEvent.dataTransfer.setData("productImage", $(e.currentTarget).attr('data-image'));
	    e.originalEvent.dataTransfer.setData("productCategory", $(e.currentTarget).attr('data-category'));
	    e.originalEvent.dataTransfer.setData("productSource", $(e.currentTarget).attr('data-source'));
	    e.originalEvent.dataTransfer.setData("productLink", $(e.currentTarget).attr('data-link'));
	},

	showProductTitle: function(e) {
    	console.log("hello!")
    },

	render: function () {
		return this;
	}

});
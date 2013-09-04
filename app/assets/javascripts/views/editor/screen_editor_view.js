Medley.Views.ScreenEditor = Backbone.View.extend({
	
	el: "#dashboard-container",

	initialize: function() {
		_.bindAll(this);
	    
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
			// Check for SEARCH Param
			if ( params !== undefined && params.search !== undefined ){
					var editorSearch = new Medley.Views.EditorSearch({ params: params });
			} else {
					var editorSearch = new Medley.Views.EditorSearch({});
			}
			// Check for REFERRAL Param
			if ( params !== undefined && params.referral !== undefined ){
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({ params: params });
					$('#module-medley-editor').html(editorMedleyPreview.render().$el); 

			// Check for REMIX Param
			} else if (  params !== undefined && params.remix !== undefined ) {
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({});
					$('#module-medley-editor').html(editorMedleyPreview.render().$el);
			
			// Check for PLAIN CREATE MODE
			} else {
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
	    e.originalEvent.dataTransfer.setData("productImageSmall", $(e.currentTarget).attr('data-image-small'));
	    e.originalEvent.dataTransfer.setData("productImageLarge", $(e.currentTarget).attr('data-image-large'));
	    e.originalEvent.dataTransfer.setData("productCategory", $(e.currentTarget).attr('data-category'));
	    e.originalEvent.dataTransfer.setData("productSource", $(e.currentTarget).attr('data-source'));
	    e.originalEvent.dataTransfer.setData("productLink", $(e.currentTarget).attr('data-link'));
	},

	render: function () {
		return this;
	}

});
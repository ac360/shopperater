Medley.Views.ModuleBrowseMedleySearch = Backbone.View.extend({
	
	el: "#module-primary-search",

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		 "click #primary-search-button"              :   "searchProducts",
		 "keypress #primary-search-field"			       :   "detectEnterButton"
  },

  searchProducts: function() {
    	var searchKeywords = $('#primary-search-field').val();
    	var searchCategory = $('#category-button-text').attr( 'data-category' );

    	var searchItem = new Medley.Collections.ProductSearch();
      	searchItem.fetch({
      		data: { keywords: searchKeywords, category: searchCategory },
    		  processData: true,
      		success: function (response) {
      			var results = response.toJSON();
            	console.log("Here are your product search results:")
              console.log(results)
      				var moduleItemResultsView = new Medley.Views.ModuleBrowseItemResults({ collection: results })
      				$('#module-product-results').html(moduleItemResultsView.render().$el);
              var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({})
              $('#module-medley-browser').html(moduleMedley.render().$el);
			} // End Success
		}); // End fetch
  },

  detectEnterButton: function(event) {
  	  var keycode = (event.keyCode ? event.keyCode : event.which);
  		if(keycode == '13'){
  			this.searchProducts();	
  		}
  },

	render: function () {
		return this;
	}

});
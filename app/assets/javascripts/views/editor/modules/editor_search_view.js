Medley.Views.EditorSearch = Backbone.View.extend({
	
	el: "#module-primary-search",

	initialize: function() {
		_.bindAll(this);
    // Check for search parameter in URL, if it exists, input it and run a search
    if(this.options.params && this.options.params.search) {
      _(this.searchParameter).defer();
    }
	},

	events: {
		 "click #primary-search-button"              :   "searchProducts",
		 "keypress #primary-search-field"			       :   "detectEnterButton"
  },

  searchParameter: function() {
    var searchKeywords = decodeURI(this.options.params.search)
    $('#primary-search-field').val(searchKeywords);
    this.searchProducts();
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
            	console.log("Here are your Product Search Results")
              console.log(results)
      				var searchResultsView = new Medley.Views.EditorSearchResults({ collection: results })
      				$('#module-product-results').html(searchResultsView.render().$el);
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
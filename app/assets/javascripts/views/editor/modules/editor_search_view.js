Medley.Views.EditorSearch = Backbone.View.extend({
	
	el: "#module-primary-search",

	initialize: function() {
		_.bindAll(this);
    // Check if a search can be pre-loaded from Local Storage
    if (this.model !== undefined && this.model.search !== undefined) {
      _(this.searchPreLoad).defer();
    };
	},

	events: {
		 "click #primary-search-button"              :   "searchProducts",
		 "keypress #primary-search-field"			       :   "detectEnterButton"
  },

  searchPreLoad: function() {
    var searchKeywords = decodeURI(this.model.search)
    $('#primary-search-field').val(searchKeywords);
    this.searchProducts();
  },

  searchProducts: function() {
      // Get Search Information
    	var searchKeywords = $('#primary-search-field').val();
    	var searchCategory = $('#category-button-text').attr( 'data-category' );

      // Put Search Information into Attribute on the Search Bar for Auto-Save to access...

      $('#primary-search-field').attr( 'data-search', searchKeywords );

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
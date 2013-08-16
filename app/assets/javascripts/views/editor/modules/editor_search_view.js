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
    $('#primary-search-field').val(this.options.params.search);
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
            	console.log(results[0].items)
      			if (results[0].error) {
      				// $('#service-results').html('<tbody><tr></tr><tr><td class="c-centered" style="margin-top:30px;opacity:0.8">Nothing found yet, keep typing...</td></tr></tbody>');
      			} else {
      				var productResultsView = new Medley.Views.EditorProductResults({ collection: results[0].items })
      				$('#module-product-results').html(productResultsView.render().$el);
              // var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({})
              // $('#module-medley-browser').html(moduleMedley.render().$el);
      			}
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
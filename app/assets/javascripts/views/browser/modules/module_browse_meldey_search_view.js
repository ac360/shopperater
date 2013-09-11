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

      // Search Medlies
      var searchMedlies = new Medley.Collections.Medlies();
      searchMedlies.fetch({
          data: { keywords: searchKeywords, category: searchCategory },
          processData: true,
          success: function (response) {
            var results = response.toJSON();
            console.log("Here are your Medley search results:")
            console.log(results)
            var medleySearchResults = new Medley.Views.MedleySearchResults({ collection: results })
            $('#medley-results-container').html(medleySearchResults.render().$el);
            var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({})
            $('#module-medley-browser').html(moduleMedley.render().$el);

            if (results.length < 15) {
                    // Get Most Recent Medleys
                    var medleysMostRecent = new Medley.Collections.MedleysMostRecent();
                    medleysMostRecent.fetch({
                      success: function (response) {
                          var results = response.toJSON();
                          console.log("Here Are The Most Recent Medleys since search results are under 15:")
                          console.log(results)
                          var medleysMostRecent = new Medley.Views.MedleysMostRecent({ collection: results });
                          $('#medleys-most-recent').html(medleysMostRecent.render().$el);
                      } // End Success
                    }); // End searchProducts.fetch
            } // /if results.length < 15

            // Medley.Views.MedleysMostRecent

            // Search Products
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
              } // End Success
            }); // End searchProducts.fetch
          } // End Success
      }) // End searchMedlies.fetch
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
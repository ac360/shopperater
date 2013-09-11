Medley.Views.ScreenBrowser = Backbone.View.extend({
	
	el: ".container",

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"click #primary-search-button"              :   "search",
		"keypress #primary-search-field"			:   "detectEnterButton",
		"click .medley-result-box"					:   "showMedley"
    },

    search: function() {
    	var self = this;
    	var searchKeywords = $('#primary-search-field').val();
    	var searchCategory = $('#category-button-text').attr('data-category');

	      // Search Medleys
	      this.options.medleys = new Medley.Collections.Medlies();
	      this.options.medleys.fetch({
	          data: { keywords: searchKeywords, category: searchCategory },
	          processData: true,
	          success: function (response) {
	                var results = response.toJSON();
	                console.log("Here are your Medley search results:")
	                console.log(results)
	                var medleySearchResults = new Medley.Views.MedleySearchResults({ collection: results })
	                $('#medley-results-container').html(medleySearchResults.render().$el);
	                // If there are results, show the first in the preview area...
	                if (results.length > 0) {
	                  var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({ model: results[0] })
	                  $('#module-medley-browser').html(moduleMedley.render().$el);
	                }
	                // If there are less than 15 results, bring up the Most Recent Medleys
	                if (results.length < 15) {
	                        // Get Most Recent Medleys
	                        var medleysMostRecent = new Medley.Collections.MedleysMostRecent();
	                        medleysMostRecent.fetch({
	                          success: function (response) {
	                              // Render Most Recent Medleys
	                              var results = response.toJSON();
	                              console.log("Here Are The Most Recent Medleys since search results are under 15:")
	                              console.log(results)
	                              var medleysMostRecent = new Medley.Views.MedleysMostRecent({ collection: results });
	                              $('#medleys-most-recent').html(medleysMostRecent.render().$el);

	                              // Search Products on callback to keep page loading orderly and not all at once
	                              var searchItems = new Medley.Collections.ProductSearch();
	                              searchItems.fetch({
	                                      data: { keywords: searchKeywords, category: searchCategory },
	                                      processData: true,
	                                      success: function (response) {
	                                          var results = response.toJSON();
	                                          console.log("Here are your product search results:")
	                                          console.log(results)
	                                          var moduleItemResultsView = new Medley.Views.ModuleBrowseItemResults({ collection: results })
	                                          $('#module-product-results').html(moduleItemResultsView.render().$el);
	                                      } // End Success
	                              }); // End searchItems.fetch

	                          } // End Success of medleysMostRecent
	                        }) // End medleysMostRecent.fetch
	                } else {
	                      // Search Products
	                      var searchItems = new Medley.Collections.ProductSearch();
	                      searchItems.fetch({
	                              data: { keywords: searchKeywords, category: searchCategory },
	                              processData: true,
	                              success: function (response) {
	                                  var results = response.toJSON();
	                                  console.log("Here are your product search results:")
	                                  console.log(results)
	                                  var moduleItemResultsView = new Medley.Views.ModuleBrowseItemResults({ collection: results })
	                                  $('#module-product-results').html(moduleItemResultsView.render().$el);
	                              } // End Success
	                      }); // End searchItems.fetch

	                }; // /if results.length < 15
	                
	          } // End Success this.options.medleys
	      }); // End this.options.medleys.fetch

	}, // end searchProducts

	showMedley: function(e) {
		var medleyID = $(e.currentTarget).attr('data-id')
		var thisMedley = this.options.medleys.get(medleyID);

		var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({ model: thisMedley.toJSON() })
	    $('#module-medley-browser').html(moduleMedley.render().$el);
	},

	detectEnterButton: function(event) {
	  	  var keycode = (event.keyCode ? event.keyCode : event.which);
	  		if(keycode == '13'){
	  			this.search();	
	  		}
	},

	render: function () {
		// Render Sub Views
		// var modulePrimarySearch = new Medley.Views.ModuleBrowseMedleySearch()
		return this;
	}

});
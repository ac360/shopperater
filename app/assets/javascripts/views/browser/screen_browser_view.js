Medley.Views.ScreenBrowser = Backbone.View.extend({
	
	el: ".container",

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"click #primary-search-button"              :   "search",
		"keypress #primary-search-field"			:   "detectEnterButton",
		"click .medley-result-box"					:   "showMedleySearchResult",
		"click .medley-most-recent-box"				:   "showMedleyMostRecentResult",
		"click .medley-grid-item"					:   "linkTest"
    },

    linkTest: function() {
    	alert("");
    },

    detectEnterButton: function(event) {
	  	var keycode = (event.keyCode ? event.keyCode : event.which);
	  		if(keycode == '13'){
	  			this.search();	
	  	}
	},

    search: function() {
    	console.log("New Search Being Executed...")
    	var self = this;
    	var searchKeywords = $('#primary-search-field').val();
    	var searchCategory = $('#category-button-text').attr('data-category');

	      // Search Medleys
	      self.options.medleys = new Medley.Collections.Medlies();
	      self.options.medleys.fetch({
	          data: { keywords: searchKeywords, category: searchCategory },
	          processData: true,
	          success: function (response) {
	                var medleyResults = response.toJSON();
	                console.log("Here are your Medley search results:")
	                console.log(medleyResults)
	                var medleySearchResults = new Medley.Views.MedleySearchResults({ collection: medleyResults })
	                $('#medley-results-container').html(medleySearchResults.render().$el);
	                // If there are results, show the first in the preview area...
	                if (medleyResults.length > 0) {
	                  var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({ model: medleyResults[0] })
	                  $('#module-medley-browser').html(moduleMedley.render().$el);
	                }
	                // If there are less than 15 results, bring up the Most Recent Medleys
	                if (medleyResults.length < 15) {
	                        // Get Most Recent Medleys
	                        self.options.medleys_recent = new Medley.Collections.MedleysMostRecent();
	                        self.options.medleys_recent.fetch({
	                          success: function (response) {
	                              var medleysRecent = response.toJSON();
	                              console.log("Here Are The Most Recent Medleys since search results are under 15:")
	                              console.log(medleysRecent)

	                              // If Medley search results are empty, Show the most recent medley in the preview area
	                          	  if ( medleyResults.length < 1 ) {
	                          		  var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({ model: medleysRecent[0] })
	                  				  $('#module-medley-browser').html(moduleMedley.render().$el);
	                  			  };

	                  			  // Render Most Recent Medleys
	                              var medleysMostRecent = new Medley.Views.MedleysMostRecent({ collection: medleysRecent });
	                              $('#medleys-most-recent').html(medleysMostRecent.render().$el);

	                              // Search Products on callback to keep page loading orderly and not all at once
	                              var searchItems = new Medley.Collections.ProductSearch();
	                              searchItems.fetch({
	                                      data: { keywords: searchKeywords, category: searchCategory },
	                                      processData: true,
	                                      success: function (response) {
	                                          var productResults = response.toJSON();
	                                          console.log("Here are your product search results:")
	                                          console.log(productResults)
	                                          var moduleItemResultsView = new Medley.Views.ModuleBrowseItemResults({ collection: productResults })
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
	                                  var productResults = response.toJSON();
	                                  console.log("Here are your product search results:")
	                                  console.log(productResults)
	                                  var moduleItemResultsView = new Medley.Views.ModuleBrowseItemResults({ collection: productResults })
	                                  $('#module-product-results').html(moduleItemResultsView.render().$el);
	                              } // End Success
	                      }); // End searchItems.fetch

	                }; // /if results.length < 15
	                
	          } // End Success this.options.medleys
	      }); // End this.options.medleys.fetch

	}, // end search

	detectEnterButton: function(event) {
	  	var keycode = (event.keyCode ? event.keyCode : event.which);
	  		if(keycode == '13'){
	  			this.search();	
	  	}
	},

	showMedleySearchResult: function(e) {
		var medleyID = $(e.currentTarget).attr('data-id')
		var thisMedley = this.options.medleys.get(medleyID);

		var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({ model: thisMedley.toJSON() })
	    $('#module-medley-browser').html(moduleMedley.render().$el);
	},

	showMedleyMostRecentResult: function(e) {
		var medleyID = $(e.currentTarget).attr('data-id')
		var thisMedley = this.options.medleys_recent.get(medleyID);

		var moduleMedley = new Medley.Views.ModuleBrowseMedleyPreviewView({ model: thisMedley.toJSON() })
	    $('#module-medley-browser').html(moduleMedley.render().$el);
	},

	render: function () {
		// Render Sub Views
		// var modulePrimarySearch = new Medley.Views.ModuleBrowseMedleySearch()
		return this;
	}

});
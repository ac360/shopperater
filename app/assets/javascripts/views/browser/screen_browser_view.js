Medley.Views.ScreenBrowser = Backbone.View.extend({
	
	el: "body",

	initialize: function() {
		_.bindAll(this);
		
		var self = this;
		var params = M.getParams();
		
		// If params exist, preload a search, else do New User Verification
		if (params !== undefined && params.search !== undefined) {
			console.log("Parameters: ", params)
			_.defer( function() {
	        	$('#primary-search-field').val(decodeURI(params.search));  
	        	self.search();
	    	});
		} else {
			// Check And Run New User Messages
			_.defer( function() {
				var newUser = self.newUserChecks();
				console.log("New User? ", newUser)
				if (newUser === false) {
					self.showDemo();
				}
			});
		};

		// Show Banner
		if ($.jStorage.get("medley_banner_1", false) == false) {
			setTimeout(function() {
				$( "#banner-area" ).slideDown( "slow", function() {
				    $( "#banner-area-text" ).fadeIn( "slow", function() {
					});
				});
			}, 5000);
		};

		// Manual Event Binders
		$('#welcome-modal').on('hidden.bs.modal', function () {
			self.addNewsletterSubscriber();
			self.showDemo();
		})
	},

	events: {
		"click #primary-search-button"              :   "search",
		"keypress #primary-search-field"			:   "detectEnterButton",
		"keypress #etsy-storeid-field"			    :   "detectEnterButton",
		"click .medley-result-box"					:   "showMedleySearchResult",
		"click .medley-most-recent-box"				:   "showMedleyMostRecentResult",
		"click #newsletter-subscribe-submit-button" :   "hideWelcomeModal",
		"click #hide-banner-link"					:   "hideBannerLink",
		"click .share-tab"                          :   "shareModalTabChange",
		"click .retailer-select"                    :   "detectDropdown"
    },

    detectDropdown: function(e) {
    	var retailer = $(e.currentTarget).attr('data-retailer');
    	$('#retailer-title').text(retailer);
    	console.log(retailer);
    	if (retailer === "Etsy") {
    		$('#retailer-options-etsy').slideDown(150, function() {});
    	} else {
    		$('#retailer-options-etsy').slideUp(150, function() {});
    	};
    },

    detectEnterButton: function(event) {
	  	var keycode = (event.keyCode ? event.keyCode : event.which);
	  		if(keycode == '13'){
	  			this.search();	
	  	}
	},

    search: function() {
    	console.log("New Search Being Executed...");
    	$('#header-box').fadeOut(100, function(){
    		$('#status-update-content').html('<h5 style="color:#999;margin-top:28px;" class="m-centered">Searching Medleys...</h5>')
    		$('#status-update').fadeIn(100);
    	});
    	var self = this;
    	var searchKeywords = $('#primary-search-field').val();
    	var searchCategory = $('#category-button-text').attr('data-category');
    	var searchRetailer = $('#retailer-title').text();
    	var searchEtsyStoreId = "";
    	if (searchRetailer === "Etsy") {
    		var searchEtsyStoreId = $('#etsy-storeid-field').val();
    	};
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
	                        $('#status-update-content').html('<h5 style="color:#999;margin-top:28px;" class="m-centered">Getting Recent Medleys...</h5>');
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
	                              _.defer( function() {
	                              	  $('#status-update-content').html('<h5 style="color:#999;margin-top:28px;" class="m-centered">Searching For Related Products...</h5>');
		                              var searchItems = new Medley.Collections.ProductSearch();
		                              searchItems.fetch({
		                                      data: { keywords: searchKeywords, category: searchCategory, retailer: searchRetailer, etsy_store_id: searchEtsyStoreId },
		                                      processData: true,
		                                      success: function (response) {
		                                          var productResults = response.toJSON();
		                                          console.log("Here are your product search results:")
		                                          console.log(productResults)
		                                          var moduleItemResultsView = new Medley.Views.ModuleBrowseItemResults({ collection: productResults })
		                                          $('#module-product-results').html(moduleItemResultsView.render().$el);
		                                          setTimeout(function() {
		                                          	$('#status-update-content').html('<h5 style="color:#999;margin-top:28px;" class="m-centered">Found '+productResults.length+' Products</h5>');
		                                          	setTimeout(function() {
												        $('#status-update').fadeOut(100, function() {
												        	$('#header-box').fadeIn(100);
												        })
												    }, 2000);
		                                          }, 500);
		                                      }, 
		                                      error: function(xhr) {
											      var errorMessage = '<h2 class="" id="myModalLabel" style="color:#ff9c97">Error</h2><h1>The Etsy store you entered does not exist.</h1><ul class="" style="padding-left:40px;"><li>Check the spelling of the Etsy store you entered</li></ul>'
											      $('#error-modal-content').html(errorMessage);
											      $('#error-modal').modal({ show: true });
		                                          $('#status-update-content').html('<h5 style="color:#999;margin-top:28px;" class="m-centered">No Products Found.</h5>');
	                                          	  setTimeout(function() {
											          $('#status-update').fadeOut(100, function() {
											        	  $('#header-box').fadeIn(100);
											          })
											      }, 2000);
											      return false;
											  }
		                              }); // End searchItems.fetch
	                              }); // defer

	                          } // End Success of medleysMostRecent
	                        }) // End medleysMostRecent.fetch
	                } else {
	                      // Search Products
	                      _.defer( function() {
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
		                  });

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
		var medleyID = $(e.currentTarget).attr('data-id');
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

	showWelcomeModal: function() {
	    $('#welcome-modal').modal();
	    $('#welcome-modal').modal('show');
	},

	hideWelcomeModal: function() {
		$('#welcome-modal').modal('hide');
	},

	hideBannerLink: function() {
		$('#banner-area-text').fadeOut( "fast", function() {
    		$('#banner-area').slideUp( "fast", function() {
    			$.jStorage.set("medley_banner_1", true);
  			});		
  		});
	},

	shareModalTabChange: function(e) {
		var tagID = $(e.currentTarget).attr('data-id');
	    if ( tagID == 1 ) {
	    	$('.share-screen').addClass('hide');
	    	$('#share-website-screen').removeClass('hide');
	    	$('.share-tab').removeClass('active');
	    	$(e.currentTarget).addClass('active');
	    } else if ( tagID == 2 ) {
	    	$('.share-screen').addClass('hide');
	    	$('#share-tumblr-screen').removeClass('hide');
	    	$('.share-tab').removeClass('active');
	    	$(e.currentTarget).addClass('active');
	    } else if ( tagID == 3 ) {
	    	$('.share-screen').addClass('hide');
	    	$('#share-facebook-screen').removeClass('hide');
	    	$('.share-tab').removeClass('active');
	    	$(e.currentTarget).addClass('active');
	    };
	},

	addNewsletterSubscriber: function(email) {
		var email = $('#newsletter-email-field').val()
		if (email == "") {
			$.jStorage.set("medley_welcome_1", true);
		} else {
			newSubscriber = new Medley.Collections.NewsletterSubscribers();
			newSubscriber.create({
	    		email       : email
	    	}, {
		        success: function (response) {
		        	var subscriber = response.toJSON();
		          	console.log("successfully created: ", subscriber.email);
		          	$.jStorage.set("medley_welcome_1", true);
		        },
		        error: function (model, xhr) {
		            var errors = $.parseJSON(xhr.responseText).errors
		            console.log(errors)
		        }
			}) // End of MedleyInfo.save
		};
	},

	showDemo: function() {
		console.log("Showing Demo...")
		var self = this;
		setTimeout(function() {

			setTimeout(function() {
			      $('#primary-search-field').val('G')
			}, 200);
			setTimeout(function() {
			      $('#primary-search-field').val('GT')
			}, 400);
			setTimeout(function() {
			      $('#primary-search-field').val('GTA')
			}, 600);
			setTimeout(function() {
			      $('#primary-search-field').val('GTA V')
			}, 800);
			setTimeout(function() {
			      self.search();
			}, 1100);
			setTimeout(function() {
			      $( "#primary-search-field" ).focus();
			}, 1200);

		}, 1000);
	},

	newUserChecks: function() {
		var self = this;
		var welcomed = $.jStorage.get("medley_welcome_1", false);
		if (welcomed === false) {
			self.showWelcomeModal();
			return true
		} else {
			return false
		};
	}
});
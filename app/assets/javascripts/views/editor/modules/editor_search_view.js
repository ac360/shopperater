Medley.Views.EditorSearch = Backbone.View.extend({
	
	el: "#header-container",

	initialize: function() {
		_.bindAll(this);
    // Check if a search can be pre-loaded from Local Storage
    if (this.model !== undefined && this.model.search !== undefined) {
      _(this.searchPreLoad).defer();
    };
	},

	events: {
		 "click #primary-search-button"              :   "searchProducts",
		 "keypress #primary-search-field"			       :   "detectEnterButton",
     "keypress #etsy-storeid-field"              :   "detectEnterButton",
  },

  searchPreLoad: function() {
    var searchKeywords = decodeURI(this.model.search)
    $('#primary-search-field').val(searchKeywords);
    this.searchProducts();
  },

  searchProducts: function() {
      var self = this;
      $('#header-box').fadeOut(100, function(){
        $('#status-update-content').html('<h5 style="color:#999;margin-top:28px;" class="m-centered"><i class="fa fa-refresh fa-spin"></i> Searching For Products...</h5>');
        $('#status-update').fadeIn(100);
      });
      // Get Search Information
    	var searchKeywords = $('#primary-search-field').val();
    	var searchCategory = $('#category-button-text').attr( 'data-category' );
      var searchRetailer = $('#retailer-title').text();
      var searchEtsyStoreId = "";
      if (searchRetailer === "Etsy") {
        var searchEtsyStoreId = $('#etsy-storeid-field').val();
      };

      // Put Search Information into Attribute on the Search Bar for Auto-Save to access...

      $('#primary-search-field').attr( 'data-search', searchKeywords );

    	var searchItem = new Medley.Collections.ProductSearch();
      	searchItem.fetch({
      		data: { keywords: searchKeywords, category: searchCategory, retailer: searchRetailer, etsy_store_id: searchEtsyStoreId },
    		  processData: true,
      		success: function (response) {
      			var results = response.toJSON();
            	console.log("Here are your Product Search Results");
              console.log(results);
              setTimeout(function() {
                if (results.length > 0) {
                  $('#status-update-content').html('<h5 style="color:#999;margin-top:28px;" class="m-centered"><i class="fa fa-check" style="font-size:16px;"></i> Found '+results.length+' Products</h5>');
                } else {
                  $('#status-update-content').html('<h5 style="color:#999;margin-top:28px;" class="m-centered"><i class="fa fa-frown-o" style="font-size:16px;"></i> Found '+results.length+' Products</h5>');
                };
                setTimeout(function() {
                  $('#status-update').fadeOut(100, function() {
                    $('#header-box').fadeIn(100);
                  })
                }, 2000);
              }, 500);
      				var searchResultsView = new Medley.Views.EditorSearchResults({ collection: results });
      				$('#module-product-results').html(searchResultsView.render().$el);
			    }, // End Success
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
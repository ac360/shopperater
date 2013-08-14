Shopperater.Views.ModulePrimarySearch = Backbone.View.extend({
	
	el: "#module-primary-search",

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		// TODO:  You need to convert the Search Field to a Form so that you can capture the Submit event and run the searchProducts event when a user hits ENTER instead of hitting the search button
		 "click #primary-search-button"              :   "searchProducts",
		 "keypress #primary-search-field"			       :   "detectEnterButton"
    },

    searchProducts: function() {
    	var searchKeywords = $('#primary-search-field').val();
    	var searchCategory = $('#category-button-text').attr( 'data-category' );

    	var searchItem = new Shopperater.Collections.ItemSearch();
      	searchItem.fetch({
      		data: { keywords: searchKeywords, category: searchCategory },
    		processData: true,
      		success: function (response) {
      			var results = response.toJSON();
            	console.log(results[0].items)
      			if (results[0].error) {
      				// $('#service-results').html('<tbody><tr></tr><tr><td class="c-centered" style="margin-top:30px;opacity:0.8">Nothing found yet, keep typing...</td></tr></tbody>');
      			} else {
      				var moduleItemResultsView = new Shopperater.Views.ModuleItemResults({ collection: results[0].items })
      				$('#module-product-results').html(moduleItemResultsView.render().$el);
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

    // selectCategory: function(e) {
    	
    // 	// Remember the API takes difference Search Indexes (categories) then these category names listed on the Amazon site which you copied to populate the drop down list with options, that's why there are two variables.
    // 	var apiCategory = $(e.currentTarget).attr('data-category');
    // 	var uiCategory = $(e.currentTarget).text();
    // 	// Set the DropDown Button text with new Category
    // 	$('#category-button-text').text(uiCategory);
    // 	$('#category-button-text').attr( 'data-category', apiCategory );

    // },

	render: function () {
		return this;
	}

});
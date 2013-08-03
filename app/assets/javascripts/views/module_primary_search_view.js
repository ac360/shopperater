Shopperater.Views.ModulePrimarySearch = Backbone.View.extend({
	
	el: "#module-primary-search",

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		 "keyup #primary-search"                     :   "searchProducts",
		 "click .s-category-link"					 :   "selectCategory"
    },

    searchProducts: function() {
    	console.log("searching...")
    },

    selectCategory: function(e) {
    	// Remember the API takes difference Search Indexes (categories) then these category names listed on the Amazon site which you copied to populate the drop down list with options, that's why there are two variables.
    	var apiCategory = $(e.currentTarget).attr('data-category');
    	var uiCategory = $(e.currentTarget).text();
    	// Set the DropDown Button text with new Category
    	$('#category-button-text').text(uiCategory)

    	console.log(apiCategory, uiCategory)
    },

	render: function () {
		return this;
	}

});
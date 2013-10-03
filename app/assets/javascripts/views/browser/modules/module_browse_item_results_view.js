Medley.Views.ModuleBrowseItemResults = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/browse/item_results'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"click .item-result-row":           "showProductPopUp"
    },

    showProductPopUp: function(e) {
    	var self = this;
    	console.log(this.collection)
    	// Get ID of Product
	    var productID = $(e.currentTarget).attr('data-id');
	    console.log(productID);
	    // Get Specific Product From Model & Make It A Seperate Model
	    var thisProduct = _.where(self.collection, {id: productID})[0]
	    // Update Link
	    thisProduct.link = $(e.currentTarget).attr('data-link') + "%26tag%3Dmedley01-20"
	    // Prepare Modal
	    $('#product-modal').html('');
	    var productPopUp = new Medley.Views.BrowserProductPopUp({ model: thisProduct })
	    $('#product-modal').html(productPopUp.render().$el);

	    $('#product-modal').modal();
	    $('#product-modal').modal('show');
    },

	render: function () {
    this.$el.html(this.template({ collection: this.collection })).fadeIn(500);
    $('#module-product-results').niceScroll({cursorcolor:"#999999"});
	return this;
	}

});
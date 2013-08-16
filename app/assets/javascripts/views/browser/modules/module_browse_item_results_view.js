Medley.Views.ModuleBrowseItemResults = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/browse/item_results'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"click #add-to-cart-button":           "addItemToCart"
    },

    addItemToCart: function(e) {
    	
    	// If Guest Session
    	var guestCartItems = $.jStorage.get("MedleyGuestCart");
		if(!guestCartItems){
			// Create Array w/ first Javascript Object
			var guestCart = []
			var cartItem1 = {}
			// Get Product Details
			cartItem1.title = $(e.currentTarget).attr( "data-title" );
			cartItem1.asin = $(e.currentTarget).attr( "data-asin" );
			cartItem1.product_group = $(e.currentTarget).attr( "data-product-group" );
			guestCart.push(cartItem1)
			// Save item to localstorage
			$.jStorage.set("MedleyGuestCart", guestCart);
			var newItemCount = guestCart.length;
			$('#cart-item-count').text(newItemCount);
		} else {
			var guestCart = $.jStorage.get("MedleyGuestCart");
			var newCartItem = {}
			newCartItem.title = $(e.currentTarget).attr( "data-title" );
			newCartItem.asin = $(e.currentTarget).attr( "data-asin" );
			newCartItem.product_group = $(e.currentTarget).attr( "data-product-group" );
			guestCart.push(newCartItem)
			$.jStorage.set("MedleyGuestCart", guestCart);
			var newItemCount = guestCart.length
			$('#cart-item-count').text(newItemCount)
		};
    },

	render: function () {
    this.$el.html(this.template({ collection: this.collection }));
    $('#module-product-results').niceScroll({cursorcolor:"#999999"});
	return this;
	}

});
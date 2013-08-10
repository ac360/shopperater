Shopperater.Views.ModuleCartModal = Backbone.View.extend({
	
	tagName: "div",
    id: "",
    className: "",
	template: JST['modules/cart_modal'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"click #delete-cart-item-button":          "deleteCartItem"
    },

    deleteCartItem:  function(e) {
    	var itemIndex = $(e.currentTarget).attr( "data-index" );
    	this.collection.splice(itemIndex, 1);
    	// Save Changes to Local Storage
    	$.jStorage.flush()
    	$.jStorage.set("shopperaterGuestCart", this.collection);
    	this.render();
    	$('#cart-item-count').text(this.collection.length);
    },

	render: function () {
		
		this.$el.html(this.template({ collection: this.collection }));
		return this;
		
	}

});
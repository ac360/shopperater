Shopperater.Views.ModuleCart = Backbone.View.extend({
	
	tagName: "div",
    id: "",
    className: "",
	template: JST['modules/cart'],

	initialize: function() {
		_.bindAll(this);
		 
		 // SAMPLE CODE
		 // Delete Guest Cart Items Code
		 // $.jStorage.flush()
		 // Create sample item in Guest Cart
		 // var guestCart = []
		 // var cartItem1 = {}
		 // cartItem1.title = "Garden Hose";
		 // cartItem1.asin = "12384829";
		 // guestCart.push(cartItem1)
		 // $.jStorage.set("shopperaterGuestCart", guestCart);
	},

	events: {
		"click #cart-popover-trigger":          "showCartPopover"
    },

    showCartPopover: function() {
    	$('#cart-items-modal').modal()
    	$('#cart-items-modal').modal('show')
    	// $("#cart-popover-trigger").popover({ title: 'Items', placement: 'bottom', animation: false });
    	// $("#cart-popover-trigger").popover('toggle');

    	var guestCartItems = $.jStorage.get("shopperaterGuestCart");
    	var moduleCartModal = new Shopperater.Views.ModuleCartModal({ collection: guestCartItems })
    	$('.modal-content').html(moduleCartModal.render().$el);

    },

	render: function () {
		
		var guestCartItems = $.jStorage.get("shopperaterGuestCart");
		if(!guestCartItems){
			// If there are no items in the cart do this
			console.log("This Guest has no items in their cart")
			var itemCount = 0
			this.$el.html(this.template({ itemCount: itemCount }));
		} else {
			var itemCount = guestCartItems.length
			this.$el.html(this.template({ itemCount: itemCount }));
		};
		return this;
	}

});
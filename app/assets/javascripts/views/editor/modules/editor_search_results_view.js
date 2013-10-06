Medley.Views.EditorSearchResults = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/editor/search_results'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"click #add-to-cart-button":           "addItemToCart"
    },

	render: function () {
    this.$el.html(this.template({ collection: this.collection })).fadeIn(500);
    $('#module-product-results').niceScroll({
    	cursorcolor:"#999999", 
    	cursorwidth: 8,
        cursorborder: '1px solid #eaeaea'
    });
	return this;
	}

});
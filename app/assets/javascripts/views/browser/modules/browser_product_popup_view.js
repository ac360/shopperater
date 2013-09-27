Medley.Views.BrowserProductPopUp = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/browse/product_popup'],

	initialize: function() {
		_.bindAll(this);
        console.log("This Product Has Been Loaded In A Pop-Up: ", this.model);
	},

	events: {
    },

	render: function () {
    this.$el.html(this.template({ model: this.model })).fadeIn(500);
	return this;
	}

});
Shopperater.Views.ScreenBrowseMedliesView = Backbone.View.extend({
	
	tagName: "div",
    id: "",
    className: "",
	template: JST['screens/browse_medlies'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

	render: function () {
		this.$el.html(this.template({}));
		// Render Sub Views
		var modulePrimarySearch = new Shopperater.Views.ModulePrimarySearch()
		return this;
	}

});
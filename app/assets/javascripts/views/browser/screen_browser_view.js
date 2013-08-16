Medley.Views.ScreenBrowser = Backbone.View.extend({
	
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
		var modulePrimarySearch = new Medley.Views.ModuleBrowseMedleySearch()
		return this;
	}

});
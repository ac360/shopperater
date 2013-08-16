Shopperater.Views.ScreenRemixMedleyView = Backbone.View.extend({
	
	tagName: "div",
    id: "",
    className: "",
	template: JST['screens/remix_medley'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

	render: function () {
		this.$el.html(this.template({}));
		return this;
	}

});
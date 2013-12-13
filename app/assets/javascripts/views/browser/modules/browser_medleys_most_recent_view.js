Medley.Views.MedleysMostRecent = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/browse/medleys_most_recent'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

	render: function () {
    this.$el.html(this.template({ collection: this.collection })).fadeIn(500);
	return this;
	}

});
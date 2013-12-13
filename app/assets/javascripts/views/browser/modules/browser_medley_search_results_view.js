Medley.Views.MedleySearchResults = Backbone.View.extend({
	 
    tagName: "div",
    id: "medley-search-results",
    className: "row",
    template: JST['screens/browse/medley_search_results'],

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
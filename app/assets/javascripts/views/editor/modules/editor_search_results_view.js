Medley.Views.EditorSearchResults = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/editor/search_results'],

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
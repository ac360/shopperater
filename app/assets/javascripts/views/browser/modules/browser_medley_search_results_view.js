Medley.Views.MedleySearchResults = Backbone.View.extend({
	 
    tagName: "div",
    id: "medley-search-results",
    className: "",
    template: JST['screens/browse/medley_search_results'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

    instantiateNiceScroll: function() {
    	$('#medley-results-container').niceScroll({cursorcolor:"#999999"})
    },

	render: function () {
    this.$el.html(this.template({ collection: this.collection })).fadeIn(500);
    _(this.instantiateNiceScroll).defer();
	return this;
	}

});
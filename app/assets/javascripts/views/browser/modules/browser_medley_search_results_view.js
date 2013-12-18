Medley.Views.MedleySearchResults = Backbone.View.extend({
	 
    tagName: "div",
    id: "medley-search-results",
    className: "row",
    template: JST['screens/browse/medley_search_results'],

	initialize: function() {
		_.bindAll(this);
		
	},

	instantiateScroll: function() {
		$("#medley-results-container").niceScroll({
			cursorcolor:"#999",
			cursorwidth: 5,
			cursorborder: '0px solid #fff'
		});
	},

	events: {
    },

	render: function () {
		var self = this;
    	this.$el.html(this.template({ collection: this.collection })).fadeIn(500);

    	_.defer( function() { self.instantiateScroll() } );

	return this;
	}

});
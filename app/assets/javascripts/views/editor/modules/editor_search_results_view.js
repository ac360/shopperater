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

    instantiateScroll: function() {
		$("#module-product-results").niceScroll({
			cursorcolor:"#999",
			cursorwidth: 5,
			cursorborder: '0px solid #fff'
		});
	},

	render: function () {
		var self = this;

	    this.$el.html(this.template({ collection: this.collection })).fadeIn(500);

	    _.defer( function() { self.instantiateScroll() } );
	    
		return this;
	}

});
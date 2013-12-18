Medley.Views.ShowUserMedleys = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "row",
    template: JST['screens/show/show_user_medleys'],

	initialize: function() {
		_.bindAll(this);
	},

	instantiateScroll: function() {
		$("#user-medley-results").niceScroll({
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
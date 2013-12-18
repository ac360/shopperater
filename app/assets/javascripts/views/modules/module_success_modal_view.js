Medley.Views.SuccessModal = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['modules/success_modal'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

    successShare: function() {
    	$('#success-modal-content').html('<h1>Success!</h1>');
    },

	render: function () {
		
		var self = this;

	    this.$el.html(this.template()).fadeIn(400);

	    _.defer( function() { self.successShare() } );

		return this;
	}

});
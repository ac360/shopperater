Shopperater.Views.ModalRemixNotification = Backbone.View.extend({
	
	el:  "#notification-modal",

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"click #remix-button"		:     "renderRemixScreen"
    },

    renderRemixScreen: function() {
    	$('#notification-modal').modal('hide')
    	Shopperater.Router.navigate("/remix", {trigger: true});
    },

	render: function () {
		return this;
	}

});
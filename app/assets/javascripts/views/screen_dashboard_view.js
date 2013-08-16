Shopperater.Views.ScreenDashboard = Backbone.View.extend({
	 
    el: ".container",

	initialize: function() {
		_.bindAll(this);

		// Render Initial Medley View
		var modulePrimarySearch = new Shopperater.Views.ModulePrimarySearch({})
	},

	events: {
		"click #accept-remix-button"	:     "renderMedleyCreateScreen"
    },

    renderMedleyCreateScreen: function() {
    	alert("What happens now is the User is taken to the Medley create area")
    },

	render: function () {
	return this;
	}

});
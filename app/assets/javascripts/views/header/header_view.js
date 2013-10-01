Medley.Views.Header = Backbone.View.extend({
	
	el: "#header-container",

	initialize: function() {
		_.bindAll(this);
		_.defer( function() {
              $('#tagline').delay(800).fadeIn(1000);
        });
	},

	events: {
		"click #menu-button"      :  "showMenu"
	},

	showMenu: function() {
      $('#menu-links-container').slideToggle(120);
    },

	render: function () {
		return this;
	}

});
Medley.Views.Header = Backbone.View.extend({
	
	el: "#header-container",

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		'click #publish-success-button'				:   'clearMedleyAndRedirect',
		'click .retailer-select'                    :   'detectDropdown'
	},

	detectDropdown: function(e) {
    	var retailer = $(e.currentTarget).attr('data-retailer');
    	$('#retailer-title').text(retailer);
    	console.log(retailer);
    	if (retailer === "Etsy") {
    		$('#retailer-options-etsy').slideDown(150, function() {});
    	} else {
    		$('#retailer-options-etsy').slideUp(150, function() {});
    	};
    },

	render: function () {
		return this;
	}

});
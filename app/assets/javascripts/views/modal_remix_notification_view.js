Shopperater.Views.ModalRemixNotification = Backbone.View.extend({
	
	tagName: "div",
    id: "",
    className: "",
	template: JST['modules/modal_remix_notification'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"click #cancel-remix-button"          : 'removeTempItemFromGrid' 
    },

    removeTempItemFromGrid: function() {
    	// Check to see if a temporary grid item has already been added...
    	if ($("li").hasClass("temp-grid-item")) {
	    	// Re-instantiate Gridster under a variable that also has access to the API object
	    	var medleyGrid = $(".gridster ul").gridster({
		        widget_margins: [8, 8],
		        widget_base_dimensions: [100, 100]
	        }).data('gridster');
	    	// Add new item
	    	medleyGrid.remove_widget($('.temp-grid-item'));
	    	console.log("Item Removed!")
    	}
    },

	render: function () {
		
		this.$el.html(this.template());
		return this;
		
	}

});
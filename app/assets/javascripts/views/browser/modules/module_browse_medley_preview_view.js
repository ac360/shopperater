Medley.Views.ModuleBrowseMedleyPreviewView = Backbone.View.extend({
	
	tagName: "div",
    className: "row",
	template: JST['screens/browse/medley_preview'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		'dragenter #medley-container'              : 'addTempItemToGrid',
		'dragleave #medley-container'              : 'removeTempItemFromGrid',
		'dragleave #medley-container' 		       : 'unhighlightDropZone',
		'drop #medley-container'      		       : 'openRemixModal',
	    'dragover #medley-container'  		       : 'highlightDropZone' 
    },

    instantiateGridster: function() {
        var self = this;
    	var gridster = $(".gridster ul").gridster({
                   widget_margins: [5, 5],
                   widget_base_dimensions: [90, 90],
                   // Put in callback for drag stop
                   draggable: {
                       stop: function () {
                           self.openRemixModal()
                       }
                   }
               }).data("gridster");
    },

    highlightDropZone: function(e) {
    	e.preventDefault();
    	$('#medley-container').addClass('drop-zone-highlight')
    },

    unhighlightDropZone: function(e) {
    	$('#medley-container').removeClass('drop-zone-highlight')
    },

    addTempItemToGrid: function() {
    	// Check to see if a temporary grid item has already been added...
    	if (!$("li").hasClass("temp-grid-item")) {
	    	// Re-instantiate Gridster under a variable that also has access to the API object
	    	var gridster = $(".gridster ul").gridster({
                   widget_margins: [5, 5],
                   widget_base_dimensions: [90, 90],
                   // Put in callback for drag stop
                   draggable: {
                       stop: function () {
                           self.openRemixModal()
                       }
                   }
               }).data("gridster");
	    	// Add new item
	    	gridster.add_widget('<li class="temp-grid-item"></li>', 1, 1, 1, 1);
    	}
    },

    removeTempItemFromGrid: function() {
    	// Check to see if a temporary grid item has already been added...
    	if ($("li").hasClass("temp-grid-item")) {
	    	// Re-instantiate Gridster under a variable that also has access to the API object
	    	var gridster = $(".gridster ul").gridster({
                   widget_margins: [5, 5],
                   widget_base_dimensions: [90, 90],
                   // Put in callback for drag stop
                   draggable: {
                       stop: function () {
                           self.openRemixModal()
                       }
                   }
               }).data("gridster");
	    	// Add new item
	    	gridster.remove_widget($('.temp-grid-item'));
	    	console.log("Item Removed!")
    	}
    },

	render: function () {
		this.$el.html(this.template({ }));
        
        // Defer the instantiation of Gridster so that it happens at the end of everything else
		_(this.instantiateGridster).defer();

        // Manual Event Binder for Notification Modal Hide
        var self = this;
        $('#notification-modal').on('hidden.bs.modal', function () {
            self.removeTempItemFromGrid();
            self.unhighlightDropZone();
        })

		return this;
	},

	openRemixModal: function(e) {
    	
        this.unhighlightDropZone();

        // Build Editor Link
        var searchKeywords = $('#primary-search-field').val().replace(/ /g,"+");
        var editorLink = '/editor?search=' + searchKeywords
        $("#editor-button").attr('href', editorLink );

        // Show Remix Notification Modal
        $('#notification-modal').modal('show')

		var medleyTitle = $('#medley-title').text()
		var medleyDescription = $('#medley-description').text()
    },

});
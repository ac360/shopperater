Medley.Views.ModuleBrowseMedleyPreviewView = Backbone.View.extend({
	
	tagName: "div",
  className: "row",
	template: JST['screens/browse/medley_preview'],

	initialize: function() {
		_.bindAll(this);
    console.log("The Current Medley Being Viewed is: ", this.model)
	},

	events: {
		  'dragenter #medley-container'                : 'addTempItemToGrid',
		  'dragleave #medley-container'                : 'removeTempItemFromGrid',
		  'dragleave #medley-container' 		           : 'unhighlightDropZone',
		  'drop #medley-container'      		           : 'openRemixModal',
	    'dragover #medley-container'  		           : 'highlightDropZone',
      'click #editor-button'                       : 'remixMedley',
      "click .medley-grid-item"                    : "linkTest"
  },

  linkTest: function() {
      var link = $('.medley-grid-item').attr('data-link') + "%26tag%3D" + this.model.user.affiliate_id
      alert(link);
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

  openRemixModal: function(e) {
    this.unhighlightDropZone();
    // Show Remix Notification Modal
    $('#remix-modal').modal('show')
    // Manual Event Listener to Remove Temp Grid Item After Modal Hide
    var self = this;
    $('#remix-modal').on('hidden.bs.modal', function () {
        self.removeTempItemFromGrid();
        self.unhighlightDropZone();
    });
  },

  remixMedley: function() {
    // Build Remix Modal's Link to Editor Area with Any Params
    var searchKeywords = $('#primary-search-field').val()
    var editorLink = '/editor'
    this.model.search = searchKeywords;
    // $("#editor-button").attr('href', editorLink );
    $.jStorage.set("medley_current", this.model);
    window.location = editorLink
  },

	render: function () {
    var self = this;
		this.$el.html(this.template({ model: this.model })).fadeIn(1000);
    // Defer the instantiation of Gridster so that it happens at the end of everything else
    _.defer( function() { self.instantiateGridster(); } )
    // Manual Event Binder for Notification Modal Hide
		return this;
	}

});
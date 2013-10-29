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
      "click .medley-grid-item"                    : "showProductPopUp",
      "click #remix-link"                          : 'openRemixModal',
      "click #share-link"                          : 'openShareModal'
  },

  showProductPopUp: function(e) {
    // Get ID of Product
    var productID = $(e.currentTarget).attr('data-id');
    // Get Specific Product From Model & Make It A Seperate Model
    var thisProduct = _.where(this.model.items, { id: productID })[0];
    // Update Link
    thisProduct.link = $(e.currentTarget).attr('data-link') + "%26tag%3D" + this.model.user.affiliate_id
    // Prepare Modal
    $('#product-modal').html('');
    var productPopUp = new Medley.Views.BrowserProductPopUp({ model: thisProduct })
    $('#product-modal').html(productPopUp.render().$el);

    $('#product-modal').modal();
    $('#product-modal').modal('show');
  },

  instantiateGridster: function() {
    	this.options.gridster = $(".gridster ul").gridster({
             widget_margins: [5, 5],
             widget_base_dimensions: [90, 90]
          }).data("gridster")
      // Disable Dragging
      this.options.gridster.disable();
  },

  addItemsToMedley: function() {
      var self = this;
      _.each(this.model.items, function(item) {
          if ( item.id !== null ) {
              // Find Item Size and set special class...
              if (item.x == 1) {
                  self.options.gridster.add_widget('<li class="medley-grid-item item-small" data-id="' + item.id + '" data-title="' + item.title + '" data-price="' + item.price + '" data-imagesmall="' + item.img_small + '" data-imagelarge="' + item.img_big + '" data-category="' + item.category + '" data-source="' + item.source + '" data-link="' + item.link + '"><div id="medley-item-image-container"><img src="' + item.img_small + '" class="product-image" draggable="false"></div></li>', item.x, item.y, item.c, item.r); 
              } else if (item.x == 2 && item.y ==1) {
                  self.options.gridster.add_widget('<li class="medley-grid-item item-medium" data-id="' + item.id + '" data-title="' + item.title + '" data-price="' + item.price + '" data-imagesmall="' + item.img_small + '" data-imagelarge="' + item.img_big + '" data-category="' + item.category + '" data-source="' + item.source + '" data-link="' + item.link + '"><div id="medley-item-image-container"><img src="' + item.img_big + '" class="product-image" draggable="false"></div></li>', item.x, item.y, item.c, item.r); 
              } else if (item.x == 2 && item.y == 2) {
                  self.options.gridster.add_widget('<li class="medley-grid-item item-large" data-id="' + item.id + '" data-title="' + item.title + '" data-price="' + item.price + '" data-imagesmall="' + item.img_small + '" data-imagelarge="' + item.img_big + '" data-category="' + item.category + '" data-source="' + item.source + '" data-link="' + item.link + '"><div id="medley-item-image-container"><img src="' + item.img_big + '" class="product-image" draggable="false"></div></li>', item.x, item.y, item.c, item.r); 
              }
          };
      });
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
    	// Add new item
    	this.options.gridster.add_widget('<li class="temp-grid-item"></li>', 1, 1, 1, 1);
  	}
  },

  removeTempItemFromGrid: function() {
  	// Check to see if a temporary grid item has already been added...
  	if ($("li").hasClass("temp-grid-item")) {
    	this.options.gridster.remove_widget($('.temp-grid-item'));
    	console.log("Item Removed!")
  	}
  },

  openRemixModal: function(e) {
    e.preventDefault();
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

  openShareModal: function(e) {
    e.preventDefault();
    // Show Remix Notification Modal
    $('#share-modal').modal('show')
  },

  shareModalTab

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
    _.defer( function() { self.instantiateGridster(), self.addItemsToMedley(); } )
    // Manual Event Binder for Notification Modal Hide
		return this;
	}

});
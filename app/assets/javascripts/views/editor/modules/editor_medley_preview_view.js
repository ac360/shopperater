Medley.Views.EditorMedleyPreview = Backbone.View.extend({
	
	tagName: "div",
    className: "row",
	template: JST['screens/editor/medley_preview'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		'dragenter #medley-container'              : '',
		'dragleave #medley-container'              : 'removeTempItemFromGrid',
		'dragleave #medley-container' 		       : 'unhighlightDropZone',
		'drop #medley-container'      		       : 'addItemToGrid',
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

    addItemToGrid: function() {
    	// Re-instantiate Gridster
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

        this.unhighlightDropZone();
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

		this.$el.html(this.template());

        // Defer the instantiation of Gridster so that it happens at the end of everything else
		_(this.instantiateGridster).defer();

		return this;
	},

	openRemixModal: function(e) {

		var medleyTitle = $('#medley-title').text()
		var medleyDescription = $('#medley-description').text()


        // This code is used to create new Medlies, but you are no longer using it here
    	// var newMedley = new Medley.Collections.Medlies();
        // newMedley.create({ 
        //        	title: medleyTitle, 
        //        	description:  ,
               	
        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  
               	
        //     });
    },

});
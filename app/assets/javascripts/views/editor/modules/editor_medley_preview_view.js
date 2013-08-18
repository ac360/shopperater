Medley.Views.EditorMedleyPreview = Backbone.View.extend({
	
	tagName: "div",
    className: "row",
	template: JST['screens/editor/medley_preview'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
        'click .glyphicon-pencil'                  : 'gridOpenItemOptions',
        'click .glyphicon-remove'                  : 'gridRemoveItemFromGrid',
		'dragleave #medley-container' 		       : 'gridUnhighlightDropZone',
		'drop #medley-container'      		       : 'gridAddItemToGrid',
	    'dragover #medley-container'  		       : 'gridHighlightDropzone',
        'click #size-minus-button'                 : 'gridMakeItemSmaller',
        'click #size-plus-button'                  : 'gridMakeItemBigger'
    },

    render: function () {
        this.$el.html(this.template());
        // If there is a Collection, load it into the Medley
        if(this.collection){
            _(this.loadFirstMedley).defer();
        } else {
            // Defer the instantiation of Gridster so that it happens at the end of everything else
            _(this.instantiateGridster).defer();
        }
        return this;
    },

    gridRemoveItemFromGrid: function(e) {
        var verifyRemoval = confirm("Remove this item from your Medley?")
            if (verifyRemoval == true) {
                var gridster = M.instantiateGridster();
                gridster.remove_widget($(e.currentTarget).closest('.medley-grid-item'));
              }
    },

    gridMakeItemSmaller: function() {
        var currentSize = $('#item-box-size').attr('data-size')
        if (currentSize > 1) {
            currentSize = currentSize - 1
            $('#item-box-size').attr('data-size', currentSize);
            switch (currentSize) {
              case 1:
                $('#item-box-size').text('Small');
                break;
              case 2:
                $('#item-box-size').text('Medium');
                break;
              case 3:
                $('#item-box-size').text('Large');
                break;
            }
        }
    },

    gridMakeItemBigger: function() {
        var currentSize = $('#item-box-size').attr('data-size')
        if (currentSize < 3) {
            currentSize = parseInt(currentSize) + 1
            $('#item-box-size').attr('data-size', currentSize);
            switch (currentSize) {
              case 1:
                $('#item-box-size').text('Small');
                break;
              case 2:
                $('#item-box-size').text('Medium');
                break;
              case 3:
                $('#item-box-size').text('Large');
                break;
            }
        }
    },

    gridOpenItemOptions: function(e) {
        // Resize Item
        var gridster = M.instantiateGridster();
        gridster.resize_widget($(e.currentTarget).closest('.medley-grid-item'), 2, 2);
        // If li hasClass then remove View
        if ( $('li').hasClass("open-options") ) {
            // TODO ------- Write in Code to re-render Original View within the li  
            $('.open-options').removeClass('open-options')     
        };
        // Load in Options Panel
        var itemOptionsPanel = new Medley.Views.EditorItemOptions();
        $($(e.currentTarget).closest('.medley-grid-item')).html(itemOptionsPanel.render().$el).addClass('open-options')
        // Add open-options Class
        //$(e.currentTarget).closest('.medley-grid-item')
    },

    gridCloseItemOptions: function(e) {
        var gridster = M.instantiateGridster();
        // Resize Item Box
        gridster.resize_widget($(e.currentTarget).closest('.medley-grid-item'), 1, 1);
        $(e.currentTarget).removeClass('glyphicon-remove')
        $(e.currentTarget).addClass('glyphicon-pencil')
    },

    gridHighlightDropzone: function(e) {
    	e.preventDefault();
    	$('#medley-container').addClass('drop-zone-highlight')
    },

    gridUnhighlightDropZone: function(e) {
    	$('#medley-container').removeClass('drop-zone-highlight')
    },

    gridAddItemToGrid: function() {
        //  Run Helper function to check how many Medley items are curerntly in the Medley
        if(M.checkMedleyItemCount()) {
            // Re-instantiate Gridster
            var gridster = M.instantiateGridster();
            gridster.add_widget('<li class="medley-grid-item"><i class="glyphicon glyphicon-pencil pull-right edit-item-button"></i></li>', 1, 1, 1, 1);
        } else {
            alert("Sorry, Medlies can contain only 16 Items");
        }
        this.gridUnhighlightDropZone();
    },

    loadFirstMedley: function() {
        _.each(this.collection, function(model) { 
                    var itemView = new Medley.Views.EditorItem({ model: model });
                    $('#medley-grid').html(itemView.render().$el)
            });
        M.instantiateGridster();

    },

    instantiateGridster: function() {
        M.instantiateGridster();
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
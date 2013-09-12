Medley.Views.EditorProduct = Backbone.View.extend({
	// This View uses multiple Templates
    tagName: 'div',
    id: '',
    className: 'medley-grid-item-view',
	template: JST['screens/editor/product'],

	initialize: function() {
		_.bindAll(this);
        this.setModelSize();
        console.log("This Product has been loaded into the Medley: ", this.model)
	},

	events: {  
		"mouseover"			    				:           "mouseOver",
		"mouseleave"							:           "mouseLeave",
		"click .glyphicon-pencil"           	: 			"gridOpenItemOptions",
		"click #save-options-button"			:           "saveOptions",
		'click #size-minus-button'              : 			'gridMakeItemSmaller',
        'click #size-plus-button'               : 			'gridMakeItemBigger',
        'click #delete-item-button'             : 			'gridRemoveItemFromGrid'
    },

    saveOptions: function(e) {
    	this.model.custom_title = $('#item-custom-title-field').val();
    	this.gridCloseItemOptions(e);
    },

    gridOpenItemOptions: function(e) {
        // Resize Item
        var gridster = M.instantiateGridster();
        gridster.resize_widget($(e.currentTarget).closest('.medley-grid-item'), 2, 2);
        // If options panel is open already
        if ( $('li').hasClass("open-options") ) {
            // TODO ------- Write in Code to re-render Original View within the li  
            $('.open-options').removeClass('open-options')     
        };
        // Load in Options Panel
        var itemOptionsPanel = new Medley.Views.EditorItemOptions();
        $($(e.currentTarget).closest('.medley-grid-item-view')).html(itemOptionsPanel.render().$el).addClass('open-options')
    },

    gridCloseItemOptions: function(e) {
        var gridster = M.instantiateGridster();        
		console.log(this.model.size, this.model.sizex, this.model.sizey)
        // Resize Item Box
        $(e.currentTarget).closest('.medley-grid-item').attr({'data-sizex': this.model.sizex, 'data-sizey': this.model.sizey})
        gridster.resize_widget($(e.currentTarget).closest('.medley-grid-item'), this.model.sizex, this.model.sizey);
        this.render();
        $('.open-options').removeClass('open-options')  
    },

    gridMakeItemSmaller: function(e) {
        if (this.model.size > 1) { 
        	this.model.size = this.model.size - 1 
        };
        this.gridSaveItemSizes();
        var gridster = M.instantiateGridster();
        gridster.resize_widget($(e.currentTarget).closest('.medley-grid-item'), this.model.x, this.model.y);
    },

    gridMakeItemBigger: function(e) {
        var itemPosition = {}
        itemPosition.row = $(e.currentTarget).closest('.medley-grid-item').attr('data-row');
        itemPosition.col = $(e.currentTarget).closest('.medley-grid-item').attr('data-col');
        console.log("This Item is in Medley Position:", itemPosition);

        if (itemPosition.col < 4) {
            if (this.model.size < 3) { 
                this.model.size = this.model.size + 1 
            }
            this.gridSaveItemSizes();
            var gridster = M.instantiateGridster();
            gridster.resize_widget($(e.currentTarget).closest('.medley-grid-item'), this.model.x, this.model.y);
        } else {
            alert("This Item has no where to grow!  Move it one column to the left, and then resize it.");
        };
    },

    setModelSize: function() {
        if (this.model.size === undefined) {
            if (this.model.x == 1 && this.model.y == 1) {
                this.model.size = 1
            } else if (this.model.x == 2 && this.model.y == 1) {
                this.model.size = 2
            } else if (this.model.x == 2 && this.model.y == 2) {
                this.model.size = 3
            }
        }
    },

    gridSaveItemSizes: function() {
    	switch(this.model.size) {
			case 1:
			  this.model.x = 1
			  this.model.y = 1
			  break;
			case 2:
			  this.model.x = 2
			  this.model.y = 1
			  break;
			case 3:
			  this.model.x = 2
			  this.model.y = 2
		}
    },

    gridRemoveItemFromGrid: function(e) {
        var verifyRemoval = confirm("Remove this item from your Medley?")
        if (verifyRemoval == true) {
            var gridster = M.instantiateGridster();
            gridster.remove_widget($(e.currentTarget).closest('.medley-grid-item'));
        };
    },

    mouseOver: function(e) {
    	var self = this;
    	var target = $(e.currentTarget).find('#medley-item-image-container');
    	$(target).fadeOut(50, function(){
    		$($(e.currentTarget).find('#medley-item-title-container')).removeClass('hide')
    		$($(e.currentTarget).find('#medley-item-title-container')).fadeIn(50);
    		$(target).addClass('hide')

    		// The mouseLeave event doesn't always fire, so you had to write a timeout to check if the mouse is still hovering.
    		setTimeout(function(){
    			if($(e.currentTarget).is(":hover")) {
	    		} else {
		    			$($(e.currentTarget).find('#medley-item-title-container')).fadeOut(300, function(){
				    		$($(e.currentTarget).find('#medley-item-image-container')).removeClass('hide')
				    		$($(e.currentTarget).find('#medley-item-image-container')).fadeIn(300);
				    		$($(e.currentTarget).find('#medley-item-title-container')).addClass('hide')
				    	});
	    		}
    		}, 500)
    	}); // fadeOut callback
    },

    mouseLeave: function(e) {
    	$($(e.currentTarget).find('#medley-item-title-container')).fadeOut(100, function(){
    		$($(e.currentTarget).find('#medley-item-image-container')).removeClass('hide')
    		$($(e.currentTarget).find('#medley-item-image-container')).fadeIn(100);
    		$($(e.currentTarget).find('#medley-item-title-container')).addClass('hide')
    	});
    },

	render: function () {
    	this.$el.html(this.template({ model: this.model }))
		return this;
	}

});
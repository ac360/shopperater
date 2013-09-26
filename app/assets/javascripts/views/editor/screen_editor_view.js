Medley.Views.ScreenEditor = Backbone.View.extend({
	
	el: "#dashboard-container",

	initialize: function() {
		_.bindAll(this);

		var self = this;
	    
		// Get Parameters, if any...
		var query = location.search.substr(1);
		if(query){
			var data = query.split("&");
	    	var params = {};
			for(var i=0; i<data.length; i++) {
			    var item = data[i].split("=");
			    params[item[0]] = item[1];
			}
		};

		// Remove URL Params from REFERRAL MODE.  They are used at first, then everything turns into Draft Mode
			// if (params.search !== undefined) {
	  //           var newURL = "editor?draft=true&search=" + params.search
	  //           Medley.Router.navigate(newURL, { replace: true });
	  //       } else {
	  //           var newURL = "editor?draft=true"
	  //           Medley.Router.navigate(newURL, { replace: true });
	  //       }

		// Get Medley in Local Storage, if any...
		medleyDraft = $.jStorage.get("medley_current", false);

		// Check for REFERRAL Param - TEMPORARILY DISABLED
		if ( params !== undefined && params.referral !== undefined && params.remix === undefined ){
				alert("Referral Mode has been disabled temporarily")
				// var editorMedleyPreview = new Medley.Views.EditorMedleyPreviewReferralMode({ params: params });
				// $('#module-medley-editor').html(editorMedleyPreview.render().$el); 

		// Check for REMIX Param
		} else if (  params !== undefined && params.remix !== undefined && params.referral === undefined ) {
				var editorMedleyPreview = new Medley.Views.EditorMedleyPreviewRemixMode();
				$('#module-medley-editor').html(editorMedleyPreview.render().$el);
		
		// Check for DRAFT of Medley in Local Storage
	    } else if ( params === undefined && medleyDraft !== false ) {
	    		var editorMedleyPreview = new Medley.Views.EditorMedleyPreviewDraftMode({ model: medleyDraft });
				$('#module-medley-editor').html(editorMedleyPreview.render().$el);

		// Check for PLAIN CREATE MODE
		} else {
				var editorMedleyPreview = new Medley.Views.EditorMedleyPreviewPlainMode({});
				$('#module-medley-editor').html(editorMedleyPreview.render().$el);
		};

		// Check for SEARCH Param and pre-load a search
		if ( medleyDraft !== false && medleyDraft.search !== undefined ){
				var editorSearch = new Medley.Views.EditorSearch({ model: medleyDraft });
		} else {
				var editorSearch = new Medley.Views.EditorSearch({});
		}

		// Call Auto-Save Function Every 6 Seconds
		window.setInterval(function(){
		   self.autoSaveMedley();
		}, 6000);

		// Manual Event Binders
			$('#medley-title').typing({
			    stop: function (event, $elem) {
			        self.validateMedleyTitle();
			    },
			    delay: 400
			});
	}, // initialize

	events: {
		'dragleave #medley-container' 		        :   'gridUnhighlightDropZone',
		'drop #medley-container'      		        :   'gridAddItemToGrid',
	    'dragover #medley-container'  		        :   'gridHighlightDropzone',
		'dragstart .item-result-row'                :   'gridSetDataTransferObject',
		'click #publish-next-button-one'            :   'loadPublishScreenTwo',
		'click .publish-cancel'                     :   'hidePublishModal',
		'click #medley-publish-button'              :   'openPublishArea',
		'click #publish-confirm-button'			    :   'publishMedley',
		'click #medley-reset-link'					:   'deleteMedley',
		'click #try-again-btn'                      :   'hidePublishModal'
	},

	gridHighlightDropzone: function(e) {
    	e.preventDefault();
    	$('#medley-container').addClass('drop-zone-highlight')
    },

    gridUnhighlightDropZone: function(e) {
    	$('#medley-container').removeClass('drop-zone-highlight')
    },

    gridAddItemToGrid: function(e) {
        //  Run Helper function to check how many Medley items are curerntly in the Medley
        if(M.checkMedleyItemCount()) {
            // Get Product from DataTransferObject that was set on dragstart
            var product = {}
            product.id           = e.originalEvent.dataTransfer.getData("productID");
            product.title        = e.originalEvent.dataTransfer.getData("productTitle");
            product.price        = e.originalEvent.dataTransfer.getData("productPrice");
            product.img_small    = e.originalEvent.dataTransfer.getData("productImageSmall");
            product.img_large    = e.originalEvent.dataTransfer.getData("productImageLarge");
            product.category     = e.originalEvent.dataTransfer.getData("productCategory");
            product.source       = e.originalEvent.dataTransfer.getData("productSource");
            product.link         = e.originalEvent.dataTransfer.getData("productLink");
            product.sizex        = 1;
            product.sizey        = 1;
            product.size         = 1;
            console.log("You just added the Product below:");
            console.log(product);
            // Re-instantiate Gridster
            var gridster = M.instantiateGridster();
            gridster.add_widget('<li class="medley-grid-item new-item" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-imagesmall="' + product.img_small + '" data-imagelarge="' + product.img_small + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', 1, 1, 1, 1);
            var itemView = new Medley.Views.EditorProduct({ model: product });
            $('.new-item').html(itemView.render().$el)
            $('.new-item').removeClass('new-item')
        } else {
            alert("Sorry, Medlies can contain only 16 Items");
        };
        this.gridUnhighlightDropZone();
    },

	gridSetDataTransferObject: function(e) {
	    e.originalEvent.dataTransfer.setData("productID", 	 $(e.currentTarget).attr('data-id'));
	    e.originalEvent.dataTransfer.setData("productTitle", $(e.currentTarget).attr('data-title'));
	    e.originalEvent.dataTransfer.setData("productPrice", $(e.currentTarget).attr('data-price'));
	    e.originalEvent.dataTransfer.setData("productImageSmall", $(e.currentTarget).attr('data-image-small'));
	    e.originalEvent.dataTransfer.setData("productImageLarge", $(e.currentTarget).attr('data-image-large'));
	    e.originalEvent.dataTransfer.setData("productCategory", $(e.currentTarget).attr('data-category'));
	    e.originalEvent.dataTransfer.setData("productSource", $(e.currentTarget).attr('data-source'));
	    e.originalEvent.dataTransfer.setData("productLink", $(e.currentTarget).attr('data-link'));
	},

	deleteMedley: function() {
		$.jStorage.deleteKey("medley_current")
		var searchKeywords = $('#primary-search-field').val();
		var editorLink = '/editor?search=' + searchKeywords
		window.location = editorLink
	},

	autoSaveMedley: function() {
		var thisMedley				= {};
		thisMedley.title            = $('#medley-title').text();
        thisMedley.description      = $('#description').text();
        // Get last search performed
        thisMedley.search           = $('#primary-search-field').attr('data-search');
        // Get Remix Of Data Attribute Include in Medley Title Tag
        if ( $('#medley-title').attr('data-remixof') !== undefined ) {
        	thisMedley.remix_of     = $('#medley-title').attr('data-remixof');
        }
        thisMedley.items            = [];
        $('.medley-grid-item').each(function(index, elem) {
	            var thisItem = {};
	            thisItem.r          = $(elem).attr('data-row')
	            thisItem.c          = $(elem).attr('data-col')
	            thisItem.x          = $(elem).attr('data-sizex')
	            thisItem.y          = $(elem).attr('data-sizey')
	            thisItem.id         = $(elem).attr('data-id')
	            thisItem.title      = $(elem).attr('data-title')
	            thisItem.price      = $(elem).attr('data-price')
	            thisItem.img_small  = $(elem).attr('data-imagesmall')
	            thisItem.img_large  = $(elem).attr('data-imagelarge')
	            thisItem.category   = $(elem).attr('data-category')
	            thisItem.source     = $(elem).attr('data-source')
	            thisItem.link       = $(elem).attr('data-link')
	            thisMedley.items.push( thisItem );
        });
        console.log("Auto-Saved", thisMedley);
        $.jStorage.set("medley_current", thisMedley);
	},

	validateMedleyTitle: function() {

		var title = $('#medley-title').text();
		var uniqueness = new Medley.Models.TitleValidation();
		uniqueness.fetch({ 
		    data: { 
		    	title: title
		    },
		    processData: true,
		    success: function (response) {
		    	var result = response.toJSON();
				if ( !title.match(/^[-\sa-zA-Z0-9]+$/) ) {
						$('#medley-title').addClass('red-border');
						$('#editor-title-error').text('Letters, Numbers and Dashes Only')
						$('#editor-title-error').slideDown(120);
				} else if ( title.length > 40) {
						$('#medley-title').addClass('red-border');
						$('#editor-title-error').text('Titles can only be 40 characters long');
						$('#editor-title-error').slideDown(120);
				} else if (result.valid == false)  {
						$('#medley-title').addClass('red-border');
						$('#editor-title-error').text('Title Is Already Being Used.  Try Another Title');
						$('#editor-title-error').slideDown(120);
				} else {
						$('#medley-title').removeClass('red-border');
						$('#editor-title-error').slideUp(120);
				}
		    } // success
		}); // uniquenuess.fetch
	},

	openPublishArea: function() {
		var self = this;
        var medleyItemsCount = $("#medley-grid li").size()
        if (medleyItemsCount > 1) {
            var thisMedley              = {};
            thisMedley.title            = $('#medley-title').text();
            thisMedley.description      = $('#description').text();
            // Get Remix Of Data Attribute Include in Medley Title Tag
            if ( $('#medley-title').attr('data-remixof') !== undefined ) {
            	thisMedley.remix_of     = $('#medley-title').attr('data-remixof');
            }
            thisMedley.items            = [];
            $('.medley-grid-item').each(function(index, elem) {
                    var thisItem = {};
                    thisItem.row        = $(elem).attr('data-row')
                    thisItem.col        = $(elem).attr('data-col')
                    thisItem.sizex      = $(elem).attr('data-sizex')
                    thisItem.sizey      = $(elem).attr('data-sizey')
                    thisItem.id         = $(elem).attr('data-id')
                    thisItem.title      = $(elem).attr('data-title')
                    thisItem.price      = $(elem).attr('data-price')
                    thisItem.imagesmall = $(elem).attr('data-imagesmall')
                    thisItem.imagelarge = $(elem).attr('data-imagelarge')
                    thisItem.category   = $(elem).attr('data-category')
                    thisItem.source     = $(elem).attr('data-source')
                    thisItem.link       = $(elem).attr('data-link')
                    thisMedley.items.push( thisItem );
            });
            console.log("You are going to Publish this Medley: ", thisMedley);

           	// Clear existing mark-up from modal inner-container
           	$('#publish-modal-inner').html('');
            $('#publish-medley-modal').modal();
            var publishView = new Medley.Views.EditorPublish({ model: thisMedley });
        	$('#publish-modal-inner').html(publishView.render().$el);
	        $('#publish-medley-modal').modal('show');

        } else {
            alert("A Medley must contain at least two items before it can be published...  Otherwise it's not a Medley!")
        };
    },

	hidePublishModal: function() {
		$('#uniqueness-screen').fadeOut(100);
		$('#uniqueness-valid-screen').fadeOut(100);
		$('#uniqueness-invalid-screen').fadeOut(100);
		$('#category-screen').fadeOut(100);
		$('#tags-screen').fadeOut(100);

		$('#publish-medley-modal').modal('hide')
	},

	render: function () {
		return this;
	}

});
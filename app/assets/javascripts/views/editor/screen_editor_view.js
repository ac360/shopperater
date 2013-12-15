Medley.Views.ScreenEditor = Backbone.View.extend({
	
	el: "body",

	initialize: function() {
		_.bindAll(this);
		var self = this;
		// Check Parameters
		var query = location.search.substr(1);
        if(query){
            var data = query.split("&");
            var params = {};
            for(var i=0; i<data.length; i++) {
                var item = data[i].split("=");
                params[item[0]] = item[1];
            }
           	this.options.params = params;
        };
		// Change the Create A Medley link to Delete Medley
		$('#create-link-container').html('<a href="#" id="medley-reset-link" class="m-centered m-font-light" style="font-size:13px;"><i class="fa fa-trash-o"></i> Delete This Medley</a>');

		// Get Medley in Local Storage, if any...
		medleyDraft = $.jStorage.get("medley_current", false);

		// Load Draft Mode or Plain Create Mode...
		if ( medleyDraft !== false ) {
    		var editorMedleyPreview = new Medley.Views.EditorMedleyPreviewDraftMode({ model: medleyDraft });
			$('#module-medley-editor').html(editorMedleyPreview.render().$el);
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
		$('#description').typing({
		    stop: function (event, $elem) {
		        self.validateMedleyDescription();
		    },
		    delay: 1000
		});
	}, // initialize

	events: {
		'dragleave #medley-container' 		        :   'gridUnhighlightDropZone',
		'drop #medley-container'      		        :   'gridAddItemToGrid',
	    'dragover #medley-container'  		        :   'gridHighlightDropzone',
		'dragstart .item-result-row'                :   'gridSetDataTransferObject',
		'click #publish-next-button-one'            :   'loadPublishScreenTwo',
		'click .publish-cancel'                     :   'hidePublishModal',
		'click #medley-publish-button'              :   'publishMedley',
		'click #publish-confirm-button'			    :   'publishMedley',
		'click #medley-reset-link'					:   'deleteMedley',
		'click #try-again-btn'                      :   'hidePublishModal',
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
            var product = {};
            product.id           = e.originalEvent.dataTransfer.getData("productID");
            product.title        = e.originalEvent.dataTransfer.getData("productTitle");
            product.price        = e.originalEvent.dataTransfer.getData("productPrice");
            product.img_small    = e.originalEvent.dataTransfer.getData("productImageSmall");
            product.img_big      = e.originalEvent.dataTransfer.getData("productImageLarge");
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
            gridster.add_widget('<li class="medley-grid-item new-item item-small" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-imagesmall="' + product.img_small + '" data-imagelarge="' + product.img_big + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', 1, 1, 1, 1);
            var itemView = new Medley.Views.EditorProduct({ model: product });
            $('.new-item').html(itemView.render().$el)
            $('.new-item').removeClass('new-item')
        } else {
            alert("Sorry, Medlies can only contain 12 items");
        };
        this.gridUnhighlightDropZone();
        this.validateMedleyUniqueness();
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
		var editorLink = '/editor'
		window.location = editorLink
	},

	clearMedleyAndRedirect: function() {
		var self = this;
		$.jStorage.deleteKey("medley_current");
		var searchKeywords = $('#publish-confirm-title').text();
		var homeLink = '/?search=' + searchKeywords
		window.location = homeLink
	},

	autoSaveMedley: function() {
		var thisMedley = this.createMedleyObject();
        $.jStorage.set("medley_current", thisMedley);
        console.log("Auto-Saved", $.jStorage.get("medley_current", false));
	},

	createMedleyObject: function() {
		    if (this.options.params.remix) {
		    	var remixId = decodeURIComponent(this.options.params.remix)
		    }
    		var thisMedley              = {};
    		thisMedley.search           = $('#primary-search-field').val()
            thisMedley.title            = $('#medley-title').text();
            thisMedley.description      = $('#description').text();
            // Get Remix of Id if present in params
            if (this.options.params.remix) {
		    	thisMedley.remix_of = decodeURIComponent(this.options.params.remix)
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
                    thisItem.img_big    = $(elem).attr('data-imagelarge')
                    thisItem.category   = $(elem).attr('data-category')
                    thisItem.source     = $(elem).attr('data-source')
                    thisItem.link       = $(elem).attr('data-link')
                    thisMedley.items.push( thisItem );
            });
            return thisMedley      
    },

    validateMedleyUniqueness: function(cb) {
		// Medley Uniqueness Validation - Checks Title & Items
		this.model = this.createMedleyObject();
		console.log("Medley Object Serialized: ", this.model);
		items = {};
    	items.ids = [];
    	$(this.model.items).each(function(index, item) {
    		items.ids.push(item.id);
    	});
    	var unique = new Medley.Models.MedleyUniquenessValidation();
    	unique.fetch({ 
		    data: { title: this.model.title, item_ids: items },
		    processData: true,
		    success: function (response) {
		    	var result = response.toJSON();
		    	console.log("Medley Uniqueness Check: ", result)
		    	if (result.medley_unique === false) {
			  		$('#medley-container').addClass('medley-error');
			  		$('#editor-medley-error').text('A Medley With These Items Already Exists!');
					$('#editor-medley-error').slideDown(120);
					return false;
				} else {
					$('#editor-medley-error').slideUp(120);
					$('#medley-container').removeClass('medley-error');
					if (cb) {cb()};
				}
			} // Success
		});
    },

	validateMedleyTitle: function() {
		// Medley Uniqueness Validation - Checks Title & Items
		this.model = this.createMedleyObject();
		if ( this.model.title == "" ) {
				$('#medley-title').addClass('error-background');
				$('#editor-title-error').text('Please Give Your Medley A Title');
				$('#editor-title-error').slideDown(120);
				return false;
		} else if ( !this.model.title.match(/^[-\sa-zA-Z0-9]+$/) ) {
				$('#medley-title').addClass('error-background');
				$('#editor-title-error').text('Letters, Numbers and Dashes Only')
				$('#editor-title-error').slideDown(120);
				return false;
		} else if ( this.model.title.length > 40) {
				$('#medley-title').addClass('error-background');
				$('#editor-title-error').text('Titles can only be 40 characters long');
				$('#editor-title-error').slideDown(120);
				return false;
		} else if ( this.model.title == "remixed medley" ) {
				$('#medley-title').addClass('error-background');
				$('#editor-title-error').text('Please Come Up With Your Own Title For This Medley');
				$('#editor-title-error').slideDown(120);
				return false;
		} else if ( this.model.title == "Untitled Medley" ) {
				$('#medley-title').addClass('error-background');
				$('#editor-title-error').text('Please Come Up With Your Own Title For This Medley');
				$('#editor-title-error').slideDown(120);
				return false;
		} else {
				$('#medley-title').removeClass('error-background');
				$('#editor-title-error').slideUp(120);
		};
	},

	validateMedleyDescription: function() {
		// Validate Medley Description
		var description = $('#description').text().replace(/[^a-zA-Z0-9/.,!? ]/g, '');
		$('#description').text(description)
		M.placeCaretAtEnd( document.getElementById("description") );
		if (description == "Click here to enter or edit a description for the Medley...") {
			$('#description').addClass('error-background');
			$('#editor-description-error').text('Please Come Up With Your Own Description For This Medley')
			$('#editor-description-error').slideDown(120);
			return false;
		} else if (description.length > 700) {
			$('#description').addClass('error-background');
			$('#editor-description-error').text('Medley Description Is Too Long, Please Shorten It.')
			$('#editor-description-error').slideDown(120);
			return false;
		} else {
			$('#description').removeClass('error-background');
			$('#editor-description-error').slideUp(120);
		};
	},

	publishMedley: function() {
		var self = this;
		this.model = this.createMedleyObject();
        if (this.model.items.length > 1) {
        	console.log("this is the Medley to be published", this.model);
	    	self.validateMedleyUniqueness(function(){
	    		if (self.validateMedleyTitle() === false)       { return false };
	    		if (self.validateMedleyDescription() === false) { return false };
	    		var MedleyInfo = new Medley.Collections.Medlies()
		    	MedleyInfo.create({
		    		title       : self.model.title,
		    		remix_of    : self.model.remix_of,
		    		description : self.model.description
		    	}, {
			        success: function (response) {
			          	console.log("Medley published!  Now Adding The Items...");
			          	var result     = response.toJSON();
			          	var thisMedley = new Medley.Models.MedleyCreateItems({ id: result.id })
			          	thisMedley.save({
			          		items: self.model.items
			          	}, {
					          success: function () {
					          		console.log("Medley should now contain the items!");
					          		self.publishSuccess();
					          },
					          error: function (model, xhr) {
					            var errors = $.parseJSON(xhr.responseText).errors
					            console.log(errors)
					          }
						}) // End of thisMedley.save
			        },
			        error: function (model, xhr) {
			            var errors = $.parseJSON(xhr.responseText).errors
			            console.log(errors)
			        }
				}) // End of MedleyInfo.save
	    	}); // validateMedleyUniqueness
        } else {
            $('#medley-container').addClass('medley-error');
	  		$('#editor-medley-error').text('A Medley Must Contain Two Or More Items');
			$('#editor-medley-error').slideDown(120);
        }; // if items.length > 1
    },

    publishSuccess: function() {
    	alert("Success!");
    },

	render: function () {
		return this;
	}

});
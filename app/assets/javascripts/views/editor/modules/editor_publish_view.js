Medley.Views.EditorPublish = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/editor/publish'],

	initialize: function() {
		console.log(this.options)
		_.bindAll(this);
		console.log("Publish Area Opened...")
		this.model = this.createMedley();
		console.log("You are going to Publish this Medley: ", this.model);
	},

	events: {
		'click #publish-next-button-one'            :     'loadPublishScreenThree',
		'keyup .tag-field'      	                :     'reformatTag',
		'click #publish-next-button-two'            :     'validateAllTagsAndProceed',
    },

    createMedley: function() {
    		var thisMedley              = {};
            thisMedley.title            = $('#medley-title').text();
            thisMedley.description      = $('#description').text();
            if (thisMedley.description.length > 300) {
            	this.descriptionError("length");
            };
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
            return thisMedley      
    },

    loadPublishScreenOne: function() {
    	self = this;
    	$('#uniqueness-screen').fadeIn(400);
    	items = {}
    	items.ids = []
    	$(this.model.items).each(function(index, item) {
    		items.ids.push(item.id)
    	});
    	var unique = new Medley.Models.MedleyUniquenessValidation();
    	unique.fetch({ 
		    data: { 
		    	title: this.model.title,
		  		item_ids: items
		    },
		    processData: true,
		    success: function (response) {
		    	var result = response.toJSON();
		    	console.log("Uniqueness Check: ", result.valid)
		    	if (result.valid == true) {
			  		 $('#uniqueness-screen').delay(1000).fadeOut(400, function() {
					    $('#uniqueness-valid-screen').fadeIn(400).delay(800).fadeOut(300, function() {
						    self.loadPublishScreenTwo();
						});
					});
				} else {
					$('#uniqueness-screen').delay(1000).fadeOut(400, function() {
					    $('#uniqueness-invalid-screen').fadeIn(400);
					});
				};
		    }
		}); // unique.fetch
    },

	loadPublishScreenTwo: function() {
		$('#category-screen').fadeIn(300)
		$('#category-list').niceScroll({cursorcolor:"#999999"});
	},

	loadPublishScreenThree: function() {
		this.model.category = $('input[name=optionsRadios]:checked').attr('value');
		if($('input:radio:checked').length > 0){
				$('#category-screen').fadeOut(200, function() {
				    $('#tags-screen').fadeIn(200);
				});
		 }else{
		    	alert("Please select a Category for your Medley");
		 }
	},

	reformatTag: function(e) {
		var tag = $(e.currentTarget).val();
		tag = tag.replace(/[_\W]/g, '').toLowerCase()
		$(e.currentTarget).val(tag);
	},

	descriptionError: function(error) {
		if (error == "length") {
			console.log("Description is too long")
		};
	},	

	validateAllTagsAndProceed: function() {
		var validation = []
		$(".tag-field").each(function(index, elem) {
				var tag = $(elem).val();
			    if (tag.length === 0) {
				      var error = "Tag can't be blank"
				      var errorContainer = $(elem).closest( '.tag-container' ).find('.tag-error')
				      $(errorContainer).text(error);
				      $(elem).removeClass('valid-tag')
				      $(elem).addClass('invalid-tag')
			    } else if (tag.length < 3) {
			      	  var error = "Tag must be at least 3 characters long"
				      var errorContainer = $(elem).closest( '.tag-container' ).find('.tag-error')
				      $(errorContainer).text(error);
				      $(elem).removeClass('valid-tag')
				      $(elem).addClass('invalid-tag')
			    } else if ( tag.match(/[^0-9a-z]/i) ) {
			      	  var error = "Letters, numbers and single words only"
				      var errorContainer = $(elem).closest( '.tag-container' ).find('.tag-error')
				      $(errorContainer).text(error);
				      $(elem).removeClass('valid-tag')
				      $(elem).addClass('invalid-tag')
			    } else {
			      var errorContainer = $(elem).closest( '.tag-container' ).find('.tag-error')
				  $(errorContainer).hide();
			      $(elem).removeClass('invalid-tag')
			      $(elem).addClass('valid-tag')
			    }
		});
		if ($('.invalid-tag').length) {
		} else {
			this.model.tag_one   = $('.tag-field-one').val().toLowerCase()
			this.model.tag_two   = $('.tag-field-two').val().toLowerCase()
			this.model.tag_three = $('.tag-field-three').val().toLowerCase()
			this.publishMedley();
		}
	},

	publishMedley: function() {
		var self = this;
		console.log("this is the Medley to be published", this.model);
		var MedleyInfo = new Medley.Collections.Medlies()
    	MedleyInfo.create({
    		tag_one     : this.model.tag_one,
    		tag_two     : this.model.tag_two,
    		tag_three   : this.model.tag_three,
    		category    : this.model.category,
    		title       : this.model.title,
    		remix_of    : this.model.remix_of,
    		description : this.model.description
    	}, {
	        success: function (response) {
	          	console.log("Medley published!  Now Add The Items...");
	          	var result     = response.toJSON();
	          	var thisMedley = new Medley.Models.MedleyCreateItems({ id: result.id })
	          	thisMedley.save({
	          		items: self.model.items
	          	}, {
			          success: function () {
			          		console.log("Medley should now contain items!")
			          },
			          error: function (model, xhr) {
			            var errors = $.parseJSON(xhr.responseText).errors
			            console.log(errors)
			          }
				}) // End of thisMedley.save
	          	self.publishSuccess();
	          	// $('#publish-medley-modal').modal('hide')
	        },
	        error: function (model, xhr) {
	            var errors = $.parseJSON(xhr.responseText).errors
	            console.log(errors)
	        }
		}) // End of MedleyInfo.save
	},

	publishSuccess: function() {
		$('#tags-screen').fadeOut(200, function() {
		    $('#success-screen').fadeIn(200);
		});
	},

	render: function () {
	var self = this;
    this.$el.html(this.template({ model: this.model }));
     _.defer( function() { self.loadPublishScreenOne() } );
	return this;
	}

});
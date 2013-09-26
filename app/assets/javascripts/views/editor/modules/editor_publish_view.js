Medley.Views.EditorPublish = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/editor/publish'],

	initialize: function() {
		_.bindAll(this);
		console.log("publish area opened")
	},

	events: {
		"click #publish-next-button-one"            :     "loadPublishScreenThree",
		'keyup .tag-field'      	                :     'reformatTag',
		'click #publish-next-button-two'            :     'validateAllTags',
    },

    loadPublishScreenOne: function() {
    	self = this;
    	$('#uniqueness-screen').fadeIn(400);
    	var unique = new Medley.Models.MedleyUniquenessValidation();
    	unique.fetch({ 
		    data: { 
		    	title: this.model.title,
		  		items: this.model.items
		    },
		    processData: true,
		    success: function (response) {
		    	var result = response.toJSON();
		    	console.log(result.valid)
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

	loadPublishScreenFour: function() {
		console.log("publish Screen Four: ", this.model);
	},

	reformatTag: function(e) {
		var tag = $(e.currentTarget).val();
		tag = tag.replace(/[_\W]/g, '').toLowerCase()
		$(e.currentTarget).val(tag);
	},

	validateAllTags: function() {
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
			this.loadPublishScreenFour();
		}
	},

	render: function () {
	var self = this;
    this.$el.html(this.template({ model: this.model }));
     _.defer( function() { self.loadPublishScreenOne() } );
	return this;
	}

});
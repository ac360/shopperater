Medley.Views.EditorPublish = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/editor/publish'],

	initialize: function() {
		_.bindAll(this);
		// $('#category-list').niceScroll({cursorcolor:"#999999"});
		console.log("publish area opened")
	},

	events: {
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
		    	var valid = response.toJSON();
		    	console.log(valid)
		    	if (valid == true) {
			  		//  $('#uniqueness-screen').delay(1200).fadeOut(400, function() {
					//     $('#uniqueness-valid-screen').fadeIn(400).delay(800).fadeOut(300, function() {
					// 	    self.loadPublishScreenTwo();
					// 	});
					// });
				} else {
					// $('#uniqueness-screen').delay(1200).fadeOut(400, function() {
					//     $('#uniqueness-invalid-screen').fadeIn(400);
					// });
				};
		    }
		}); // unique.fetch
    },

	loadPublishScreenTwo: function() {
		$('#category-screen').fadeIn(300)
	},

	loadPublishScreenThree: function() {
		this.options.thisMedley.category = $('input[name=optionsRadios]:checked').attr('value');
		if($('input:radio:checked').length > 0){
				$('#category-screen').fadeOut(200, function() {
				    $('#tags-screen').fadeIn(200);
				});
		 }else{
		    	alert("Please select a Category for your Medley");
		 }
	},

	loadPublishScreenFour: function() {
		$('#tags-screen').fadeOut(200)
		console.log(this.options.thisMedley);
		var editorPublishView = new Medley.Views.EditorPublish({ model: this.options.thisMedley })
		$('.modal-content').html(editorPublishView.render().$el); 
	},

	render: function () {
	var self = this;
    this.$el.html(this.template({ model: this.model }));
     _.defer( function() { self.loadPublishScreenOne() } );
	return this;
	}

});
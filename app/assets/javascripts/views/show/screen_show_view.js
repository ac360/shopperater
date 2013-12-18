Medley.Views.ScreenShow = Backbone.View.extend({
	
	el: "#dashboard-container",

	initialize: function() {
		_.bindAll(this);
		var self = this;

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

		this.render();
	}, // initialize

	events: {
		'click .medley-result-box'			:          'loadNewMedley',
		'click .medley-grid-item'           :          'showProductPopUp'
	},

	showSuccessModal: function() {
		if (this.options.params && this.options.params.success) {
			setTimeout(function(){
				
			    // Prepare Modal
			    $('#success-modal').html('');
			    var successModal = new Medley.Views.SuccessModal()
			    $('#success-modal').html(successModal.render().$el);

			    $('#success-modal').modal();
			    $('#success-modal').modal('show');

			},1000);
		}
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

	loadNewMedley: function(e) {
		console.log("clicked!");
		var id = $(e.currentTarget).attr('data-id');
		window.location = '/' + id
	},

	renderUserMedleys: function() {
        var self = this;
        self.options.medleys_by_user = new Medley.Collections.MedleysByUser();
        self.options.medleys_by_user.fetch({
	        data: { user_id: self.model.user_id },
	        processData: true,
	        success: function (response) {
	          console.log(response.toJSON());
	          var userMedleys = new Medley.Views.ShowUserMedleys({ collection: response.toJSON() });
	          $('#user-medley-results').html(userMedleys.render().$el);
	        }
        });
	},

	render: function () {
		var self = this;
	    var thisMedley = new Medley.Models.MedleyModel({id: this.options.id})
	    thisMedley.fetch({
            success: function (response) {
                self.model = response.toJSON();
        	    // Render Medley Area
			    var medleyPreview = new Medley.Views.ShowMedleyPreview({ model: self.model });
			    $('#show-container').html(medleyPreview.render().$el);
			    self.renderUserMedleys();
			    // Show Success Modal
			    _.defer( function() { self.showSuccessModal() } );
            },
            error: function(model, xhr){
                console.log(model, xhr);
                alert("A Medley with that ID does not exist");
            }
        });
		return this;
	}

});
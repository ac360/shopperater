Medley.Views.ScreenShow = Backbone.View.extend({
	
	el: "#dashboard-container",

	initialize: function() {
		_.bindAll(this);
		var self = this;
		this.render();
	}, // initialize

	events: {
		'click .medley-result-box'			:          'loadNewMedley'
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
            },
            error: function(model, xhr){
                console.log(model, xhr);
            }
        });
		return this;
	}

});
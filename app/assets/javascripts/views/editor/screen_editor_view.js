Medley.Views.ScreenEditor = Backbone.View.extend({
	
	el: "#dashboard-container",

	initialize: function() {
		_.bindAll(this);

		// Get Parameters from URL and add them as an option
		var query = location.search.substr(1);
	    var data = query.split("&");
    	var params = {};
		for(var i=0; i<data.length; i++) {
		    var item = data[i].split("=");
		    params[item[0]] = item[1];
		}
		this.options.params = params

		// Load Views and pass in the params option
		var editorSearch = new Medley.Views.EditorSearch({ params: this.options.params });
		var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({ params: this.options.params });
		$('#module-medley-editor').html(editorMedleyPreview.render().$el); 		
	},

	events: {
    },

	render: function () {
		return this;
	}

});
Medley.Views.EditorItemOptions = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/editor/item_options'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

	render: function () {
    this.$el.html(this.template({  })).fadeIn('slow')
	return this;
	}

});
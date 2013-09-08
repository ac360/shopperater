Medley.Views.EditorPublish = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/editor/publish'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

	render: function () {
    this.$el.html(this.template({ model: this.model }));
	return this;
	}

});
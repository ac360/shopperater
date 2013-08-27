Medley.Views.EditorProductTitle = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "",
    template: JST['screens/editor/product_title'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

	render: function () {
    this.$el.html(this.template({ model: this.model })).fadeIn('slow')
	return this;
	}

});
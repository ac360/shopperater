Medley.Views.EditorUserInformation = Backbone.View.extend({
	 
    tagName: "div",
    id: "",
    className: "row",
    template: JST['screens/editor/user_information'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

	render: function () {
    this.$el.html(this.template({ model: this.model })).fadeIn(1000)
	return this;
	}

});
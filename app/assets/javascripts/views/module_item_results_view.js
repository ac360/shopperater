Shopperater.Views.ModuleItemResults = Backbone.View.extend({
	
	tagName: "div",
  id: "",
  className: "",
  template: JST['module_item_results/module_item_results'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {

    },


	render: function () {
    this.$el.html(this.template({ collection: this.collection }));
		return this;
	}

});
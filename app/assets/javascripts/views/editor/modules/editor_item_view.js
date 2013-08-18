Medley.Views.EditorItem = Backbone.View.extend({
	 
    tagName: 'li',
    id: '',
    className: 'medley-grid-item',
    attributes: function() {
  		return {
		    'data-row':    1,
		    'data-col':    1,
		    'data-sizex':  1,
		    'data-sizey':  1,
		    'style':       'background-image:url(' + this.model.item.medium_image.url + ');background-repeat: no-repeat; background-size: auto 100%; background-position: center top;'   
	    };
	},
    template: JST['screens/editor/item'],

	initialize: function() {
		_.bindAll(this);
	},

	events: {
    },

	render: function () {
    this.$el.html(this.template({ model: this.model }))
	return this;
	}

});
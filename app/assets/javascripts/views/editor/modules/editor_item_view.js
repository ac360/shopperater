Medley.Views.EditorItem = Backbone.View.extend({
	 
    tagName: 'li',
    id: '',
    className: 'medley-grid-item',
    attributes: function() {
  		return {
		    'data-row':    this.model.rows,
		    'data-col':    this.model.columns,
		    'data-sizex':  this.model.sizex,
		    'data-sizey':  this.model.sizey,
		    'style':       'background-image:url(' + this.model.img_small + ');background-repeat: no-repeat; background-size: auto 100%; background-position: center top;'   
	    };
	},
    template: JST['screens/editor/item'],

	initialize: function() {
		_.bindAll(this);
		console.log(this.model)
	},

	events: {
    },

	render: function () {
    this.$el.html(this.template({ model: this.model })).fadeIn(1500)
	return this;
	}

});